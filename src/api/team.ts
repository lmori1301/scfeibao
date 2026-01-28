/**
 * 队伍建设相关API接口
 */
import http from '@/utils/http'
import type { CaseItem, CaseListParams } from '@/types/team'
import type { ShowcaseItem, ShowcaseListParams } from '@/types/team'
import type { TeamInfo } from '@/types/team'

/**
 * 获取救援案例列表
 */
export function getCasesList(params: CaseListParams) {
  return http.get('/cases/list', { params })
}

/**
 * 获取救援案例详情
 */
export function getCaseDetail(id: string | number) {
  return http.get<{ data: CaseItem }>(`/cases/${id}`)
}

/**
 * 获取队伍风采列表
 */
export function getShowcaseList(params: ShowcaseListParams) {
  return http.get('/showcase/list', { params })
}

/**
 * 获取队伍风采详情
 */
export function getShowcaseDetail(id: string | number) {
  return http.get<{ data: ShowcaseItem }>(`/showcase/${id}`)
}

/**
 * 获取队伍基本信息
 */
export function getTeamInfo() {
  return http.get<{ data: TeamInfo }>('/team/info')
}
