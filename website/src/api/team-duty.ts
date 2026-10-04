/**
 * 值班台账接口（前台公开）
 */
import http from '@/utils/http'

export interface TeamDutyItem {
  id: number
  teamName: string
  dutyYear: string
  dutyDate: string | null
  dutyCadreName: string | null
  dutyCadrePhone: string | null
  /** 值班员，多人用英文逗号分隔 */
  dutyStaff: string | null
  attachUrl: string | null
  attachName: string | null
  remark: string | null
}

/** 形如 YYYY-MM-DD（本地时区，不用 toISOString 以免时区偏移） */
export function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 查询值班记录（默认按日期升序） */
export function getTeamDutyList(params?: {
  page?: number
  pageSize?: number
  teamName?: string
  dutyYear?: string
  startDate?: string
  endDate?: string
  keyword?: string
}) {
  return http.get<{
    items: TeamDutyItem[]
    total: number
    page: number
    pageSize: number
  }>('/team-duty', { params })
}

/** 查询「某一天」的值班记录 */
export function getTeamDutyByDate(dateKey: string, teamName?: string) {
  return getTeamDutyList({
    startDate: dateKey,
    endDate: dateKey,
    teamName,
    pageSize: 10,
  })
}
