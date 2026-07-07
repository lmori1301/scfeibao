/**
 * 信息公开相关API接口
 */
import http from '@/utils/http'
import type { PersonnelItem, PersonnelListParams } from '@/types/info'

/**
 * 获取人事任免列表
 */
export function getPersonnelList(params: PersonnelListParams) {
  return http.get('/personnel/list', { params })
}

/**
 * 获取人事任免详情
 */
export function getPersonnelDetail(id: string | number) {
  return http.get<{ data: PersonnelItem }>(`/personnel/${id}`)
}
