<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.path"
        :to="item.path ? { path: item.path } : undefined"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 路由映射表
const routeTitleMap: Record<string, string> = {
  'overview-info': '概况信息',
  'party-building': '党建专栏',
  'dynamic-news': '动态要闻',
  'team-building': '队伍建设',
  'info-public': '信息公开',
  'policy-regulations': '政策法规',
  'query-system': '查询系统'
}

// 面包屑数据
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.path !== '/')
  const items: Array<{ title: string; path?: string }> = []

  matched.forEach(item => {
    const name = item.name as string
    const title = routeTitleMap[name] || item.meta?.title as string || name

    items.push({
      title,
      path: item.path === route.path ? undefined : item.path
    })
  })

  return items
})
</script>

<style scoped lang="scss">
.breadcrumb-container {
  padding: 15px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;

  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: #6b7280;
      font-size: 14px;

      &.is-link {
        color: #6b7280;

        &:hover {
          color: #3b82f6;
        }
      }
    }

    &:last-child {
      .el-breadcrumb__inner {
        color: #1f2937;
        font-weight: 500;
      }
    }
  }
}
</style>
