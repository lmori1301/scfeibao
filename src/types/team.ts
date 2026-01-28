/**
 * 队伍建设类型定义
 */
import type { PageParams, PageResponse, ImageInfo } from './common'

/**
 * 救援案例类型
 */
export enum RescueCaseType {
  EARTHQUAKE = 'earthquake', // 地震救援
  FLOOD = 'flood', // 洪水救援
  FIRE = 'fire', // 火灾救援
  MOUNTAIN = 'mountain', // 山地救援
  WATER = 'water', // 水上救援
  OTHER = 'other' // 其他
}

/**
 * 救援案例列表参数
 */
export interface RescueCaseListParams extends PageParams {
  type?: RescueCaseType
  keyword?: string
  startDate?: string
  endDate?: string
  location?: string
}

/**
 * 救援案例
 */
export interface RescueCase {
  id: number
  title: string
  type: RescueCaseType
  typeName?: string
  location: string
  rescueDate: string
  summary?: string
  content: string
  images?: ImageInfo[]
  videoUrl?: string
  casualties?: number
  participants?: number
  duration?: string
  createdAt: string
}

/**
 * 队伍信息
 */
export interface TeamInfo {
  id: number
  name: string
  logo?: string
  introduction: string
  history: string
  organization: string
  personnel: number
  equipment: Equipment[]
  honors: string[]
  establishedDate: string
  createdAt: string
}

/**
 * 装备信息
 */
export interface Equipment {
  id: number
  name: string
  type: string
  quantity: number
  description?: string
  image?: string
}

/**
 * 队伍风采
 */
export interface TeamShowcase {
  id: number
  title: string
  type: 'training' | 'activity' | 'rescue' | 'other'
  typeName?: string
  images: ImageInfo[]
  description?: string
  date: string
  location?: string
  createdAt: string
}

/**
 * 队伍风采列表参数
 */
export interface TeamShowcaseListParams extends PageParams {
  type?: string
  keyword?: string
  startDate?: string
  endDate?: string
}

/**
 * 救援案例列表响应
 */
export type RescueCaseListResponse = PageResponse<RescueCase>

/**
 * 队伍风采列表响应
 */
export type TeamShowcaseListResponse = PageResponse<TeamShowcase>
