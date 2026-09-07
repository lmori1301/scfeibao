<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Download, Files, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import FileUpload from '@/components/FileUpload.vue'
import http from '@/utils/http'

const searchForm = ref({
  title: '',
  department: '',
  docScope: '' as '' | '已发布' | '含附件',
})
const dialogVisible = ref(false)
const dialogTitle = ref('新增人事任免')
const formRef = ref()
const formData = ref<Record<string, any>>({
  title: '',
  docNumber: '',
  publishDate: '',
  effectiveDate: '',
  department: '',
  attachment: '',
  attachmentName: '',
})

const rules = {
  title: [requiredRule('标题')],
  docNumber: [requiredRule('文号')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/appointments', { params: filteredParams })
})

const tableRows = computed(() =>
  data.value.filter((item: any) => {
    if (searchForm.value.docScope === '已发布') return !!item.publishDate
    if (searchForm.value.docScope === '含附件') return !!item.attachment
    return true
  })
)

const getApiParams = () => {
  const { docScope: _d, ...rest } = searchForm.value
  return rest
}

const handleSearch = () => fetch(getApiParams())

const handleReset = () => {
  searchForm.value = { title: '', department: '', docScope: '' }
  fetch(getApiParams())
}

const handleAdd = () => {
  dialogTitle.value = '新增人事任免'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '',
    docNumber: '',
    publishDate: today,
    effectiveDate: '',
    department: '',
    attachment: '',
    attachmentName: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑人事任免'
  formData.value = {
    ...row,
    attachment: row.attachment || '',
    attachmentName: row.attachmentName || '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除公文“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/appointments/${row.id}`)
    ElMessage.success('删除成功')
    fetch(getApiParams())
  })
}

const handleFileChange = (file: { url: string; originalName: string }) => {
  formData.value.attachment = file.url
  formData.value.attachmentName = file.originalName
}

const handleDownload = async (id: number) => {
  try {
    window.open(`/api/appointments/${id}/download`, '_blank')
  } catch {
    ElMessage.error('下载失败')
  }
}

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/appointments/${formData.value.id}`, formData.value)
  } else {
    await http.post('/appointments', formData.value)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch(getApiParams())
}

fetch(getApiParams())
</script>

<template>
  <div class="appointment-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 人事任免</div>

    <div class="admin-card admin-card--search">
      <section class="appointment-panel appointment-toolbar">
        <div class="appointment-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入公文标题" clearable class="appointment-toolbar__grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-input v-model="searchForm.department" placeholder="请输入发文部门" clearable class="appointment-toolbar__grow" />
          <el-select v-model="searchForm.docScope" placeholder="公文范围" clearable class="appointment-toolbar__scope">
            <el-option label="全部公文" value="" />
            <el-option label="已发布" value="已发布" />
            <el-option label="含附件" value="含附件" />
          </el-select>
        </div>
        <div class="appointment-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </section>
    </div>

    <div class="admin-card admin-card--table appointment-panel appointment-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">人事任免列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch(getApiParams())">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增公文
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="公文标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="文号" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.docNumber || '—' }}</template>
        </el-table-column>
        <el-table-column label="发文部门" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.department || '—' }}</template>
        </el-table-column>
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.attachment ? 'success' : 'info'" size="small">
              {{ row.attachment ? '有' : '无' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.publishDate) }}</template>
        </el-table-column>
        <el-table-column label="生效日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.effectiveDate) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
              <el-button v-if="row.attachment" link type="success" @click="handleDownload(row.id)">下载</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1080px" @closed="handleDialogClosed">
      <div class="appointment-dialog">
        <div class="appointment-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="appointment-form-section">
              <div class="appointment-form-section__header">
                <strong>基础信息</strong>
                <span>先维护标题、文号和发文部门，明确公文归属。</span>
              </div>
              <div class="appointment-form-section__body">
                <el-form-item label="公文标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入标题" />
                </el-form-item>
                <el-form-item label="文号" prop="docNumber">
                  <el-input v-model="formData.docNumber" placeholder="请输入文号" />
                </el-form-item>
                <el-form-item label="发文部门">
                  <el-input v-model="formData.department" placeholder="请输入发文部门" />
                </el-form-item>
              </div>
            </section>

            <section class="appointment-form-section">
              <div class="appointment-form-section__header">
                <strong>时间信息</strong>
                <span>按发布与生效顺序单列填写，避免表单拥挤。</span>
              </div>
              <div class="appointment-form-section__body">
                <el-form-item label="发布日期">
                  <el-date-picker v-model="formData.publishDate" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="生效日期">
                  <el-date-picker v-model="formData.effectiveDate" type="date" style="width: 100%" />
                </el-form-item>
              </div>
            </section>

            <section class="appointment-form-section appointment-form-section--attachment">
              <div class="appointment-form-section__header">
                <strong>附件信息</strong>
                <span>上传正式公文附件，便于前台查看与下载。</span>
              </div>
              <div class="appointment-form-section__body">
                <el-form-item label="文件附件">
                  <FileUpload v-model="formData.attachment" @file-change="handleFileChange" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="appointment-dialog__side">
          <div class="preview-card">
            <div class="preview-card__icon"><el-icon><Files /></el-icon></div>
            <strong>{{ formData.title || '未填写公文标题' }}</strong>
            <p>{{ formData.docNumber || '文号将在这里显示' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.department || '待填写部门' }}</span>
              <span>{{ formData.attachmentName || '未上传附件' }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.appointment-panel.appointment-toolbar {
  padding: 0;
  border: 0;
  background: transparent;
}

.appointment-panel.appointment-table-panel {
  padding: 0;
  border: 0;
  background: transparent;
}

.preview-card {
  border: 1px solid #e6edf7;
  background: #fff;
}

.appointment-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.appointment-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

.appointment-toolbar__grow {
  flex: 1;
  min-width: 180px;
  max-width: 360px;
}

.appointment-toolbar__scope {
  width: 140px;
}

.appointment-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.preview-card__icon {
  width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2f67ff; font-size: 24px; flex: 0 0 auto;
}
.appointment-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.appointment-dialog__main { min-width: 0; }
.appointment-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.appointment-form-section + .appointment-form-section { margin-top: 16px; }
.appointment-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.appointment-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.appointment-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.appointment-form-section__body { padding: 18px 20px 4px; }
.appointment-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.appointment-form-section--attachment :deep(.el-form-item__content) { display: block; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; line-height: 1.5; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; line-height: 1.7; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span {
  padding: 6px 10px; border-radius: 999px; background: rgba(47, 103, 255, 0.1); color: #2f67ff; font-size: 12px; font-weight: 600;
}
@media (max-width: 1200px) {
  .appointment-dialog { grid-template-columns: 1fr; }
  .appointment-dialog__side { order: -1; }
}
</style>
