# 四川飞豹救援官网 - Claude AI 开发指南

## 项目概述

本项目是四川飞豹救援官方网站，采用前后端分离架构，基于 Vue 3 + TypeScript + Vite 技术栈构建。

## 项目结构

```
├── admin/      # 后台管理系统前端
├── backend/    # 后端服务（NestJS）
├── website/    # 官网前端（Vue 3）
├── docs/       # 文档目录
├── mock/       # Mock 数据
└── tests/      # 测试文件
```

## 项目架构

### 技术栈
- **前端框架**: Vue 3 (Composition API + `<script setup>`)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **HTTP客户端**: Axios
- **样式预处理**: SCSS

### 架构模式
- **前后端分离**: 前端通过 RESTful API 与后端交互
- **组件化开发**: 采用 Vue 3 组件化思想，可复用组件放在 `components/` 目录
- **模块化路由**: 路由按功能模块拆分，便于维护
- **集中式状态管理**: 使用 Pinia 管理全局状态
- **API 层封装**: 统一的 HTTP 请求封装和 API 接口管理

## 目录结构说明

### 官网前端（website/）

```
website/
├── src/
│   ├── api/                    # API 接口层
│   ├── index.ts           # API 统一导出
│   ├── home.ts            # 首页相关接口
│   ├── party-building.ts  # 党建相关接口
│   ├── team-building.ts   # 队伍建设相关接口
│   ├── news.ts            # 新闻相关接口
│   ├── info-public.ts     # 信息公开相关接口
│   ├── policy.ts          # 政策法规相关接口
│   └── query.ts           # 查询系统相关接口
│
├── assets/                # 静态资源
│   ├── images/           # 图片资源
│   │   ├── banner/       # 轮播图
│   │   ├── news/         # 新闻图片
│   │   ├── team/         # 队伍风采
│   │   └── common/       # 通用图片
│   ├── fonts/            # 字体文件
│   └── styles/           # 全局样式
│       ├── variables.scss # SCSS 变量定义
│       ├── mixins.scss    # SCSS 混入
│       ├── global.scss    # 全局样式
│       └── element.scss   # Element Plus 样式覆盖
│
├── components/            # 组件目录
│   ├── common/           # 通用组件
│   │   ├── AppHeader.vue # 头部导航
│   │   ├── AppFooter.vue # 页脚组件
│   │   ├── Breadcrumb.vue # 面包屑导航
│   │   ├── Pagination.vue # 分页组件
│   │   └── ImagePreview.vue # 图片预览
│   ├── home/             # 首页组件
│   │   ├── Banner.vue    # 轮播图组件
│   │   ├── NewsList.vue  # 新闻列表
│   │   └── VideoPlayer.vue # 视频播放器
│   └── business/         # 业务组件
│       ├── CertificateCard.vue # 证书卡片
│       └── TeamCard.vue   # 队伍卡片
│
├── composables/          # 组合式函数
│   ├── use-api.ts       # API 请求钩子
│   ├── use-auth.ts      # 认证相关钩子
│   └── use-pagination.ts # 分页钩子
│
├── layouts/              # 布局组件
│   ├── DefaultLayout.vue # 默认布局
│   └── BlankLayout.vue   # 空白布局
│
├── router/               # 路由配置
│   ├── index.ts         # 路由主文件
│   └── modules/         # 路由模块
│       ├── home.ts
│       ├── overview-info.ts
│       ├── party-building.ts
│       ├── dynamic-news.ts
│       ├── team-building.ts
│       ├── info-public.ts
│       ├── policy-regulations.ts
│       └── query-system.ts
│
├── stores/              # Pinia 状态管理
│   ├── app.ts          # 应用全局状态
│   ├── user.ts         # 用户状态
│   └── cache.ts        # 缓存状态
│
├── types/               # TypeScript 类型定义
│   ├── common.ts       # 通用类型
│   ├── home.ts         # 首页类型
│   ├── news.ts         # 新闻类型
│   ├── party.ts        # 党建类型
│   ├── team.ts         # 队伍类型
│   └── query.ts        # 查询类型
│
├── utils/               # 工具函数
│   ├── http.ts         # HTTP 请求封装
│   ├── storage.ts      # 本地存储工具
│   ├── format.ts       # 格式化工具
│   ├── validate.ts     # 验证工具
│   └── constants.ts    # 常量定义
│
├── views/               # 页面视图
│   ├── home/           # 首页模块
│   ├── overview-info/  # 概况信息模块
│   ├── party-building/ # 党建专栏模块
│   ├── dynamic-news/   # 动态要闻模块
│   ├── team-building/  # 队伍建设模块
│   ├── info-public/    # 信息公开模块
│   ├── policy-regulations/ # 政策法规模块
│   ├── query-system/   # 查询系统模块
│   └── Frame*.vue      # 原有页面组件（保留）
│
├── App.vue             # 根组件
└── main.ts             # 应用入口
├── index.html          # 入口 HTML
├── package.json        # 依赖配置
├── vite.config.ts      # Vite 配置
├── tsconfig.json       # TypeScript 配置
└── public/             # 公共资源
```

## 开发规范

