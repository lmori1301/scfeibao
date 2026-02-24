# 四川飞豹救援后台管理系统 API 接口文档

**版本**: v1.0
**更新时间**: 2025-01-28
**基础URL**: `/api`

---

## 📋 目录

1. [通用说明](#通用说明)
2. [认证授权](#认证授权)
3. [用户与权限管理](#用户与权限管理)
4. [内容管理](#内容管理)
5. [查询系统管理](#查询系统管理)
6. [工作台](#工作台)
7. [系统设置](#系统设置)
8. [前台接口](#前台接口)

---

## 通用说明

### 统一响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1706428800000
}
```

### HTTP状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

### 通用错误码

| 错误码 | 说明 |
|--------|------|
| 1001 | 参数验证失败 |
| 1002 | 数据不存在 |
| 1003 | 数据已存在 |
| 2001 | 未登录 |
| 2002 | 登录已过期 |
| 2003 | 无权限访问 |
| 3001 | 文件上传失败 |
| 3002 | 文件格式不支持 |
| 3003 | 文件大小超限 |

---

## 认证授权

### 1. 登录

**接口**: `POST /auth/login`

**请求参数**:
```json
{
  "username": "admin",
  "password": "123456"
}
```

**响应数据**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userInfo": {
    "id": 1,
    "username": "admin",
    "name": "管理员",
    "role": "super_admin",
    "permissions": ["*"]
  }
}
```

### 2. 登出

**接口**: `POST /auth/logout`

**请求头**: `Authorization: Bearer {token}`

**响应数据**: 无

### 3. 刷新Token

**接口**: `POST /auth/refresh`

**请求头**: `Authorization: Bearer {token}`

**响应数据**:
```json
{
  "token": "new_token_string"
}
```

---

## 用户与权限管理

### 权限组管理

#### 1. 获取权限组列表

**接口**: `GET /admin/roles`

**请求参数**:
```
page: 1
pageSize: 10
name: 编辑组 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "name": "超级管理员",
      "code": "super_admin",
      "permissions": ["*"],
      "description": "拥有所有权限",
      "userCount": 2,
      "createTime": "2024-01-15 10:00:00"
    }
  ],
  "total": 10,
  "page": 1,
  "pageSize": 10
}
```

#### 2. 创建权限组

**接口**: `POST /admin/roles`

**请求参数**:
```json
{
  "name": "内容编辑",
  "code": "editor",
  "permissions": ["content:read", "content:write"],
  "description": "负责内容编辑"
}
```

#### 3. 更新权限组

**接口**: `PUT /admin/roles/:id`

**请求参数**: 同创建

#### 4. 删除权限组

**接口**: `DELETE /admin/roles/:id`

#### 5. 获取所有权限列表

**接口**: `GET /admin/permissions`

**响应数据**:
```json
{
  "list": [
    {
      "module": "content",
      "name": "内容管理",
      "permissions": [
        { "code": "content:read", "name": "查看" },
        { "code": "content:write", "name": "编辑" },
        { "code": "content:delete", "name": "删除" }
      ]
    }
  ]
}
```

### 管理员管理

#### 1. 获取管理员列表

**接口**: `GET /admin/users`

**请求参数**:
```
page: 1
pageSize: 10
username: admin (可选)
role: super_admin (可选)
status: active (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "username": "admin",
      "name": "管理员",
      "email": "admin@feibao.com",
      "phone": "13800138000",
      "role": "super_admin",
      "roleName": "超级管理员",
      "status": "active",
      "lastLoginTime": "2024-01-28 10:00:00",
      "createTime": "2024-01-01 00:00:00"
    }
  ],
  "total": 10
}
```

#### 2. 创建管理员

**接口**: `POST /admin/users`

**请求参数**:
```json
{
  "username": "editor01",
  "password": "123456",
  "name": "编辑01",
  "email": "editor01@feibao.com",
  "phone": "13900139000",
  "roleId": 2
}
```

#### 3. 更新管理员

**接口**: `PUT /admin/users/:id`

#### 4. 删除管理员

**接口**: `DELETE /admin/users/:id`

#### 5. 修改密码

**接口**: `PUT /admin/users/:id/password`

**请求参数**:
```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

#### 6. 启用/禁用管理员

**接口**: `PUT /admin/users/:id/status`

**请求参数**:
```json
{
  "status": "active" // active | disabled
}
```

### 人员管理

#### 1. 获取人员列表

**接口**: `GET /admin/personnel`

**请求参数**:
```
page: 1
pageSize: 10
personnelNo: PER2024001 (可选)
name: 张三 (可选)
department: 指挥部 (可选)
status: 在职 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "personnelNo": "PER2024001",
      "name": "张三",
      "idCard": "510100199001011234",
      "phone": "13800138000",
      "department": "指挥部",
      "position": "队长",
      "joinDate": "2024-01-15",
      "email": "zhangsan@feibao.com",
      "taskCount": 25,
      "trainingHours": 120,
      "status": "在职",
      "photo": "https://cdn.example.com/photo.jpg"
    }
  ],
  "total": 100
}
```

#### 2. 创建人员

**接口**: `POST /admin/personnel`

**请求参数**: 同列表数据结构（不含id）

#### 3. 更新人员

**接口**: `PUT /admin/personnel/:id`

#### 4. 删除人员

**接口**: `DELETE /admin/personnel/:id`

#### 5. 批量导入人员

**接口**: `POST /admin/personnel/import`

**请求参数**: `multipart/form-data`
```
file: Excel文件
```

**响应数据**:
```json
{
  "successCount": 50,
  "failCount": 2,
  "errors": [
    { "row": 3, "reason": "身份证号格式错误" },
    { "row": 5, "reason": "手机号已存在" }
  ]
}
```

#### 6. 导出人员

**接口**: `GET /admin/personnel/export`

**请求参数**: 同列表查询参数

**响应**: Excel文件流

---

## 内容管理

### 新闻管理

#### 1. 获取新闻列表

**接口**: `GET /admin/news`

**请求参数**:
```
page: 1
pageSize: 10
title: 救援 (可选)
category: 救援行动 (可选)
status: published (可选) // draft | pending | published | archived
startDate: 2024-01-01 (可选)
endDate: 2024-12-31 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "山区救援行动",
      "summary": "成功救援被困人员",
      "content": "<p>详细内容...</p>",
      "coverImage": "https://cdn.example.com/cover.jpg",
      "category": "救援行动",
      "author": "张三",
      "publishDate": "2024-01-15",
      "views": 1250,
      "status": "published",
      "createTime": "2024-01-15 10:00:00",
      "updateTime": "2024-01-15 12:00:00"
    }
  ],
  "total": 50
}
```

#### 2. 获取新闻详情

**接口**: `GET /admin/news/:id`

#### 3. 创建新闻

**接口**: `POST /admin/news`

**请求参数**:
```json
{
  "title": "新闻标题",
  "summary": "新闻摘要",
  "content": "<p>富文本内容</p>",
  "coverImage": "图片URL",
  "category": "救援行动",
  "publishDate": "2024-01-15",
  "status": "draft"
}
```

#### 4. 更新新闻

**接口**: `PUT /admin/news/:id`

#### 5. 删除新闻

**接口**: `DELETE /admin/news/:id`

#### 6. 批量删除新闻

**接口**: `DELETE /admin/news/batch`

**请求参数**:
```json
{
  "ids": [1, 2, 3]
}
```

#### 7. 提交审核

**接口**: `PUT /admin/news/:id/submit`

#### 8. 审核新闻

**接口**: `PUT /admin/news/:id/review`

**请求参数**:
```json
{
  "action": "approve", // approve | reject
  "reason": "不通过原因" // action为reject时必填
}
```

#### 9. 发布/下架新闻

**接口**: `PUT /admin/news/:id/publish`

**请求参数**:
```json
{
  "action": "publish" // publish | archive
}
```

### Banner轮播图管理

#### 1. 获取轮播图列表

**接口**: `GET /admin/banners`

**请求参数**:
```
page: 1
pageSize: 10
title: 救援 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "救援队伍风采",
      "imageUrl": "https://cdn.example.com/banner.jpg",
      "linkUrl": "/news/123",
      "sort": 1,
      "status": "显示",
      "createTime": "2024-01-15"
    }
  ],
  "total": 5
}
```

#### 2. 创建轮播图

**接口**: `POST /admin/banners`

#### 3. 更新轮播图

**接口**: `PUT /admin/banners/:id`

#### 4. 删除轮播图

**接口**: `DELETE /admin/banners/:id`

### 领导信息管理

#### 1. 获取领导信息列表

**接口**: `GET /admin/leadership`

**请求参数**:
```
page: 1
pageSize: 10
name: 张三 (可选)
position: 队长 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "name": "张三",
      "position": "队长",
      "gender": "男",
      "nation": "汉族",
      "birth": "1980-01",
      "education": "本科",
      "political": "中共党员",
      "duty": "全面负责救援工作",
      "experience": 15,
      "actions": 120,
      "photo": "https://cdn.example.com/photo.jpg"
    }
  ],
  "total": 10
}
```

#### 2. 创建领导信息

**接口**: `POST /admin/leadership`

#### 3. 更新领导信息

**接口**: `PUT /admin/leadership/:id`

#### 4. 删除领导信息

**接口**: `DELETE /admin/leadership/:id`

#### 5. 批量导入

**接口**: `POST /admin/leadership/import`

#### 6. 导出

**接口**: `GET /admin/leadership/export`

### 党建专栏管理

#### 1. 获取党建内容列表

**接口**: `GET /admin/party`

**请求参数**:
```
page: 1
pageSize: 10
title: 党建 (可选)
category: 党建活动 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "党建活动标题",
      "content": "<p>富文本内容</p>",
      "category": "党建活动",
      "publishDate": "2024-01-15",
      "status": "已发布"
    }
  ],
  "total": 30
}
```

#### 2. 创建党建内容

**接口**: `POST /admin/party`

#### 3. 更新党建内容

**接口**: `PUT /admin/party/:id`

#### 4. 删除党建内容

**接口**: `DELETE /admin/party/:id`

### 队伍介绍管理

#### 1. 获取队伍介绍

**接口**: `GET /admin/team-intro`

#### 2. 更新队伍介绍

**接口**: `PUT /admin/team-intro`

**请求参数**:
```json
{
  "content": "<p>富文本内容</p>"
}
```

### 救援案例管理

#### 1. 获取救援案例列表

**接口**: `GET /admin/rescue-cases`

**请求参数**:
```
page: 1
pageSize: 10
title: 山区救援 (可选)
location: 四川阿坝 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "山区救援行动",
      "location": "四川阿坝",
      "date": "2024-01-15",
      "images": "https://cdn.example.com/case.jpg",
      "status": "已发布"
    }
  ],
  "total": 20
}
```

#### 2. 创建救援案例

**接口**: `POST /admin/rescue-cases`

#### 3. 更新救援案例

**接口**: `PUT /admin/rescue-cases/:id`

#### 4. 删除救援案例

**接口**: `DELETE /admin/rescue-cases/:id`

### 队伍风采管理

#### 1. 获取队伍风采列表

**接口**: `GET /admin/team-style`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "救援训练照片",
      "type": "训练活动",
      "image": "https://cdn.example.com/style.jpg",
      "content": "<p>富文本内容</p>",
      "sort": 1,
      "status": "显示"
    }
  ],
  "total": 15
}
```

