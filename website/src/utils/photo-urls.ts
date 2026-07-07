/**
 * 解析人员/车辆等保存的图片字段：支持 JSON 数组字符串或单张 URL（与后台一致）。
 */
export function parsePhotoUrlList(raw: string | null | undefined): string[] {
  if (raw == null || raw === '') return []
  const t = String(raw).trim()
  if (t.startsWith('[')) {
    try {
      const a = JSON.parse(t) as unknown
      return Array.isArray(a) ? a.map((u) => String(u)).filter(Boolean) : []
    } catch {
      return []
    }
  }
  return [t]
}

export function normalizeMediaUrl(url: string): string {
  const u = String(url || '').trim()
  if (!u) return ''
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  return u.startsWith('/') ? u : `/${u}`
}

export function parsePhotoUrlListForDisplay(raw: string | null | undefined): string[] {
  return parsePhotoUrlList(raw).map(normalizeMediaUrl).filter(Boolean)
}
