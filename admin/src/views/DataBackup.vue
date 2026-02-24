<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const backupList = ref([
  { id: 1, fileName: 'backup_20240115_103000.sql', size: '15.2 MB', createTime: '2024-01-15 10:30:00', type: '手动备份' },
  { id: 2, fileName: 'backup_20240114_230000.sql', size: '14.8 MB', createTime: '2024-01-14 23:00:00', type: '自动备份' }
])

const autoBackup = ref({ enabled: true, time: '23:00', keepDays: 7 })

const handleBackup = () => {
  ElMessageBox.confirm('确定执行手动备份吗？', '提示', { type: 'warning' }).then(() => {
    ElMessage.success('备份任务已启动，请稍候...')
  })
}

const handleRestore = (row: any) => {
  ElMessageBox.confirm(`确定恢复到备份 ${row.fileName} 吗？此操作不可逆！`, '警告', { type: 'error' }).then(() => {
    ElMessage.success('恢复任务已启动')
  })
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该备份文件吗？', '提示', { type: 'warning' }).then(() => {
    ElMessage.success('删除成功')
  })
}

const handleDownload = (row: any) => {
  ElMessage.success('下载已开始')
}

const saveAutoBackup = () => {
  ElMessage.success('自动备份配置已保存')
}
</script>

<template>
  <div class="data-backup">
    <el-card shadow="never" style="margin-bottom: 20px">
      <div class="card-header">
        <h3>手动备份</h3>
        <el-button type="primary" @click="handleBackup"><el-icon><FolderOpened /></el-icon>立即备份</el-button>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-bottom: 20px">
      <h3 style="margin: 0 0 16px 0">自动备份配置</h3>
      <el-form :model="autoBackup" label-width="120px">
        <el-form-item label="启用自动备份">
          <el-switch v-model="autoBackup.enabled" />
        </el-form-item>
        <el-form-item label="备份时间">
          <el-time-select v-model="autoBackup.time" start="00:00" end="23:59" step="01:00" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="保留天数">
          <el-input-number v-model="autoBackup.keepDays" :min="1" :max="30" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveAutoBackup">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <h3 style="margin: 0 0 16px 0">备份历史</h3>
      <el-table :data="backupList" stripe>
        <el-table-column prop="fileName" label="文件名" />
        <el-table-column prop="size" label="大小" width="120" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === '手动备份' ? 'primary' : 'success'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button text type="success" size="small" @click="handleRestore(row)">恢复</el-button>
            <el-button text type="primary" size="small" @click="handleDownload(row)">下载</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.data-backup { .card-header { display: flex; justify-content: space-between; align-items: center; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-card__body) h3 { font-size: 16px; font-weight: 500; } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } }
</style>
