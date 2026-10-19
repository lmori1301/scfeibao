<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, Plus } from '@element-plus/icons-vue'
import { parsePhotoUrlList } from '@/utils/photo-urls'
import http from '@/utils/http'
import ImageCropper from '@/components/ImageCropper.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    limit?: number
    size?: number
    /** 自定义上传前校验；返回 false 拦截。默认只做格式与大小校验 */
    beforeUpload?: (raw: File) => boolean | Promise<boolean>
    /** 传入宽高比（宽/高）时启用裁剪模式，上传前先按该比例裁剪 */
    aspectRatio?: number
    /** 裁剪导出宽度（px），默认 1600 */
    cropWidth?: number
    /** 裁剪导出高度（px），默认 600 */
    cropHeight?: number
    /** 裁剪弹窗标题 */
    cropTitle?: string
    /** 裁剪弹窗附加提示 */
    cropHint?: string
  }>(),
  {
    limit: 1,
    size: 5,
    beforeUpload: undefined,
    aspectRatio: undefined,
    cropWidth: 1600,
    cropHeight: 600,
    cropTitle: '裁剪图片',
    cropHint: '',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const uploadHeaders = computed(() => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
})

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

const handleError = (error: Error) => {
  let message = '图片上传失败，请稍后重试'
  try {
    const payload = JSON.parse((error as any)?.message || '{}')
    message = payload?.message || message
  } catch {
    message = (error as any)?.message || message
  }
  ElMessage.error(message)
}

const handleExceed = () => {
  ElMessage.warning(`最多上传 ${props.limit} 张图片，请先移除后再上传`)
}

const validateFile = async (file: File) => {
  // 与后端 upload.service.ts 的白名单保持一致
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const isImage = allowedTypes.includes(file.type)
  const isLt = file.size / 1024 / 1024 < props.size

  if (!isImage) {
    ElMessage.error('只支持 JPG / PNG / WebP 格式')
    return false
  }
  if (!isLt) {
    ElMessage.error(`图片大小不能超过 ${props.size}MB`)
    return false
  }
  // 有外部校验则叠加执行（如标语横幅的分辨率校验）
  if (props.beforeUpload) {
    return await props.beforeUpload(file)
  }
  return true
}

/* ---------------- 裁剪模式（传入 aspectRatio 时启用） ---------------- */

const isCropMode = computed(() => typeof props.aspectRatio === 'number' && props.aspectRatio > 0)

const aspectText = computed(() =>
  isCropMode.value ? `${Number(props.aspectRatio).toFixed(2)} : 1` : ''
)

const fileInputRef = ref<HTMLInputElement | null>(null)
const cropperVisible = ref(false)
const cropSrc = ref('')
const uploading = ref(false)

const revokeCropSrc = () => {
  if (cropSrc.value) {
    URL.revokeObjectURL(cropSrc.value)
    cropSrc.value = ''
  }
}

const pickFile = () => {
  if (uploading.value) return
  fileInputRef.value?.click()
}

const handleCropFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  // 允许重复选择同一文件
  input.value = ''
  if (!file) return
  if (!(await validateFile(file))) return
  revokeCropSrc()
  cropSrc.value = URL.createObjectURL(file)
  cropperVisible.value = true
}

const removeCropImage = () => {
  emit('update:modelValue', '')
}

const uploadCroppedBlob = async (blob: Blob) => {
  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', blob, `banner-${Date.now()}.jpg`)
    const res: any = await http.post('/admin/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    })
    const url = res?.data?.url || res?.url
    if (!url) throw new Error('图片上传返回异常')
    emit('update:modelValue', url)
    ElMessage.success('图片已上传')
  } catch (error: any) {
    ElMessage.error(error?.message || '图片上传失败，请稍后重试')
  } finally {
    uploading.value = false
  }
}

const handleCropConfirm = async (blob: Blob) => {
  revokeCropSrc()
  await uploadCroppedBlob(blob)
}
</script>

<template>
  <!-- 裁剪模式：选择图片 → 按固定比例裁剪 → 上传裁剪结果 -->
  <div v-if="isCropMode" class="crop-upload">
    <div
      v-if="modelValue"
      class="crop-upload__card"
      :style="{ aspectRatio: `${cropWidth} / ${cropHeight}` }"
    >
      <img :src="modelValue" alt="轮播图" />
      <div class="crop-upload__mask">
        <span @click.stop="pickFile">更换</span>
        <span @click.stop="removeCropImage">删除</span>
      </div>
      <div v-if="uploading" class="crop-upload__loading">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>上传中</span>
      </div>
    </div>
    <button
      v-else
      type="button"
      class="crop-upload__add"
      :style="{ aspectRatio: `${cropWidth} / ${cropHeight}` }"
      :disabled="uploading"
      @click="pickFile"
    >
      <el-icon v-if="!uploading"><Plus /></el-icon>
      <el-icon v-else class="is-loading"><Loading /></el-icon>
      <span v-if="!uploading">上传轮播图</span>
      <span v-else>上传中…</span>
    </button>

    <div class="crop-upload__meta">
      上传后按 {{ cropWidth }} × {{ cropHeight }} px（{{ aspectText }}）裁剪，与首页轮播区域一致
      <span v-if="cropHint" class="crop-upload__hint">{{ cropHint }}</span>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      class="crop-upload__input"
      accept="image/jpeg,image/png,image/gif,image/webp"
      @change="handleCropFileChange"
    />

    <ImageCropper
      v-model="cropperVisible"
      :src="cropSrc"
      :aspect-ratio="aspectRatio || 1"
      :output-width="cropWidth"
      :output-height="cropHeight"
      :title="cropTitle"
      :hint="cropHint"
      @confirm="handleCropConfirm"
      @closed="revokeCropSrc"
    />
  </div>

  <!-- 默认模式：保持原有 el-upload 行为不变 -->
  <el-upload
    v-else
    v-model:file-list="fileList"
    action="/api/admin/upload/image"
    list-type="picture-card"
    :headers="uploadHeaders"
    :limit="limit"
    :before-upload="validateFile"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-error="handleError"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>

<style scoped lang="scss">
.crop-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.crop-upload__card,
.crop-upload__add {
  position: relative;
  width: 260px;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  background: #f5f7fa;
}

.crop-upload__card {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.crop-upload__mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(0, 0, 0, 0.46);
  opacity: 0;
  transition: opacity 0.18s ease;

  span {
    color: #fff;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.crop-upload__card:hover .crop-upload__mask {
  opacity: 1;
}

.crop-upload__add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-style: dashed;
  color: #8c939d;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease;

  .el-icon {
    font-size: 22px;
  }

  &:hover:not(:disabled) {
    border-color: #409eff;
    color: #409eff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.crop-upload__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.82);
  color: #409eff;
  font-size: 12px;
}

.crop-upload__meta {
  color: #909399;
  font-size: 12px;
  line-height: 1.6;
}

.crop-upload__hint {
  margin-left: 8px;
  color: #b0b6c0;
}

.crop-upload__input {
  display: none;
}
</style>
