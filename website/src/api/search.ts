import http from '@/utils/http'

export interface SearchResultItem {
  module: string
  title: string
  description: string
  date: string | null
  link: string
}

export interface SearchResultResponse {
  list: SearchResultItem[]
  total: number
  keyword: string
}

export function searchSite(params: { keyword: string; limit?: number }) {
  return http.get<SearchResultResponse>('/search', { params })
}