#### 2. 创建队伍风采

**接口**: `POST /admin/team-style`

#### 3. 更新队伍风采

**接口**: `PUT /admin/team-style/:id`

#### 4. 删除队伍风采

**接口**: `DELETE /admin/team-style/:id`

### 人事任免管理

#### 1. 获取人事任免列表

**接口**: `GET /admin/appointment`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "关于张三同志任职的通知",
      "docNumber": "川飞豹〔2024〕001号",
      "publishDate": "2024-01-15",
      "effectiveDate": "2024-01-20",
      "department": "组织部",
      "attachment": "https://cdn.example.com/doc.pdf"
    }
  ],
  "total": 10
}
```

#### 2. 创建人事任免

**接口**: `POST /admin/appointment`

#### 3. 更新人事任免

**接口**: `PUT /admin/appointment/:id`

#### 4. 删除人事任免

**接口**: `DELETE /admin/appointment/:id`

### 政策文件管理

#### 1. 获取政策文件列表

**接口**: `GET /admin/policy`

**请求参数**:
```
page: 1
pageSize: 10
title: 救援 (可选)
category: 法律法规 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "应急救援管理条例",
      "docNumber": "国务院令第708号",
      "category": "法律法规",
      "publishDate": "2024-01-15",
      "effectiveDate": "2024-02-01",
      "expiryDate": "",
      "department": "国务院",
      "attachment": "https://cdn.example.com/policy.pdf"
    }
  ],
  "total": 25
}
```

#### 2. 创建政策文件

**接口**: `POST /admin/policy`

#### 3. 更新政策文件

**接口**: `PUT /admin/policy/:id`

#### 4. 删除政策文件

**接口**: `DELETE /admin/policy/:id`

---

## 查询系统管理

### 证书管理

#### 1. 获取证书列表

**接口**: `GET /admin/certificates`

**请求参数**:
```
page: 1
pageSize: 10
certificateNo: CERT2024001 (可选)
type: 应急指挥专家 (可选)
name: 张三 (可选)
status: 有效 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "certificateNo": "CERT2024001",
      "type": "应急指挥专家",
      "name": "张三",
      "idCard": "510100199001011234",
      "phone": "13800138000",
      "workUnit": "四川飞豹救援队",
      "department": "指挥部",
      "position": "队长",
      "issueDate": "2024-01-15",
      "validUntil": "2026-01-15",
      "status": "有效",
      "photo": "https://cdn.example.com/cert.jpg",
      "daysToExpire": 365
    }
  ],
  "total": 100
}
```

#### 2. 创建证书

**接口**: `POST /admin/certificates`

#### 3. 更新证书

**接口**: `PUT /admin/certificates/:id`

#### 4. 删除证书

**接口**: `DELETE /admin/certificates/:id`

#### 5. 批量导入证书

**接口**: `POST /admin/certificates/import`

**请求参数**: `multipart/form-data`
```
file: Excel文件
```

#### 6. 导出证书

**接口**: `GET /admin/certificates/export`

#### 7. 获取即将到期证书

**接口**: `GET /admin/certificates/expiring`

**请求参数**:
```
days: 30 (默认30天内到期)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "certificateNo": "CERT2024001",
      "name": "张三",
      "type": "应急指挥专家",
      "validUntil": "2024-02-15",
      "daysToExpire": 15
    }
  ],
  "total": 5
}
```

### 车辆管理

#### 1. 获取车辆列表

**接口**: `GET /admin/vehicles`

**请求参数**:
```
page: 1
pageSize: 10
plate: 川A12345 (可选)
type: 应急救援指挥车 (可选)
status: 正常 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "unit": "四川飞豹救援队",
      "vehicleNo": "VEH2024001",
      "type": "应急救援指挥车",
      "plate": "川A12345",
      "brand": "东风牌",
      "engineNo": "ENG123456",
      "frameNo": "FRAME123456",
      "color": "红色",
      "equipDate": "2024-01-10",
      "issueDate": "2024-01-15",
      "validUntil": "2026-01-15",
      "status": "正常",
      "photo": "https://cdn.example.com/vehicle.jpg"
    }
  ],
  "total": 50
}
```

#### 2. 创建车辆

**接口**: `POST /admin/vehicles`

#### 3. 更新车辆

**接口**: `PUT /admin/vehicles/:id`

#### 4. 删除车辆

**接口**: `DELETE /admin/vehicles/:id`

#### 5. 批量导入车辆

**接口**: `POST /admin/vehicles/import`

#### 6. 导出车辆

**接口**: `GET /admin/vehicles/export`

---

## 工作台

### 数据概览

#### 1. 获取工作台数据概览

**接口**: `GET /admin/dashboard/overview`

**响应数据**:
```json
{
  "news": {
    "total": 150,
    "draft": 5,
    "pending": 3,
    "published": 142,
    "trend": "+12%" // 同比上月
  },
  "certificates": {
    "total": 500,
    "valid": 480,
    "expiring": 15, // 30天内到期
    "expired": 5,
    "trend": "+5%"
  },
  "vehicles": {
    "total": 50,
    "normal": 45,
    "maintenance": 3,
    "retired": 2,
    "trend": "+2%"
  },
  "personnel": {
    "total": 200,
    "active": 195,
    "inactive": 5,
    "trend": "+3%"
  }
}
```

### 待办事项

#### 1. 获取待办事项列表

**接口**: `GET /admin/dashboard/todos`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "type": "news_review", // news_review | certificate_expiring | backup_reminder
      "title": "待审核新闻：山区救援行动",
      "description": "提交人：张三，提交时间：2024-01-28 10:00",
      "priority": "high", // high | medium | low
      "relatedId": 123,
      "relatedModule": "news",
      "createTime": "2024-01-28 10:00:00"
    },
    {
      "id": 2,
      "type": "certificate_expiring",
      "title": "证书即将到期：CERT2024001",
      "description": "持有人：李四，到期时间：2024-02-15",
      "priority": "medium",
      "relatedId": 456,
      "relatedModule": "certificates",
      "createTime": "2024-01-28 09:00:00"
    }
  ],
  "total": 8
}
```

