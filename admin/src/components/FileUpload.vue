<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  modelValue: string
  accept?: string
  size?: number
}>(), {
  accept: '.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar',
  size: 100
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'file-change': [data: { url: string; originalName: string }]
}>()

// 从URL中提取文件名
function getFileName(url: string): string {
  if (!url) return ''
  const parts = url.split('/')
  return parts[parts.length - 1] || '附件'
}

// 文件列表
const fileList = ref<any[]>([])

// 初始化文件列表
if (props.modelValue) {
  fileList.value = [{ name: getFileName(props.modelValue), url: props.modelValue }]
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    fileList.value = [{ name: getFileName(newValue), url: newValue }]
  } else {
    fileList.value = []
  }
})

// 自定义上传函数
const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('/api/admin/upload/file', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (result.code === 200) {
      const url = result.data?.url || result.url
      const originalName = result.data?.originalName || result.originalName || getFileName(url)

      // 更新文件列表
      fileList.value = [{
        name: originalName,
        url: url,
        status: 'success',
        uid: file.uid
      }]

      emit('update:modelValue', url)
      emit('file-change', { url, originalName })

      onSuccess(result)
    } else {
      ElMessage.error(result.message || '文件上传失败')
      onError(new Error('上传失败'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error('文件上传失败，请稍后重试')
    onError(error)
  }
}

const handleSuccess = async (response: any, file: any, uploadFileList: any[]) => {
  const url = response.data?.url || response.url
  const originalName = response.data?.originalName || response.originalName || getFileName(url)

  // 先清空 fileList
  fileList.value = []

  // 使用 nextTick 确保 DOM 更新后再设置新值
  await nextTick()

  // 设置新的文件列表
  fileList.value = [{
    name: originalName,
    url: url,
    status: 'success',
    uid: Date.now()
  }]

  emit('update:modelValue', url)
  emit('file-change', { url, originalName })
}

const handleRemove = () => {
  emit('update:modelValue', '')
  emit('file-change', { url: '', originalName: '' })
}

const handleExceed = () => {
  ElMessage.warning('仅支持上传 1 个文件，请先删除已有文件')
}

const handleError = () => {
  ElMessage.error('文件上传失败，请检查网络或文件格式后重试')
}

const beforeUpload = (file: File) => {
  const isLt = file.size / 1024 / 1024 < props.size

  if (!isLt) {
    ElMessage.error(`文件大小不能超过 ${props.size}MB`)
    return false
  }
  return true
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    :http-request="handleUpload"
    :accept="accept"
    :limit="1"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :on-error="handleError"
  >
    <el-button type="primary">
      <el-icon class="el-icon--left"><Document /></el-icon>
      选择文件
    </el-button>
    <template #tip>
      <div class="el-upload__tip">
        支持格式：{{ accept }}，文件大小不超过 {{ size }}MB
      </div>
    </template>
  </el-upload>
</template>

<style scoped>
.el-upload__tip {
  font-size: 14px;
  color: #606266;
  margin-top: 8px;
}
</style>
