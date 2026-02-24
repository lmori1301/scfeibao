import type { FormItemRule } from 'element-plus'

export const requiredRule = (message: string): FormItemRule => ({
  required: true,
  message: `请输入${message}`,
  trigger: 'blur'
})

export const phoneRule = (): FormItemRule => ({
  pattern: /^1[3-9]\d{9}$/,
  message: '请输入正确的手机号',
  trigger: 'blur'
})

export const emailRule = (): FormItemRule => ({
  type: 'email',
  message: '请输入正确的邮箱地址',
  trigger: 'blur'
})

export const idCardRule = (): FormItemRule => ({
  pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
  message: '请输入正确的身份证号',
  trigger: 'blur'
})

export const urlRule = (): FormItemRule => ({
  type: 'url',
  message: '请输入正确的URL地址',
  trigger: 'blur'
})
