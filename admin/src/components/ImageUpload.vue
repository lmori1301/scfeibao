<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { parsePhotoUrlList } from '@/utils/photo-urls'

const props = withDefaults(
  defineProps<{
    modelValue: string
    limit?: number
    size?: number
  }>(),
  {
    limit: 1,
    size: 5,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileList = ref<any[]>([])

const urlsFromModel = (raw: string) => parsePhotoUrlList(raw)

const syncFileListFromModel = (raw: string) => {
  const urls = urlsFromModel(raw)
  fileList.value = urls.map((url) => ({ url, name: url.split('/').pop() || 'image' }))
}

watch(
  () => props.modelValue,
  (newValue) => {
    syncFileListFromModel(newValue || '')
  },
  { immediate: true }
)

const urlsFromUploadFiles = (list: any[]) =>
  list
    .map((f) => {
      const fromRes = f?.response?.data?.url ?? f?.response?.url
      return (typeof fromRes === 'string' ? fromRes : '') || (typeof f?.url === 'string' ? f.url : '')
    })
    .filter(Boolean)

const emitValue = (urls: string[]) => {
  if (props.limit === 1) {
    emit('update:modelValue', urls[0] || '')
  } else {
    emit('update:modelValue', urls.length ? JSON.stringify(urls) : '')
  }
}

const handleSuccess = (response: any, _file: any, uploadFiles: any[]) => {
  const imageUrl = response?.data?.url ?? response?.url
  if (!imageUrl) {
    ElMessage.error('图片上传返回异常')
    return
  }
  nextTick(() => {
    emitValue(urlsFromUploadFiles(uploadFiles?.length ? uploadFiles : fileList.value))
  })
}

const handleRemove = (_file: any, uploadFiles: any[]) => {
  nextTick(() => {
    emitValue(urlsFromUploadFiles(uploadFiles || []))
  })
}

const handleError = () => {
  ElMessage.error('图片上传失败，请稍后重试')
}

const handleExceed = () => {
  ElMessage.warning(`最多上传 ${props.limit} 张图片，请先移除后再上传`)
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
    :on-error="handleError"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>
