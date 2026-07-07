<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RefreshRight, Search, User } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'
import { formatDateTimeLocal } from '@/utils/format'

type AdminUserItem = {
  id: number
  username: string
  name: string
  phone?: string
  email?: string
  role?: string
  status: 'active' | 'disabled'
  createTime: string
}

type StaffScope = '' | '启用中' | '已禁用'

const searchForm = ref({
  keyword: '',
  scope: '' as StaffScope,
})
const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange, resetAndFetch } = usePagination(
  (params: Record<string, any>) =>
    http.get('/admin/users', {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        username: params.keyword,
        status:
          params.scope === '启用中'
            ? 'active'
            : params.scope === '已禁用'
              ? 'disabled'
              : undefined,
      },
    })
)

const fetchUsers = async () => {
  await fetch({
    keyword: searchForm.value.keyword.trim() || undefined,
    scope: searchForm.value.scope || undefined,
  })
}

const handleSearch = () => {
  resetAndFetch({
    keyword: searchForm.value.keyword.trim() || undefined,
    scope: searchForm.value.scope || undefined,
  })
}

const handleReset = () => {
  searchForm.value = { keyword: '', scope: '' }
  resetAndFetch()
}

const getStatusLabel = (status: string) => (status === 'active' ? '启用' : '禁用')

onMounted(fetchUsers)
</script>

<template>
  <div class="user-management-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 人员管理</div>

    <div class="admin-card admin-card--search">
    <div class="admin-list-toolbar">
      <div class="admin-list-toolbar__filters user-management-toolbar__filters">
        <el-select v-model="searchForm.scope" placeholder="账号状态" clearable style="min-width: 120px">
          <el-option label="启用中" value="启用中" />
          <el-option label="已禁用" value="已禁用" />
        </el-select>
        <el-input v-model="searchForm.keyword" placeholder="输入用户名、姓名或手机号" clearable style="min-width: 220px; max-width: 420px; flex: 1">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </div>
      <div class="admin-list-toolbar__actions">
        <div class="admin-toolbar-actions__primary">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
    </div>

    <section class="admin-card admin-card--table user-management-panel user-management-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">后台人员名录</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchUsers">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="人员信息" min-width="300">
          <template #default="{ row }">
            <div class="user-cell">
              <div class="user-cell__avatar"><el-icon><User /></el-icon></div>
              <div class="user-cell__meta">
                <strong>{{ row.name || row.username }}</strong>
                <span>{{ row.username }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" min-width="180" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机号" width="160" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱" min-width="220" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ getStatusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template #default="{ row }">{{ formatDateTimeLocal(row.createTime) }}</template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.user-management-page { display: flex; flex-direction: column; gap: 18px; }
.user-management-panel { border: 1px solid #e6edf7; background: #fff; padding: 20px; border-radius: 22px; overflow: hidden; }
.user-management-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.user-management-toolbar__filters :deep(.el-input),
.user-management-toolbar__filters :deep(.el-select) {
  flex: 0 1 auto;
}
.user-cell { display: flex; gap: 14px; align-items: center; }
.user-cell__avatar {
  width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2f67ff; font-size: 22px;
}
.user-cell__meta { min-width: 0; }
.user-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.user-cell__meta span { display: block; margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; word-break: break-all; }
</style>
