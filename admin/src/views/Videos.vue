<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ArrowUp, Plus, RefreshRight, VideoPlay } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const videoUploading = ref(false)
const createDefaultFormData = () => ({ id: null, title: '', videoUrl: '' })
const formData = ref(createDefaultFormData())
const topFilter = ref('' as '' | '已置顶' | '未置顶')

const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) =>
  http.get('/videos', { params })
)

const tableRows = computed(() =>
  tableData.value.filter((item: any) => {
    if (topFilter.value === '已置顶') return item.isTop
    if (topFilter.value === '未置顶') return !item.isTop
    return true
  })
)

const beforeVideoUpload = (file: File) => {
  const isVideo = file.type.startsWith('video/')
  const isLt100M = file.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('只能上传视频文件')
    return false
  }
  if (!isLt100M) {
    ElMessage.error('视频大小不能超过 100MB')
    return false
  }
  videoUploading.value = true
  return true
}

const handleVideoSuccess = (response: any, file: any) => {
  videoUploading.value = false
  const videoUrl = response?.url || response?.data?.url || response?.data
  if (videoUrl) {
    formData.value.videoUrl = videoUrl
    if (!formData.value.title && file?.name) {
      formData.value.title = file.name.replace(/\.[^/.]+$/, '')
    }
    ElMessage.success('视频上传成功')
  } else {
    ElMessage.error('视频上传失败：未返回视频地址')
  }
}

const handleVideoError = (error: any) => {
  videoUploading.value = false
  ElMessage.error(error?.response?.data?.message || error?.message || '视频上传失败，请重试')
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
  ElMessageBox.confirm(`确定删除视频“${row.title}”吗？`, '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/videos/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch {
      ElMessage.error('删除失败')
    }
  })
}

const handleToggleTop = async (row: any) => {
  try {
    await http.patch(`/videos/${row.id}/toggle-top`)
    ElMessage.success(row.isTop ? '取消置顶成功' : '置顶成功')
    fetch()
  } catch {
    ElMessage.error('操作失败')
  }
}

const handleSave = async () => {
  try {
    const data = { title: formData.value.title, videoUrl: formData.value.videoUrl }
    if (formData.value.id) {
      await http.patch(`/videos/${formData.value.id}`, data)
    } else {
      await http.post('/videos', data)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDialogClosed = () => {
  formData.value = createDefaultFormData()
  videoUploading.value = false
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="video-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 宣传视频</div>

    <div class="admin-card admin-card--search">
      <section class="video-panel video-toolbar">
        <div class="video-toolbar__filters">
          <el-select v-model="topFilter" placeholder="置顶筛选" clearable class="video-toolbar__filter">
            <el-option label="全部视频" value="" />
            <el-option label="已置顶" value="已置顶" />
            <el-option label="未置顶" value="未置顶" />
          </el-select>
        </div>
      </section>
    </div>

    <section class="admin-card admin-card--table video-panel video-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">宣传视频列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增视频
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="预览" width="120">
          <template #default="{ row }">
            <div class="video-table-preview">
              <video v-if="row.videoUrl" :src="row.videoUrl" muted preload="metadata" />
              <div v-else class="video-table-preview--empty">
                <el-icon><VideoPlay /></el-icon>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column label="视频地址" min-width="260" show-overflow-tooltip>
          <template #default="{ row }">{{ row.videoUrl || '—' }}</template>
        </el-table-column>
        <el-table-column label="展示状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.isTop ? 'success' : 'info'">{{ row.isTop ? '已置顶' : '未置顶' }}</el-tag>
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
              <el-button link :type="row.isTop ? 'warning' : 'success'" @click="handleToggleTop(row)">
                {{ row.isTop ? '取消置顶' : '置顶' }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑视频' : '新增视频'" width="1040px" @closed="handleDialogClosed">
      <div class="video-dialog">
        <div class="video-dialog__main">
          <el-form :model="formData" label-width="96px">
            <el-form-item label="视频标题">
              <el-input v-model="formData.title" placeholder="请输入视频标题" />
            </el-form-item>
            <el-form-item label="视频上传">
              <el-upload
                class="video-uploader"
                action="/api/admin/upload/video"
                :show-file-list="false"
                :on-success="handleVideoSuccess"
                :on-error="handleVideoError"
                :before-upload="beforeVideoUpload"
                accept="video/*"
                name="file"
              >
                <el-button type="primary" :loading="videoUploading">
                  {{ videoUploading ? '上传中...' : '点击上传视频' }}
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频地址">
              <el-input v-model="formData.videoUrl" placeholder="或手动输入视频地址" />
            </el-form-item>
          </el-form>
        </div>
        <aside class="video-dialog__side">
          <div class="preview-card">
            <div class="preview-card__media">
              <video v-if="formData.videoUrl" :src="formData.videoUrl" controls />
              <div v-else class="preview-card__empty">视频预览</div>
            </div>
            <strong>{{ formData.title || '未填写视频标题' }}</strong>
            <span>{{ formData.videoUrl ? '已配置播放地址' : '待上传或填写地址' }}</span>
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
.video-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.preview-card {
  border: 1px solid #e6edf7;
  background: #fff;
}

.video-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px 16px;
}

.video-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.video-toolbar__filter {
  width: 160px;
}

.video-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.video-table-preview {
  width: 104px;
  height: 58px;
  border-radius: 8px;
  overflow: hidden;
  background: #edf3fb;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.video-table-preview--empty {
  width: 100%;
  height: 100%;
  min-height: 58px;
  display: grid;
  place-items: center;
  color: #8b98ad;
}

.video-dialog {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) 320px;
  gap: 24px;
}

.preview-card {
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%);
}

.preview-card__media {
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  background: #dfe8f8;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.preview-card__empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8390a4;
}

.preview-card strong {
  display: block;
  margin-top: 14px;
  font-size: 18px;
  color: #1f2f46;
}

.preview-card span {
  display: block;
  margin-top: 8px;
  color: #718198;
  font-size: 13px;
}

.video-uploader {
  :deep(.el-upload) {
    display: block;
  }
}

@media (max-width: 1200px) {
  .video-dialog {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .video-cell {
    flex-direction: column;
    align-items: flex-start;
  }

  .video-cell__cover {
    width: 100%;
    height: 180px;
  }
}
</style>
