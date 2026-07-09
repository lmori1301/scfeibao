import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(resolve(__dirname, './detail.vue'), 'utf-8')

describe('personnel public detail', () => {
  it('uses the header as a photo preview and hides removed summary sections', () => {
    expect(source).toContain('photoUrls[0]')
    expect(source).not.toContain('detail-card__name')
    expect(source).not.toContain('detail-card__sub')
    expect(source).not.toContain('专业技能')
    expect(source).not.toContain('personnel.skills')
  })
})
