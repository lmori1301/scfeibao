/**
 * 验证工具函数
 */

/**
 * 验证手机号
 */
export function validatePhoneNumber(phone: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 验证邮箱
 */
export function validateEmail(email: string): boolean {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return reg.test(email)
}

/**
 * 验证身份证号
 */
export function validateIdCard(idCard: string): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idCard)
}

/**
 * 验证URL
 */
export function validateUrl(url: string): boolean {
  const reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
  return reg.test(url)
}

/**
 * 验证IP地址
 */
export function validateIP(ip: string): boolean {
  const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return reg.test(ip)
}

/**
 * 验证车牌号
 */
export function validateLicensePlate(plate: string): boolean {
  const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{5,6}$/
  return reg.test(plate)
}

/**
 * 验证证书编号
 */
export function validateCertificateNo(no: string): boolean {
  // 根据实际证书编号规则调整
  const reg = /^[A-Za-z0-9]{8,20}$/
  return reg.test(no)
}

/**
 * 验证密码强度（至少8位，包含字母和数字）
 */
export function validatePassword(password: string): boolean {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return reg.test(password)
}

/**
 * 验证是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}
