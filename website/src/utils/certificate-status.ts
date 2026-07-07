/** 官网查询与后台证书台账共用的「日历 + 作废」展示状态 */

const MS_PER_DAY = 86400000
const PRE_EXPIRY_WARN_DAYS = 5

const startOfLocalDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()

const expiryDayStart = (expiryValue: unknown): number | null => {
  if (expiryValue === undefined || expiryValue === null || expiryValue === '') return null
  const d = new Date(expiryValue as string | Date)
  if (Number.isNaN(d.getTime())) return null
  return startOfLocalDay(d)
}

const isCalendarExpired = (expiryValue: unknown) => {
  const exp = expiryDayStart(expiryValue)
  if (exp === null) return false
  return startOfLocalDay(new Date()) > exp
}

const wholeDaysUntilExpiry = (expiryValue: unknown): number | null => {
  const exp = expiryDayStart(expiryValue)
  if (exp === null) return null
  return Math.round((exp - startOfLocalDay(new Date())) / MS_PER_DAY)
}

const isWithinPreExpiryWindow = (expiryValue: unknown, days = PRE_EXPIRY_WARN_DAYS) => {
  const left = wholeDaysUntilExpiry(expiryValue)
  if (left === null) return false
  return left >= 0 && left <= days
}

export type CertDisplayTag = 'success' | 'warning' | 'danger' | 'info'

export function getCertificateDisplayStatus(row: { status: number; expiryDate?: unknown }) {
  if (row.status !== 1) {
    return { label: '失效' as const, tag: 'info' as CertDisplayTag }
  }
  if (isCalendarExpired(row.expiryDate)) {
    return { label: '过期' as const, tag: 'danger' as CertDisplayTag }
  }
  if (isWithinPreExpiryWindow(row.expiryDate, PRE_EXPIRY_WARN_DAYS)) {
    return { label: '即将过期' as const, tag: 'warning' as CertDisplayTag }
  }
  return { label: '有效' as const, tag: 'success' as CertDisplayTag }
}
