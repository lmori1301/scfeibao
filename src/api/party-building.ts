/**
 * 党建相关接口
 */
import { http } from '@/utils/http'
import type { PartyWorkListParams, PartyWorkItem, PartyListResponse, PartyMember, StudyMaterial } from '@/types/party'

/**
 * 获取党建工作列表
 */
export function getPartyWorkList(params: PartyWorkListParams) {
  return http.get<PartyListResponse>('/api/party/work-list', { params })
}

/**
 * 获取党建工作详情
 */
export function getPartyWorkDetail(id: number) {
  return http.get<PartyWorkItem>(`/api/party/work/${id}`)
}

/**
 * 获取党员先锋列表
 */
export function getPartyMembers(params?: { page?: number; pageSize?: number }) {
  return http.get<PartyMember[]>('/api/party/members', { params })
}

/**
 * 获取党员先锋详情
 */
export function getPartyMemberDetail(id: number) {
  return http.get<PartyMember>(`/api/party/member/${id}`)
}

/**
 * 获取学习资料列表
 */
export function getStudyMaterials(params?: { page?: number; pageSize?: number; type?: string }) {
  return http.get<StudyMaterial[]>('/api/party/study-materials', { params })
}
