<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  modelValue: string
  limit?: number
  size?: number
}>(), {
  limit: 1,
  size: 5
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileList = ref<any[]>(props.modelValue ? [{ url: props.modelValue }] : [])

// 监听 modelValue 变化，更新 fileList
watch(() => props.modelValue, (newValue) => {
  fileList.value = newValue ? [{ url: newValue }] : []
})

const handleSuccess = (response: any) => {
  emit('update:modelValue', response.data.url)
}

const handleRemove = () => {
  emit('update:modelValue', '')
  fileList.value = []
}

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt = file.size / 1024 / 1024 < props.size

  if (!isImage) {
    ElMessage.error('只能上传图片文件')
    return false
  }
  if (!isLt) {
    ElMessage.error(`图片大小不能超过 ${props.size}MB`)
    return false
  }
  return true
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    action="/api/admin/upload/image"
    list-type="picture-card"
    :limit="limit"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>
