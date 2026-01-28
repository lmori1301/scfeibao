/**
 * 队伍建设相关类型定义
 */
import type { PageParams } from './common'

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
