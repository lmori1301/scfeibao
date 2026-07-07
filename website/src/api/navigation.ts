import request from '@/utils/http'

export type PublicNavigationItem = {
  id: number
  name: string
  path: string
  visible: boolean
  sort: number
}

export function getPublicNavigation() {
  return request.get('/navigation') as Promise<{
    code: number
    message: string
    data: PublicNavigationItem[]
    timestamp: number
  }>
}
