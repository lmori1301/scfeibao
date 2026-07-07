<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import http from '@/utils/http'

const formData = ref({
  host_unit: '',
  organizer_unit: '',
  icp_number: '',
  copyright: '',
})

const saving = ref(false)

const fetchConfig = async () => {
  try {
    const res = await http.get('/config')
    if (res.data) {
      formData.value = {
        host_unit: res.data.host_unit || '',
        organizer_unit: res.data.organizer_unit || '',
        icp_number: res.data.icp_number || '',
        copyright: res.data.copyright || '',
      }
    }
  } catch {
    ElMessage.error('获取配置失败')
  }
}

const handleSave = async () => {
  saving.value = true
  try {
    await http.post('/config', { key: 'host_unit', value: formData.value.host_unit, description: '主办单位' })
    await http.post('/config', { key: 'organizer_unit', value: formData.value.organizer_unit, description: '承办单位' })
    await http.post('/config', { key: 'icp_number', value: formData.value.icp_number, description: 'ICP备案号' })
    await http.post('/config', { key: 'copyright', value: formData.value.copyright, description: '版权信息' })
    ElMessage.success('保存成功')
  } catch {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <div class="site-config-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 网站配置</div>

    <section class="admin-card admin-card--table site-config-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">基础配置</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchConfig">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" :loading="saving" @click="handleSave">保存配置</el-button>
        </div>
      </div>
      <div class="site-config-layout">
        <el-form :model="formData" label-width="110px" class="config-form">
          <el-form-item label="主办单位">
            <el-input v-model="formData.host_unit" placeholder="请输入主办单位" />
          </el-form-item>
          <el-form-item label="承办单位">
            <el-input v-model="formData.organizer_unit" placeholder="请输入承办单位" />
          </el-form-item>
          <el-form-item label="ICP备案号">
            <el-input v-model="formData.icp_number" placeholder="请输入ICP备案号" />
          </el-form-item>
          <el-form-item label="版权信息">
            <el-input v-model="formData.copyright" placeholder="请输入版权信息" />
          </el-form-item>
        </el-form>

        <aside class="preview-card">
          <strong>官网页脚预览</strong>
          <p>{{ formData.host_unit || '主办单位' }}</p>
          <p>{{ formData.organizer_unit || '承办单位' }}</p>
          <span>{{ formData.icp_number || 'ICP备案号' }}</span>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.site-config-panel.site-config-panel {
  padding: 0;
  border: 0;
  background: transparent;
}
.site-config-panel .site-config-layout {
  padding: 0 4px 4px;
}
.preview-card { border: 1px solid #e6edf7; background: #fff; }
.site-config-layout { display: grid; grid-template-columns: minmax(0, 1.35fr) 280px; gap: 18px; align-items: start; }
.preview-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
  align-self: start;
}
.preview-card strong { display: block; font-size: 18px; color: #1f2f46; line-height: 1.5; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; line-height: 1.6; }
.preview-card span { display: inline-block; margin-top: 10px; padding: 6px 10px; border-radius: 999px; background: rgba(47,103,255,.1); color: #2f67ff; font-size: 12px; font-weight: 600; }
@media (max-width: 1200px) {
  .site-config-layout { grid-template-columns: 1fr; }
}
</style>
