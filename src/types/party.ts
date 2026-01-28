/**
 * 党建相关类型定义
 */
import type { PageParams } from './common'

// 党建工作
export interface PartyWorkItem {
  id: number
  title: string
  summary: string
  content: string
  publishDate: string
  author: string
  category?: string
}

export interface PartyWorkListParams extends PageParams {
  keyword?: string
  category?: string
}

// 团建工作
export interface TeamWorkItem {
  id: number
  title: string
  summary: string
  content: string
  publishDate: string
  author: string
}

export interface TeamWorkListParams extends PageParams {
  keyword?: string
}

// 党员先锋
export interface MemberItem {
  id: number
  name: string
  position: string
  department: string
  avatar?: string
  introduction: string
  achievements?: string[]
}

export interface MemberListParams extends PageParams {
  keyword?: string
  department?: string
}

// 党员学习
export interface StudyItem {
  id: number
  title: string
  summary: string
  content: string
  publishDate: string
  source?: string
  videoUrl?: string
}

export interface StudyListParams extends PageParams {
  keyword?: string
}
