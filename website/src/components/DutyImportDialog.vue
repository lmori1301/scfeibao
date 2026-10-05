<script setup lang="ts">
/**
 * 值班台账上传弹窗
 *
 * 表单项：值班年份（下拉）、队伍名称（下拉）、附件（仅 .xlsx，≤10MB）
 * 提交时展示上传进度与解析结果；错误信息按后端返回逐条展示，可重试。
 */
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox, type UploadFile, type UploadProps } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import {
  getTeamNameOptions,
  getDutyYearOptions,
  importTeamDutyXlsx,
  type DutyDictOption,
  type DutyImportResponse,
} from '@/api/team-duty'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

/** 与后端 FileInterceptor 的 10MB 限制保持一致 */
const MAX_SIZE_MB = 10

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const formRef = ref()
const submitting = ref(false)
const percent = ref(0)
const fileList = ref<UploadFile[]>([])
const teamOptions = ref<DutyDictOption[]>([])
const yearOptions = ref<DutyDictOption[]>([])
const result = ref<DutyImportResponse | null>(null)
const loadingOptions = ref(false)

const form = ref({
  dutyYear: String(new Date().getFullYear()),
  teamName: '',
  submitterName: '',
})

const rules = {
  dutyYear: [{ required: true, message: '请选择值班年份', trigger: 'change' }],
  teamName: [{ required: true, message: '请选择队伍名称', trigger: 'change' }],
}

/** 附件必须在列表中且未超出大小限制 */
const hasValidFile = computed(() => fileList.value.some((f) => f.raw))

const loadOptions = async () => {
  loadingOptions.value = true
  try {
    const [teams, years] = await Promise.all([getTeamNameOptions(), getDutyYearOptions()])
    teamOptions.value = teams
    yearOptions.value = years
    if (!form.value.teamName && teams.length) {
      form.value.teamName = teams[0].value
    }
  } catch (error) {
    console.error('获取值班下拉选项失败:', error)
    ElMessage.warning('下拉选项加载失败，可稍后重试或直接联系管理员')
  } finally {
    loadingOptions.value = false
  }
}

const reset = () => {
  form.value = {
    dutyYear: String(new Date().getFullYear()),
    teamName: teamOptions.value[0]?.value || '',
    submitterName: '',
  }
  fileList.value = []
  percent.value = 0
  result.value = null
  formRef.value?.clearValidate()
}

const handleClosed = () => {
  reset()
}

// ---- 附件校验：格式 + 大小 ----
const beforeUpload: UploadProps['beforeUpload'] = (raw) => {
  const name = (raw.name || '').toLowerCase()
  if (!name.endsWith('.xlsx')) {
    ElMessage.error('仅支持 .xlsx 格式的值班表（.xls / CSV 请先另存为 .xlsx）')
    return false
  }
  if (raw.size / 1024 / 1024 > MAX_SIZE_MB) {
    ElMessage.error(`文件大小不能超过 ${MAX_SIZE_MB}MB`)
    return false
  }
  percent.value = 0
  result.value = null
  return true
}

const handleRemove = () => {
  percent.value = 0
  result.value = null
}

// ---- 提交 ----
const handleSubmit = async () => {
  if (submitting.value) return
  const raw = fileList.value.find((f) => f.raw)?.raw
  if (!raw) {
    ElMessage.error('请先选择要上传的值班表文件')
    return
  }

  try {
    await formRef.value.validate()
  } catch {
    return
  }

  submitting.value = true
  percent.value = 0
  result.value = null

  try {
    const res: any = await importTeamDutyXlsx({
      file: raw,
      teamName: form.value.teamName,
      dutyYear: form.value.dutyYear,
      submitterName: form.value.submitterName || undefined,
      onUploadProgress: (p) => {
        percent.value = p
      },
    })
    const data: DutyImportResponse = res?.data ?? res
    result.value = data

    if (data.created > 0) {
      ElMessage.success(data.message || '导入成功')
      visible.value = false
    } else {
      ElMessage.warning(data.message || '未新增记录，请查看解析提示')
    }
  } catch (error: any) {
    // 后端抛的 BadRequestException 在响应体 message 里
    const msg = String(error?.response?.data?.message || error?.message || error || '上传失败')
    ElMessage.error(msg.length > 60 ? msg.slice(0, 60) + '…' : msg)
  } finally {
    submitting.value = false
  }
}

