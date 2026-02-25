import request from '@/utils/http'

/**
 * 获取网站配置
 */
export function getWebsiteConfig() {
  return request.get('/config')
}

/**
 * 更新网站配置
 */
export function updateWebsiteConfig(data: { key: string; value: string; description?: string }) {
  return request.post('/config', data)
}
