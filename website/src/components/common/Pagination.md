# Pagination 分页组件

全局可复用的分页组件，提供完整的分页功能。

## 功能特性

- ✅ 页码切换（上一页、下一页、指定页码）
- ✅ 省略号显示（页码过多时自动显示省略号）
- ✅ 每页条数选择
- ✅ 跳页功能
- ✅ 总条数显示
- ✅ 响应式设计
- ✅ TypeScript 类型支持
- ✅ v-model 双向绑定

## 基础用法

```vue
<template>
  <div>
    <!-- 数据列表 -->
    <div v-for="item in paginatedData" :key="item.id">
      {{ item.name }}
    </div>

    <!-- 分页组件 -->
    <Pagination
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Pagination from '@/components/common/Pagination.vue'

const total = ref(100)
const currentPage = ref(1)
const pageSize = ref(10)

// 计算当前页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})

// 页码改变
function handlePageChange(page: number) {
  console.log('当前页:', page)
  // 可以在这里触发数据加载
  fetchData()
}

// 每页条数改变
function handleSizeChange(size: number) {
  console.log('每页条数:', size)
  // 可以在这里触发数据加载
  fetchData()
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total | 总条数 | number | - |
| currentPage | 当前页码（支持 v-model） | number | - |
| pageSize | 每页条数（支持 v-model） | number | - |
| pageSizeOptions | 每页条数选项 | number[] | [10, 20, 50, 100] |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:currentPage | 当前页码更新时触发 | (page: number) |
| update:pageSize | 每页条数更新时触发 | (size: number) |
| page-change | 页码改变时触发 | (page: number) |
| size-change | 每页条数改变时触发 | (size: number) |

## 自定义每页条数选项

```vue
<Pagination
  :total="total"
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :page-size-options="[12, 24, 48]"
/>
```

## 样式定制

组件使用 scoped 样式，如需全局定制，可以在全局样式文件中覆盖：

```css
/* 自定义主题色 */
.pagination-btn.active {
  background: #your-color;
  border-color: #your-color;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  border-color: #your-color;
  color: #your-color;
}
```

## 完整示例

### 前端分页（本地数据）

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import Pagination from '@/components/common/Pagination.vue'

// 模拟数据
const allData = ref(Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`
})))

const currentPage = ref(1)
const pageSize = ref(10)

// 计算当前页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})
</script>
```

### 后端分页（API数据）

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Pagination from '@/components/common/Pagination.vue'
import { getDataList } from '@/api/data'

const dataList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 获取数据
async function fetchData() {
  loading.value = true
  try {
    const res = await getDataList({
      page: currentPage.value,
      pageSize: pageSize.value
    })
    dataList.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 页码改变
function handlePageChange() {
  fetchData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 每页条数改变
function handleSizeChange() {
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>
```

## 注意事项

1. **v-model 双向绑定**：组件支持 `v-model:current-page` 和 `v-model:page-size` 双向绑定
2. **事件监听**：可以同时监听 `page-change` 和 `size-change` 事件来触发数据加载
3. **页码重置**：当改变每页条数时，组件会自动重置到第一页
4. **滚动处理**：建议在页码改变时滚动到页面顶部，提升用户体验
5. **加载状态**：建议在数据加载时显示 loading 状态

## 在现有页面中使用

### 替换 leadership.vue 中的分页

```vue
<template>
  <!-- 领导列表 -->
  <template v-for="(leader, index) in paginatedLeaders" :key="index">
    <!-- 领导信息展示 -->
  </template>

  <!-- 使用分页组件 -->
  <Pagination
    :total="leaders.length"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-size-options="[12, 24]"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Pagination from '@/components/common/Pagination.vue'

const leaders = ref([...]) // 领导数据
const currentPage = ref(1)
const pageSize = ref(12)

// 计算当前页数据
const paginatedLeaders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return leaders.value.slice(start, end)
})

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
```

## 适用场景

以下页面建议使用此分页组件：

### 概况信息模块
- ✅ leadership.vue - 领导信息（已使用）

### 队伍建设模块
- 📋 cases.vue - 案例列表
- 📋 showcase.vue - 风采展示

### 党建专栏模块
- ✅ party-work.vue - 党建工作（已使用）
- 📋 team-work.vue - 团建工作
- 📋 members.vue - 党员先锋
- 📋 study.vue - 党员学习

### 信息公开模块
- 📋 personnel.vue - 人员信息

### 动态要闻模块
- 📋 index.vue - 新闻列表

### 政策法规模块
- 📋 laws.vue - 法律法规
- 📋 regulations.vue - 规章制度
- 📋 standards.vue - 标准规范

### 查询系统模块
- 📋 certificate-list.vue - 证书查询列表

## 更新日志

### v1.0.0 (2025-01-28)
- 🎉 初始版本发布
- ✨ 支持完整的分页功能
- ✨ 支持 v-model 双向绑定
- ✨ 支持自定义每页条数选项
- ✨ TypeScript 类型支持
