/**
 * 后台菜单权限平面定义（与 admin 端 `admin-routes.ts` 的 navigationGroups 保持一致）。
 * id：分组为 grp-{groupId}，叶子为路由 name（与角色 permissions 存库一致）。
 */

export type MenuFlatRow = {
  id: string
  parentId: string | null
  name: string
  sort: number
  /** 叶子节点：与 Vue Router name 一致，写入 roles.permissions */
  routeName?: string | null
}

const G = {
  overview: 100,
  content: 200,
  query: 300,
  authority: 400,
} as const

export const MENU_FLAT_ROWS: MenuFlatRow[] = [
  { id: 'grp-overview', parentId: null, name: '总览中心', sort: G.overview },
  { id: 'Dashboard', parentId: 'grp-overview', name: '工作台', sort: G.overview + 1, routeName: 'Dashboard' },
  { id: 'TodoList', parentId: 'grp-overview', name: '待办事项', sort: G.overview + 2, routeName: 'TodoList' },
  { id: 'WorkbenchLog', parentId: 'grp-overview', name: '操作日志', sort: G.overview + 3, routeName: 'WorkbenchLog' },
  { id: 'Notifications', parentId: 'grp-overview', name: '系统通知', sort: G.overview + 4, routeName: 'Notifications' },

  { id: 'grp-content', parentId: null, name: '门户内容', sort: G.content },
  { id: 'Banner', parentId: 'grp-content', name: '轮播图管理', sort: G.content + 1, routeName: 'Banner' },
  { id: 'News', parentId: 'grp-content', name: '新闻管理', sort: G.content + 2, routeName: 'News' },
  { id: 'Videos', parentId: 'grp-content', name: '视频管理', sort: G.content + 3, routeName: 'Videos' },
  { id: 'Appointment', parentId: 'grp-content', name: '人事任免', sort: G.content + 4, routeName: 'Appointment' },
  { id: 'PublicInfo', parentId: 'grp-content', name: '信息公开', sort: G.content + 5, routeName: 'PublicInfo' },
  { id: 'Policy', parentId: 'grp-content', name: '政策文件', sort: G.content + 6, routeName: 'Policy' },
  { id: 'Leadership', parentId: 'grp-content', name: '领导信息', sort: G.content + 7, routeName: 'Leadership' },
  { id: 'TeamUnits', parentId: 'grp-content', name: '队伍字典', sort: G.content + 8, routeName: 'TeamUnits' },
  { id: 'Location', parentId: 'grp-content', name: '地理位置', sort: G.content + 9, routeName: 'Location' },
  { id: 'Party', parentId: 'grp-content', name: '党建专栏', sort: G.content + 10, routeName: 'Party' },
  { id: 'TeamIntro', parentId: 'grp-content', name: '队伍介绍', sort: G.content + 11, routeName: 'TeamIntro' },
  { id: 'RescueCases', parentId: 'grp-content', name: '救援案例', sort: G.content + 12, routeName: 'RescueCases' },
  { id: 'TeamStyle', parentId: 'grp-content', name: '队伍风采', sort: G.content + 13, routeName: 'TeamStyle' },

  { id: 'grp-query', parentId: null, name: '档案台账', sort: G.query },
  { id: 'Certificates', parentId: 'grp-query', name: '证书台账', sort: G.query + 1, routeName: 'Certificates' },
  { id: 'Personnel', parentId: 'grp-query', name: '人员台账', sort: G.query + 2, routeName: 'Personnel' },
  { id: 'Vehicles', parentId: 'grp-query', name: '车辆台账', sort: G.query + 3, routeName: 'Vehicles' },

  { id: 'grp-authority', parentId: null, name: '系统配置', sort: G.authority },
  { id: 'AdminUsers', parentId: 'grp-authority', name: '用户管理', sort: G.authority + 1, routeName: 'AdminUsers' },
  { id: 'Permissions', parentId: 'grp-authority', name: '权限设置', sort: G.authority + 2, routeName: 'Permissions' },
  { id: 'SiteConfig', parentId: 'grp-authority', name: '网站配置', sort: G.authority + 3, routeName: 'SiteConfig' },
  { id: 'Navigation', parentId: 'grp-authority', name: '导航设置', sort: G.authority + 4, routeName: 'Navigation' },
  { id: 'OperationLog', parentId: 'grp-authority', name: '操作日志', sort: G.authority + 5, routeName: 'OperationLog' },
  { id: 'DataBackup', parentId: 'grp-authority', name: '数据备份', sort: G.authority + 6, routeName: 'DataBackup' },
  { id: 'FriendlyLinks', parentId: 'grp-authority', name: '友情链接', sort: G.authority + 7, routeName: 'FriendlyLinks' },
]
