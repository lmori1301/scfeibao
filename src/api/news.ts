/**
 * 新闻相关API接口
 */
import http from '@/utils/http'
import type { NewsItem, NewsListParams } from '@/types/news'

/**
 * 获取新闻列表
 */
export function getNewsList(params: NewsListParams) {
  return http.get('/news/list', { params })
}

/**
 * 获取新闻详情
 */
export function getNewsDetail(id: string | number) {
  return http.get<{ data: NewsItem }>(`/news/${id}`)
}

/**
 * 获取最新新闻
 */
export function getLatestNews(limit: number = 5) {
  return http.get('/news/latest', { params: { limit } })
}
