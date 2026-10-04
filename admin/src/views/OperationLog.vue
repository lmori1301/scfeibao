<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Calendar, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import QueryFilter from '@/components/QueryFilter.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'

const searchForm = ref({ username: '', action: '', startDate: '', endDate: '' })
const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange, resetAndFetch } = usePagination(
  (params: Record<string, any>) =>
    http.get('/admin/operation-logs', {
      params: {
        username: params.username,
        action: params.action,
        startDate: params.startDate,
        endDate: params.endDate,
        page: params.page,
        pageSize: params.pageSize,
      },
    })
)

const fetchLogs = async () => {
  await fetch({
    username: searchForm.value.username || undefined,
    action: searchForm.value.action || undefined,
    startDate: searchForm.value.startDate || undefined,
    endDate: searchForm.value.endDate || undefined,
  })
}

const handleSearch = () => {
  resetAndFetch({
    username: searchForm.value.username || undefined,
    action: searchForm.value.action || undefined,
    startDate: searchForm.value.startDate || undefined,
    endDate: searchForm.value.endDate || undefined,
  })
}
const handleReset = () => {
  searchForm.value = { username: '', action: '', startDate: '', endDate: '' }
  resetAndFetch()
}
const handleExport = async () => {
  const res = await http.get('/admin/operation-logs/export', {
    params: {
      username: searchForm.value.username || undefined,
      action: searchForm.value.action || undefined,
    },
  })
  const rows = res.data || []
  ElMessage.success(`已生成导出数据，共 ${rows.length} 条`)
}

onMounted(fetchLogs)
</script>

<template>
  <div class="operation-log-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 操作日志</div>

    <div class="admin-card admin-card--search">
      <QueryFilter :searching="loading" @search="handleSearch" @reset="handleReset">
        <div class="qf__group" data-title="操作信息"></div>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="操作类型">
          <el-input v-model="searchForm.action" placeholder="请输入操作类型" clearable />
        </el-form-item>
        <div class="qf__group" data-title="时间范围"></div>
        <el-form-item label="开始时间">
          <el-date-picker v-model="searchForm.startDate" type="date" placeholder="开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" class="qf-advanced">
          <el-date-picker v-model="searchForm.endDate" type="date" placeholder="结束时间" />
        </el-form-item>
      </QueryFilter>
    </div>

    <section class="admin-card admin-card--table operation-log-panel operation-log-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">操作日志列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button type="primary" plain @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="username" label="用户名" width="140" />
        <el-table-column label="操作类型" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.action }}</template>
        </el-table-column>
        <el-table-column label="操作模块" min-width="160" show-overflow-tooltip>
          <template #default="{ row }">{{ row.module }}</template>
        </el-table-column>
        <el-table-column prop="ip" label="IP 地址" width="160" />
        <el-table-column label="操作时间" width="200">
          <template #default="{ row }">
            <div class="meta-item">
              <el-icon><Calendar /></el-icon>
              <span>{{ row.time }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.operation-log-page { display: flex; flex-direction: column; gap: 18px; }
.operation-log-panel { border: 1px solid #e6edf7; background: #fff; padding: 20px; border-radius: 22px; overflow: hidden; }
.operation-log-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.operation-log-toolbar__filters :deep(.el-input),
.operation-log-toolbar__filters :deep(.el-date-editor) {
  flex: 0 1 auto;
}
.log-cell { display: flex; align-items: center; }
.log-cell__meta { min-width: 0; }
.log-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.log-cell__meta span { display: block; margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; }
.meta-item { display: inline-flex; align-items: center; gap: 8px; color: #607089; font-size: 13px; }
</style>