#### 2. 完成待办事项

**接口**: `PUT /admin/dashboard/todos/:id/complete`

### 操作日志

#### 1. 获取最近操作日志

**接口**: `GET /admin/dashboard/logs`

**请求参数**:
```
limit: 20 (默认20条)
type: create (可选) // create | update | delete
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "user": "admin",
      "userName": "管理员",
      "action": "create",
      "module": "news",
      "description": "创建新闻：山区救援行动",
      "ip": "192.168.1.100",
      "createTime": "2024-01-28 10:00:00"
    }
  ],
  "total": 100
}
```

### 系统通知

#### 1. 获取系统通知列表

**接口**: `GET /admin/dashboard/notifications`

**请求参数**:
```
page: 1
pageSize: 10
status: unread (可选) // unread | read | all
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "type": "system", // system | backup | warning
      "title": "数据备份成功",
      "content": "系统已于2024-01-28 02:00完成自动备份",
      "status": "unread",
      "createTime": "2024-01-28 02:00:00"
    }
  ],
  "total": 15,
  "unreadCount": 5
}
```

#### 2. 标记通知为已读

**接口**: `PUT /admin/dashboard/notifications/:id/read`

#### 3. 批量标记已读

**接口**: `PUT /admin/dashboard/notifications/read-all`

