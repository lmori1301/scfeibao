<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const config = ref({
  siteName: '四川飞豹救援',
  logo: '',
  copyright: '© 2024 四川飞豹救援 版权所有'
})

const handleSave = () => ElMessage.success('保存成功')
</script>

<template>
  <div class="site-config">
    <el-card shadow="never">
      <h3>网站配置</h3>
      <el-form :model="config" label-width="120px" style="max-width: 600px; margin-top: 20px;">
        <el-form-item label="网站名称"><el-input v-model="config.siteName" /></el-form-item>
        <el-form-item label="版权信息"><el-input v-model="config.copyright" type="textarea" :rows="3" /></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSave">保存配置</el-button></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.site-config { :deep(.el-card__body) { padding: 20px; } h3 { margin: 0 0 20px 0; font-size: 16px; font-weight: 500; } }
</style>
