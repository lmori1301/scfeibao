<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RefreshRight, User } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'
import QueryFilter from '@/components/QueryFilter.vue'
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
      <QueryFilter :collapsible="false" :searching="loading" @search="handleSearch" @reset="handleReset">
        <el-form-item label="账号状态">
          <el-select v-model="searchForm.scope" placeholder="全部状态" clearable>
            <el-option label="启用中" value="启用中" />
            <el-option label="已禁用" value="已禁用" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="输入用户名、姓名或手机号" clearable />
        </el-form-item>
      </QueryFilter>
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
      <el-table max-height="calc(100vh - 320px)" :data="tableData" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" fixed="left" />
        <el-table-column label="头像" width="80" align="center">
          <template #default="{ row }">
            <div class="user-avatar"><el-icon><User /></el-icon></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="140" show-overflow-tooltip />
        <el-table-column prop="username" label="用户名" min-width="180" show-overflow-tooltip />
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
.user-avatar {
  width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2563eb; font-size: 18px; margin: 0 auto;
}
</style>
