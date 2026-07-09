<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = shallowRef()
const valueHtml = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  if (val !== valueHtml.value) {
    valueHtml.value = val
  }
})

const toolbarConfig = {}
const uploadHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const editorConfig = {
  placeholder: props.placeholder || '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/admin/upload/image',
      fieldName: 'file',
      headers: uploadHeaders(),
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedFileTypes: ['image/*'],
      customInsert(res: any, insertFn: any) {
        // 处理上传成功后的响应，插入图片到编辑器
        if (res && res.url) {
          insertFn(res.url, res.alt || '', res.href || '')
        } else if (res && res.data && res.data.url) {
          insertFn(res.data.url, res.data.alt || '', res.data.href || '')
        } else {
          ElMessage.error('图片上传失败：响应格式错误')
        }
      },
      onBeforeUpload(file: File) {
        if (file.size > 10 * 1024 * 1024) {
          ElMessage.error('图片大小不能超过10MB')
          return false
        }
        return true
      },
      onFailed(file: File, res: any) {
        ElMessage.error(`图片上传失败：${res.message || '未知错误'}`)
      },
      onError(file: File, err: any) {
        ElMessage.error(`图片上传错误：${err.message || '网络错误'}`)
      }
    },
    uploadVideo: {
      server: '/api/admin/upload/video',
      fieldName: 'file',
      headers: uploadHeaders(),
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedFileTypes: ['video/*'],
      customInsert(res: any, insertFn: any) {
        // 处理上传成功后的响应，插入视频到编辑器
        if (res && res.url) {
          insertFn(res.url, res.poster || '')
        } else if (res && res.data && res.data.url) {
          insertFn(res.data.url, res.data.poster || '')
        } else {
          ElMessage.error('视频上传失败：响应格式错误')
        }
      },
      onBeforeUpload(file: File) {
        if (file.size > 50 * 1024 * 1024) {
          ElMessage.error('视频大小不能超过50MB')
          return false
        }
        return true
      },
      onFailed(file: File, res: any) {
        ElMessage.error(`视频上传失败：${res.message || '未知错误'}`)
      },
      onError(file: File, err: any) {
        ElMessage.error(`视频上传错误：${err.message || '网络错误'}`)
      }
    }
  }
}

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

const handleChange = (editor: any) => {
  valueHtml.value = editor.getHtml()
  emit('update:modelValue', valueHtml.value)
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) editor.destroy()
})
</script>

<template>
  <div class="rich-text-editor" :style="{ border: '1px solid #ccc' }">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="'default'" style="border-bottom: 1px solid #ccc" />
    <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="'default'" :style="{ height: height || '400px', 'overflow-y': 'hidden' }" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<style scoped lang="scss">
.rich-text-editor {
  :deep(.w-e-text-placeholder) {
    top: 10px;
  }

  // 弹窗居中显示
  :deep(.w-e-modal) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }

  // 调整弹窗层级
  :deep(.w-e-modal-mask) {
    z-index: 2000 !important;
  }

  :deep(.w-e-modal-container) {
    z-index: 2001 !important;
  }
}
</style>
