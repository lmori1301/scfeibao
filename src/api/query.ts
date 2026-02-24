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
 * 证书查询（通过证书编号搜索）
 */
export function queryCertificate(certificateNumber: string) {
  return http.get<CertificateDetail>('/certificates/search', {
    params: { certificateNumber }
  })
}

/**
 * 获取证书列表
 */
export function getCertificateList(params?: CertificateQueryParams) {
  return http.get<{
    items: CertificateListItem[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/certificates', { params })
}

/**
 * 获取证书详情
 */
export function getCertificateDetail(id: number) {
  return http.get<CertificateDetail>(`/certificates/${id}`)
}

/**
 * 内部人员查询（通过身份证号搜索）
 */
export function queryPersonnel(idCard: string) {
  return http.get<PersonnelInfo>('/personnel/search', {
    params: { idCard }
  })
}

/**
 * 获取人员列表
 */
export function getPersonnelList(params?: PersonnelQueryParams) {
  return http.get<{
    items: PersonnelInfo[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/personnel', { params })
}

/**
 * 应急车辆查询（通过车牌号搜索）
 */
export function queryVehicle(plateNumber: string) {
  return http.get<VehicleInfo>('/vehicles/search', {
    params: { plateNumber }
  })
}

/**
 * 获取车辆列表
 */
export function getVehicleList(params?: VehicleQueryParams) {
  return http.get<{
    items: VehicleInfo[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/vehicles', { params })
}
