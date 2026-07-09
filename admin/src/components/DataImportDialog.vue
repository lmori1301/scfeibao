<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, type UploadFile } from 'element-plus'
import http from '@/utils/http'

type ImportField = {
  label: string
  required?: boolean
}

type ImportResult = {
  total: number
  created: number
  updated: number
  failed: number
  errors?: Array<{ row: number; message: string }>
}

const props = defineProps<{
  modelValue: boolean
  title: string
  action: string
  fields: ImportField[]
  matchRule: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'success'): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const result = ref<ImportResult | null>(null)

const requiredFields = computed(() => props.fields.filter((field) => field.required).map((field) => field.label))
const optionalFields = computed(() => props.fields.filter((field) => !field.required).map((field) => field.label))

watch(
  () => props.modelValue,
  (open) => {
    if (!open) {
      selectedFile.value = null
      result.value = null
      uploading.value = false
    }
  }
)

const handleFileChange = (uploadFile: UploadFile) => {
  selectedFile.value = uploadFile.raw ?? null
  result.value = null
}

const handleFileRemove = () => {
  selectedFile.value = null
  result.value = null
}

const handleImport = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请选择要导入的 Excel 文件')
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    uploading.value = true
    const response = await http.post(props.action, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    })
    result.value = response?.data ?? response
    ElMessage.success('导入完成')
    emit('success')
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="720px" align-center destroy-on-close>
    <div class="data-import">
      <section class="data-import__guide">
        <div class="data-import__guide-title">字段要求</div>
        <p>支持 .xlsx、.xls 文件；首行必须为表头。{{ matchRule }}</p>
        <div class="data-import__fields">
          <div>
            <strong>必填字段</strong>
            <span>{{ requiredFields.join('、') || '无' }}</span>
          </div>
          <div>
            <strong>可选字段</strong>
            <span>{{ optionalFields.join('、') || '无' }}</span>
          </div>
        </div>
      </section>

      <el-upload
        drag
        :auto-upload="false"
        :limit="1"
        accept=".xlsx,.xls"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">拖拽 Excel 到此处，或点击选择文件</div>
      </el-upload>

      <section v-if="result" class="data-import__result">
        <div class="data-import__stat">
          <span>总行数</span><strong>{{ result.total }}</strong>
          <span>新增</span><strong>{{ result.created }}</strong>
          <span>更新</span><strong>{{ result.updated }}</strong>
          <span>失败</span><strong>{{ result.failed }}</strong>
        </div>
        <div v-if="result.errors?.length" class="data-import__errors">
          <div v-for="error in result.errors.slice(0, 8)" :key="`${error.row}-${error.message}`">
            第 {{ error.row }} 行：{{ error.message }}
          </div>
          <p v-if="result.errors.length > 8">仅显示前 8 条失败原因，请修正文件后重新导入。</p>
        </div>
      </section>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" :loading="uploading" @click="handleImport">开始导入</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.data-import {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-import__guide {
  border: 1px solid #e6edf7;
  border-radius: 8px;
  padding: 14px 16px;
  background: #f8fbff;

  p {
    margin: 6px 0 12px;
    color: #65758b;
    line-height: 1.6;
  }
}

.data-import__guide-title {
  font-weight: 700;
  color: #1f2f46;
}

.data-import__fields {
  display: grid;
  gap: 8px;

  div {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 10px;
    line-height: 1.6;
  }

  strong {
    color: #334155;
  }

  span {
    color: #475569;
    word-break: break-word;
  }
}

.data-import__result {
  border: 1px solid #e7eef8;
  border-radius: 8px;
  padding: 14px 16px;
}

.data-import__stat {
  display: grid;
  grid-template-columns: repeat(4, auto 1fr);
  gap: 8px 10px;
  align-items: center;

  span {
    color: #6b7280;
  }

  strong {
    color: #1f2f46;
  }
}

.data-import__errors {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eef3fb;
  color: #b42318;
  line-height: 1.7;

  p {
    margin: 6px 0 0;
    color: #7a879d;
  }
}
</style>
