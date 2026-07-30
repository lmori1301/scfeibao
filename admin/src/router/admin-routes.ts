import type { RouteRecordRaw } from 'vue-router'

type AdminRouteConfig = {
  path: string
  name: string
  title: string
  icon: string
  description: string
  component: () => Promise<unknown>
}

type AdminRouteGroup = {
  id: string
  title: string
  icon: string
  description: string
  accent: string
  children: AdminRouteConfig[]
}

export const navigationGroups: AdminRouteGroup[] = [
  {
    id: 'overview',
    title: '总览中心',
    icon: 'House',
    description: '查看总控态势、任务流转、通知播报与审计活动。',
    accent: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        title: '总控台',
        icon: 'House',
        description: '查看总览态势、任务看板和核心动态。',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'todo-list',
        name: 'TodoList',
        title: '待办事项',
        icon: 'List',
        description: '按状态查看任务池与流转进度。',
        component: () => import('@/views/workbench/TodoList.vue')
      },
      {
        path: 'workbench-log',
        name: 'WorkbenchLog',
        title: '操作日志',
        icon: 'Memo',
        description: '查看审计流与近期后台操作轨迹。',
        component: () => import('@/views/workbench/WorkbenchLog.vue')
      },
      {
        path: 'notifications',
        name: 'Notifications',
        title: '系统通知',
        icon: 'Bell',
        description: '查看系统播报、预警提醒和重要公告。',
        component: () => import('@/views/workbench/Notifications.vue')
      }
    ]
  },
  {
    id: 'content',
    title: '门户内容',
    icon: 'Files',
    description: '维护官网栏目、资讯内容与展示资源。',
    accent: 'linear-gradient(135deg, #0f766e 0%, #155e75 100%)',
    children: [
      { path: 'banner', name: 'Banner', title: '轮播图管理', icon: 'Picture', description: '维护首页 Banner 与跳转链接。', component: () => import('@/views/Banner.vue') },
      { path: 'news', name: 'News', title: '新闻管理', icon: 'Document', description: '发布、编辑和置顶新闻内容。', component: () => import('@/views/News.vue') },
      { path: 'videos', name: 'Videos', title: '视频管理', icon: 'VideoCamera', description: '管理宣传视频与推荐排序。', component: () => import('@/views/Videos.vue') },
      { path: 'appointment', name: 'Appointment', title: '人事任免', icon: 'Postcard', description: '维护信息公开中的人事任免内容。', component: () => import('@/views/Appointment.vue') },
      { path: 'public-info', name: 'PublicInfo', title: '信息公开', icon: 'Files', description: '维护信息公开栏目中的公开事项与附件。', component: () => import('@/views/PublicInfo.vue') },
      { path: 'policy', name: 'Policy', title: '政策文件', icon: 'Reading', description: '维护政策法规和公开文件。', component: () => import('@/views/Policy.vue') },
      { path: 'leadership', name: 'Leadership', title: '领导信息', icon: 'UserFilled', description: '维护组织概况中的领导信息。', component: () => import('@/views/Leadership.vue') },
      { path: 'team-units', name: 'TeamUnits', title: '队伍字典', icon: 'CollectionTag', description: '维护地理位置等模块使用的固定队伍名称字典。', component: () => import('@/views/TeamUnits.vue') },
      { path: 'location', name: 'Location', title: '地理位置', icon: 'Location', description: '维护官网展示的地理位置信息。', component: () => import('@/views/Location.vue') },
      { path: 'party', name: 'Party', title: '党建专栏', icon: 'Flag', description: '维护党建栏目与专题内容。', component: () => import('@/views/Party.vue') },
      { path: 'team-intro', name: 'TeamIntro', title: '队伍介绍', icon: 'Promotion', description: '维护队伍介绍与文字内容。', component: () => import('@/views/TeamIntro.vue') },
      { path: 'rescue-cases', name: 'RescueCases', title: '救援案例', icon: 'Collection', description: '维护救援案例与图文内容。', component: () => import('@/views/RescueCases.vue') },
      { path: 'team-style', name: 'TeamStyle', title: '队伍风采', icon: 'PictureFilled', description: '维护队伍风采图文展示。', component: () => import('@/views/TeamStyle.vue') }
    ]
  },
  {
    id: 'query',
    title: '档案台账',
    icon: 'Search',
    description: '维护证书、人员和车辆等核心档案数据。',
    accent: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    children: [
      { path: 'certificates', name: 'Certificates', title: '证书台账', icon: 'Postcard', description: '维护证书档案和有效状态。', component: () => import('@/views/Certificates.vue') },
      { path: 'personnel', name: 'Personnel', title: '人员台账', icon: 'User', description: '维护人员信息、二维码和状态。', component: () => import('@/views/Personnel.vue') },
      { path: 'vehicles', name: 'Vehicles', title: '车辆台账', icon: 'Van', description: '维护车辆档案和使用状态。', component: () => import('@/views/Vehicles.vue') }
    ]
  },
  {
    id: 'authority',
    title: '系统配置',
    icon: 'Lock',
    description: '管理后台账户、角色权限和系统设置。',
    accent: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
    children: [
      { path: 'admin-users', name: 'AdminUsers', title: '用户管理', icon: 'Avatar', description: '管理后台账户、密码与启停状态。', component: () => import('@/views/AdminUsers.vue') },
      { path: 'permissions', name: 'Permissions', title: '权限设置', icon: 'Lock', description: '配置角色与访问权限。', component: () => import('@/views/Permissions.vue') },
      { path: 'site-config', name: 'SiteConfig', title: '网站配置', icon: 'Setting', description: '维护站点基础信息和运行参数。', component: () => import('@/views/SiteConfig.vue') },
      { path: 'navigation', name: 'Navigation', title: '导航设置', icon: 'Menu', description: '维护前台导航入口及排序。', component: () => import('@/views/Navigation.vue') },
      { path: 'operation-log', name: 'OperationLog', title: '操作日志', icon: 'DocumentCopy', description: '追踪后台操作与系统事件。', component: () => import('@/views/OperationLog.vue') },
      { path: 'data-backup', name: 'DataBackup', title: '数据备份', icon: 'FolderOpened', description: '查看备份记录与恢复入口。', component: () => import('@/views/DataBackup.vue') },
      { path: 'friendly-links', name: 'FriendlyLinks', title: '友情链接', icon: 'Link', description: '维护首页友情链接列表。', component: () => import('@/views/FriendlyLinks.vue') }
    ]
  }
]

