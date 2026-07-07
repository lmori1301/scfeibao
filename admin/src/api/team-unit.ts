import http from '@/utils/http'

export interface TeamUnitItem {
  id: number
  name: string
  pointName: string
  sort: number
  status: number
}

export interface TeamUnitListData {
  items: TeamUnitItem[]
  total: number
  page: number
  pageSize: number
}

export function getTeamUnitOptions() {
  return http.get('/team-units/options')
}

export function getTeamUnitList(params?: { page?: number; pageSize?: number; status?: number }) {
  return http.get('/team-units', {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 100,
      ...params,
    },
  })
}

export function createTeamUnit(data: Partial<TeamUnitItem>) {
  return http.post('/team-units', data)
}

export function updateTeamUnit(id: number, data: Partial<TeamUnitItem>) {
  return http.patch(`/team-units/${id}`, data)
}

export function deleteTeamUnit(id: number) {
  return http.delete(`/team-units/${id}`)
}
