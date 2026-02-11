/**
 * 证书查询验证工具
 */
import type { CertificateQueryParams } from '@/types/query'

export interface ValidationResult {
  valid: boolean
  message: string
}

/**
 * 验证证书查询参数
 */
export function validateCertificateQuery(params: CertificateQueryParams): ValidationResult {
  const { certificateNo, name, idCard } = params

  // 至少需要一个查询条件
  if (!certificateNo && !name && !idCard) {
    return {
      valid: false,
      message: '请至少输入一个查询条件'
    }
  }

  // 验证证书编号格式
  if (certificateNo && certificateNo.length < 5) {
    return {
      valid: false,
      message: '证书编号格式不正确，至少需要5位'
    }
  }

  // 验证姓名格式
  if (name && (name.length < 2 || name.length > 20)) {
    return {
      valid: false,
      message: '姓名长度应在2-20个字符之间'
    }
  }

  // 验证身份证号格式
  if (idCard) {
    const idCardPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
    if (!idCardPattern.test(idCard)) {
      return {
        valid: false,
        message: '身份证号格式不正确'
      }
    }
  }

  return {
    valid: true,
    message: '验证通过'
  }
}
