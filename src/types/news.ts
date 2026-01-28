/**
 * 新闻相关类型定义
 */
import type { PageParams } from './common'

// 新闻条目
export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  coverImage?: string
  publishDate: string
  author: string
  category: string
  tags?: string[]
  views?: number
}

// 新闻列表参数
export interface NewsListParams extends PageParams {
  category?: string
  keyword?: string
  startDate?: string
  endDate?: string
}
