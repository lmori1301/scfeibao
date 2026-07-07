<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Picture, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const formatDate = (row: any) => {
  if (!row.createdAt) return '--'
  const date = new Date(row.createdAt)
  return date
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

const searchForm = ref({ title: '', statusFilter: '' as '' | '显示' | '隐藏' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增轮播图')
const formRef = ref()
const formData = ref({
  title: '',
  imageUrl: '',
  sort: 1,
  status: '显示',
})

const rules = {
  title: [requiredRule('标题')],
  imageUrl: [requiredRule('轮播图')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  )
  return http.get('/banner/list', { params: filteredParams })
})

const tableRows = computed(() => {
  const kw = (searchForm.value.title || '').trim()
  return data.value.filter((item: any) => {
    if (searchForm.value.statusFilter === '显示' && item.status !== '显示') return false
    if (searchForm.value.statusFilter === '隐藏' && item.status !== '隐藏') return false
    if (kw && !(String(item.title || '').includes(kw))) return false
    return true
  })
})

const handleSearch = () => fetch({ title: searchForm.value.title })
const handleReset = () => {
  searchForm.value = { title: '', statusFilter: '' }
  fetch({ title: '' })
}

const handleAdd = () => {
  dialogTitle.value = '新增轮播图'
  formData.value = { title: '', imageUrl: '', sort: 1, status: '显示' }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑轮播图'
  formData.value = { ...row }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该轮播图吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/banner/${row.id}`)
    ElMessage.success('删除成功')
    fetch({ title: searchForm.value.title })
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  await http.post('/banner/save', formData.value)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch({ title: searchForm.value.title })
}

fetch()
</script>

<template>
  <div class="portal-banner-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 轮播图管理</div>

    <div class="admin-card admin-card--search">
      <div class="portal-toolbar">
        <div class="portal-toolbar__filters">
          <el-select
            v-model="searchForm.statusFilter"
            placeholder="展示状态"
            clearable
            class="portal-toolbar__field portal-toolbar__field--status"
          >
            <el-option label="全部素材" value="" />
            <el-option label="展示中" value="显示" />
            <el-option label="已隐藏" value="隐藏" />
          </el-select>
          <el-input
            v-model="searchForm.title"
            placeholder="输入轮播图相关关键词"
            clearable
            class="portal-toolbar__field portal-toolbar__field--keyword"
            @keyup.enter="handleSearch"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </div>
        <div class="portal-toolbar__actions">
          <div class="admin-toolbar-actions__primary">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-card admin-card--table">
      <div class="admin-table-panel__head">
        <div class="panel-title">轮播图素材列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch({ title: searchForm.title })">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增轮播图
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="封面" width="96">
          <template #default="{ row }">
            <div class="banner-table-thumb">
              <img v-if="row.imageUrl" :src="row.imageUrl" :alt="row.title || '封面'" />
              <div v-else class="banner-table-thumb--empty"><el-icon><Picture /></el-icon></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="90" align="center" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '显示' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="190" :formatter="formatDate" />
        <el-table-column
          label="操作"
          width="180"
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
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="920px" @closed="handleDialogClosed">
      <div class="portal-dialog">
        <div class="portal-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>内容信息</strong>
                <span>先维护标题和主视觉图片，确定首页焦点素材。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="formData.title" placeholder="请输入轮播标题" />
                </el-form-item>
                <el-form-item label="轮播图" prop="imageUrl">
                  <ImageUpload v-model="formData.imageUrl" />
                </el-form-item>
              </div>
            </section>

            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>展示设置</strong>
                <span>通过排序与状态控制首页露出顺序。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="排序">
                  <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="显示" value="显示" />
                    <el-option label="隐藏" value="隐藏" />
                  </el-select>
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="portal-dialog__side">
          <div class="preview-card">
            <div class="preview-card__thumb">
              <img v-if="formData.imageUrl" :src="formData.imageUrl" :alt="formData.title || '轮播图'" />
              <div v-else class="preview-card__empty">轮播图预览</div>
            </div>
            <strong>{{ formData.title || '未填写标题' }}</strong>
            <span>{{ formData.status }} · 排序 {{ formData.sort }}</span>
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
.portal-dialog__main {
  min-width: 0;
}
.portal-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.portal-form-section + .portal-form-section {
  margin-top: 16px;
}
.portal-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.portal-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}
.portal-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}
.portal-form-section__body {
  padding: 18px 20px 4px;
}
.portal-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.portal-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px 16px;
}

.portal-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
}

.portal-toolbar__field--status {
  width: 140px;
}

.admin-card--search .portal-toolbar .portal-toolbar__field--keyword {
  flex: 0 0 auto;
  width: 220px;
  min-width: 160px;
  max-width: 320px;
}

.portal-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #24324a;
  margin-bottom: 10px;
}

.banner-table-thumb {
  width: 80px;
  height: 48px;
  border-radius: 0;
  overflow: hidden;
  background: #edf2fb;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.banner-table-thumb--empty {
  width: 100%;
  height: 100%;
  min-height: 48px;
  display: grid;
  place-items: center;
  color: #8b98ac;
}

.portal-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 300px;
  gap: 24px;
}

.preview-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%);
  border: 1px solid #dbe6fa;
}

.preview-card__thumb {
  height: 180px;
  border-radius: 0;
  overflow: hidden;
  background: #dde7f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.preview-card__empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8290a5;
}

.preview-card strong {
  display: block;
  margin-top: 14px;
  color: #1f2f46;
  font-size: 16px;
}

.preview-card span {
  display: block;
  margin-top: 6px;
  color: #8593a7;
  font-size: 12px;
}

@media (max-width: 1200px) {
  .portal-dialog {
    grid-template-columns: 1fr;
  }

  .portal-dialog__side {
    order: -1;
  }
}

@media (max-width: 768px) {
  .portal-toolbar__field--keyword {
    max-width: none;
    width: 100%;
  }

  .portal-toolbar__actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
