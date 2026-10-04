/**
 * 值班表 Excel 解析（浏览器端）
 *
 * 支持「日期为列」的转置布局，与后端 `common/utils/duty-roster-parser.ts` 同逻辑：
 *   | 时间 | 9月25日 | 9月26日 | ... |
 *   | 值班干部（电话） | 黄凯15208324794 | 陶建伟 13881936662 | ... |
 *   | 值班人员（4人） | 王磊、刘勇、周驰双、段才元 | 代俊良、张永祥、... | ... |
 */

export type DutyRosterRow = {
  rowNumber: number
  dutyDate: string
  dutyCadreName: string
  dutyCadrePhone: string
  dutyStaff: string
}

export type DutyRosterParseResult = {
  rows: DutyRosterRow[]
  errors: Array<{ row: number; message: string }>
  detectedYear?: string
  detectedTeamName?: string
}

/**
 * 手机号匹配：允许 15928613494 / 159-2861-3494 / 159 2861 3494 / +8615928613494。
 * 与后端 common/utils/duty-roster-parser.ts 保持同一套规则。
 */
const PHONE_RE = /(?:\+?86[-\s]?)?(1[3-9]\d)[-\s]?(\d{4})[-\s]?(\d{4})/
const CADRE_LABELS = ['值班干部', '带班领导', '值班领导', '带队干部', '干部']
const STAFF_LABELS = ['值班人员', '值班员', '值班组员', '参与人员', '人员']

type Matrix = unknown[][]

export function parseDutyRoster(matrix: Matrix): DutyRosterParseResult {
  const grid = (matrix || [])
    .map((row) => (Array.isArray(row) ? row : []))
    .filter((row) => row.some((cell) => toText(cell) !== ''))

  if (grid.length === 0) {
    return { rows: [], errors: [{ row: 0, message: '值班表内容为空' }] }
  }

  const errors: DutyRosterParseResult['errors'] = []
  const title = detectTitle(grid)
  const header = findHeaderRow(grid)

  if (!header) {
    errors.push({
      row: 0,
      message: '未识别到「时间」表头行，请确认上传的是值班表（首行需包含 时间 / 9月25日 / 10月1日 等日期列）',
    })
    return { rows: [], errors, ...title }
  }

  const cadreRow = findLabelRow(grid, CADRE_LABELS, header.headerRowIndex)
  const staffRow = findLabelRow(grid, STAFF_LABELS, header.headerRowIndex)

  if (!cadreRow && !staffRow) {
    errors.push({ row: 0, message: '未识别到「值班干部」或「值班人员」行，请确认表格结构' })
    return { rows: [], errors, ...title }
  }

  const rows: DutyRosterRow[] = []

  header.dateColumns.forEach(({ columnIndex, label }) => {
    const rowNumber = header.headerRowIndex + 1
    const dutyDate = resolveDutyDate(label, title.detectedYear)
    if (!dutyDate) {
      errors.push({ row: rowNumber, message: `日期「${label}」无法解析，请补充完整日期` })
      return
    }

    const cadreRaw = cadreRow ? toText(cadreRow[columnIndex]) : ''
    const staffRaw = staffRow ? toText(staffRow[columnIndex]) : ''
    const { name: cadreName, phone: cadrePhone } = splitCadre(cadreRaw)

    if (!cadreName && !staffRaw) {
      errors.push({ row: rowNumber, message: `日期「${label}」未填写值班干部与值班人员` })
      return
    }
    if (!cadreName) {
      errors.push({ row: rowNumber, message: `日期「${label}」缺少值班干部` })
      return
    }
    if (!staffRaw) {
      errors.push({ row: rowNumber, message: `日期「${label}」缺少值班人员` })
      return
    }

    rows.push({
      rowNumber,
      dutyDate,
      dutyCadreName: cadreName,
      dutyCadrePhone: cadrePhone,
      dutyStaff: normalizeStaff(staffRaw),
    })
  })

  return { rows, errors, ...title }
}

type HeaderDetect = {
  headerRowIndex: number
  dateColumns: Array<{ columnIndex: number; label: string }>
}

function findHeaderRow(grid: Matrix): HeaderDetect | null {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex += 1) {
    const row = grid[rowIndex]
    const timeCol = row.findIndex((cell) => toText(cell).replace(/\s/g, '').includes('时间'))
    if (timeCol < 0) continue

    const dateColumns: HeaderDetect['dateColumns'] = []
    for (let col = timeCol + 1; col < row.length; col += 1) {
      const raw = row[col] as unknown
      const label = toText(raw)
      if (!label) continue
      if (!looksLikeDateLabel(label)) continue
      dateColumns.push({ columnIndex: col, label })
    }

    if (dateColumns.length > 0) {
      return { headerRowIndex: rowIndex, dateColumns }
    }
  }
  return null
}

