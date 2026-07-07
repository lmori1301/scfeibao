<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '', listScope: '' as '' | 'recent' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增救援案例')
const formRef = ref()
const formData = ref({ id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' })
const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/rescue-cases', { params })
)

const sortedRows = computed(() =>
  [...data.value].sort((a: any, b: any) => new Date(b.rescueDate).getTime() - new Date(a.rescueDate).getTime())
)

const tableRows = computed(() =>
  searchForm.value.listScope === 'recent' ? sortedRows.value : data.value
)

const getApiParams = () => {
  const { listScope: _l, ...rest } = searchForm.value
  return rest
}

const handleSearch = () => fetch(getApiParams())
const handleReset = () => {
  searchForm.value = { title: '', listScope: '' }
  fetch(getApiParams())
}

const handleRefresh = () => fetch(getApiParams())

const handleAdd = () => {
  dialogTitle.value = '新增救援案例'
  formData.value = { id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const rescueDateForPicker = (row: any) => {
  const v = row?.rescueDate
  if (!v) return ''
  if (typeof v === 'string') return v.includes('T') ? v.slice(0, 10) : v.length >= 10 ? v.slice(0, 10) : v
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  return ''
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑救援案例'
  formData.value = { ...row, rescueDate: rescueDateForPicker(row) }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
  formData.value = { id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除案例“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/rescue-cases/${row.id}`)
      ElMessage.success('删除成功')
      fetch(getApiParams())
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/rescue-cases/${formData.value.id}`, formData.value)
    } else {
      await http.post('/rescue-cases', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch(getApiParams())
  } catch {
    ElMessage.error('保存失败')
  }
}

const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

onMounted(() => {
  fetch(getApiParams())
})
</script>

<template>
  <div class="rescue-case-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 救援案例</div>

    <div class="admin-card admin-card--search">
      <section class="case-filter-panel case-toolbar">
        <div class="case-toolbar__filters">
          <el-select v-model="searchForm.listScope" placeholder="列表范围" clearable class="case-toolbar__scope">
            <el-option label="全部案例" value="" />
            <el-option label="最近案例" value="recent" />
          </el-select>
          <el-input v-model="searchForm.title" placeholder="输入案例标题关键词" clearable @keyup.enter="handleSearch">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="case-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </section>
    </div>

    <section class="admin-card admin-card--table case-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">案例内容列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="handleRefresh">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增案例
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" stripe v-loading="loading">
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="案例标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="救援地点" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.location || '—' }}</template>
        </el-table-column>
        <el-table-column label="救援日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.rescueDate) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="960px" @closed="handleDialogClosed">
      <div class="case-dialog-layout">
        <div class="case-dialog-layout__main">
          <el-form ref="formRef" :model="formData" label-width="96px">
            <el-form-item label="案例标题">
              <el-input v-model="formData.title" placeholder="请输入案例标题" />
            </el-form-item>
            <el-form-item label="救援地点">
              <el-input v-model="formData.location" placeholder="请输入救援地点" />
            </el-form-item>
            <el-form-item label="救援日期">
              <el-date-picker v-model="formData.rescueDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
            <el-form-item label="封面图片">
              <ImageUpload v-model="formData.coverImage" />
            </el-form-item>
            <el-form-item label="案例内容">
              <el-input v-model="formData.content" type="textarea" :rows="9" placeholder="请输入救援过程、行动亮点与结果总结" />
            </el-form-item>
          </el-form>
        </div>

        <aside class="case-dialog-layout__side">
          <div class="case-preview-card">
            <div class="case-preview-card__title">内容预览</div>
            <div class="case-preview-card__cover">
              <img v-if="formData.coverImage" :src="formData.coverImage" :alt="formData.title || '案例封面'" />
              <div v-else class="case-preview-card__empty">未设置封面</div>
            </div>
            <strong>{{ formData.title || '案例标题预览' }}</strong>
            <p>{{ formData.location || '救援地点待填写' }}</p>
            <span>{{ formData.rescueDate ? formatDate(null, null, formData.rescueDate) : '救援日期待填写' }}</span>
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
.rescue-case-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}

.case-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

.case-toolbar__scope {
  width: 140px;
}

.case-toolbar__filters .el-input {
  flex: 1;
  min-width: 200px;
  max-width: 420px;
}

.case-toolbar__actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  flex: 0 0 auto;
}

.case-dialog-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 300px;
  gap: 24px;
}

.case-preview-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
  border: 1px solid #dce7fb;
}

.case-preview-card__title {
  color: #62738d;
  font-size: 13px;
  font-weight: 600;
}

.case-preview-card__cover {
  margin-top: 12px;
  height: 160px;
  border-radius: 0;
  overflow: hidden;
  background: #dfe7f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.case-preview-card__empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8290a5;
  font-size: 13px;
}

.case-preview-card strong {
  display: block;
  margin-top: 14px;
  color: #1f2f46;
  font-size: 16px;
  line-height: 1.5;
}

.case-preview-card p {
  margin-top: 8px;
  color: #5f718a;
  font-size: 14px;
  line-height: 1.7;
}

.case-preview-card span {
  display: block;
  margin-top: 6px;
  color: #8a99ae;
  font-size: 12px;
}

@media (max-width: 1200px) {
  .case-dialog-layout {
    grid-template-columns: 1fr;
  }
}

</style>
