/**
 * 简化的路由配置 - 仅保留功能模块路由
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

// 功能模块路由
const routes: RouteRecordRaw[] = [
  // 首页
  { path: '/', name: 'Home', component: () => import('@/views/home/Home.vue') },

  // 搜索结果页
  { path: '/search-result', name: 'SearchResult', component: () => import('@/views/SearchResult.vue') },

  // 概况信息
  { path: '/overview-info', name: 'OverviewInfo', component: () => import('@/views/overview-info/leadership.vue') },
  { path: '/overview-info/leadership', name: 'Leadership', component: () => import('@/views/overview-info/leadership.vue') },
  { path: '/overview-info/organization', name: 'Organization', component: () => import('@/views/overview-info/organization.vue') },
  { path: '/overview-info/geography', name: 'Geography', component: () => import('@/views/overview-info/geography.vue') },

  // 党建专栏
  { path: '/party-building', name: 'PartyBuilding', component: () => import('@/views/party-building/party-work.vue') },
  { path: '/party-building/party-work', name: 'PartyWork', component: () => import('@/views/party-building/party-work.vue') },
  { path: '/party-building/party-work/:id', name: 'PartyWorkDetail', component: () => import('@/views/party-building/party-work-detail.vue') },
  { path: '/party-building/team-work', name: 'TeamWork', component: () => import('@/views/party-building/team-work.vue') },
  { path: '/party-building/team-work/:id', name: 'TeamWorkDetail', component: () => import('@/views/party-building/team-work-detail.vue') },
  { path: '/party-building/members', name: 'Members', component: () => import('@/views/party-building/members.vue') },
  { path: '/party-building/members/:id', name: 'MemberDetail', component: () => import('@/views/party-building/member-detail.vue') },
  { path: '/party-building/study', name: 'Study', component: () => import('@/views/party-building/study.vue') },
  { path: '/party-building/study/:id', name: 'StudyDetail', component: () => import('@/views/party-building/study-detail.vue') },

  // 动态要闻
  { path: '/dynamic-news', name: 'DynamicNews', component: () => import('@/views/dynamic-news/index.vue') },
  { path: '/dynamic-news/:id', name: 'NewsDetail', component: () => import('@/views/dynamic-news/detail.vue') },

  // 队伍建设
  { path: '/team-building', name: 'TeamBuilding', component: () => import('@/views/team-building/about.vue') },
  { path: '/team-building/about', name: 'About', component: () => import('@/views/team-building/about.vue') },
  { path: '/team-building/cases', name: 'Cases', component: () => import('@/views/team-building/cases.vue') },
  { path: '/team-building/showcase', name: 'Showcase', component: () => import('@/views/team-building/showcase.vue') },
  { path: '/team-building/showcase/:id', name: 'ShowcaseDetail', component: () => import('@/views/team-building/showcase-detail.vue') },

  // 信息公开
  { path: '/info-public', name: 'InfoPublic', component: () => import('@/views/info-public/personnel.vue') },
  { path: '/info-public/personnel', name: 'Personnel', component: () => import('@/views/info-public/personnel.vue') },

  // 政策法规
  { path: '/policy-regulations', name: 'PolicyRegulations', component: () => import('@/views/policy-regulations/laws.vue') },
  { path: '/policy-regulations/laws', name: 'Laws', component: () => import('@/views/policy-regulations/laws.vue') },
  { path: '/policy-regulations/regulations', name: 'Regulations', component: () => import('@/views/policy-regulations/regulations.vue') },
  { path: '/policy-regulations/standards', name: 'Standards', component: () => import('@/views/policy-regulations/standards.vue') },

  // 查询系统
  { path: '/query-system', name: 'QuerySystem', component: () => import('@/views/query-system/certificate-index.vue') },
  { path: '/query-system/certificate', name: 'Certificate', component: () => import('@/views/query-system/certificate-index.vue') },
  { path: '/query-system/certificate/list', name: 'CertificateList', component: () => import('@/views/query-system/certificate-list.vue') },
  { path: '/query-system/certificate/detail/:certificateNo', name: 'CertificateDetail', component: () => import('@/views/query-system/certificate-detail.vue') },
  { path: '/query-system/personnel', name: 'QueryPersonnel', component: () => import('@/views/query-system/personnel-index.vue') },
  { path: '/query-system/personnel/:id', name: 'PersonnelDetail', component: () => import('@/views/query-system/personnel-detail.vue') },
  { path: '/query-system/vehicle', name: 'Vehicle', component: () => import('@/views/query-system/vehicle-index.vue') },
  { path: '/query-system/vehicle/:id', name: 'VehicleDetail', component: () => import('@/views/query-system/vehicle-detail.vue') }
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
