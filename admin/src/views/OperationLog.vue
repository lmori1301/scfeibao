<script setup lang="ts">
import { ref } from 'vue'

const searchForm = ref({ username: '', action: '', startDate: '', endDate: '' })
const tableData = ref([
  { id: 1, username: 'admin', action: '登录系统', module: '系统', ip: '192.168.1.100', time: '2024-01-15 10:30:00' },
  { id: 2, username: 'admin', action: '编辑新闻', module: '内容管理', ip: '192.168.1.100', time: '2024-01-15 10:35:00' }
])

const handleSearch = () => {}
const handleReset = () => { searchForm.value = { username: '', action: '', startDate: '', endDate: '' } }
const handleExport = () => {}
</script>

<template>
  <div class="operation-log">
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名"><el-input v-model="searchForm.username" placeholder="请输入用户名" clearable /></el-form-item>
        <el-form-item label="操作类型"><el-input v-model="searchForm.action" placeholder="请输入操作类型" clearable /></el-form-item>
        <el-form-item label="开始时间"><el-date-picker v-model="searchForm.startDate" type="date" placeholder="选择日期" /></el-form-item>
        <el-form-item label="结束时间"><el-date-picker v-model="searchForm.endDate" type="date" placeholder="选择日期" /></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button><el-button @click="handleReset">重置</el-button></el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <div class="table-header">
        <h3>操作日志列表</h3>
        <el-button type="primary" plain @click="handleExport"><el-icon><Download /></el-icon>导出</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="action" label="操作" width="140" />
        <el-table-column prop="module" label="模块" width="120" />
        <el-table-column prop="ip" label="IP地址" width="120" />
        <el-table-column prop="time" label="操作时间" width="160" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.operation-log { .search-card { margin-bottom: 16px; :deep(.el-card__body) { padding: 16px; } :deep(.el-form-item) { margin-bottom: 0; } } .table-card { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } } }
</style>
