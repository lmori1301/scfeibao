const AMAP_SERVICE_PREFIX = '/_AMapService'
// 四川飞豹前端地图（高德控制台 Web端/JS API Key），已加白 www.scfb.org.cn
const DEFAULT_AMAP_JSAPI_KEY = '6f6d5377fff49a831d13cfb79477d9bf'
const AMAP_SECURITY_JSCODE =
  import.meta.env.VITE_AMAP_SECURITY_JSCODE || '9960e8a7d7dc13db7e0c79e3ac6b0c35'

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      serviceHost?: string
      securityJsCode?: string
    }
  }
}

export function applyAmapSecurityConfig() {
  if (typeof window === 'undefined') return

  const serviceHost = resolveAmapServiceHost(import.meta.env.VITE_APP_BASE_API)
  window._AMapSecurityConfig = {
    ...window._AMapSecurityConfig,
    serviceHost,
    securityJsCode: AMAP_SECURITY_JSCODE,
  }
}

export function getAmapServicePrefix() {
  return AMAP_SERVICE_PREFIX
}

export function getAmapJsApiKey() {
  return import.meta.env.VITE_AMAP_KEY || DEFAULT_AMAP_JSAPI_KEY
}

export function isAmapInvalidUserDomainError(reason: unknown) {
  return stringifyAmapError(reason).includes('INVALID_USER_DOMAIN')
}

function resolveAmapServiceHost(baseApi?: string) {
  const normalizedBaseApi = (baseApi || '').trim()
  if (!normalizedBaseApi) {
    return `${window.location.origin}${AMAP_SERVICE_PREFIX}`
  }

  try {
    const apiUrl = new URL(normalizedBaseApi, window.location.origin)
    return `${apiUrl.origin}${AMAP_SERVICE_PREFIX}`
  } catch {
    return `${window.location.origin}${AMAP_SERVICE_PREFIX}`
  }
}

function stringifyAmapError(reason: unknown) {
  if (typeof reason === 'string') return reason
  if (reason instanceof Error) return reason.message

  try {
    return JSON.stringify(reason ?? '')
  } catch {
    return String(reason)
  }
}
