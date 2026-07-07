/**
 * 党建相关API接口
 */
import http from '@/utils/http'
import type { PartyWorkItem, PartyWorkListParams } from '@/types/party'
import type { TeamWorkItem, TeamWorkListParams } from '@/types/party'
import type { MemberItem, MemberListParams } from '@/types/party'
import type { StudyItem, StudyListParams } from '@/types/party'

/**
 * 获取党建工作列表
 */
export function getPartyWorkList(params: PartyWorkListParams) {
  return http.get('/party-work/list', { params })
}

/**
 * 获取党建工作详情
 */
export function getPartyWorkDetail(id: string | number) {
  return http.get<{ data: PartyWorkItem }>(`/party-work/${id}`)
}

/**
 * 获取团建工作列表
 */
export function getTeamWorkList(params: TeamWorkListParams) {
  return http.get('/team-work/list', { params })
}

/**
 * 获取团建工作详情
 */
export function getTeamWorkDetail(id: string | number) {
  return http.get<{ data: TeamWorkItem }>(`/team-work/${id}`)
}

/**
 * 获取党员先锋列表
 */
export function getMembersList(params: MemberListParams) {
  return http.get('/members/list', { params })
}

/**
 * 获取党员先锋详情
 */
export function getMemberDetail(id: string | number) {
  return http.get<{ data: MemberItem }>(`/members/${id}`)
}

/**
 * 获取党员学习列表
 */
export function getStudyList(params: StudyListParams) {
  return http.get('/study/list', { params })
}

/**
 * 获取党员学习详情
 */
export function getStudyDetail(id: string | number) {
  return http.get<{ data: StudyItem }>(`/study/${id}`)
}
