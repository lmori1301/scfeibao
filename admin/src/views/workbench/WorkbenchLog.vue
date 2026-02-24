<script setup lang="ts">
import { ref } from 'vue'

const logs = ref([
  { id: 1, user: 'admin', action: '登录系统', module: '系统', time: '2024-01-15 10:30:00' },
  { id: 2, user: 'admin', action: '编辑新闻', module: '内容管理', time: '2024-01-15 10:35:00' },
  { id: 3, user: 'editor', action: '新增证书', module: '查询系统', time: '2024-01-15 11:00:00' }
])

const filterType = ref('')
</script>

<template>
  <div class="workbench-log">
    <div class="header">
      <h2>操作日志</h2>
      <el-select v-model="filterType" placeholder="操作类型" clearable style="width: 150px">
        <el-option label="登录" value="登录" />
        <el-option label="新增" value="新增" />
        <el-option label="编辑" value="编辑" />
        <el-option label="删除" value="删除" />
      </el-select>
    </div>

    <el-table :data="logs" stripe>
      <el-table-column prop="user" label="用户" width="120" />
      <el-table-column prop="action" label="操作" width="150" />
      <el-table-column prop="module" label="模块" width="120" />
      <el-table-column prop="time" label="时间" width="180" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.workbench-log {
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; h2 { margin: 0; font-size: 20px; font-weight: 500; } }
}
</style>
