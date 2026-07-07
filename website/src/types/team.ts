/**
 * 队伍建设相关类型定义
 */
import type { PageParams, PageResponse } from './common'

// 救援案例
export interface CaseItem {
  id: number
  title: string
  description: string
  content: string
  rescueDate: string
  location: string
  images?: string[]
  participants?: number
  status?: string
}

export interface CaseListParams extends PageParams {
  keyword?: string
  startDate?: string
  endDate?: string
  location?: string
}

// 救援案例列表响应
export interface RescueCase extends CaseItem {}
export interface RescueCaseListParams extends CaseListParams {}
export interface RescueCaseListResponse extends PageResponse<RescueCase> {}

// 队伍风采
export interface ShowcaseItem {
  id: number
  title: string
  description: string
  content: string
  images: string[]
  publishDate: string
  category?: string
}

export interface ShowcaseListParams extends PageParams {
  category?: string
  keyword?: string
}

// 队伍风采列表响应
export interface TeamShowcaseListParams extends ShowcaseListParams {}
export interface TeamShowcaseListResponse extends PageResponse<ShowcaseItem> {}

// 关于队伍
export interface TeamInfo {
  name: string
  establishedDate: string
  description: string
  mission: string
  vision: string
  values: string[]
  achievements: string[]
}
