/**
 * 队伍建设相关接口
 */
import http from '@/utils/http'
import type {
  RescueCaseListParams,
  RescueCase,
  RescueCaseListResponse,
  TeamInfo,
  TeamShowcaseListParams,
  TeamShowcaseListResponse
} from '@/types/team'

/**
 * 获取队伍介绍
 */
export function getTeamAbout() {
  return http.get<TeamInfo>('/team/about')
}

/**
 * 获取救援案例列表
 */
export function getRescueCases(params: RescueCaseListParams) {
  return http.get<RescueCaseListResponse>('/team/cases', { params })
}

/**
 * 获取救援案例详情
 */
export function getRescueCaseDetail(id: number) {
  return http.get<RescueCase>(`/team/case/${id}`)
}

/**
 * 获取队伍风采列表
 */
export function getTeamShowcaseList(params: TeamShowcaseListParams) {
  return http.get<TeamShowcaseListResponse>('/team-showcase', { params })
}

/**
 * 获取队伍风采详情
 */
export function getTeamShowcaseDetail(id: number) {
  return http.get<{
    id: number
    title: string
    type: string
    images: string[]
    description: string
    date: string
    location: string
  }>(`/team-showcase/${id}`)
}
