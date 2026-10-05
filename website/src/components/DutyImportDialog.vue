<script setup lang="ts">
/**
 * 值班台账上传弹窗
 *
 * 表单项：值班年份（下拉）、队伍名称（下拉）、附件（仅 .xlsx，≤10MB）
 * 提交时展示上传进度与解析结果；错误信息按后端返回逐条展示，可重试。
 */
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox, type FormItemRule, type UploadFile, type UploadProps } from 'element-plus'
import { UploadFilled, User, Document } from '@element-plus/icons-vue'
import {
  getTeamNameOptions,
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
const result = ref<DutyImportResponse | null>(null)
const loadingOptions = ref(false)

/** 当前年-月（YYYY-MM），用于年月选择器默认值 */
function currentYearMonth(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** 可下载的值班表模板（位于 public/templates） */
const templateUrl = import.meta.env.BASE_URL + 'templates/duty-roster-template.xlsx'

const form = ref({
  dutyYear: '',
  teamName: '',
  submitterName: '',
  attachment: '',
})

const rules = {
  dutyYear: [{ required: true, message: '请选择值班年月', trigger: 'change' }],
  teamName: [{ required: true, message: '请选择队伍名称', trigger: 'change' }],
  submitterName: [{ required: true, message: '请输入提交人', trigger: 'blur' }],
  attachment: [{ required: true, validator: validateAttachment, trigger: 'change' }],
}

/** 附件必须在列表中且未超出大小限制 */
const hasValidFile = computed(() => fileList.value.some((f) => f.raw))

const loadOptions = async () => {
  loadingOptions.value = true
  try {
    const teams = await getTeamNameOptions()
    teamOptions.value = teams
  } catch (error) {
    console.error('获取队伍名称选项失败:', error)
    ElMessage.warning('队伍名称加载失败，可稍后重试或直接联系管理员')
  } finally {
    loadingOptions.value = false
  }
}

const reset = () => {
  form.value = {
    dutyYear: '',
    teamName: '',
    submitterName: '',
    attachment: '',
  }
  fileList.value = []
  percent.value = 0
  result.value = null
  formRef.value?.clearValidate()
}

const handleClosed = () => {
  reset()
}

/** 校验附件是否已上传 */
function validateAttachment(_rule: FormItemRule, _value: any, callback: (err?: Error) => void) {
  if (fileList.value.some((f) => f.raw)) {
    callback()
  } else {
    callback(new Error('请上传值班表附件'))
  }
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
  formRef.value?.validateField('attachment').catch(() => {})
}

const handleChange: UploadProps['onChange'] = () => {
  formRef.value?.validateField('attachment').catch(() => {})
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
    title="四川飞豹救援值班值守台账"
    width="640px"
    class="duty-import-dialog"
    append-to-body
    :lock-scroll="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="!submitting"
    :before-close="confirmClose"
    @closed="handleClosed"
  >
    <div class="duty-import__body">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px" class="duty-import__form">
        <el-form-item label="年月" prop="dutyYear" class="duty-import__form-item">
          <el-date-picker
            v-model="form.dutyYear"
            type="month"
            placeholder="请选择"
            value-format="YYYY-MM"
            format="YYYY-MM"
            popper-class="duty-month-popper"
            :teleported="false"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="队伍名称" prop="teamName" class="duty-import__form-item">
          <el-select
            v-model="form.teamName"
            placeholder="请选择"
            filterable
            :loading="loadingOptions"
            style="width: 100%"
          >
            <el-option v-for="t in teamOptions" :key="t.value" :label="t.label" :value="t.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="提交人" prop="submitterName" class="duty-import__form-item">
          <el-input v-model="form.submitterName" placeholder="请输入提交人" maxlength="32" clearable>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="附件" prop="attachment" :rules="rules.attachment" class="duty-import__upload-item">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            :auto-upload="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-change="handleChange"
            accept=".xlsx"
            drag
            style="width: 100%"
          >
            <div class="duty-upload__inner">
              <div class="duty-upload__icon">
                <el-icon><UploadFilled /></el-icon>
              </div>
              <div class="duty-upload__text">
                <strong>点击选择文件</strong> 或将值班表拖拽到此处
              </div>
              <div class="duty-upload__meta">
                仅支持 .xlsx 格式，单个文件不超过 {{ MAX_SIZE_MB }}MB
              </div>
            </div>
          </el-upload>
        </el-form-item>

        <!-- 下载模板：下方附可下载的值班表模板 -->
        <div class="duty-import__template">
          <el-icon class="duty-import__template-icon"><Document /></el-icon>
          <span>请下载</span>
          <a
            class="duty-import__template-link"
            :href="templateUrl"
            download="四川飞豹救援值班表.xlsx"
          >《四川飞豹救援值班表》模板</a>
          <span>，按规范格式填写完毕后上传至上方附件。</span>
        </div>
      </el-form>

      <!-- 上传进度 -->
      <div v-if="submitting || percent > 0" class="duty-import__progress">
        <div class="duty-import__progress-label">上传进度</div>
        <el-progress :percentage="percent" :status="submitting ? undefined : 'success'" />
      </div>

      <!-- 解析结果 / 错误明细 -->
      <el-alert
        v-if="result && (result.created > 0 || result.errors.length > 0)"
        :type="result.created > 0 ? (result.errors.length ? 'warning' : 'success') : 'error'"
        :closable="false"
        show-icon
        class="duty-import__result"
      >
        <template #title>{{ result.message }}</template>
        <div v-if="result.errors.length" class="duty-import__errors">
          <p v-for="(e, i) in result.errors" :key="i">
            <span v-if="e.row > 0">第 {{ e.row }} 行：</span>{{ e.message }}
          </p>
        </div>
        <el-button v-if="result.created === 0" link type="primary" @click="handleRetry">重新选择文件</el-button>
      </el-alert>
    </div>

    <template #footer>
      <div class="duty-import__footer">
        <el-button :disabled="submitting" @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" :disabled="!hasValidFile" @click="handleSubmit">
          {{ submitting ? '提交中…' : '提交信息' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.duty-import__body {
  padding: 4px 0 0;
}

.duty-import__form :deep(.el-form-item__label) {
  font-size: 14px;
  color: #333;
}

.duty-import__form-item {
  margin-bottom: 12px;
}

.duty-import__upload-item {
  margin-bottom: 6px;
}

.duty-import__upload-item :deep(.el-upload-dragger) {
  padding: 0;
  border-style: dashed;
  border-color: #c0d4e8;
  background: #fafcff;
}

.duty-import__upload-item :deep(.el-upload-dragger:hover) {
  border-color: #2a82e4;
  background: #f5faff;
}

.duty-upload__inner {
  padding: 12px 16px;
  text-align: center;
}

.duty-upload__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 10px;
  border-radius: 50%;
  background: #e6f1ff;
  color: #2a82e4;
  font-size: 22px;
}

.duty-upload__text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.duty-upload__text strong {
  color: #2a82e4;
  font-weight: 600;
}

.duty-upload__meta {
  margin-top: 6px;
  font-size: 12px;
  color: #888;
}

.duty-import__progress {
  margin-top: 14px;
}

.duty-import__progress-label {
  margin-bottom: 6px;
  font-size: 13px;
  color: #555;
}

.duty-import__result {
  margin-top: 14px;
}

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 0;
  padding: 14px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.duty-import-dialog .el-dialog__title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #333;
}

.duty-import-dialog .el-dialog__headerbtn {
  position: static;
  top: auto;
  right: auto;
  width: auto;
  height: auto;
  font-size: 18px;
  line-height: 1;
}

.duty-import-dialog .el-dialog__close {
  color: #909399;
}

.duty-import-dialog .el-dialog__close:hover {
  color: #606266;
}

.duty-import-dialog .el-dialog__body {
  padding: 16px 20px 4px;
}

.duty-import-dialog .el-dialog__footer {
  padding: 12px 20px 4px;
  border-top: 1px solid #f0f0f0;
}

/* 年月选择器浮层面板：确保不被弹窗内容截断，且与输入框间距更紧凑 */
.duty-month-popper.el-picker__popper {
  z-index: 3000 !important;
}

.duty-import__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.duty-import__template {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 2px;
  padding: 9px 12px;
  font-size: 13px;
  color: #555;
  background: #f7f9fc;
  border: 1px dashed #d6e2f0;
  border-radius: 4px;
}

.duty-import__template-icon {
  color: #2a82e4;
  font-size: 15px;
}

.duty-import__template-link {
  color: #2a82e4;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.duty-import__template-link:hover {
  text-decoration: underline;
}
</style>
