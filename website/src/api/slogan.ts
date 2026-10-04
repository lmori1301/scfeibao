/**
 * 标语横幅接口
 */
import http from '@/utils/http'

export interface SloganBannerItem {
  id: number
  slogan?: string
  imageUrl: string
  link?: string
  linkTarget?: '_self' | '_blank'
}

/** 获取启用中的标语横幅（前台公开接口） */
export function getSloganBanners() {
  return http.get<SloganBannerItem[]>('/slogan-banners/list')
}
