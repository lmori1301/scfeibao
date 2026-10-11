/**
 * 居民身份证号解析（与后端 common/utils/id-card.ts 同规则）
 *
 * 出生日期：第 7-14 位（YYYYMMDD）；性别：第 17 位，奇数男、偶数女。
 * 解析失败返回空对象，由调用方保留原值。
 */
export interface IdCardDerived {
  /** 'YYYY-MM-DD' 形式的出生日期 */
  birthDate?: string
  /** '男' 或 '女' */
  gender?: string
}

export function parseIdCard(idCard?: string | null): IdCardDerived {
  const value = String(idCard ?? '').trim().toUpperCase()
  if (!/^\d{17}[0-9X]$/.test(value)) return {}

  const year = Number(value.slice(6, 10))
  const month = Number(value.slice(10, 12))
  const day = Number(value.slice(12, 14))
  if (month < 1 || month > 12 || day < 1 || day > 31) return {}

  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return {}
  }

  return {
    birthDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    gender: Number(value.charAt(16)) % 2 === 1 ? '男' : '女',
  }
}
