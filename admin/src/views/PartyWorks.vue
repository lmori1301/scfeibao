<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Collection, Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const loading = ref(false)
const tableData = ref<any[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const createDefaultFormData = () => ({ id: null, title: '', content: '', coverImage: '' })
const formData = ref(createDefaultFormData())

const fetchData = async () => {
  loading.value = true
  try {
    const res = await http.get('/party-works', { params: { page: page.value, pageSize: pageSize.value } })
    tableData.value = res.data.items || res.data
    total.value = res.data.total || 0
  } catch {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
  fetchData()
}

const handleAdd = () => {
  formData.value = createDefaultFormData()
  dialogVisible.value = true
}
const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除工作“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/party-works/${row.id}`)
      ElMessage.success('删除成功')
      fetchData()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}
const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/party-works/${formData.value.id}`, formData.value)
    } else {
      await http.post('/party-works', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDialogClosed = () => {
  formData.value = createDefaultFormData()
}
const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="party-works-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 党建工作</div>

    <section class="admin-card admin-card--table party-works-panel party-works-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">党建工作列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchData">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增工作
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="工作内容" min-width="340">
          <template #default="{ row }">
            <div class="work-cell">
              <div class="work-cell__cover">
                <img v-if="row.coverImage" :src="row.coverImage" :alt="row.title" />
                <div v-else class="work-cell__empty"><el-icon><Collection /></el-icon></div>
              </div>
              <div class="work-cell__meta">
                <strong>{{ row.title }}</strong>
                <span>浏览量 {{ row.viewCount || 0 }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="140" :formatter="formatDate" />
        <el-table-column
          label="操作"
          width="160"
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

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑工作' : '新增工作'" width="980px" @closed="handleDialogClosed">
      <div class="party-works-dialog">
        <div class="party-works-dialog__main">
          <el-form :model="formData" label-width="96px">
            <el-form-item label="标题"><el-input v-model="formData.title" placeholder="请输入标题" /></el-form-item>
            <el-form-item label="封面图地址"><el-input v-model="formData.coverImage" placeholder="请输入封面图地址" /></el-form-item>
            <el-form-item label="内容"><el-input v-model="formData.content" type="textarea" :rows="8" placeholder="请输入内容" /></el-form-item>
          </el-form>
        </div>
        <aside class="party-works-dialog__side">
          <div class="preview-card">
            <div class="preview-card__cover">
              <img v-if="formData.coverImage" :src="formData.coverImage" :alt="formData.title || '封面'" />
              <div v-else class="preview-card__empty">封面预览</div>
            </div>
            <strong>{{ formData.title || '未填写标题' }}</strong>
          </div>
        </aside>
      </div>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.party-works-page { display: flex; flex-direction: column; gap: 18px; }
.party-works-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.party-works-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.work-cell { display: flex; gap: 14px; align-items: center; }
.work-cell__cover {
  width: 96px; height: 68px; border-radius: 0; overflow: hidden; background: #edf3fb; flex: 0 0 auto;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.work-cell__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8b98ad; }
.work-cell__meta { min-width: 0; }
.work-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.work-cell__meta span { display: block; margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; }
.party-works-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 300px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card__cover {
  height: 180px; border-radius: 0; overflow: hidden; background: #dfe8f8;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.preview-card__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8390a4; }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; line-height: 1.5; }
@media (max-width: 1200px) {
  .party-works-dialog { grid-template-columns: 1fr; }
  .party-works-dialog__side { order: -1; }
}
</style>
