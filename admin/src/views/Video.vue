<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Picture, Plus, RefreshRight, Search, VideoPlay } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '' })
const tableData = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const dialogTitle = ref('新增视频')
const createDefaultFormData = (author = ''): Record<string, any> => ({
  title: '',
  cover: '',
  url: '',
  duration: '',
  sort: 0,
  description: '',
  author,
})
const formData = ref(createDefaultFormData())
const coverUrl = ref('')

const filteredRows = computed(() =>
  tableData.value.filter((item) => !searchForm.value.title || item.title.includes(searchForm.value.title))
)

const total = computed(() => filteredRows.value.length)

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const fetchVideos = async () => {
  loading.value = true
  try {
    const res = await http.get('/home/videos')
    tableData.value = (res.data.items || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      cover: item.cover,
      url: item.url,
      duration: item.duration || '-',
      sort: item.sort || 0,
      description: item.description || '',
      author: item.author || '管理员',
      createdAt: item.createdAt?.split('T')[0] || '',
    }))
  } catch {
    ElMessage.error('获取视频列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVideos()
})

const handleReset = () => {
  searchForm.value = { title: '' }
  page.value = 1
}

const handleSearch = () => {
  page.value = 1
}

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
}

const handleAdd = () => {
  dialogTitle.value = '新增视频'
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  formData.value = createDefaultFormData(user.realName || user.username || '管理员')
  coverUrl.value = ''
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑视频'
  formData.value = { ...row }
  coverUrl.value = row.cover || ''
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除视频“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/home/videos/${row.id}`)
      ElMessage.success('删除成功')
      fetchVideos()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleSave = async () => {
  try {
    const payload = {
      title: formData.value.title,
      cover: formData.value.cover,
      url: formData.value.url,
      duration: formData.value.duration || null,
      sort: formData.value.sort,
      description: formData.value.description || null,
      author: formData.value.author,
    }
    if (formData.value.id) {
      await http.patch(`/home/videos/${formData.value.id}`, payload)
    } else {
      await http.post('/home/videos', payload)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetchVideos()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDialogClosed = () => {
  formData.value = createDefaultFormData()
  coverUrl.value = ''
  dialogTitle.value = '新增视频'
}

const handleCoverSuccess = (response: any) => {
  coverUrl.value = response.url
  formData.value.cover = response.url
  ElMessage.success('封面上传成功')
}

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}
</script>

<template>
  <div class="video-column-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 视频栏目</div>

    <div class="admin-card admin-card--search">
      <div class="admin-list-toolbar">
        <div class="admin-list-toolbar__filters video-column-toolbar__filters">
          <el-input v-model="searchForm.title" placeholder="请输入标题" clearable style="min-width: 200px; max-width: 360px; flex: 1">
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

    <div class="admin-card admin-card--table">
      <div class="admin-table-panel__head">
        <div class="panel-title">视频列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchVideos">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增视频
          </el-button>
        </div>
      </div>
      <el-table :data="pagedRows" stripe :loading="loading">
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="视频内容" min-width="340">
          <template #default="{ row }">
            <div class="video-column-cell">
              <div class="video-column-cell__cover">
                <img v-if="row.cover" :src="row.cover" :alt="row.title" />
                <div v-else class="video-column-cell__empty"><el-icon><Picture /></el-icon></div>
              </div>
              <div class="video-column-cell__meta">
                <strong>{{ row.title }}</strong>
                <span>{{ row.description || '暂无描述' }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="时长" width="90" />
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="createdAt" label="创建时间" width="120" :formatter="formatDate" />
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
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1040px" @closed="handleDialogClosed">
      <div class="video-column-dialog">
        <div class="video-column-dialog__main">
          <el-form :model="formData" label-width="96px">
            <section class="video-column-form-section">
              <div class="video-column-form-section__header">
                <strong>视频基础信息</strong>
                <span>先维护标题、链接与封面，确定视频卡片主体信息。</span>
              </div>
              <div class="video-column-form-section__body">
                <el-form-item label="标题" required><el-input v-model="formData.title" placeholder="请输入标题" /></el-form-item>
                <el-form-item label="视频链接" required><el-input v-model="formData.url" placeholder="请输入视频链接" /></el-form-item>
                <el-form-item label="封面">
                  <el-upload class="image-uploader" action="/api/upload/image" :show-file-list="false" :on-success="handleCoverSuccess">
                    <img v-if="coverUrl" :src="coverUrl" class="uploaded-image" />
                    <div v-else class="uploader-box"><el-icon><VideoPlay /></el-icon><span>上传封面</span></div>
                  </el-upload>
                </el-form-item>
              </div>
            </section>

            <section class="video-column-form-section">
              <div class="video-column-form-section__header">
                <strong>展示信息</strong>
                <span>将时长、排序、描述和作者拆开展示，减少表单拥挤。</span>
              </div>
              <div class="video-column-form-section__body">
                <el-form-item label="时长"><el-input v-model="formData.duration" placeholder="如 5:30" /></el-form-item>
                <el-form-item label="排序"><el-input-number v-model="formData.sort" :min="0" style="width: 100%" /></el-form-item>
                <el-form-item label="描述"><el-input v-model="formData.description" type="textarea" :rows="4" placeholder="请输入描述" /></el-form-item>
                <el-form-item label="作者"><el-input v-model="formData.author" placeholder="请输入作者" /></el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="video-column-dialog__side">
          <div class="preview-card">
            <div class="preview-card__cover">
              <img v-if="coverUrl" :src="coverUrl" :alt="formData.title || '封面'" />
              <div v-else class="preview-card__empty">封面预览</div>
            </div>
            <strong>{{ formData.title || '未填写标题' }}</strong>
            <p>{{ formData.duration || '未填写时长' }} · {{ formData.author || '未填写作者' }}</p>
          </div>
        </aside>
      </div>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.video-column-page { display: flex; flex-direction: column; gap: 18px; }
.video-column-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.video-column-toolbar__filters :deep(.el-input) {
  flex: 0 1 auto;
}
.video-column-dialog__main { min-width: 0; }
.video-column-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.video-column-form-section + .video-column-form-section { margin-top: 16px; }
.video-column-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.video-column-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.video-column-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.video-column-form-section__body { padding: 18px 20px 4px; }
.video-column-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.video-column-cell { display: flex; gap: 14px; align-items: center; }
.video-column-cell__cover, .preview-card__cover {
  width: 120px; height: 72px; border-radius: 0; overflow: hidden; background: #edf3fb; flex: 0 0 auto;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.video-column-cell__empty, .preview-card__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8b98ad; }
.video-column-cell__meta { min-width: 0; }
.video-column-cell__meta strong { display: block; color: #1f2f46; font-size: 15px; line-height: 1.5; }
.video-column-cell__meta span { display: block; margin-top: 6px; color: #7b879b; font-size: 12px; line-height: 1.6; }
.video-column-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; line-height: 1.5; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; line-height: 1.7; }
.image-uploader :deep(.el-upload) { display: block; }
.uploader-box {
  width: 180px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  border: 1px dashed #d6e3fa; border-radius: 16px; color: #6881a5; background: #f8fbff;
}
.uploaded-image { width: 180px; height: 120px; display: block; object-fit: contain; border-radius: 0; }
@media (max-width: 1200px) {
  .video-column-dialog { grid-template-columns: 1fr; }
  .video-column-dialog__side { order: -1; }
}
</style>