---

## 系统设置

### 网站配置

#### 1. 获取网站配置

**接口**: `GET /admin/settings/site`

**响应数据**:
```json
{
  "siteName": "四川飞豹救援",
  "logo": "https://cdn.example.com/logo.png",
  "copyright": "© 2024 四川飞豹救援队",
  "icp": "蜀ICP备xxxxxxxx号",
  "contact": {
    "phone": "028-12345678",
    "email": "contact@feibao.com",
    "address": "四川省成都市xxx"
  }
}
```

#### 2. 更新网站配置

**接口**: `PUT /admin/settings/site`

### 导航栏管理

#### 1. 获取导航栏配置

**接口**: `GET /admin/settings/navigation`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "name": "首页",
      "path": "/",
      "sort": 1,
      "visible": true,
      "children": []
    },
    {
      "id": 2,
      "name": "概况信息",
      "path": "/overview",
      "sort": 2,
      "visible": true,
      "children": [
        {
          "id": 21,
          "name": "领导信息",
          "path": "/overview/leadership",
          "sort": 1,
          "visible": true
        }
      ]
    }
  ]
}
```

#### 2. 更新导航栏配置

**接口**: `PUT /admin/settings/navigation`

### 数据备份

#### 1. 获取备份列表

**接口**: `GET /admin/settings/backups`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "fileName": "backup_20240128_020000.sql",
      "fileSize": "15.6MB",
      "type": "auto", // auto | manual
      "status": "success", // success | failed
      "createTime": "2024-01-28 02:00:00"
    }
  ],
  "total": 30,
  "autoBackupEnabled": true,
  "autoBackupTime": "02:00",
  "retentionDays": 30
}
```

