<template>
  <div class="website-config">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>网站配置</span>
        </div>
      </template>

      <el-form :model="formData" label-width="120px" style="max-width: 600px">
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

        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="saving">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import http from '@/utils/http'

const formData = ref({
  host_unit: '',
  organizer_unit: '',
  icp_number: '',
  copyright: ''
})

const saving = ref(false)

// 获取配置
const fetchConfig = async () => {
  try {
    const res = await http.get('/config')
    if (res.data) {
      formData.value = {
        host_unit: res.data.host_unit || '',
        organizer_unit: res.data.organizer_unit || '',
        icp_number: res.data.icp_number || '',
        copyright: res.data.copyright || ''
      }
    }
  } catch (error) {
    ElMessage.error('获取配置失败')
  }
}

// 保存配置
const handleSave = async () => {
  saving.value = true
  try {
    // 逐个更新配置项
    await http.post('/config', {
      key: 'host_unit',
      value: formData.value.host_unit,
      description: '主办单位'
    })
    await http.post('/config', {
      key: 'organizer_unit',
      value: formData.value.organizer_unit,
      description: '承办单位'
    })
    await http.post('/config', {
      key: 'icp_number',
      value: formData.value.icp_number,
      description: 'ICP备案号'
    })
    await http.post('/config', {
      key: 'copyright',
      value: formData.value.copyright,
      description: '版权信息'
    })
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<style scoped lang="scss">
.website-config {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
