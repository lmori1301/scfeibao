/**
 * 新闻类型定义
 */
import type { PageParams, PageResponse, ImageInfo } from './common'

/**
 * 新闻分类
 */
export enum NewsCategory {
  LEADER_ACTIVITY = 'leader_activity', // 领导活动
  RESCUE_ACTION = 'rescue_action', // 救援行动
  TEAM_DYNAMIC = 'team_dynamic', // 队伍动态
  NOTICE = 'notice', // 通知公告
  ALL = 'all' // 全部
}

/**
 * 新闻列表参数
 */
export interface NewsListParams extends PageParams {
  category?: NewsCategory
  keyword?: string
  startDate?: string
  endDate?: string
}

/**
 * 新闻项
 */
export interface NewsItem {
  id: number
  title: string
  summary?: string
  content: string
  coverImage?: string
  images?: ImageInfo[]
  videoUrl?: string
  publishDate: string
  author?: string
  source?: string
  category: NewsCategory
  categoryName?: string
  views?: number
  tags?: string[]
  attachments?: Attachment[]
  createdAt: string
  updatedAt: string
}

/**
 * 附件
 */
export interface Attachment {
  id: number
  name: string
  url: string
  size: number
  type: string
}

/**
 * 新闻列表响应
 */
export type NewsListResponse = PageResponse<NewsItem>

/**
 * 新闻详情
 */
export type NewsDetail = NewsItem
