const decodeHtmlText = (value: string) => {
  if (!value) return ''
  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

const normalizeParagraph = (value: string) => value.replace(/\s+/g, ' ').trim()

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const extractRichTextParagraphs = (content: string) => {
  const source = content?.trim()
  if (!source) return []

  if (!/<[a-z][\s\S]*>/i.test(source)) {
    return source
      .split(/\n{2,}/)
      .map(item => normalizeParagraph(item))
      .filter(Boolean)
  }

  const container = document.createElement('div')
  container.innerHTML = source

  container.querySelectorAll('script, style, img, video, iframe, object').forEach(node => node.remove())

  const blockNodes = Array.from(container.querySelectorAll('p, div, li'))
  const paragraphs = blockNodes
    .map(node => normalizeParagraph(node.textContent || ''))
    .filter(Boolean)

  if (paragraphs.length) {
    return paragraphs
  }

  return decodeHtmlText(source)
    .split(/\n{2,}/)
    .map(item => normalizeParagraph(item.replace(/<[^>]+>/g, '')))
    .filter(Boolean)
}

export const sanitizeRichText = (content: string) => {
  const source = content?.trim()
  if (!source) return ''

  if (!/<[a-z][\s\S]*>/i.test(source)) {
    return source
      .split(/\n{2,}/)
      .map(item => normalizeParagraph(item))
      .filter(Boolean)
      .map(item => `<p>${escapeHtml(item)}</p>`)
      .join('')
  }

  const container = document.createElement('div')
  container.innerHTML = source
  container.querySelectorAll('script, style, iframe, object').forEach(node => node.remove())

  container.querySelectorAll<HTMLElement>('*').forEach(node => {
    Array.from(node.attributes).forEach(attr => {
      const name = attr.name.toLowerCase()
      const value = attr.value.trim().toLowerCase()
      if (name.startsWith('on') || name === 'style' || value.startsWith('javascript:')) {
        node.removeAttribute(attr.name)
      }
    })
  })

  return container.innerHTML
}
