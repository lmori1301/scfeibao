<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import http from '@/utils/http'

const loading = ref(false)
const capabilityRows = ref<any[]>([])
const backupRecords = ref<any[]>([])

const suggestionRows = [
  '下一步可继续接入真实数据库导出、对象存储归档和恢复流程。',
  '备份执行建议接入操作日志，形成完整审计链路。',
  '如需恢复能力，建议新增二次确认与环境白名单。 ',
]

const fetchOverview = async () => {
  loading.value = true
  try {
    const res = await http.get('/admin/data-backup/overview')
    capabilityRows.value = res.data?.capabilities || []
    backupRecords.value = res.data?.records || []
  } finally {
    loading.value = false
  }
}

const handleRunBackup = async () => {
  await http.post('/admin/data-backup/run', { triggerBy: 'admin-ui' })
  ElMessage.success('已触发手动备份')
  fetchOverview()
}

onMounted(fetchOverview)
</script>

<template>
  <div class="backup-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 数据备份</div>

    <section class="admin-card admin-card--table backup-panel">
      <div class="panel-title">能力接入清单</div>
      <el-table :data="capabilityRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="item" label="能力项" width="180" />
        <el-table-column prop="status" label="接入状态" width="120">
          <template #default="{ row }"><el-tag type="warning">{{ row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="detail" label="说明" min-width="360" />
      </el-table>
    </section>

    <section class="admin-card admin-card--table backup-panel">
      <div class="panel-title">备份记录</div>
      <div class="backup-actions">
        <el-button type="primary" @click="handleRunBackup">执行手动备份</el-button>
      </div>
      <el-table :data="backupRecords" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column prop="triggerBy" label="触发人" width="160" />
        <el-table-column prop="createdAt" label="执行时间" min-width="220" />
      </el-table>
    </section>

    <section class="admin-card admin-card--table backup-panel">
      <div class="panel-title">建议上线项</div>
      <div class="backup-suggestions">
        <div v-for="item in suggestionRows" :key="item" class="backup-suggestion">{{ item }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.backup-panel { padding: 0; border: 0; background: transparent; }
.backup-actions { margin-bottom: 12px; }
.backup-suggestion { border: 1px solid #e6edf7; background: #fff; }
.backup-suggestions { display: flex; flex-direction: column; gap: 12px; }
.backup-suggestion { padding: 14px 16px; border-radius: 14px; background: #f8fbff; color: #48576d; line-height: 1.7; }
</style>
