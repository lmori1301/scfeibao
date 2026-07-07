<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

type NavigationItem = {
  id: number
  name: string
  path: string
  source: string
  visible: boolean
  sort: number
}

const loading = ref(false)
const navItems = ref<NavigationItem[]>([])
const page = ref(1)
const pageSize = ref(10)

const statusTabs = ['全部导航', '显示中']
const activeTab = ref('全部导航')

const filteredRows = computed(() => {
  if (activeTab.value === '显示中') return navItems.value.filter((item) => item.visible)
  return navItems.value
})

const total = computed(() => filteredRows.value.length)

const tableRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
}

const fetchNavItems = async () => {
  loading.value = true
  try {
    const res = await http.get('/admin/navigation')
    navItems.value = res.data || []
  } finally {
    loading.value = false
  }
}

const handleToggleVisible = async (row: NavigationItem, visible: boolean) => {
  await http.put(`/admin/navigation/${row.id}`, {
    visible,
    sort: row.sort,
  })
  row.visible = visible
  ElMessage.success('导航状态已更新')
}

const handleSaveSort = async (row: NavigationItem) => {
  await http.put(`/admin/navigation/${row.id}`, {
    visible: row.visible,
    sort: Number(row.sort || 0),
  })
  ElMessage.success('导航排序已保存')
  fetchNavItems()
}

onMounted(fetchNavItems)
 
</script>

<template>
  <div class="navigation-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 导航设置</div>

    <div class="admin-card admin-card--search">
      <div class="admin-list-toolbar">
        <div class="navigation-toolbar__filters">
          <div class="navigation-tabs">
            <button
              v-for="tab in statusTabs"
              :key="tab"
              type="button"
              class="navigation-tab"
              :class="{ active: activeTab === tab }"
              @click="activeTab = tab; page = 1"
            >
              {{ tab }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="admin-card admin-card--table navigation-panel navigation-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">前台主导航映射</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchNavItems">
            <el-icon><RefreshRight /></el-icon>
            刷新视图
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="导航项" min-width="220">
          <template #default="{ row }">
            <div class="nav-cell">
              <div class="nav-cell__meta">
                <strong>{{ row.name }}</strong>
                <span>{{ row.path }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源文件" min-width="300" show-overflow-tooltip />
        <el-table-column label="排序" width="140">
          <template #default="{ row }">
            <div class="nav-sort-cell">
              <el-input-number v-model="row.sort" :min="1" :step="1" controls-position="right" />
              <el-button link type="primary" @click="handleSaveSort(row)">保存</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="当前状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.visible ? 'success' : 'info'">{{ row.visible ? '显示中' : '已隐藏' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-switch
              :model-value="row.visible"
              inline-prompt
              active-text="显示"
              inactive-text="隐藏"
              @change="(value: boolean | string | number) => handleToggleVisible(row, Boolean(value))"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.navigation-panel.navigation-table-panel {
  padding: 0;
  border: 0;
  background: transparent;
}
.navigation-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.navigation-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.navigation-tab {
  min-width: 108px; height: 40px; padding: 0 18px; border: 1px solid #d8e3fa; border-radius: 12px; background: #f7faff;
  color: #607089; font-size: 13px; font-weight: 600; cursor: pointer;
  &.active { color: #fff; border-color: transparent; background: linear-gradient(135deg, #4f73ff 0%, #2f67ff 100%); }
}
.nav-cell { display: flex; align-items: center; }
.nav-cell__meta { min-width: 0; }
.nav-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.nav-cell__meta span { display: block; margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; word-break: break-all; }
.nav-sort-cell { display: flex; align-items: center; gap: 8px; }
</style>
