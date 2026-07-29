import { describe, expect, it } from 'vitest'
import { isAmapInvalidUserDomainError } from './amap-security'

describe('isAmapInvalidUserDomainError', () => {
  it('recognizes 高德 JSAPI domain whitelist errors from strings and errors', () => {
    expect(isAmapInvalidUserDomainError('INVALID_USER_DOMAIN')).toBe(true)
    expect(isAmapInvalidUserDomainError(new Error('INVALID_USER_DOMAIN'))).toBe(true)
  })

  it('ignores unrelated map errors', () => {
    expect(isAmapInvalidUserDomainError('Unimplemented type: 3')).toBe(false)
    expect(isAmapInvalidUserDomainError(undefined)).toBe(false)
  })
})
