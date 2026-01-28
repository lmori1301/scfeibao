/**
 * 政策法规相关类型定义
 */
import type { PageParams } from './common'

// 法律法规
export interface LawItem {
  id: number
  title: string
  number?: string
  publishDate: string
  effectiveDate: string
  issuingBody: string
  content: string
  category?: string
}

export interface LawListParams extends PageParams {
  category?: string
  keyword?: string
  issuingBody?: string
}

// 部门规章
export interface RegulationItem {
  id: number
  title: string
  number?: string
  publishDate: string
  effectiveDate: string
  department: string
  content: string
}

export interface RegulationListParams extends PageParams {
  keyword?: string
  department?: string
}

// 行业标准
export interface StandardItem {
  id: number
  title: string
  code: string
  publishDate: string
  effectiveDate: string
  status: string // 现行/废止/即将实施
  content: string
  category?: string
}

export interface StandardListParams extends PageParams {
  status?: string
  category?: string
  keyword?: string
}
