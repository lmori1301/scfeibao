import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(resolve(__dirname, './certificate-list.vue'), 'utf-8')

describe('certificate-list layout', () => {
  it('uses content-driven scale height instead of a fixed Pixso canvas height', () => {
    expect(source).not.toContain("usePixsoScale(1920, 1444)")
    expect(source).not.toMatch(/height:\s*1444px/)
    expect(source).toContain('wrapperHeight')
    expect(source).toContain('updateWrapperLayout')
  })
})