function looksLikeDateLabel(label: string): boolean {
  const text = label.replace(/\s/g, '')
  if (/^\d{4}[-/年]\d{1,2}[-/月]\d{1,2}日?$/.test(text)) return true
  if (/^\d{1,2}[-/月]\d{1,2}日?$/.test(text)) return true
  return false
}

function findLabelRow(grid: Matrix, labels: string[], fromRowIndex: number): unknown[] | null {
  for (let rowIndex = fromRowIndex + 1; rowIndex < grid.length; rowIndex += 1) {
    const row = grid[rowIndex]
    const firstCell = toText(row[0]).replace(/\s/g, '')
    if (!firstCell) continue
    if (labels.some((label) => firstCell.includes(label))) {
      return row
    }
  }
  return null
}

function detectTitle(grid: Matrix): { detectedYear?: string; detectedTeamName?: string } {
  for (let rowIndex = 0; rowIndex < Math.min(grid.length, 3); rowIndex += 1) {
    for (const cell of grid[rowIndex]) {
      const text = toText(cell).replace(/\s/g, '')
      if (!text) continue

      // 含 11 位手机号样串的单元格不是标题（如「黄凯15208324794」），跳过，
      // 否则「20\d{2}」会从号码中段误抓出假年份（曾把 15208324794 读成 2083 年）。
      if (/(?<!\d)1[3-9]\d{9}(?!\d)/.test(text)) continue

      // 年份必须独立成词：前后都不能紧邻其他数字
      const yearMatch = text.match(/(?<!\d)(?:19|20)\d{2}(?!\d)/)
      const teamMatch = text.match(/([\u4e00-\u9fa5A-Za-z]{2,20}?(?:大队|支队|中队|救援队|队))/)

      if (yearMatch || teamMatch) {
        return {
          detectedYear: yearMatch?.[0],
          detectedTeamName: teamMatch?.[1],
        }
      }
    }
  }
  return {}
}

function resolveDutyDate(label: string, year?: string): string {
  const text = label.replace(/\s/g, '')

  const full = text.match(/^(20\d{2})[-/年](\d{1,2})[-/月](\d{1,2})日?$/)
  if (full) return `${full[1]}-${pad(full[2])}-${pad(full[3])}`

  const short = text.match(/^(\d{1,2})[-/月](\d{1,2})日?$/)
  if (short) {
    const resolvedYear = year || String(new Date().getFullYear())
    return `${resolvedYear}-${pad(short[1])}-${pad(short[2])}`
  }

  const parsed = new Date(text)
  if (!Number.isNaN(parsed.getTime())) return toIsoDate(parsed)

  return ''
}

function splitCadre(raw: string): { name: string; phone: string } {
  const text = toText(raw).replace(/\s+/g, ' ').trim()
  if (!text) return { name: '', phone: '' }

  const matched = text.match(PHONE_RE)
  if (matched) {
    return {
      phone: `${matched[1]}${matched[2]}${matched[3]}`,
      name: cleanName(text.replace(matched[0], '')),
    }
  }

  const lines = text
    .split(/[\n\r]+/)
    .map((line) => line.trim())
    .filter(Boolean)
  if (lines.length >= 2) {
    const phoneLine = lines.find((line) => PHONE_RE.test(line))
    if (phoneLine) {
      const m = phoneLine.match(PHONE_RE)!
      const name = lines
        .filter((line) => line !== phoneLine)
        .join('')
        .trim()
      return { phone: `${m[1]}${m[2]}${m[3]}`, name: cleanName(name) }
    }
    return { name: cleanName(lines[0]), phone: '' }
  }

  return { name: cleanName(text), phone: '' }
}

function cleanName(value: string): string {
  return value.replace(/[\s:：,，.。、_—-]/g, '').trim()
}

export function normalizeStaff(raw: string): string {
  return toText(raw)
    .split(/[\n\r、，,;；\s]+/)
    .map((name) => name.trim())
    .filter(Boolean)
    .join(',')
}

function toText(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return toIsoDate(value)
  return String(value).trim()
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  return `${year}-${pad(String(date.getMonth() + 1))}-${pad(String(date.getDate()))}`
}

function pad(value: string | number): string {
  return String(value).padStart(2, '0')
}
