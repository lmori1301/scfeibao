# 四川飞豹救援官网 - 开发指南

## 项目简介

四川飞豹救援官方网站，基于 Vue 3 + TypeScript + Vite + Element Plus 构建。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具
- **Element Plus** - 基于 Vue 3 的组件库
- **Vue Router** - Vue.js 官方路由
- **Pinia** - Vue 3 状态管理
- **Axios** - HTTP 客户端
- **SCSS** - CSS 预处理器

## 项目结构

```
src/
├── api/                    # API 接口
│   ├── home.ts            # 首页接口
│   ├── party-building.ts  # 党建接口
│   ├── team-building.ts   # 队伍建设接口
│   └── ...
├── assets/                # 静态资源
│   ├── images/           # 图片
│   └── styles/           # 全局样式
│       ├── variables.scss  # 样式变量
│       └── global.scss     # 全局样式
├── components/            # 组件
│   └── common/           # 通用组件
│       ├── AppHeader.vue  # 头部导航
│       └── AppFooter.vue  # 页脚
├── composables/          # 组合式函数
│   └── use-api.ts        # API 请求钩子
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
├── stores/               # 状态管理
├── types/                # 类型定义
│   └── common.ts        # 通用类型
├── utils/                # 工具函数
│   └── http.ts          # HTTP 封装
├── views/                # 页面视图
│   ├── home/            # 首页
│   ├── overview-info/   # 概况信息
│   ├── party-building/  # 党建专栏
│   ├── dynamic-news/    # 动态要闻
│   ├── team-building/   # 队伍建设
│   ├── info-public/     # 信息公开
│   ├── policy-regulations/  # 政策法规
│   └── query-system/    # 查询系统
├── App.vue              # 根组件
└── main.ts              # 入口文件
```

## 功能模块

### 1. 首页 (Home)
- Banner 轮播图
- 动态要闻
- 各地动态
- 救援行动
- 宣传视频
- 队伍风采
- 友情链接

### 2. 概况信息 (Overview Info)
- 领导信息
- 组织机构
- 地理信息

### 3. 党建专栏 (Party Building)
- 党建工作
- 团建工作
- 党员先锋
- 党员学"习"

### 4. 动态要闻 (Dynamic News)
- 新闻列表
- 新闻详情

### 5. 队伍建设 (Team Building)
- 关于队伍
- 救援案例
- 队伍风采

### 6. 信息公开 (Info Public)
- 人事任免

### 7. 政策法规 (Policy Regulations)
- 法律法规
- 部门规章
- 行业标准

### 8. 查询系统 (Query System)
- 证书查询
- 内部人员查询
- 应急车辆查询

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 开发规范

### 命名规范

- **目录**: kebab-case (短横线命名)
  - 例: `party-building/`, `team-building/`

- **Vue 组件**: PascalCase (大驼峰)
  - 例: `PartyList.vue`, `TeamShowcase.vue`

- **页面文件**: kebab-case (短横线命名)
  - 例: `party-work.vue`, `rescue-cases.vue`

- **TypeScript 文件**: kebab-case
  - 例: `party-building.ts`, `use-api.ts`

- **组件名称**: PascalCase
  ```typescript
  export default defineComponent({
    name: 'PartyList'
  })
  ```

- **组合式函数**: camelCase，以 `use` 开头
  ```typescript
  export function usePartyList() {}
  ```

- **常量**: UPPER_SNAKE_CASE
  ```typescript
  const API_BASE_URL = 'https://api.example.com'
  ```

### 组件开发

使用 `<script setup>` 语法：

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div>{{ count }}</div>
</template>

<style scoped lang="scss">
// 样式
</style>
```

### API 接口封装

在 `src/api/` 目录下创建对应的 API 文件：

```typescript
// api/party-building.ts
import { http } from '@/utils/http'
import type { PartyWorkItem, PartyWorkListParams } from '@/types/party-building'

/**
 * 获取党建工作列表
 */
export function getPartyWorkList(params: PartyWorkListParams) {
  return http.get<PartyWorkItem[]>('/party-work/list', { params })
}

/**
 * 获取党建工作详情
 */
export function getPartyWorkDetail(id: number) {
  return http.get<PartyWorkItem>(`/party-work/${id}`)
}
```

### 路由配置

在 `src/router/modules/` 对应模块文件中添加路由：

```typescript
{
  path: '/party-building',
  name: 'PartyBuilding',
  component: () => import('@/views/party-building/index.vue'),
  meta: {
    title: '党建专栏',
    requiresAuth: false
  }
}
```

### 状态管理

使用 Pinia 进行状态管理：

```typescript
// stores/party-building.ts
import { defineStore } from 'pinia'

export const usePartyBuildingStore = defineStore('party-building', {
  state: () => ({
    list: [],
    current: null
  }),
  actions: {
    async fetchList() {
      // ...
    }
  }
})
```

## Git 提交规范

提交信息格式：`<type>(<scope>): <subject>`

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建/工具链更新

示例：
```bash
git commit -m "feat(party-building): add party work detail page"
git commit -m "fix(query): resolve certificate search issue"
```

## 注意事项

1. **样式管理**:
   - 全局样式放在 `assets/styles/`
   - 组件样式使用 `<style scoped>`
   - 避免使用行内样式

2. **图片资源**:
   - 小图标使用 SVG
   - 大图片使用 WebP 格式
   - 图片按模块存放在 `assets/images/`

3. **环境变量**:
   - 开发环境变量：`.env.development`
   - 生产环境变量：`.env.production`
   - 使用 `import.meta.env` 访问

4. **路由导航**:
   - 使用声明式导航 `<router-link>`
   - 编程式导航使用 `router.push()`
   - 路由参数通过 `route.params` 获取

5. **性能优化**:
   - 路由懒加载：所有页面使用动态导入
   - 图片优化：使用 WebP 格式，适当压缩
   - 按需导入：Element Plus 已配置自动按需导入

## 相关文档

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)

---

**最后更新时间**: 2025-01-27
**维护者**: 开发团队
