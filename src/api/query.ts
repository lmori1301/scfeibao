/**
 * 查询系统相关接口
 */
import http from '@/utils/http'
import type {
  CertificateQueryParams,
  CertificateListItem,
  CertificateDetail,
  PersonnelQueryParams,
  PersonnelInfo,
  VehicleQueryParams,
  VehicleInfo
} from '@/types/query'

/**
 * 证书查询（列表）
 */
export function queryCertificate(params: CertificateQueryParams) {
  return http.post<CertificateListItem[]>('/query/certificate', params)
}

/**
 * 获取证书详情
 */
export function getCertificateDetail(certificateNo: string) {
  return http.get<CertificateDetail>(`/query/certificate/${certificateNo}`)
}

/**
 * 内部人员查询
 */
export function queryPersonnel(params: PersonnelQueryParams) {
  return http.post<PersonnelInfo[]>('/query/personnel', params)
}

/**
 * 应急车辆查询
 */
export function queryVehicle(params: VehicleQueryParams) {
  return http.post<VehicleInfo[]>('/query/vehicle', params)
}
