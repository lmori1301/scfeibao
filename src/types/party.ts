/**
 * 党建类型定义
 */
import type { PageParams, PageResponse } from './common'

/**
 * 党建内容分类
 */
export enum PartyCategory {
  PARTY_WORK = 'party_work', // 党建工作
  TEAM_WORK = 'team_work', // 团建工作
  PARTY_MEMBER = 'party_member', // 党员先锋
  STUDY = 'study' // 党员学"习"
}

/**
 * 党建工作列表参数
 */
export interface PartyWorkListParams extends PageParams {
  category?: PartyCategory
  keyword?: string
  year?: string
  month?: string
}

/**
 * 党建工作项
 */
export interface PartyWorkItem {
  id: number
  title: string
  summary?: string
  content: string
  coverImage?: string
  images?: string[]
  category: PartyCategory
  categoryName?: string
  publishDate: string
  author?: string
  views?: number
  createdAt: string
  updatedAt: string
}

/**
 * 党员先锋信息
 */
export interface PartyMember {
  id: number
  name: string
  photo?: string
  position?: string
  department?: string
  story: string
  honors?: string[]
  createdAt: string
}

/**
 * 学习资料
 */
export interface StudyMaterial {
  id: number
  title: string
  type: 'document' | 'video' | 'audio'
  url: string
  coverImage?: string
  size?: number
  duration?: number
  publishDate: string
  description?: string
}

/**
 * 党建列表响应
 */
export type PartyListResponse = PageResponse<PartyWorkItem>
