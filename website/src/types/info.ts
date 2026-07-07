/**
 * 信息公开相关类型定义
 */
import type { PageParams } from './common'

// 人事任免
export interface PersonnelItem {
  id: number
  title: string
  type: string // 任命/免职/调动
  name: string
  position: string
  department: string
  effectiveDate: string
  content: string
}

export interface PersonnelListParams extends PageParams {
  type?: string
  keyword?: string
  startDate?: string
  endDate?: string
}
