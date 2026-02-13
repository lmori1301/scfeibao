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
 * 获取首页最新新闻
 */
export function getHomeNews(params?: { limit?: number }) {
  return http.get<NewsItem[]>('/home/news', { params })
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
  }[]>('/home/dynamics', { params })
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
  }[]>('/home/actions', { params })
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
  }[]>('/home/videos', { params })
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
