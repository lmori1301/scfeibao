<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Document, Plus, RefreshRight, Search, UploadFilled, Bell, Close, ArrowUp } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type UploadFile } from 'element-plus'
import { readSheet } from 'read-excel-file/browser'
import http from '@/utils/http'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import { parseDutyRoster, type DutyRosterRow } from '@/utils/duty-roster-parser'
import {
  createTeamDuty,
  createTeamDutyBatch,
  deleteTeamDuty,
  getDutyYearOptions,
  getTeamDutyDetail,
  getTeamDutyList,
  getTeamNameOptions,
  updateTeamDuty,
  type DictOption,
  type TeamDutyItem,
} from '@/api/team-duty'

const route = useRoute()

const pageCrumb = computed(() => {
  const group = String(route.meta.groupTitle ?? '').trim()
  const title = String(route.meta.title ?? '').trim()
  if (group && title) return `系统首页 / ${group} / ${title}`
  return '系统首页 / 档案台账 / 值班台账'
})

/** 值班须知文案（需求指定，三条固定文案） */
const DUTY_NOTICES = [
  '值班人员必须24小时通讯畅通，时刻保持备勤待命状态；',
  '值班人员必须具备高度责任心，坚守岗位、履行职责，严禁饮酒，切实做好人民群众生命财产安全保障工作；',
  '妥善处理值班当日各类事务，如遇重大问题须及时请示上级领导。',
]

/* ------------------------------ 悬浮提示卡片 ------------------------------ */
/**
 * 需求要求「可折叠、不遮挡表单操作」。
 * 真机实测：默认展开时卡片（x 988-1256）会压住表格「操作」列（x 1064-1274）。
 * 因此默认收起为右下角小圆钮，点击才展开；展开时给列表容器加右侧留白让位。
 */
const noticeExpanded = ref(false)
const toggleNotice = () => {
  noticeExpanded.value = !noticeExpanded.value
}

/* -------------------------------- 字典下拉 -------------------------------- */
const teamOptions = ref<DictOption[]>([])
const yearOptions = ref<DictOption[]>([])
const currentYear = String(new Date().getFullYear())

const loadDictOptions = async () => {
  try {
    const [teamRes, yearRes] = await Promise.all([getTeamNameOptions(), getDutyYearOptions()])
    teamOptions.value = (teamRes?.data ?? teamRes ?? []) as DictOption[]
    yearOptions.value = (yearRes?.data ?? yearRes ?? []) as DictOption[]
  } catch {
    teamOptions.value = []
    yearOptions.value = []
  }
  if (!yearOptions.value.some((item) => item.value === currentYear)) {
    yearOptions.value = [{ label: `${currentYear}年`, value: currentYear, sort: 0 }, ...yearOptions.value]
  }
}

/* --------------------------------- 列表 --------------------------------- */
const searchForm = reactive({ teamName: '', dutyYear: '', keyword: '' })

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params: any) =>
  getTeamDutyList(params)
)

const buildQuery = () => {
  const q: Record<string, any> = {}
  if (searchForm.teamName) q.teamName = searchForm.teamName
  if (searchForm.dutyYear) q.dutyYear = searchForm.dutyYear
  if (searchForm.keyword) q.keyword = searchForm.keyword
  return q
}

const handleSearch = () => {
  page.value = 1
  fetch(buildQuery())
}

const handleReset = () => {
  searchForm.teamName = ''
  searchForm.dutyYear = ''
  searchForm.keyword = ''
  page.value = 1
  fetch({})
}

/* ------------------------------ 新增/导入表单 ------------------------------ */
const formDialogVisible = ref(false)
const formDialogMode = ref<'single' | 'import'>('import')
const formTitle = computed(() => (formDialogMode.value === 'import' ? '新增值班台账（附件导入）' : '新增值班台账（单条）'))
const submitting = ref(false)

const formData = reactive({
  teamName: '',
  dutyYear: currentYear,
  dutyDate: '',
  dutyCadreName: '',
  dutyCadrePhone: '',
  dutyStaff: '',
  remark: '',
})

