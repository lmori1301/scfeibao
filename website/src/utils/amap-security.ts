const AMAP_SERVICE_PREFIX = '/_AMapService'
const AMAP_SECURITY_JSCODE =
  import.meta.env.VITE_AMAP_SECURITY_JSCODE || '89a3e2583feec1c50c910b5e8518451e'

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