const handleRetry = () => {
  result.value = null
  percent.value = 0
}

const confirmClose = () => {
  if (!submitting.value) {
    visible.value = false
    return
  }
  ElMessageBox.confirm('文件正在上传，确定要关闭吗？', '提示', { type: 'warning' }).then(() => {
    visible.value = false
  })
}

onMounted(loadOptions)
watch(() => props.modelValue, (v) => {
  if (v) void loadOptions()
})
</script>

<template>
  <el-dialog
    v-if="visible"
    v-model="visible"
    title="请各单位负责人上传应急值班值守台账"
    width="480px"
    class="duty-import-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="!submitting"
    :before-close="confirmClose"
    @closed="handleClosed"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="96px">
      <el-form-item label="年份" prop="dutyYear">
        <el-select
          v-model="form.dutyYear"
          placeholder="请选择台账所属年份"
          :loading="loadingOptions"
          style="width: 100%"
        >
          <el-option v-for="y in yearOptions" :key="y.value" :label="y.label" :value="y.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="队伍名称" prop="teamName">
        <el-select
          v-model="form.teamName"
          placeholder="请选择队伍名称"
          filterable
          :loading="loadingOptions"
          style="width: 100%"
        >
          <el-option v-for="t in teamOptions" :key="t.value" :label="t.label" :value="t.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="提交人">
        <el-input v-model="form.submitterName" placeholder="选填，便于追溯提交人" maxlength="32" clearable />
      </el-form-item>

      <el-form-item label="台账附件">
        <el-upload
          v-model:file-list="fileList"
          action="#"
          :auto-upload="false"
          :limit="1"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          accept=".xlsx"
          drag
          style="width: 100%"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将值班表拖到此处，或<em>点击选择文件</em></div>
          <template #tip>
            <div class="el-upload__tip">
              仅支持 .xlsx 格式，单个文件不超过 {{ MAX_SIZE_MB }}MB。<br />
              表格需为「日期为列」的值班表样式（首行含 时间 / 日期 列，并有 值班干部 / 值班人员 行）。
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <!-- 上传进度 -->
      <el-form-item v-if="submitting || percent > 0" label="上传进度">
        <el-progress :percentage="percent" :status="submitting ? undefined : 'success'" />
      </el-form-item>

      <!-- 解析结果 / 错误明细 -->
      <el-alert
        v-if="result && (result.created > 0 || result.errors.length > 0)"
        :type="result.created > 0 ? (result.errors.length ? 'warning' : 'success') : 'error'"
        :closable="false"
        show-icon
      >
        <template #title>{{ result.message }}</template>
        <div v-if="result.errors.length" class="duty-import__errors">
          <p v-for="(e, i) in result.errors" :key="i">
            <span v-if="e.row > 0">第 {{ e.row }} 行：</span>{{ e.message }}
          </p>
        </div>
        <el-button v-if="result.created === 0" link type="primary" @click="handleRetry">重新选择文件</el-button>
      </el-alert>
    </el-form>

    <template #footer>
      <el-button type="primary" :loading="submitting" :disabled="!hasValidFile" @click="handleSubmit">
        {{ submitting ? '提交中…' : '提交信息' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.duty-import__errors {
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  max-height: 120px;
  overflow-y: auto;
}

.duty-import__errors p {
  margin: 0;
}
</style>

<style>
.duty-import-dialog .el-dialog__header {
  margin-right: 0;
  padding: 14px 20px 10px;
}

.duty-import-dialog .el-dialog__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.duty-import-dialog .el-dialog__body {
  padding: 8px 20px 6px;
}

.duty-import-dialog .el-dialog__footer {
  padding: 10px 20px 14px;
}

.duty-import-dialog .el-form-item {
  margin-bottom: 12px;
}

.duty-import-dialog .el-form-item__label {
  font-size: 14px;
  line-height: 32px;
}

.duty-import-dialog .el-upload-dragger {
  padding: 16px 12px;
}

.duty-import-dialog .el-icon--upload {
  margin-bottom: 8px;
  font-size: 36px;
}
</style>