#### 2. 创建手动备份

**接口**: `POST /admin/settings/backups`

**响应数据**:
```json
{
  "taskId": "backup_task_123",
  "message": "备份任务已创建，请稍后查看结果"
}
```

#### 3. 下载备份文件

**接口**: `GET /admin/settings/backups/:id/download`

**响应**: 文件流

#### 4. 删除备份文件

**接口**: `DELETE /admin/settings/backups/:id`

#### 5. 恢复备份

**接口**: `POST /admin/settings/backups/:id/restore`

#### 6. 更新备份配置

**接口**: `PUT /admin/settings/backups/config`

**请求参数**:
```json
{
  "autoBackupEnabled": true,
  "autoBackupTime": "02:00",
  "retentionDays": 30
}
```

### 操作日志管理

#### 1. 获取操作日志列表

**接口**: `GET /admin/settings/logs`

**请求参数**:
```
page: 1
pageSize: 20
user: admin (可选)
action: create (可选)
module: news (可选)
startDate: 2024-01-01 (可选)
endDate: 2024-01-31 (可选)
```

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "user": "admin",
      "userName": "管理员",
      "action": "create",
      "module": "news",
      "description": "创建新闻：山区救援行动",
      "ip": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "createTime": "2024-01-28 10:00:00"
    }
  ],
  "total": 1000
}
```

#### 2. 导出操作日志

**接口**: `GET /admin/settings/logs/export`

### 友情链接管理

#### 1. 获取友情链接列表

**接口**: `GET /admin/settings/links`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "name": "应急管理部",
      "url": "https://www.mem.gov.cn",
      "sort": 1,
      "status": "active", // active | invalid
      "lastCheckTime": "2024-01-28 10:00:00"
    }
  ],
  "total": 10
}
```

