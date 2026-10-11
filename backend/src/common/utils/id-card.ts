/**
 * 居民身份证号解析工具
 *
 * 18 位身份证号结构：前 6 位地址码 + 8 位出生日期(YYYYMMDD) + 3 位顺序码 + 1 位校验码。
 * - 出生日期：第 7-14 位
 * - 性别：第 17 位（顺序码末位），奇数为男、偶数为女
 *
 * 用途：人员台账的「性别」「出生日期」可由身份证号推导，避免人工漏填导致
 * 手机端人员详情页出现空值（显示「—」）。
 */

export interface IdCardDerived {
  /** UTC 零点的出生日期；非法时为 undefined */
  birthDate?: Date;
  /** '男' 或 '女'；非法时为 undefined */
  gender?: string;
}

/**
 * 从 18 位身份证号推导出生日期与性别。
 * 格式不符或日期非法（如 20230230）时返回空对象，由调用方保留原值。
 */
export function deriveFromIdCard(idCard?: string | null): IdCardDerived {
  const value = String(idCard ?? '').trim().toUpperCase();
  if (!/^\d{17}[0-9X]$/.test(value)) return {};

  const year = Number(value.slice(6, 10));
  const month = Number(value.slice(10, 12));
  const day = Number(value.slice(12, 14));
  if (month < 1 || month > 12 || day < 1 || day > 31) return {};

  const date = new Date(Date.UTC(year, month - 1, day));
  // 回读校验，拦截 2 月 30 日之类的非法日期
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return {};
  }

  return {
    birthDate: date,
    gender: Number(value.charAt(16)) % 2 === 1 ? '男' : '女',
  };
}

/**
 * 用身份证号「补齐」缺失的性别 / 出生日期，已有值不覆盖。
 * 直接在传入对象上赋值并返回，便于 DTO / 实体复用。
 */
export function fillDerivedFromIdCard<T extends {
  idCard?: string | null;
  gender?: string | null;
  birthDate?: Date | null;
}>(target: T): T {
  if (!target) return target;
  const derived = deriveFromIdCard(target.idCard);
  if (!target.gender && derived.gender) target.gender = derived.gender;
  if (!target.birthDate && derived.birthDate) target.birthDate = derived.birthDate;
  return target;
}
