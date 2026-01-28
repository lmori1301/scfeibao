/**
 * 首页相关接口
 */
import { http } from '@/utils/http'
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
  }[]>('/api/home/banner')
}

/**
 * 获取首页最新新闻
 */
export function getHomeNews(params?: { limit?: number }) {
  return http.get<NewsItem[]>('/api/home/news', { params })
}

/**
 * 获取各地动态
 */
export function getLocalDynamics(params?: { page?: number; pageSize?: number }) {
  return http.get<{
    id: number
    region: string
    title: string
    publishDate: string
  }[]>('/api/home/dynamics', { params })
}

/**
 * 获取救援行动
 */
export function getRescueActions(params?: { limit?: number }) {
  return http.get<{
    id: number
    title: string
    location: string
    rescueDate: string
    summary: string
    image: string
  }[]>('/api/home/actions', { params })
}

/**
 * 获取宣传视频
 */
export function getPromotionalVideos(params?: { limit?: number }) {
  return http.get<{
    id: number
    title: string
    cover: string
    url: string
    duration: number
  }[]>('/api/home/videos', { params })
}

/**
 * 获取队伍风采
 */
export function getTeamShowcaseForHome(params?: { limit?: number }) {
  return http.get<{
    id: number
    title: string
    image: string
    date: string
  }[]>('/api/home/showcase', { params })
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
  }[]>('/api/home/links')
}
