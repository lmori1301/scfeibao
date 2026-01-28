/**
 * 新闻相关接口
 */
import { http } from '@/utils/http'
import type { NewsListParams, NewsItem, NewsListResponse } from '@/types/news'

/**
 * 获取新闻列表
 */
export function getNewsList(params: NewsListParams) {
  return http.get<NewsListResponse>('/api/news/list', { params })
}

/**
 * 获取新闻详情
 */
export function getNewsDetail(id: number) {
  return http.get<NewsItem>(`/api/news/${id}`)
}

/**
 * 获取新闻分类
 */
export function getNewsCategories() {
  return http.get<{
    value: string
    label: string
  }[]>('/api/news/categories')
}

/**
 * 获取相关新闻
 */
export function getRelatedNews(id: number, params?: { limit?: number }) {
  return http.get<NewsItem[]>(`/api/news/${id}/related`, { params })
}
