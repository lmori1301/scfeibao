<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Document, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import FileUpload from '@/components/FileUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '', category: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增政策文件')
const formRef = ref()
const formData = ref({
  title: '',
  summary: '',
  docNumber: '',
  category: '',
  publishDate: '',
  effectiveDate: '',
  expiryDate: '',
  department: '',
  attachment: '',
  attachmentName: '',
})

const policyCategories = ['法律法规', '部门规章', '行业标准']

const rules = {
  title: [requiredRule('标题')],
  category: [requiredRule('分类')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/policies', { params: filteredParams })
})

const tableRows = computed(() => data.value)

const handleSearch = () => fetch(searchForm.value)

const handleReset = () => {
  searchForm.value = { title: '', category: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增政策文件'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '',
    summary: '',
    docNumber: '',
    category: '',
    publishDate: today,
    effectiveDate: '',
    expiryDate: '',
    department: '',
    attachment: '',
    attachmentName: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑政策文件'
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
  ElMessageBox.confirm(`确定删除文件“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/policies/${row.id}`)
    ElMessage.success('删除成功')
    fetch(searchForm.value)
  })
}

const handleFileChange = (file: { url: string; originalName: string }) => {
  formData.value.attachment = file.url
  formData.value.attachmentName = file.originalName
}

const handleDownload = (id: number) => {
  window.open(`/api/policies/${id}/download`, '_blank')
}

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/policies/${formData.value.id}`, formData.value)
  } else {
    await http.post('/policies', formData.value)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch(searchForm.value)
}

fetch()
</script>

<template>
  <div class="policy-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 政策文件</div>

    <div class="admin-card admin-card--search">
      <section class="policy-panel policy-toolbar">
        <div class="policy-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入文件标题" clearable class="policy-toolbar__grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-select v-model="searchForm.category" placeholder="请选择分类" clearable class="policy-toolbar__field">
            <el-option v-for="cat in policyCategories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </div>
        <div class="policy-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </section>
    </div>

    <div class="admin-card admin-card--table policy-panel policy-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">政策文件列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch(searchForm.value)">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增文件
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="文件标题" min-width="200" show-overflow-tooltip />
        <el-table-column label="摘要" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">{{ row.summary || '—' }}</template>
        </el-table-column>
        <el-table-column label="分类" width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.category || '—' }}</template>
        </el-table-column>
        <el-table-column label="文号" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.docNumber || '—' }}</template>
        </el-table-column>
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.publishDate) }}</template>
        </el-table-column>
        <el-table-column label="生效日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.effectiveDate) }}</template>
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
      <div class="policy-dialog">
        <div class="policy-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="policy-form-section">
              <div class="policy-form-section__header">
                <strong>基础信息</strong>
                <span>先填写标题、摘要和分类，确定资料归属。</span>
              </div>
              <div class="policy-form-section__body">
                <el-form-item label="文件标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入文件标题" />
                </el-form-item>
                <el-form-item label="摘要说明">
                  <el-input v-model="formData.summary" type="textarea" :rows="4" placeholder="用于列表导语和详情摘要展示" />
                </el-form-item>
                <el-form-item label="文件文号">
                  <el-input v-model="formData.docNumber" placeholder="请输入文号" />
                </el-form-item>
                <el-form-item label="文件分类" prop="category">
                  <el-select v-model="formData.category" placeholder="请选择分类" style="width: 100%">
                    <el-option v-for="cat in policyCategories" :key="cat" :label="cat" :value="cat" />
                  </el-select>
                </el-form-item>
              </div>
            </section>

            <section class="policy-form-section">
              <div class="policy-form-section__header">
                <strong>时效信息</strong>
                <span>按文件生命周期依次维护发布时间、生效时间和失效时间。</span>
              </div>
              <div class="policy-form-section__body">
                <el-form-item label="发布日期">
                  <el-date-picker v-model="formData.publishDate" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="生效日期">
                  <el-date-picker v-model="formData.effectiveDate" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="失效日期">
                  <el-date-picker v-model="formData.expiryDate" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="发文部门">
                  <el-input v-model="formData.department" placeholder="请输入发文部门" />
                </el-form-item>
              </div>
            </section>

            <section class="policy-form-section policy-form-section--attachment">
              <div class="policy-form-section__header">
                <strong>附件信息</strong>
                <span>上传对外展示的正式文件，便于前台下载和归档检索。</span>
              </div>
              <div class="policy-form-section__body">
                <el-form-item label="文件附件">
                  <FileUpload v-model="formData.attachment" @file-change="handleFileChange" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>

        <aside class="policy-dialog__side">
          <div class="preview-card">
            <div class="preview-card__icon">
              <el-icon><Document /></el-icon>
            </div>
            <strong>{{ formData.title || '未填写文件标题' }}</strong>
            <p>{{ formData.summary || '摘要将在这里展示，便于预览列表信息密度。' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.category || '待选分类' }}</span>
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
.policy-panel.policy-toolbar {
  padding: 0;
  border: 0;
  background: transparent;
}

.policy-panel.policy-table-panel {
  padding: 0;
  border: 0;
  background: transparent;
}

.policy-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.policy-toolbar .policy-toolbar__filters {
  flex: 0 1 auto;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
}

.policy-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

.admin-card--search .policy-toolbar .policy-toolbar__grow {
  flex: 0 0 auto;
  width: 240px;
  min-width: 160px;
  max-width: 320px;
}

.policy-toolbar__field {
  width: 160px;
}

.policy-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.policy-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 320px;
  gap: 24px;
}

.policy-dialog__main {
  min-width: 0;
}

.policy-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.policy-form-section + .policy-form-section {
  margin-top: 16px;
}

.policy-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;

  strong {
    color: #1f2f46;
    font-size: 15px;
    font-weight: 700;
  }

  span {
    color: #7a879d;
    font-size: 12px;
    line-height: 1.6;
  }
}

.policy-form-section__body {
  padding: 18px 20px 4px;
}

.policy-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.policy-form-section--attachment :deep(.el-form-item__content) {
  display: block;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #d8e4fb;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #e5efff 0%, #dce8ff 100%);
  color: #2f67ff;
  font-size: 30px;
}

.preview-card strong {
  display: block;
  margin-top: 16px;
  color: #1f2f46;
  font-size: 18px;
  line-height: 1.5;
}

.preview-card p {
  margin-top: 8px;
  color: #718198;
  font-size: 13px;
  line-height: 1.7;
}

.preview-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(47, 103, 255, 0.1);
    color: #2f67ff;
    font-size: 12px;
    font-weight: 600;
  }
}

@media (max-width: 1280px) {
  .policy-dialog {
    grid-template-columns: 1fr;
  }

  .policy-dialog__side {
    order: -1;
  }
}
</style>