/** 附件上传结果 */
const attachUrl = ref('')
const attachName = ref('')
const attachFile = ref<File | null>(null)

/** 解析预览行 */
const parsedRows = ref<DutyRosterRow[]>([])
const parseErrors = ref<Array<{ row: number; message: string }>>([])
const parsing = ref(false)

const resetForm = () => {
  formData.teamName = ''
  formData.dutyYear = currentYear
  formData.dutyDate = ''
  formData.dutyCadreName = ''
  formData.dutyCadrePhone = ''
  formData.dutyStaff = ''
  formData.remark = ''
  attachUrl.value = ''
  attachName.value = ''
  attachFile.value = null
  parsedRows.value = []
  parseErrors.value = []
}

const openImportDialog = () => {
  formDialogMode.value = 'import'
  resetForm()
  formDialogVisible.value = true
  nextTick(() => uploadRef.value?.clearFiles())
}

const openSingleDialog = () => {
  formDialogMode.value = 'single'
  resetForm()
  formDialogVisible.value = true
  nextTick(() => uploadRef.value?.clearFiles())
}

const uploadRef = ref()
const uploadFileList = ref<UploadFile[]>([])

/** 选择 Excel 后立即解析并回填预览（不自动上传，提交时再真正落盘） */
const handleFileChange = async (uploadFile: UploadFile) => {
  const raw = uploadFile.raw
  if (!raw) return
  // ⚠️ 必须在此持有 File 引用：提交时 uploadAttachment() 靠它上传，
  // 否则附件丢失（曾导致导入的记录 attach_name 全为 NULL）。
  attachFile.value = raw
  attachUrl.value = ''
  attachName.value = raw.name
  parsing.value = true
  parsedRows.value = []
  parseErrors.value = []
  try {
    // readSheet 返回二维单元格数组（SheetData = Row[]，元素含 null），日期/文本原样保留
    const matrix = await readSheet(raw)
    const result = parseDutyRoster(matrix as unknown as unknown[][])

    parsedRows.value = result.rows
    parseErrors.value = result.errors

    // 自动回填：识别到的队伍/年份覆盖表单（表单为空时才填，避免覆盖用户已选）
    if (result.detectedTeamName && !formData.teamName) {
      const matched = teamOptions.value.find((item) => item.value === result.detectedTeamName)
      formData.teamName = matched?.value ?? result.detectedTeamName
    }
    if (result.detectedYear && formData.dutyYear === currentYear) {
      formData.dutyYear = result.detectedYear
    }

    if (result.rows.length) {
      ElMessage.success(`解析成功，共识别 ${result.rows.length} 天值班记录`)
    } else {
      ElMessage.warning('未从文件中解析到值班记录，请检查表格结构')
    }
    if (result.errors.length) {
      ElMessage.warning(`有 ${result.errors.length} 列/行未通过校验，请查看解析提示`)
    }
  } catch (error: any) {
    // readSheet 抛的是英文异常（如 "Doesn't look like an `.xlsx` file"），
    // 直接透给用户不友好 → 归一化成中文提示，原始信息只留在控制台便于排查。
    const raw = String(error?.message || error || '')
    console.warn('[TeamDuty] Excel 解析失败：', raw)
    parseErrors.value = [{ row: 0, message: toFriendlyParseError(raw) }]
    ElMessage.error('文件解析失败，请上传 .xlsx 格式的值班表')
  } finally {
    parsing.value = false
  }
}

const handleFileRemove = () => {
  attachFile.value = null
  attachUrl.value = ''
  attachName.value = ''
  parsedRows.value = []
  parseErrors.value = []
}

