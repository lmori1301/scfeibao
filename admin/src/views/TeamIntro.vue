<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import AsyncRichTextEditor from '@/components/AsyncRichTextEditor.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const dialogTitle = ref('新增队伍介绍')
const formData = ref({ id: null, title: '', content: '', sort: 0 })
const listSort = ref('' as '' | 'recent')

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/team-intro', { params })
)

const sortedRows = computed(() =>
  [...data.value].sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
)

const tableRows = computed(() => (listSort.value === 'recent' ? sortedRows.value : data.value))
const handleAdd = () => {
  dialogTitle.value = '新增队伍介绍'
  formData.value = { id: null, title: '', content: '', sort: 0 }
  dialogVisible.value = true
  nextTick(() => {})
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑队伍介绍'
  formData.value = { ...row }
  dialogVisible.value = true
  nextTick(() => {})
}

const handleDialogClosed = () => {
  formData.value = { id: null, title: '', content: '', sort: 0 }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除当前内容吗？', '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/team-intro/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/team-intro/${formData.value.id}`, formData.value)
    } else {
      await http.post('/team-intro', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch {
    ElMessage.error('保存失败')
  }
}

const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return '--'
  return new Date(cellValue).toISOString().split('T')[0]
}

onMounted(fetch)
</script>

<template>
  <div class="portal-content-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 队伍介绍</div>

    <div class="admin-card admin-card--search">
      <div class="portal-toolbar">
        <div class="portal-toolbar__filters">
          <el-select v-model="listSort" placeholder="列表排序" clearable class="portal-toolbar__sort">
            <el-option label="全部内容" value="" />
            <el-option label="最近更新" value="recent" />
          </el-select>
        </div>
      </div>
    </div>

    <div class="admin-card admin-card--table">
      <div class="admin-table-panel__head">
        <div class="panel-title">队伍介绍稿件列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增内容
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" stripe v-loading="loading">
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="title" label="标题" min-width="320" show-overflow-tooltip />
        <el-table-column prop="updatedAt" label="更新时间" width="140" :formatter="formatDate" />
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1100px" @closed="handleDialogClosed">
      <div class="portal-dialog">
        <div class="portal-dialog__main">
          <el-form :model="formData" label-width="96px">
            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>栏目基础信息</strong>
                <span>先确定标题，再补充正文，内容结构会更清晰。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="标题">
                  <el-input v-model="formData.title" placeholder="请输入队伍介绍标题" />
                </el-form-item>
              </div>
            </section>
            <section class="portal-form-section">
              <div class="portal-form-section__header">
                <strong>正文内容</strong>
                <span>正文独立分区，编辑时不会被其他字段干扰。</span>
              </div>
              <div class="portal-form-section__body">
                <el-form-item label="内容">
                  <AsyncRichTextEditor
                    v-if="dialogVisible"
                    v-model="formData.content"
                    placeholder="请输入队伍介绍内容"
                    height="430px"
                  />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.portal-content-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
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

.preview-card {
  border: 1px solid #e6edf7;
  background: #fff;
}

.portal-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px 16px;
}

.portal-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.portal-toolbar__sort {
  width: 160px;
}

.portal-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
</style>
