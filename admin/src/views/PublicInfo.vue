<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Files, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import FileUpload from '@/components/FileUpload.vue'
import http from '@/utils/http'

const searchForm = ref({
  title: '',
  category: '',
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增信息公开')
const formRef = ref()
const formData = ref({
  id: undefined as number | undefined,
  title: '',
  category: '',
  publishDate: '',
  attachmentUrl: '',
  attachmentName: '',
  content: '',
})

const rules = {
  title: [requiredRule('标题')],
  content: [requiredRule('正文内容')],
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
  category: searchForm.value.category || undefined,
})

const handleSearch = () => fetch(getApiParams())

const handleReset = () => {
  searchForm.value = { title: '', category: '' }
  fetch(getApiParams())
}

const handleAdd = () => {
  dialogTitle.value = '新增信息公开'
  formData.value = {
    id: undefined,
    title: '',
    category: '',
    publishDate: new Date().toISOString().split('T')[0],
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
    category: row.category || '',
    publishDate: row.publishDate ? new Date(row.publishDate).toISOString().split('T')[0] : '',
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
    category: formData.value.category || null,
    publishDate: formData.value.publishDate || null,
    attachmentUrl: formData.value.attachmentUrl || null,
    content: formData.value.content,
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
      <section class="public-info-panel public-info-toolbar">
        <div class="public-info-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入公开事项标题" clearable class="public-info-toolbar__grow">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-input v-model="searchForm.category" placeholder="请输入公开分类" clearable class="public-info-toolbar__grow" />
        </div>
        <div class="public-info-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </section>
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
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="分类" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.category || '—' }}</template>
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
        <el-table-column label="更新时间" width="120">
          <template #default="{ row }">{{ formatDate(row.updatedAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1100px" @closed="handleDialogClosed">
      <div class="public-info-dialog">
        <div class="public-info-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="public-info-form-section">
              <div class="public-info-form-section__header">
                <strong>基础信息</strong>
                <span>维护公开事项标题、分类和发布日期。</span>
              </div>
              <div class="public-info-form-section__body">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入公开事项标题" />
                </el-form-item>
                <el-form-item label="分类">
                  <el-input v-model="formData.category" placeholder="例如：财务公开、制度公开" />
                </el-form-item>
                <el-form-item label="发布日期">
                  <el-date-picker v-model="formData.publishDate" type="date" style="width: 100%" />
                </el-form-item>
              </div>
            </section>

            <section class="public-info-form-section">
              <div class="public-info-form-section__header">
                <strong>正文内容</strong>
                <span>可维护公开说明、摘要或正文内容。</span>
              </div>
              <div class="public-info-form-section__body">
                <el-form-item label="内容" prop="content">
                  <el-input
                    v-model="formData.content"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入公开内容"
                  />
                </el-form-item>
              </div>
            </section>

            <section class="public-info-form-section public-info-form-section--attachment">
              <div class="public-info-form-section__header">
                <strong>附件信息</strong>
                <span>支持上传公告附件、公示文件等下载材料。</span>
              </div>
              <div class="public-info-form-section__body">
                <el-form-item label="文件附件">
                  <FileUpload v-model="formData.attachmentUrl" @file-change="handleFileChange" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="public-info-dialog__side">
          <div class="preview-card">
            <div class="preview-card__icon"><el-icon><Files /></el-icon></div>
            <strong>{{ formData.title || '未填写公开事项标题' }}</strong>
            <p>{{ formData.category || '待填写公开分类' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.publishDate || '未设置日期' }}</span>
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
.public-info-panel.public-info-toolbar {
  padding: 0;
  border: 0;
  background: transparent;
}

.public-info-panel.public-info-table-panel {
  padding: 0;
  border: 0;
  background: transparent;
}

.public-info-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.public-info-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

.public-info-toolbar__grow {
  flex: 1;
  min-width: 180px;
  max-width: 360px;
}

.public-info-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.public-info-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 320px;
  gap: 24px;
}

.public-info-dialog__main { min-width: 0; }

.public-info-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.public-info-form-section + .public-info-form-section { margin-top: 16px; }

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

.public-info-form-section__body { padding: 18px 20px 4px; }
.public-info-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.public-info-form-section--attachment :deep(.el-form-item__content) { display: block; }

.preview-card {
  padding: 18px;
  border: 1px solid #e6edf7;
  border-radius: 20px;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%);
  color: #2f67ff;
  font-size: 24px;
  flex: 0 0 auto;
}

.preview-card strong {
  display: block;
  margin-top: 14px;
  font-size: 18px;
  color: #1f2f46;
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
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.preview-card__meta span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(47, 103, 255, 0.1);
  color: #2f67ff;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .public-info-dialog { grid-template-columns: 1fr; }
  .public-info-dialog__side { order: -1; }
}
</style>
