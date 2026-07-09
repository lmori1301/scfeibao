import { describe, expect, it } from 'vitest'
import { extractRichTextParagraphs, sanitizeRichText } from './rich-text'

describe('extractRichTextParagraphs', () => {
  it('extracts visible paragraphs from saved rich text without exposing markup', () => {
    const html =
      '<p>四川飞豹救援坚持人民至上。</p><p><img src="/uploads/images/team.png" style="width:100%" /></p><p>队伍建立专业化训练体系。</p>'

    expect(extractRichTextParagraphs(html)).toEqual([
      '四川飞豹救援坚持人民至上。',
      '队伍建立专业化训练体系。'
    ])
  })

  it('falls back to plain text paragraphs when content is not HTML', () => {
    expect(extractRichTextParagraphs('第一段\n\n第二段')).toEqual(['第一段', '第二段'])
  })
})

describe('sanitizeRichText', () => {
  it('keeps editor paragraph and image order while removing dangerous attributes', () => {
    const html =
      '<p>第一段</p><p><img src="/uploads/images/team.png" onerror="alert(1)" /></p><script>alert(1)</script><p>第二段</p>'

    const result = sanitizeRichText(html)

    expect(result).toContain('<p>第一段</p>')
    expect(result).toContain('<img src="/uploads/images/team.png">')
    expect(result).toContain('<p>第二段</p>')
    expect(result).not.toContain('script')
    expect(result).not.toContain('onerror')
  })
})
