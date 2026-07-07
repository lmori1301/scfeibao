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
    params: { certificateNumber },
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
}

/**
 * 获取证书列表
 */
export function getCertificateList(params?: CertificateQueryParams) {
  const { certificateNo, name, idCard, page, pageSize, ...rest } = params || {}
  return http.get<{
    items: CertificateListItem[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/certificates', {
    params: {
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      ...(certificateNo?.trim() && { certificateNumber: certificateNo.trim() }),
      ...(name?.trim() && { keyword: name.trim() }),
      ...(idCard?.trim() && { holderIdCard: idCard.trim().replace(/\s/g, '') }),
      ...rest,
    },
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
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
  const { name, personnelCode, page, pageSize, ...rest } = params || {}
  return http.get<{
    items: PersonnelInfo[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/personnel', {
    params: {
      page: page ?? 1,
      pageSize: pageSize ?? 20,
      ...(name?.trim() && { keyword: name.trim() }),
      ...(personnelCode?.trim() && { personnelCode: personnelCode.trim() }),
      ...rest,
    },
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
}

/** 人员详情（门户公开接口 GET /personnel/:id） */
export function getPersonnelDetail(id: number) {
  return http.get<Record<string, unknown>>(`/personnel/${id}`, {
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
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
  const { plateNumber, vehicleType, vehicleNumber, page, pageSize, ...rest } = params || {}
  return http.get<{
    items: VehicleInfo[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }>('/vehicles', {
    params: {
      page: page ?? 1,
      pageSize: pageSize ?? 30,
      ...(vehicleType?.trim() && { vehicleType: vehicleType.trim() }),
      ...(plateNumber?.trim() && { keyword: plateNumber.trim() }),
      ...(vehicleNumber?.trim() && { vehicleNo: vehicleNumber.trim() }),
      ...rest,
    },
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
}

/** 车辆详情（门户公开接口 GET /vehicles/:id） */
export function getVehicleDetail(id: number) {
  return http.get<Record<string, unknown>>(`/vehicles/${id}`, {
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
  })
}
