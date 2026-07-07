# 后台权限与资源映射

这份清单用于说明后台菜单权限名、控制器资源、以及“同一路径多控制器并存”的设计边界。

## 一一对应资源

| 权限名 | 后台菜单 | 主要控制器 | 说明 |
| --- | --- | --- | --- |
| `Dashboard` | 工作台 | `admin/dashboard#stats` | 总览统计 |
| `TodoList` | 待办事项 | `admin/dashboard#todos` | 待办列表 |
| `WorkbenchLog` | 工作台操作日志 | `admin/dashboard#logs` | 工作台近端日志 |
| `Notifications` | 系统通知 | `admin/dashboard#notifications` | 工作台通知 |
| `Banner` | 轮播图管理 | `banner.controller.ts` | Banner 写接口 |
| `News` | 新闻管理 | `news.controller.ts` | 新闻列表与写接口 |
| `Videos` | 视频管理 | `videos.controller.ts` / `home/videos.controller.ts` | 公共读 + 后台写 |
| `Appointment` | 人事任免 | `appointments.controller.ts` / `info-public/appointments.controller.ts` | 公共读 + 后台写 |
| `PublicInfo` | 信息公开 | `info-public/public-info-admin.controller.ts` | 独立公开事项资源 |
| `Policy` | 政策文件 | `policy.controller.ts` | 政策文件读写 |
| `Leadership` | 领导信息 | `leadership.controller.ts` | 领导信息读写 |
| `TeamUnits` | 队伍字典 | `team-unit.controller.ts` | 队伍字典 |
| `Location` | 地理位置 | `location.controller.ts` | 位置与坐标解析 |
| `Party` | 党建专栏 | `party-building.controller.ts` / `party-members.controller.ts` / `party-works.controller.ts` | 党建内容聚合权限 |
| `TeamIntro` | 队伍介绍 | `team-intro.controller.ts` | 队伍介绍 |
| `RescueCases` | 救援案例 | `rescue-cases.controller.ts` | 救援案例 |
| `TeamStyle` | 队伍风采 | `team-showcase.controller.ts` | 队伍风采 |
| `Certificates` | 证书台账 | `certificate.controller.ts` | 证书台账 |
| `Personnel` | 人员台账 | `personnel.controller.ts` | 人员台账 |
| `Vehicles` | 车辆台账 | `vehicle.controller.ts` | 车辆台账 |
| `AdminUsers` | 用户管理 | `admin-user.controller.ts` | 后台账号管理 |
| `Permissions` | 权限设置 | `role.controller.ts` / `menu-tree.controller.ts` | 角色与权限树 |
| `SiteConfig` | 网站配置 | `setting.controller.ts` / `config.controller.ts` | 系统设置与网站配置 |
| `Navigation` | 导航设置 | `navigation.controller.ts` | 前台主导航映射 |
| `OperationLog` | 操作日志 | `operation-log.controller.ts` | 系统配置中的操作日志 |
| `DataBackup` | 数据备份 | `data-backup.controller.ts` | 备份概览与手动执行 |
| `FriendlyLinks` | 友情链接 | `friend-links.controller.ts` | 友情链接 |

## 同一路径多控制器的约定

### `/videos`

- `backend/src/modules/videos/videos.controller.ts`
  - 面向后台管理
  - `POST/PATCH/DELETE` 受 `Videos` 权限保护
  - 部分查询接口也给后台使用
- `backend/src/modules/home/videos.controller.ts`
  - 面向门户公开访问
  - `GET` 公开
  - 写接口同样挂 `Videos`，用于兼容已有前端调用路径

### `/appointments`

- `backend/src/modules/appointments/appointments.controller.ts`
  - 主要承载后台“人事任免”管理页面
  - 写接口受 `Appointment` 权限保护
  - 附件下载为公开读
- `backend/src/modules/info-public/appointments.controller.ts`
  - 保留信息公开模块的兼容入口
  - `GET` 公开
  - `POST/PATCH/DELETE` 同样受 `Appointment` 权限保护

## 说明

- 公开读接口允许门户页面直接访问。
- 任何写接口都必须挂到一个明确权限名下，不再允许匿名写。
- 如果后续新增后台菜单，应该同步补齐三处：
  - `backend/src/modules/menu-tree/menu-tree.definition.ts`
  - `admin/src/router/admin-routes.ts`
  - 对应后端控制器的 `@RequirePermissions(...)`