### 1. 命名规范

#### 文件命名
- **Vue 组件**: PascalCase（大驼峰）
  - `AppHeader.vue`, `NewsList.vue`, `CertificateCard.vue`
- **TypeScript 文件**: kebab-case（短横线）
  - `use-api.ts`, `http.ts`, `party-building.ts`
- **样式文件**: kebab-case
  - `global.scss`, `variables.scss`

#### 代码命名
- **组件名称**: PascalCase
- **函数/方法**: camelCase（小驼峰）
- **常量**: UPPER_SNAKE_CASE
- **接口/类型**: PascalCase，无需 I 前缀

### 2. Vue 组件开发规范

使用 `<script setup>` 语法糖：

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const doubled = computed(() => count.value * 2)

// 生命周期
onMounted(() => {
  console.log('Component mounted')
})

// 方法
const increment = () => {
  count.value++
}
</script>

<template>
  <div class="container">
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;

  button {
    margin-top: 10px;
  }
}
</style>
```

### 3. API 接口开发规范

在 `src/api/` 目录下按模块创建 API 文件：

```typescript
// api/news.ts
import request from '@/utils/http'
import type { NewsItem, NewsListParams } from '@/types/news'

/**
 * 获取新闻列表
 */
export function getNewsList(params: NewsListParams) {
  return request.get<NewsItem[]>('/api/news/list', { params })
}

/**
 * 获取新闻详情
 */
export function getNewsDetail(id: number) {
  return request.get<NewsItem>(`/api/news/${id}`)
}
```

### 4. 路由配置规范

路由按功能模块拆分到 `router/modules/`：

```typescript
// router/modules/news.ts
export default {
  path: '/news',
  name: 'News',
  component: () => import('@/layouts/DefaultLayout.vue'),
  meta: { title: '动态要闻' },
  children: [
    {
      path: '',
      name: 'NewsList',
      component: () => import('@/views/dynamic-news/index.vue'),
      meta: { title: '新闻列表' }
    },
    {
      path: ':id',
      name: 'NewsDetail',
      component: () => import('@/views/dynamic-news/detail.vue'),
      meta: { title: '新闻详情' }
    }
  ]
}
```

### 5. 状态管理规范

使用 Pinia 定义 Store：

```typescript
// stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    sidebarOpen: true
  }),

  getters: {
    isLoading: (state) => state.loading
  },

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    }
  }
})
```

### 6. TypeScript 类型定义规范

在 `src/types/` 目录下定义类型：

```typescript
// types/news.ts
export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  coverImage: string
  publishDate: string
  author: string
  category: string
}

export interface NewsListParams {
  page: number
  pageSize: number
  category?: string
}
```

## API 接口设计

### 统一响应格式

```typescript
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}
```

### HTTP 状态码

- `200`: 成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器错误

### 环境变量配置

```bash
# .env.development
VITE_APP_BASE_API=/api
VITE_APP_TITLE=四川飞豹救援（开发环境）

# .env.production
VITE_APP_BASE_API=https://api.feibao-rescue.com
VITE_APP_TITLE=四川飞豹救援
```

## 开发流程

### 1. 新增功能模块

1. 在 `website/src/types/` 定义类型
2. 在 `website/src/api/` 创建接口文件
3. 在 `website/src/views/` 创建页面组件
4. 在 `website/src/router/modules/` 添加路由配置
5. 如需全局状态，在 `website/src/stores/` 创建 store

### 2. 开发调试

```bash
# 进入官网前端目录
cd website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 3. Git 提交规范

遵循约定式提交：

```
feat(module): 新功能
fix(module): 修复bug
docs(module): 文档更新
style(module): 代码格式调整
refactor(module): 重构代码
perf(module): 性能优化
test(module): 测试相关
chore(module): 构建/工具链更新
```

示例：
```bash
git commit -m "feat(news): add news detail page"
git commit -m "fix(query): resolve certificate search error"
```

## 性能优化建议

1. **路由懒加载**: 所有页面组件使用动态导入
2. **图片优化**:
   - 小图标使用 SVG
   - 大图片使用 WebP 格式
   - 实现图片懒加载
3. **按需引入**: Element Plus 组件按需引入
4. **代码分割**: 合理使用动态导入进行代码分割
5. **缓存策略**:
   - 使用 localStorage/SessionStorage 缓存数据
   - 合理设置 HTTP 缓存头

## 安全注意事项

1. **XSS 防护**: 避免使用 `v-html`，必须使用时进行转义
2. **CSRF 防护**: API 请求携带 CSRF Token
3. **敏感数据**: 不要在前端存储敏感信息
4. **输入验证**: 前后端都要进行数据验证
5. **HTTPS**: 生产环境必须使用 HTTPS

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 相关文档

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [README_DEV.md](./README_DEV.md) - 开发指南

## 项目维护

- **最后更新**: 2025-01-28
- **维护者**: 开发团队
- **版本**: 1.0.0

---

**相关文档**:
- [需求清单.md](./需求清单.md) - 详细功能需求
- [README_DEV.md](./README_DEV.md) - 开发指南
- [项目重构总结.md](./项目重构总结.md) - 重构说明
