/**
 * 文本处理工具函数
 */

/**
 * 从HTML中提取纯文本
 * @param html HTML字符串
 * @returns 纯文本字符串
 */
export function stripHtml(html: string): string {
  if (!html) return ''
  // 创建临时div元素来解析HTML
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  // 获取纯文本内容
  const text = tmp.textContent || tmp.innerText || ''
  // 移除多余的空白字符
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * 截断文本并添加省略号
 * @param text 文本字符串
 * @param maxLength 最大长度，默认100
 * @returns 截断后的文本
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * 从富文本HTML中提取纯文本摘要
 * @param html 富文本HTML字符串
 * @param maxLength 最大长度，默认100
 * @returns 纯文本摘要
 */
export function extractSummary(html: string, maxLength: number = 100): string {
  const plainText = stripHtml(html)
  return truncateText(plainText, maxLength)
}