#### 2. 创建友情链接

**接口**: `POST /admin/settings/links`

**请求参数**:
```json
{
  "name": "应急管理部",
  "url": "https://www.mem.gov.cn",
  "sort": 1
}
```

#### 3. 更新友情链接

**接口**: `PUT /admin/settings/links/:id`

#### 4. 删除友情链接

**接口**: `DELETE /admin/settings/links/:id`

#### 5. 检测链接有效性

**接口**: `POST /admin/settings/links/:id/check`

**响应数据**:
```json
{
  "status": "active", // active | invalid
  "responseTime": 150 // ms
}
```

---

## 前台接口

### 首页

#### 1. 获取轮播图

**接口**: `GET /api/home/banner`

**响应数据**:
```json
{
  "list": [
    {
      "id": 1,
      "title": "救援队伍风采",
      "imageUrl": "https://cdn.example.com/banner.jpg",
      "linkUrl": "/news/123"
    }
  ]
}
```

#### 2. 获取最新新闻

**接口**: `GET /api/home/news`

**请求参数**:
```
limit: 6 (默认6条)
```

#### 3. 获取救援行动

**接口**: `GET /api/home/actions`

#### 4. 获取队伍风采

**接口**: `GET /api/home/showcase`

#### 5. 获取友情链接

**接口**: `GET /api/home/links`

### 新闻

#### 1. 获取新闻列表

**接口**: `GET /api/news/list`

**请求参数**:
```
page: 1
pageSize: 10
category: 救援行动 (可选)
```

#### 2. 获取新闻详情

**接口**: `GET /api/news/:id`

**响应数据**:
```json
{
  "id": 1,
  "title": "山区救援行动",
  "summary": "成功救援被困人员",
  "content": "<p>详细内容...</p>",
  "coverImage": "https://cdn.example.com/cover.jpg",
  "category": "救援行动",
  "author": "张三",
  "publishDate": "2024-01-15",
  "views": 1250,
  "relatedNews": [
    {
      "id": 2,
      "title": "相关新闻标题",
      "coverImage": "https://cdn.example.com/cover2.jpg",
      "publishDate": "2024-01-14"
    }
  ]
}
```