/** 把 Excel 库的英文异常归一化成面向用户的中文提示 */
function toFriendlyParseError(rawMessage: string): string {
  const msg = String(rawMessage || '')
  if (/doesn't look like an? .?\.?xlsx/i.test(msg) || /invalid spreadsheet|zip/i.test(msg)) {
    return '文件不是有效的 .xlsx 文件（若为 .xls 或 CSV，请先另存为 .xlsx 格式）'
  }
  if (/password|encrypted/i.test(msg)) {
    return '文件已加密，请解除密码保护后再上传'
  }
  if (/not found|sheet/i.test(msg)) {
    return '未在文件中找到工作表，请确认文件内容完整'
  }
  if (!msg) return '文件解析失败，请上传 .xlsx 格式的值班表'
  return `文件解析失败：${msg}（请确认上传的是 .xlsx 格式值班表）`
}

/** 单条新增模式下的普通附件（不做解析） */
const handleSingleFileChange = (uploadFile: UploadFile) => {
  attachFile.value = uploadFile.raw ?? null
  attachUrl.value = ''
  attachName.value = ''
}

const handleSingleFileRemove = () => {
  attachFile.value = null
  attachUrl.value = ''
  attachName.value = ''
}

/** 统一附件上传：走项目既有 /admin/upload/file 接口，返回 { url, originalName } */
const uploadAttachmentFile = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  const response: any = await http.post('/admin/upload/file', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  })
  const result = response?.data ?? response
  const url = result?.data?.url || result?.url
  const name = result?.data?.originalName || result?.originalName || file.name
  if (!url) {
    throw new Error(result?.message || '附件上传失败')
  }
  return { url, name }
}

/** 提交前把附件真正上传到后端，拿到可预览的 URL */
const uploadAttachment = async (): Promise<{ url: string; name: string } | null> => {
  if (attachUrl.value) {
    return { url: attachUrl.value, name: attachName.value }
  }
  const file = attachFile.value
  if (!file) return null

  const { url, name } = await uploadAttachmentFile(file)
  attachUrl.value = url
  attachName.value = name
  return { url, name }
}

const handleSubmit = async () => {
  if (!formData.teamName) {
    ElMessage.warning('请选择队伍名称')
    return
  }
  if (!formData.dutyYear) {
    ElMessage.warning('请选择值班年份')
    return
  }

  submitting.value = true
  try {
    if (formDialogMode.value === 'import') {
      if (parsedRows.value.length === 0) {
        ElMessage.warning('请先上传并解析值班表 Excel')
        return
      }
      const attachment = await uploadAttachment()
      const result: any = await createTeamDutyBatch({
        teamName: formData.teamName,
        dutyYear: formData.dutyYear,
        attachUrl: attachment?.url,
        attachName: attachment?.name,
        items: parsedRows.value.map((row) => ({
          dutyDate: row.dutyDate,
          dutyCadreName: row.dutyCadreName,
          dutyCadrePhone: row.dutyCadrePhone,
          dutyStaff: row.dutyStaff,
        })),
      })
      const created = result?.data?.created ?? result?.created ?? parsedRows.value.length
      ElMessage.success(
        attachment
          ? `导入成功，共写入 ${created} 条值班记录（附件已保存，同队伍同日期为覆盖更新）`
          : `导入成功，共写入 ${created} 条值班记录`,
      )
    } else {
      if (!formData.dutyCadreName.trim()) {
        ElMessage.warning('请填写值班干部')
        return
      }
      if (!formData.dutyStaff.trim()) {
        ElMessage.warning('请填写值班员')
        return
      }
      const attachment = await uploadAttachment()
      await createTeamDuty({
        teamName: formData.teamName,
        dutyYear: formData.dutyYear,
        dutyDate: formData.dutyDate || undefined,
        dutyCadreName: formData.dutyCadreName,
        dutyCadrePhone: formData.dutyCadrePhone || undefined,
        dutyStaff: formData.dutyStaff,
        remark: formData.remark || undefined,
        attachUrl: attachment?.url,
        attachName: attachment?.name,
      })
      ElMessage.success('保存成功')
    }

    formDialogVisible.value = false
    page.value = 1
    fetch(buildQuery())
  } catch (error: any) {
    ElMessage.error(error?.message || '提交失败')
  } finally {
    submitting.value = false
  }
}

