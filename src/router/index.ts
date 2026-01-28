/**
 * 简化的路由配置 - 仅保留原有Frame路由
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('@/views/home/Home.vue') },
  { path: '/Frame13145', name: 'Frame13145', component: () => import('@/views/Frame13145.vue') },
  { path: '/Frame13073', name: 'Frame13073', component: () => import('@/views/Frame13073.vue') },
  { path: '/Frame12975', name: 'Frame12975', component: () => import('@/views/Frame12975.vue') },
  { path: '/Frame12899', name: 'Frame12899', component: () => import('@/views/Frame12899.vue') },
  { path: '/Frame12501', name: 'Frame12501', component: () => import('@/views/Frame12501.vue') },
  { path: '/Frame12406', name: 'Frame12406', component: () => import('@/views/Frame12406.vue') },
  { path: '/Frame12250', name: 'Frame12250', component: () => import('@/views/Frame12250.vue') },
  { path: '/Frame12194', name: 'Frame12194', component: () => import('@/views/Frame12194.vue') },
  { path: '/Frame12107', name: 'Frame12107', component: () => import('@/views/Frame12107.vue') },
  { path: '/Vector11982', name: 'Vector11982', component: () => import('@/views/info-public/personnel-detail.vue') },
  { path: '/Frame1466', name: 'Frame1466', component: () => import('@/views/Frame1466.vue') },
  { path: '/Frame11280', name: 'Frame11280', component: () => import('@/views/party-building/team-work-detail.vue') },
  { path: '/Frame1562', name: 'Frame1562', component: () => import('@/views/Frame1562.vue') },
  { path: '/Frame1360', name: 'Frame1360', component: () => import('@/views/Frame1360.vue') },
  { path: '/Frame1631', name: 'Frame1631', component: () => import('@/views/Frame1631.vue') },
  { path: '/Frame11836', name: 'Frame11836', component: () => import('@/views/Frame11836.vue') },
  { path: '/Frame11110', name: 'Frame11110', component: () => import('@/views/Frame11110.vue') },
  { path: '/Frame11053', name: 'Frame11053', component: () => import('@/views/team-building/showcase-detail.vue') },
  { path: '/Frame1876', name: 'Frame1876', component: () => import('@/views/Frame1876.vue') },
  { path: '/Frame1183', name: 'Frame1183', component: () => import('@/views/Frame1183.vue') },
  { path: '/Frame1700', name: 'Frame1700', component: () => import('@/views/Frame1700.vue') },
  { path: '/Frame11666', name: 'Frame11666', component: () => import('@/views/Frame11666.vue') },
  { path: '/Frame13243', name: 'Frame13243', component: () => import('@/views/Frame13243.vue') },
  { path: '/Frame11324', name: 'Frame11324', component: () => import('@/views/Frame11324.vue') },
  { path: '/Frame11494', name: 'Frame11494', component: () => import('@/views/Frame11494.vue') },
  { path: '/Frame12', name: 'Frame12', component: () => import('@/views/home/Home.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由路径映射
const routePathMap = new Map<string, string>()

export const getRoutePathByGuid = (guid: string) => {
  if (!guid) return
  if (routePathMap.has(guid)) return routePathMap.get(guid)

  const route = routes.find((item) => item.meta?.guid === guid)
  if (!route) return
  routePathMap.set(guid, route.path)

  return route.path
}