### 查询系统

#### 1. 证书查询

**接口**: `POST /api/query/certificate`

**请求参数**:
```json
{
  "certificateNo": "CERT2024001", // 证书编号（可选）
  "name": "张三", // 姓名（可选）
  "idCard": "510100199001011234" // 身份证号（可选）
}
```

**响应数据**:
```json
{
  "list": [
    {
      "certificateNo": "CERT2024001",
      "type": "应急指挥专家",
      "name": "张三",
      "workUnit": "四川飞豹救援队",
      "issueDate": "2024-01-15",
      "validUntil": "2026-01-15",
      "status": "有效"
    }
  ]
}
```

#### 2. 内部人员查询（需登录）

**接口**: `POST /api/query/personnel`

**请求头**: `Authorization: Bearer {token}`

**请求参数**:
```json
{
  "name": "张三",
  "idCard": "510100199001011234"
}
```

#### 3. 车辆查询

**接口**: `POST /api/query/vehicle`

**请求参数**:
```json
{
  "plate": "川A12345",
  "type": "应急救援指挥车"
}
```

---

## 文件上传

### 1. 上传图片

**接口**: `POST /api/upload/image`

**请求参数**: `multipart/form-data`
```
file: 图片文件
```

**响应数据**:
```json
{
  "url": "https://cdn.example.com/images/20240128/abc123.jpg",
  "fileName": "abc123.jpg",
  "fileSize": 1024000
}
```

**限制**:
- 支持格式: jpg, jpeg, png, gif, webp
- 最大大小: 5MB

### 2. 上传视频

**接口**: `POST /api/upload/video`

**请求参数**: `multipart/form-data`
```
file: 视频文件
```

**响应数据**:
```json
{
  "url": "https://cdn.example.com/videos/20240128/video123.mp4",
  "fileName": "video123.mp4",
  "fileSize": 102400000,
  "duration": 120 // 秒
}
```

**限制**:
- 支持格式: mp4, avi, mov
- 最大大小: 1GB

### 3. 上传文件（附件）

**接口**: `POST /api/upload/file`

**请求参数**: `multipart/form-data`
```
file: 文件
```

**响应数据**:
```json
{
  "url": "https://cdn.example.com/files/20240128/doc123.pdf",
  "fileName": "doc123.pdf",
  "fileSize": 2048000
}
```

**限制**:
- 支持格式: pdf, doc, docx, xls, xlsx
- 最大大小: 10MB

---

## 附录

### 数据字典

#### 新闻状态
- `draft`: 草稿
- `pending`: 待审核
- `published`: 已发布
- `archived`: 已下架

#### 证书状态
- `valid`: 有效
- `expired`: 失效

#### 车辆状态
- `normal`: 正常
- `maintenance`: 维修中
- `retired`: 报废

#### 人员状态
- `active`: 在职
- `inactive`: 离职

#### 管理员状态
- `active`: 启用
- `disabled`: 禁用

#### 操作类型
- `create`: 创建
- `update`: 更新
- `delete`: 删除
- `login`: 登录
- `logout`: 登出

### 权限代码

#### 内容管理
- `content:read`: 查看内容
- `content:write`: 编辑内容
- `content:delete`: 删除内容
- `content:review`: 审核内容
- `content:publish`: 发布内容

#### 查询系统
- `query:read`: 查看查询数据
- `query:write`: 编辑查询数据
- `query:delete`: 删除查询数据
- `query:export`: 导出数据
- `query:import`: 导入数据

#### 用户管理
- `user:read`: 查看用户
- `user:write`: 编辑用户
- `user:delete`: 删除用户

#### 系统设置
- `system:read`: 查看系统设置
- `system:write`: 修改系统设置
- `system:backup`: 数据备份
- `system:log`: 查看日志

---

**文档维护**: 开发团队
**最后更新**: 2025-01-28
**版本**: v1.0