export const flatNavigationItems = navigationGroups.flatMap(group =>
  group.children.map(item => ({
    ...item,
    fullPath: `/${item.path}`,
    groupId: group.id,
    groupTitle: group.title,
    groupIcon: group.icon,
    groupDescription: group.description,
    accent: group.accent,
  }))
)

/** 与侧栏分组一致，用于角色权限勾选（存库为路由 name，展示为 title） */
export const adminPermissionGroups = navigationGroups.map(g => ({
  groupId: g.id,
  groupTitle: g.title,
  items: g.children.map(c => ({ name: c.name, title: c.title })),
}))

export const adminPermissionCatalog = flatNavigationItems.map(item => ({
  name: item.name,
  title: item.title,
  groupId: item.groupId,
  groupTitle: item.groupTitle,
}))

const permissionNameSet = new Set(adminPermissionCatalog.map(p => p.name))

const titleByPermissionName = new Map(adminPermissionCatalog.map(p => [p.name, p.title] as const))

/** 历史存库的中文粗粒度权限 → 展开为当前路由 name */
const legacyPermissionAliases: Record<string, string[]> = (() => {
  const byId = (id: string) => navigationGroups.find(g => g.id === id)?.children.map(c => c.name) ?? []
  return {
    内容管理: byId('content'),
    用户管理: ['AdminUsers', 'Permissions'],
    档案台账: byId('query'),
    系统设置: byId('authority'),
    系统配置: byId('authority'),
    数据查询: byId('query'),
    发布审核: ['News', 'Policy', 'Appointment', 'PublicInfo'],
    总览中心: byId('overview'),
  }
})()

/** 将接口返回的权限规范为路由 name，兼容旧版中文项 */
export function normalizeRolePermissionNames(raw: string[] | undefined | null): string[] {
  if (!raw?.length) return []
  const out = new Set<string>()
  for (const entry of raw) {
    if (permissionNameSet.has(entry)) {
      out.add(entry)
      continue
    }
    const mapped = legacyPermissionAliases[entry]
    if (mapped?.length) mapped.forEach(n => out.add(n))
  }
  return [...out]
}

/** 权限 name → 侧栏菜单标题（未知则原样返回，便于辨认历史脏数据） */
export function rolePermissionTitle(name: string): string {
  return titleByPermissionName.get(name) ?? name
}

const LEGACY_ROLE_FULL_ACCESS = new Set(['admin'])

export function getSessionPermissionNames(user: { role?: string; permissions?: string[] } | null | undefined): string[] {
  const normalized = normalizeRolePermissionNames(user?.permissions)
  if (normalized.length) return normalized

  const role = String(user?.role || '').trim()
  if (LEGACY_ROLE_FULL_ACCESS.has(role)) {
    return flatNavigationItems.map((item) => item.name)
  }

  return []
}

export function canAccessAdminRoute(
  routeName: unknown,
  user: { role?: string; permissions?: string[] } | null | undefined
) {
  if (typeof routeName !== 'string' || !routeName) return true
  if (routeName === 'Dashboard') return true
  return new Set(getSessionPermissionNames(user)).has(routeName)
}

export function firstAccessibleAdminPath(user: { role?: string; permissions?: string[] } | null | undefined) {
  const allowed = new Set(getSessionPermissionNames(user))
  const first = flatNavigationItems.find((item) => allowed.has(item.name))
  return first ? `/${first.path}` : '/dashboard'
}

export const adminChildRoutes: RouteRecordRaw[] = flatNavigationItems.map(
  (item): RouteRecordRaw => ({
    path: item.path,
    name: item.name,
    component: item.component as NonNullable<RouteRecordRaw['component']>,
    meta: {
      title: item.title,
      icon: item.icon,
      description: item.description,
      groupId: item.groupId,
      groupTitle: item.groupTitle,
      groupIcon: item.groupIcon,
      groupDescription: item.groupDescription,
      accent: item.accent,
    }
  })
)

export function findNavigationItemByPath(path: string) {
  return flatNavigationItems.find(item => item.fullPath === path)
}
