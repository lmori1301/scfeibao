import request from '@/utils/http'

/** 与 Leadership 实体一致（门户列表用） */
export interface LeadershipApiItem {
  id: number
  name: string
  position: string
  gender?: string | null
  nation?: string | null
  birth?: string | null
  education?: string | null
  political?: string | null
  duty?: string | null
  experience?: number | null
  actions?: number | null
  photo?: string | null
  sort?: number
}

export interface LeadershipListData {
  items: LeadershipApiItem[]
  total: number
  page: number
  pageSize: number
}

/**
 * 领导信息列表（门户与后台共用接口，@Public）
 * @param params 分页；门户拉全量时可传较大 pageSize
 */
export function getLeadershipList(params?: { page?: number; pageSize?: number }) {
  return request.get<LeadershipListData>('/leadership', {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 500,
      ...params,
    },
  })
}
