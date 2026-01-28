/**
 * 政策法规相关API接口
 */
import http from '@/utils/http'
import type { LawItem, LawListParams } from '@/types/policy'
import type { RegulationItem, RegulationListParams } from '@/types/policy'
import type { StandardItem, StandardListParams } from '@/types/policy'

/**
 * 获取法律法规列表
 */
export function getLawsList(params: LawListParams) {
  return http.get('/laws/list', { params })
}

/**
 * 获取法律法规详情
 */
export function getLawDetail(id: string | number) {
  return http.get<{ data: LawItem }>(`/laws/${id}`)
}

/**
 * 获取部门规章列表
 */
export function getRegulationsList(params: RegulationListParams) {
  return http.get('/regulations/list', { params })
}

/**
 * 获取部门规章详情
 */
export function getRegulationDetail(id: string | number) {
  return http.get<{ data: RegulationItem }>(`/regulations/${id}`)
}

/**
 * 获取行业标准列表
 */
export function getStandardsList(params: StandardListParams) {
  return http.get('/standards/list', { params })
}

/**
 * 获取行业标准详情
 */
export function getStandardDetail(id: string | number) {
  return http.get<{ data: StandardItem }>(`/standards/${id}`)
}