const handleDialogClosed = () => {
  resetForm()
  uploadFileList.value = []
}

/* --------------------------------- 编辑 --------------------------------- */
const editDialogVisible = ref(false)
const editForm = reactive({
  id: 0,
  teamName: '',
  dutyYear: '',
  dutyDate: '',
  dutyCadreName: '',
  dutyCadrePhone: '',
  dutyStaff: '',
  remark: '',
  attachUrl: '' as string | null,
  attachName: '' as string | null,
})
const editSubmitting = ref(false)
const editUploadRef = ref()
const editFileList = ref<UploadFile[]>([])
const editPendingFile = ref<File | null>(null)

const openEdit = (row: TeamDutyItem) => {
  editForm.id = row.id
  editForm.teamName = row.teamName || ''
  editForm.dutyYear = row.dutyYear || ''
  editForm.dutyDate = toDateInput(row.dutyDate)
  editForm.dutyCadreName = row.dutyCadreName || ''
  editForm.dutyCadrePhone = row.dutyCadrePhone || ''
  editForm.dutyStaff = row.dutyStaff || ''
  editForm.remark = row.remark || ''
  editForm.attachUrl = row.attachUrl || null
  editForm.attachName = row.attachName || null
  editPendingFile.value = null
  editFileList.value = row.attachUrl
    ? [{ name: row.attachName || '值班表附件', url: row.attachUrl } as UploadFile]
    : []
  editDialogVisible.value = true
  nextTick(() => editUploadRef.value?.clearFiles())
}

const handleEditFileChange = (uploadFile: UploadFile) => {
  editPendingFile.value = uploadFile.raw ?? null
}

const handleEditFileRemove = () => {
  editPendingFile.value = null
  editForm.attachUrl = null
  editForm.attachName = null
  editFileList.value = []
}

const uploadEditAttachment = async () => {
  const file = editPendingFile.value
  if (!file) return

  const { url, name } = await uploadAttachmentFile(file)
  editForm.attachUrl = url
  editForm.attachName = name
}

const handleEditSubmit = async () => {
  if (!editForm.dutyCadreName.trim()) {
    ElMessage.warning('请填写值班干部')
    return
  }
  if (!editForm.dutyStaff.trim()) {
    ElMessage.warning('请填写值班员')
    return
  }
  editSubmitting.value = true
  try {
    if (editPendingFile.value) {
      await uploadEditAttachment()
    }
    await updateTeamDuty(editForm.id, {
      teamName: editForm.teamName,
      dutyYear: editForm.dutyYear,
      dutyDate: editForm.dutyDate || undefined,
      dutyCadreName: editForm.dutyCadreName,
      dutyCadrePhone: editForm.dutyCadrePhone || undefined,
      dutyStaff: editForm.dutyStaff,
      remark: editForm.remark || undefined,
      attachUrl: editForm.attachUrl || undefined,
      attachName: editForm.attachName || undefined,
    })
    ElMessage.success('保存成功')
    editDialogVisible.value = false
    fetch()
  } catch (error: any) {
    ElMessage.error(error?.message || '保存失败')
  } finally {
    editSubmitting.value = false
  }
}

/* --------------------------------- 详情 --------------------------------- */
const detailDialogVisible = ref(false)
const detailData = ref<TeamDutyItem | null>(null)
const detailLoading = ref(false)

const openDetail = async (row: TeamDutyItem) => {
  detailLoading.value = true
  try {
    const response: any = await getTeamDutyDetail(row.id)
    detailData.value = (response?.data ?? response) as TeamDutyItem
    detailDialogVisible.value = true
  } catch (error: any) {
    ElMessage.error(error?.message || '获取详情失败')
  } finally {
    detailLoading.value = false
  }
}

const handleDetailClosed = () => {
  detailData.value = null
}

/* -------------------------------- 删除 -------------------------------- */
const handleDelete = (row: TeamDutyItem) => {
  ElMessageBox.confirm(
    `确定删除「${row.teamName}｜${formatDate(row.dutyDate)}」这条值班记录吗？`,
    '提示',
    { type: 'warning' }
  )
    .then(async () => {
      await deleteTeamDuty(row.id)
      ElMessage.success('删除成功')
      fetch()
    })
    .catch(() => {})
}

