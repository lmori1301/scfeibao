import request from '@/utils/http'

let websiteConfigCache: unknown = null
let websiteConfigPromise: Promise<unknown> | null = null

/**
 * 获取网站配置
 */
export function getWebsiteConfig(options?: { force?: boolean }) {
  if (!options?.force && websiteConfigCache) {
    return Promise.resolve(websiteConfigCache)
  }

  if (!options?.force && websiteConfigPromise) {
    return websiteConfigPromise
  }

  websiteConfigPromise = request.get('/config').then((response) => {
    websiteConfigCache = response
    return response
  }).finally(() => {
    websiteConfigPromise = null
  })

  return websiteConfigPromise
}

/**
 * 更新网站配置
 */
export function updateWebsiteConfig(data: { key: string; value: string; description?: string }) {
  return request.post('/config', data).then((response) => {
    websiteConfigCache = null
    websiteConfigPromise = null
    return response
  })
}
