/**
 * 值班台账接口（前台公开）
 */
import http from '@/utils/http'

export interface TeamDutyItem {
  id: number
  teamName: string
  dutyYear: string
  dutyDate: string | null
  dutyCadreName: string | null
  dutyCadrePhone: string | null
  /** 值班员，多人用英文逗号分隔 */
  dutyStaff: string | null
  attachUrl: string | null
  attachName: string | null
  remark: string | null
}

/** 形如 YYYY-MM-DD（本地时区，不用 toISOString 以免时区偏移） */
export function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 查询值班记录（默认按日期升序） */
export function getTeamDutyList(params?: {
  page?: number
  pageSize?: number
  teamName?: string
  dutyYear?: string
  startDate?: string
  endDate?: string
  keyword?: string
}) {
  return http.get<{
    items: TeamDutyItem[]
    total: number
    page: number
    pageSize: number
  }>('/team-duty', { params })
}

/** 查询「某一天」的值班记录 */
export function getTeamDutyByDate(dateKey: string, teamName?: string) {
  return getTeamDutyList({
    startDate: dateKey,
    endDate: dateKey,
    teamName,
    pageSize: 10,
  })
}

export interface DutyDictOption {
  label: string
  value: string
  sort?: number
}

/** 队伍名称下拉（字典 team_name，公开接口） */
export async function getTeamNameOptions() {
  const res: any = await http.get('/system/dict/data/type/team_name')
  return normalizeDictOptions(res?.data)
}

/** 值班年份下拉（字典 duty_year；为空时用近前后年份兜底） */
export async function getDutyYearOptions() {
  const res: any = await http.get('/system/dict/data/type/duty_year')
  const options = normalizeDictOptions(res?.data)
  if (options.length) return options
  const now = new Date().getFullYear()
  return [now + 1, now, now - 1, now - 2].map((y) => ({ label: `${y} 年`, value: String(y) }))
}

/** 把字典接口返回统一成 { label, value } 数组 */
function normalizeDictOptions(raw: any): DutyDictOption[] {
  const list: any[] = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : []
  return list
    .map((item) => ({
      label: String(item?.label ?? item?.dictLabel ?? item?.name ?? '').trim(),
      value: String(item?.value ?? item?.dictValue ?? '').trim(),
      sort: Number(item?.sort ?? 0),
    }))
    .filter((item) => item.label && item.value)
}

export interface DutyImportResponse {
  total: number
  created: number
  skipped: number
  failed: number
  errors: Array<{ row: number; message: string }>
  attachUrl: string | null
  attachName: string | null
  message: string
}

/**
 * 前台上传值班表并解析入库（公开接口，无需登录）。
 * 仅接受 .xlsx，≤10MB（后端 FileInterceptor 限制）。
 */
export function importTeamDutyXlsx(params: {
  file: File | Blob
  teamName: string
  dutyYear: string
  submitterName?: string
  submitterPhone?: string
  onUploadProgress?: (percent: number) => void
}) {
  const form = new FormData()
  form.append('file', params.file)
  form.append('teamName', params.teamName)
  form.append('dutyYear', params.dutyYear)
  if (params.submitterName) form.append('submitterName', params.submitterName)
  if (params.submitterPhone) form.append('submitterPhone', params.submitterPhone)

  return http.post<DutyImportResponse>('/team-duty/import', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
    onUploadProgress: (e: any) => {
      if (e.total) params.onUploadProgress?.(Math.round((e.loaded / e.total) * 100))
    },
  })
}