/* ------------------------------- 附件预览 ------------------------------- */
const previewDialogVisible = ref(false)
const previewUrl = ref('')
const previewName = ref('')
const isExcel = (name: string) => /\.(xlsx|xls)$/i.test(name)

const openPreview = (row: TeamDutyItem) => {
  if (!row.attachUrl) {
    ElMessage.warning('该记录没有附件')
    return
  }
  previewUrl.value = row.attachUrl
  previewName.value = row.attachName || '值班表附件'
  previewDialogVisible.value = true
}

const windowOpen = (url: string) => {
  window.open(url, '_blank')
}

const downloadByUrl = (url: string, name: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name || '附件'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const downloadAttachment = (row: TeamDutyItem) => {
  if (!row.attachUrl) return
  downloadByUrl(row.attachUrl, row.attachName || '值班表附件')
}

/* -------------------------------- 工具函数 -------------------------------- */
const formatDate = (value: string | null) => (value ? toDateInput(value) : '—')

const toDateInput = (value: string | Date | null | undefined) => {
  if (!value) return ''
  if (value instanceof Date) {
    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, '0')
    const d = String(value.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  const s = String(value)
  return s.includes('T') ? s.slice(0, 10) : s.slice(0, 10)
}

const formatDateTime = (value: string | null) => {
  if (!value) return '—'
  return String(value).replace('T', ' ').slice(0, 19)
}

const staffList = (value: string | null) => (value ? value.split(',').filter(Boolean) : [])

onMounted(async () => {
  await loadDictOptions()
  fetch()
})
</script>

<template>
  <div class="team-duty-page admin-view-stack">
    <div class="page-crumb">{{ pageCrumb }}</div>

    <div class="team-card admin-card admin-card--search">
      <div class="admin-list-toolbar">
        <div class="admin-list-toolbar__filters">
          <el-select v-model="searchForm.teamName" placeholder="队伍名称" clearable style="width: 180px">
            <el-option v-for="opt in teamOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
          <el-select v-model="searchForm.dutyYear" placeholder="值班年份" clearable style="width: 130px">
            <el-option v-for="opt in yearOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
          <el-input v-model="searchForm.keyword" placeholder="值班干部 / 值班员 / 电话" clearable style="width: 240px">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>
        <div class="admin-list-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </div>
    </div>

    <section class="admin-card admin-card--table team-duty-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">值班台账列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button plain @click="openSingleDialog">
            <el-icon><Plus /></el-icon>
            单条新增
          </el-button>
          <el-button type="primary" @click="openImportDialog">
            <el-icon><UploadFilled /></el-icon>
            附件导入新增
          </el-button>
        </div>
      </div>

      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="队伍名称" min-width="150" show-overflow-tooltip>
          <template #default="{ row }">{{ row.teamName || '—' }}</template>
        </el-table-column>
        <el-table-column label="值班年份" width="100">
          <template #default="{ row }">{{ row.dutyYear || '—' }}</template>
        </el-table-column>
        <el-table-column label="值班日期" width="120">
          <template #default="{ row }">{{ formatDate(row.dutyDate) }}</template>
        </el-table-column>
        <el-table-column label="值班干部" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.dutyCadreName || '—' }}</template>
        </el-table-column>
        <el-table-column label="干部电话" width="140">
          <template #default="{ row }">{{ row.dutyCadrePhone || '—' }}</template>
        </el-table-column>
        <el-table-column label="值班员" min-width="220" show-overflow-tooltip>
          <template #default="{ row }">{{ staffList(row.dutyStaff).join('、') || '—' }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="{ row }">{{ formatDateTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="附件预览" width="120" align="center">
          <template #default="{ row }">
            <el-button v-if="row.attachUrl" link type="primary" @click="openPreview(row)">
              <el-icon><Document /></el-icon>
              预览
            </el-button>
            <span v-else class="team-duty-page__muted">无附件</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="210"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="openDetail(row)">查看详情</el-button>
              <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <!-- 悬浮值班须知卡片：默认收起为圆钮，点击展开，不遮挡表格操作列 -->
    <div class="duty-notice" :class="{ 'duty-notice--open': noticeExpanded }">
      <button type="button" class="duty-notice__head" @click="toggleNotice">
        <span class="duty-notice__title">
          <el-icon><Bell /></el-icon>
          <span class="duty-notice__label">值班须知</span>
        </span>
        <el-icon v-if="noticeExpanded" class="duty-notice__toggle"><Close /></el-icon>
        <el-icon v-else class="duty-notice__toggle"><ArrowUp /></el-icon>
      </button>
      <ol v-show="noticeExpanded" class="duty-notice__body">
        <li v-for="(notice, index) in DUTY_NOTICES" :key="index">{{ notice }}</li>
      </ol>
    </div>

    <!-- 新增 / 导入 -->
    <el-dialog v-model="formDialogVisible" :title="formTitle" width="1080px" @closed="handleDialogClosed">
      <div class="team-duty-form">
        <el-form label-width="96px">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="队伍名称" required>
                <el-select v-model="formData.teamName" placeholder="请选择队伍名称" filterable style="width: 100%">
                  <el-option v-for="opt in teamOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="值班年份" required>
                <el-select v-model="formData.dutyYear" placeholder="请选择值班年份" style="width: 100%">
                  <el-option v-for="opt in yearOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <template v-if="formDialogMode === 'import'">
            <el-form-item label="值班表附件">
              <el-upload
                ref="uploadRef"
                v-model:file-list="uploadFileList"
                drag
                :auto-upload="false"
                :limit="1"
                accept=".xlsx,.xls"
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
              >
                <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                <div class="el-upload__text">拖拽值班表到此处，或 <em>点击选择文件</em></div>
                <template #tip>
                  <div class="el-upload__tip">
                    支持 .xlsx / .xls；解析规则：识别「时间 / 值班干部（电话）/ 值班人员」三行，按日期列拆分为每天一条记录
                  </div>
                </template>
              </el-upload>
            </el-form-item>

            <el-form-item label="解析结果">
              <div v-loading="parsing" class="duty-parse">
                <div v-if="parsedRows.length" class="duty-parse__summary">
                  共解析 <strong>{{ parsedRows.length }}</strong> 条值班记录
                  <span v-if="parseErrors.length" class="duty-parse__errors-count">
                    ，{{ parseErrors.length }} 条未通过校验
                  </span>
                </div>
                <el-table v-if="parsedRows.length" :data="parsedRows" size="small" border max-height="280">
                  <el-table-column prop="dutyDate" label="值班日期" width="120" />
                  <el-table-column prop="dutyCadreName" label="值班干部" width="120" />
                  <el-table-column prop="dutyCadrePhone" label="联系电话" width="140" />
                  <el-table-column label="值班员" min-width="260">
                    <template #default="{ row }">{{ staffList(row.dutyStaff).join('、') }}</template>
                  </el-table-column>
                </el-table>
                <div v-if="parseErrors.length" class="duty-parse__errors">
                  <div v-for="(err, idx) in parseErrors.slice(0, 8)" :key="`${err.row}-${idx}`">
                    第 {{ err.row }} 行：{{ err.message }}
                  </div>
                  <p v-if="parseErrors.length > 8">仅显示前 8 条，请修正文件后重新上传。</p>
                </div>
                <div v-if="!parsedRows.length && !parsing" class="duty-parse__empty">
                  尚未解析到值班数据，请上传值班表 Excel
                </div>
              </div>
            </el-form-item>
          </template>

          <template v-else>
            <el-row :gutter="16">
              <el-col :span="12">
                <el-form-item label="值班日期">
                  <el-date-picker v-model="formData.dutyDate" type="date" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话">
                  <el-input v-model="formData.dutyCadrePhone" placeholder="值班干部联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="值班干部" required>
              <el-input v-model="formData.dutyCadreName" placeholder="值班干部姓名" />
            </el-form-item>
            <el-form-item label="值班员" required>
              <el-input v-model="formData.dutyStaff" placeholder="多人用顿号或逗号分隔，如：王磊、刘勇、周驰双、段才元" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remark" type="textarea" :rows="2" />
            </el-form-item>
          </template>

          <el-form-item label="附件">
            <el-upload
              v-if="formDialogMode === 'single'"
              ref="uploadRef"
              v-model:file-list="uploadFileList"
              :auto-upload="false"
              :limit="1"
              accept=".xlsx,.xls,.pdf,.doc,.docx"
              :on-change="handleSingleFileChange"
              :on-remove="handleSingleFileRemove"
            >
              <el-button type="primary" plain>
                <el-icon class="el-icon--left"><UploadFilled /></el-icon>
                选择附件
              </el-button>
              <template #tip>
                <div class="el-upload__tip">支持 Excel / PDF / Word，作为该条值班记录的附件</div>
              </template>
            </el-upload>
            <span v-else class="team-duty-form__muted">附件将随解析出的全部记录一并保存</span>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog v-model="editDialogVisible" title="编辑值班台账" width="760px">
      <el-form label-width="96px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="队伍名称">
              <el-select v-model="editForm.teamName" filterable style="width: 100%">
                <el-option v-for="opt in teamOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="值班年份">
              <el-select v-model="editForm.dutyYear" style="width: 100%">
                <el-option v-for="opt in yearOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="值班日期">
              <el-date-picker v-model="editForm.dutyDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editForm.dutyCadrePhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="值班干部" required>
          <el-input v-model="editForm.dutyCadreName" />
        </el-form-item>
        <el-form-item label="值班员" required>
          <el-input v-model="editForm.dutyStaff" placeholder="多人用顿号或逗号分隔" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.remark" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            ref="editUploadRef"
            v-model:file-list="editFileList"
            :auto-upload="false"
            :limit="1"
            accept=".xlsx,.xls,.pdf,.doc,.docx"
            :on-change="handleEditFileChange"
            :on-remove="handleEditFileRemove"
          >
            <el-button type="primary" plain>
              <el-icon class="el-icon--left"><UploadFilled /></el-icon>
              重新上传
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
                当前附件：{{ editForm.attachName || '无' }}；不重新上传则保留原附件
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="editSubmitting" @click="handleEditSubmit">保存</el-button>
      </template>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="值班台账详情"
      width="820px"
      align-center
      @closed="handleDetailClosed"
    >
      <div v-if="detailData" class="detail-card" v-loading="detailLoading">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="队伍名称">{{ detailData.teamName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="值班年份">{{ detailData.dutyYear || '-' }}</el-descriptions-item>
          <el-descriptions-item label="值班日期">{{ formatDate(detailData.dutyDate) }}</el-descriptions-item>
          <el-descriptions-item label="值班干部">{{ detailData.dutyCadreName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="干部电话">{{ detailData.dutyCadrePhone || '-' }}</el-descriptions-item>
          <el-descriptions-item label="创建人">{{ detailData.createBy || '-' }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ formatDateTime(detailData.createdAt) }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ detailData.remark || '-' }}</el-descriptions-item>
          <el-descriptions-item label="值班员" :span="2">
            <span v-if="staffList(detailData.dutyStaff).length">
              <el-tag v-for="name in staffList(detailData.dutyStaff)" :key="name" size="small" style="margin-right: 6px">
                {{ name }}
              </el-tag>
            </span>
            <span v-else>-</span>
          </el-descriptions-item>
          <el-descriptions-item label="附件" :span="2">
            <template v-if="detailData.attachUrl">
              <span>{{ detailData.attachName || '值班表附件' }}</span>
              <el-button link type="primary" style="margin-left: 10px" @click="openPreview(detailData!)">预览</el-button>
              <el-button link type="primary" @click="downloadAttachment(detailData!)">下载</el-button>
            </template>
            <span v-else>-</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 附件预览 -->
    <el-dialog v-model="previewDialogVisible" :title="previewName" width="900px" align-center>
      <div class="attach-preview">
        <iframe v-if="!isExcel(previewName)" :src="previewUrl" class="attach-preview__frame" title="附件预览" />
        <div v-else class="attach-preview__excel">
          <el-alert type="info" :closable="false" show-icon>
            Excel 文件请下载后使用 Excel / WPS 打开查看，或在列表中查看已解析的值班明细。
          </el-alert>
          <el-button type="primary" plain @click="windowOpen(previewUrl)">在新窗口打开</el-button>
        </div>
      </div>
      <template #footer>
        <el-button @click="previewDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="downloadByUrl(previewUrl, previewName)">下载附件</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.team-duty-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
/* 页面右侧间距与其他列表页保持一致：不再为悬浮「值班须知」卡片预留 padding-right，
   卡片展开时作为纯浮层叠在右下角（可随时收起），不挤压表格宽度。 */
.team-duty-table-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.team-duty-page__muted { color: #98a4b8; font-size: 13px; }

/* 悬浮值班须知卡片：右下角固定，浅蓝背景
   收起态 = 圆形图标钮（不遮挡任何表格列）；展开态 = 340px 卡片 */
.duty-notice {
  position: fixed;
  right: 20px;
  bottom: 88px;
  z-index: 1900;
  width: 52px;
  border: 1px solid #cfe1ff;
  border-radius: 26px;
  background: linear-gradient(180deg, #f2f8ff 0%, #e8f2ff 100%);
  box-shadow: 0 14px 32px rgba(31, 87, 168, 0.16);
  overflow: hidden;
  transition: width 0.22s ease, border-radius 0.22s ease;
}
.duty-notice--open { width: 340px; border-radius: 16px; }
.duty-notice__head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  padding: 12px 16px;
  border: 0;
  background: rgba(47, 103, 255, 0.08);
  color: #1b4fa0;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.duty-notice__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
/* 收起态只留图标，隐藏「值班须知」文字 */
.duty-notice:not(.duty-notice--open) .duty-notice__label { display: none; }
.duty-notice:not(.duty-notice--open) .duty-notice__head { padding: 12px; }
.duty-notice__toggle { color: #6b8cc4; }
.duty-notice:not(.duty-notice--open) .duty-notice__toggle { display: none; }
.duty-notice__body {
  margin: 0;
  padding: 4px 16px 14px 30px;
  color: #33507d;
  font-size: 12.5px;
  line-height: 1.85;
}

/* 解析结果区 */
.duty-parse { width: 100%; }
.duty-parse__summary { margin-bottom: 8px; color: #4b5f7d; font-size: 13px; }
.duty-parse__summary strong { color: #1b4fa0; font-size: 15px; }
.duty-parse__errors-count { color: #b45309; }
.duty-parse__errors {
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid #f5d9b0;
  border-radius: 10px;
  background: #fffaf2;
  color: #a35b09;
  font-size: 12.5px;
  line-height: 1.8;
}
.duty-parse__empty {
  padding: 24px;
  border: 1px dashed #cfe1ff;
  border-radius: 12px;
  background: #f7fbff;
  color: #8b98ad;
  text-align: center;
  font-size: 13px;
}

.team-duty-form__muted { color: #8b98ad; font-size: 13px; }

.attach-preview { min-height: 420px; }
.attach-preview__frame { width: 100%; height: 520px; border: 1px solid #e6edf8; border-radius: 12px; }
.attach-preview__excel { display: flex; flex-direction: column; gap: 14px; }

@media (max-width: 1440px) {
  /* 窄屏下缩小展开态卡片宽度，避免浮层过大（不再预留页面右侧留白） */
  .duty-notice--open { width: 284px; }
}
@media (max-width: 1180px) {
  /* 更窄时卡片进一步收窄 */
  .duty-notice--open { width: 252px; }
}
</style>
