/**
 * 首页相关接口
 */
import http from '@/utils/http'
import type { NewsItem } from '@/types/news'

/**
 * 获取轮播图
 */
export function getBannerList() {
  return http.get<{
    id: number
    title: string
    image: string
    link?: string
    type: 'image' | 'video'
    videoUrl?: string
  }[]>('/home/banner')
}

/**
 * 获取首页新闻列表（支持按后台新闻管理分类过滤）
 */
export function getHomeNews(params?: { page?: number; pageSize?: number; category?: string }) {
  return http.get<NewsItem[]>('/home/news', { params })
}

/**
 * 获取宣传视频（只获取置顶视频）
 */
export function getPromotionalVideos(params?: { pageSize?: number }) {
  return http.get<{
    items: {
      id: number
      title: string
      cover: string
      url: string
      duration: number
    }[]
    total: number
  }>('/videos/top/list', { params })
}

/**
 * 获取队伍风采
 */
export function getTeamShowcaseForHome(params?: { pageSize?: number }) {
  return http.get<{
    id: number
    title: string
    image: string
    date: string
  }[]>('/home/showcase', { params })
}

/**
 * 获取友情链接
 */
export function getFriendLinks() {
  return http.get<{
    id: number
    name: string
    logo: string
    url: string
  }[]>('/home/links')
}
