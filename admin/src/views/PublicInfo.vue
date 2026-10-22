<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import FileUpload from '@/components/FileUpload.vue'
import http from '@/utils/http'
import QueryFilter from '@/components/QueryFilter.vue'

const searchForm = ref({
  title: '',
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增信息公开')
const formRef = ref()
const formData = ref({
  id: undefined as number | undefined,
  title: '',
  docNumber: '',
  publishDate: '',
  effectiveDate: '',
  department: '',
  attachmentUrl: '',
  attachmentName: '',
  // 内容字段不再在表单中展示，但保留以兼容历史数据（编辑时原值回写，不覆盖已有内容）
  content: '',
})

const rules = {
  title: [requiredRule('公文标题')],
  docNumber: [requiredRule('文号')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/public-info', { params: filteredParams })
})

const tableRows = computed(() => data.value || [])

const getApiParams = () => ({
  title: searchForm.value.title || undefined,
})

const handleSearch = () => fetch(getApiParams())

const handleReset = () => {
  searchForm.value = { title: '' }
  fetch(getApiParams())
}

// 本地时区的今天（YYYY-MM-DD），避免 toISOString 的 UTC 偏移
const todayString = () => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// 统一取日期字符串前 10 位（后端 datetime 返回 ISO，date 返回 YYYY-MM-DD）
const toDateInput = (value: any) => {
  if (!value) return ''
  return String(value).slice(0, 10)
}

const handleAdd = () => {
  dialogTitle.value = '新增信息公开'
  formData.value = {
    id: undefined,
    title: '',
    docNumber: '',
    publishDate: todayString(),
    effectiveDate: '',
    department: '',
    attachmentUrl: '',
    attachmentName: '',
    content: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑信息公开'
  formData.value = {
    id: row.id,
    title: row.title || '',
    docNumber: row.docNumber || '',
    publishDate: toDateInput(row.publishDate),
    effectiveDate: toDateInput(row.effectiveDate),
    department: row.department || '',
    attachmentUrl: row.attachmentUrl || '',
    attachmentName: row.attachmentUrl ? String(row.attachmentUrl).split('/').pop() || '' : '',
    content: row.content || '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除公开事项“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/public-info/${row.id}`)
    ElMessage.success('删除成功')
    fetch(getApiParams())
  })
}

const handleFileChange = (file: { url: string; originalName: string }) => {
  formData.value.attachmentUrl = file.url
  formData.value.attachmentName = file.originalName
}

const formatDate = (value: any) => {
  if (!value) return '--'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '--' : date.toISOString().split('T')[0]
}

const handleSave = async () => {
  await formRef.value.validate()

  const payload = {
    title: formData.value.title,
    docNumber: formData.value.docNumber || null,
    publishDate: formData.value.publishDate || null,
    effectiveDate: formData.value.effectiveDate || null,
    department: formData.value.department || null,
    attachmentUrl: formData.value.attachmentUrl || null,
    content: formData.value.content ?? '',
  }

  if (formData.value.id) {
    await http.patch(`/public-info/${formData.value.id}`, payload)
  } else {
    await http.post('/public-info', payload)
  }

  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch(getApiParams())
}

fetch(getApiParams())
</script>

<template>
  <div class="public-info-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 信息公开</div>

    <div class="admin-card admin-card--search">
      <QueryFilter :collapsible="false" :searching="loading" @search="handleSearch" @reset="handleReset">
        <el-form-item label="事项标题">
          <el-input v-model="searchForm.title" placeholder="请输入公开事项标题" clearable />
        </el-form-item>
      </QueryFilter>
    </div>

    <div class="admin-card admin-card--table public-info-panel public-info-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">信息公开列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch(getApiParams())">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增公开事项
          </el-button>
        </div>
      </div>
      <el-table max-height="calc(100vh - 320px)" :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" fixed="left" />
        <el-table-column prop="title" label="标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="文号" min-width="170" show-overflow-tooltip>
          <template #default="{ row }">{{ row.docNumber || '—' }}</template>
        </el-table-column>
        <el-table-column label="发布部门" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.department || '—' }}</template>
        </el-table-column>
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.attachmentUrl ? 'success' : 'info'" size="small">
              {{ row.attachmentUrl ? '有' : '无' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="120">
          <template #default="{ row }">{{ formatDate(row.publishDate) }}</template>
        </el-table-column>
        <el-table-column label="生效日期" width="120">
          <template #default="{ row }">{{ formatDate(row.effectiveDate) }}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="120">
          <template #default="{ row }">{{ formatDate(row.updatedAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="860px" @closed="handleDialogClosed">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px" class="public-info-form">
        <section class="public-info-form-section">
          <div class="public-info-form-section__header">
            <strong>基础信息</strong>
            <span>先维护标题、文号和发文部门，明确公文归属。</span>
          </div>
          <div class="public-info-form-section__body">
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

        <section class="public-info-form-section">
          <div class="public-info-form-section__header">
            <strong>时间信息</strong>
            <span>按发布与生效顺序单列填写，避免表单拥挤。</span>
          </div>
          <div class="public-info-form-section__body">
            <el-form-item label="发布日期">
              <el-date-picker
                v-model="formData.publishDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择发布日期"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="生效日期">
              <el-date-picker
                v-model="formData.effectiveDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择生效日期"
                style="width: 100%"
              />
            </el-form-item>
          </div>
        </section>

        <section class="public-info-form-section public-info-form-section--attachment">
          <div class="public-info-form-section__header">
            <strong>附件信息</strong>
            <span>上传正式公文附件，便于前台查看与下载。</span>
          </div>
          <div class="public-info-form-section__body">
            <el-form-item label="文件附件">
              <FileUpload v-model="formData.attachmentUrl" @file-change="handleFileChange" />
            </el-form-item>
          </div>
        </section>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.public-info-form-section {
  border: 1px solid #e6edf8;
  border-radius: 16px;
  background: #ffffff;
}

.public-info-form-section + .public-info-form-section {
  margin-top: 16px;
}

.public-info-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}

.public-info-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}

.public-info-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.public-info-form-section__body {
  padding: 18px 20px 6px;
}

.public-info-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.public-info-form-section__body :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

.public-info-form-section--attachment :deep(.el-form-item__content) {
  display: block;
}
</style>
