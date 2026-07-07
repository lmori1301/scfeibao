import request from '@/utils/http'

export interface LocationApiItem {
  id: number
  name: string
  pointName: string
  address: string
  phone: string
  longitude: number
  latitude: number
  zoom: number
  sort?: number
  status?: number
}

export interface TeamMapItem {
  unitName: string
  pointName: string
  address: string
  phone: string
  lng: number
  lat: number
}

export interface LocationListData {
  items: LocationApiItem[]
  total: number
  page: number
  pageSize: number
}

export function getLocationList(params?: { page?: number; pageSize?: number; status?: number }) {
  return request.get<LocationListData>('/locations', {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 100,
      ...params,
    },
  })
}

export function getTeamMapList() {
  return request.get<TeamMapItem[]>('/map/team-list')
}
