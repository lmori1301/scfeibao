/**
 * 生成「人员二维码」内嵌的门户官网根地址（无 path、无末尾 /）。
 *
 * 优先级：
 * 1. `VITE_PORTAL_PUBLIC_URL` — 生产或固定域名
 * 2. 浏览器内：`当前访问后台的协议 + hostname + 门户 dev 端口`（与官网 Vite 默认 5173 一致）
 *
 * 手机扫码：
 * - 用 **http://电脑局域网IP:5176** 打开后台，则二维码内自动为 **http://同一IP:5173**（同 WiFi；官网 dev 需 `host: true`）。
 * - 若仍用 **127.0.0.1 / localhost** 打开后台且未配 `VITE_PORTAL_PUBLIC_URL`，**不传** portalBase，由后端 `PORTAL_PUBLIC_URL` 决定（请在 backend/.env 填手机可访问的门户根地址）。
 */
export function getPortalPublicBaseForQrcode(): string {
  const fromEnv = (import.meta.env.VITE_PORTAL_PUBLIC_URL as string | undefined)?.trim().replace(/\/+$/, '')
  if (fromEnv) return fromEnv

  if (typeof window === 'undefined') return ''

  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
  const hostname = window.location.hostname
  const rawPort = String(import.meta.env.VITE_PORTAL_DEV_PORT ?? '5173')
  const portalPort = (rawPort.match(/\d+/)?.[0] || '5173').slice(0, 5)

  // 本机回环手机无法访问；不传 portalBase，交给 VITE_PORTAL_PUBLIC_URL / 后端 PORTAL_PUBLIC_URL
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]'
  ) {
    return ''
  }

  return `${protocol}//${hostname}:${portalPort}`
}

export function qrcodePortalBaseQuery(): string {
  const base = getPortalPublicBaseForQrcode()
  return base ? `?portalBase=${encodeURIComponent(base)}` : ''
}

/** 与 portalBase 查询参数一致，供 axios 附带请求头（部分代理只保留 path 时仍可取到） */
export function qrcodePortalRequestConfig(): { headers?: Record<string, string> } {
  const base = getPortalPublicBaseForQrcode().trim()
  if (!base) return {}
  return { headers: { 'x-portal-public-url': base } }
}

export function isLocalhostHostname(): boolean {
  if (typeof window === 'undefined') return false
  const h = window.location.hostname
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]'
}
