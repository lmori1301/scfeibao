import http from '@/utils/http'

export type DictOption = {
  label: string
  value: string
  sort: number
}

export type TeamDutyItem = {
  id: number
  teamName: string
  dutyYear: string
  dutyDate: string | null
  dutyCadreName: string | null
  dutyCadrePhone: string | null
  dutyStaff: string | null
  attachUrl: string | null
  attachName: string | null
  remark: string | null
  createBy: string | null
  createdAt: string
  updatedAt: string
}

export type TeamDutyListData = {
  items: TeamDutyItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type TeamDutyRowInput = {
  dutyDate?: string
  dutyCadreName?: string
  dutyCadrePhone?: string
  dutyStaff?: string
  remark?: string
}

export type TeamDutyBatchPayload = {
  teamName: string
  dutyYear: string
  attachUrl?: string
  attachName?: string
  items: TeamDutyRowInput[]
}

export type TeamDutyBatchResult = {
  total: number
  created: number
  failed: number
  errors: Array<{ row: number; message: string }>
  items: TeamDutyItem[]
}

/** 按字典类型取下拉选项（/system/dict/data/type/{dictType}） */
export function getDictOptions(dictType: string) {
  return http.get(`/system/dict/data/type/${dictType}`)
}

/** 队伍名称下拉（转发自队伍字典 team_units） */
export function getTeamNameOptions() {
  return getDictOptions('team_name')
}

/** 值班年份下拉 */
export function getDutyYearOptions() {
  return getDictOptions('duty_year')
}

export function getTeamDutyList(params?: {
  page?: number
  pageSize?: number
  teamName?: string
  dutyYear?: string
  startDate?: string
  endDate?: string
  keyword?: string
}) {
  const query: Record<string, any> = {
    page: params?.page ?? 1,
    pageSize: params?.pageSize ?? 10,
  }
  if (params?.teamName) query.teamName = params.teamName
  if (params?.dutyYear) query.dutyYear = params.dutyYear
  if (params?.startDate) query.startDate = params.startDate
  if (params?.endDate) query.endDate = params.endDate
  if (params?.keyword) query.keyword = params.keyword
  return http.get('/team-duty', { params: query })
}

export function getTeamDutyDetail(id: number) {
  return http.get(`/team-duty/${id}`)
}

export function createTeamDuty(data: Partial<TeamDutyItem> & TeamDutyRowInput) {
  return http.post('/team-duty', data)
}

export function createTeamDutyBatch(data: TeamDutyBatchPayload) {
  return http.post('/team-duty/batch', data)
}

export function updateTeamDuty(id: number, data: Partial<TeamDutyItem> & TeamDutyRowInput) {
  return http.patch(`/team-duty/${id}`, data)
}

export function deleteTeamDuty(id: number) {
  return http.delete(`/team-duty/${id}`)
}

export function deleteTeamDutyBatch(ids: number[]) {
  return http.post('/team-duty/batch/delete', { ids })
}
