<template>
  <div class="videos-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>宣传视频管理</span>
          <el-button type="primary" @click="handleAdd">新增视频</el-button>
        </div>
      </template>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="视频标题" />
        <el-table-column prop="videoUrl" label="视频地址" show-overflow-tooltip />
        <el-table-column label="置顶状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.isTop ? 'success' : 'info'">
              {{ row.isTop ? '已置顶' : '未置顶' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link :type="row.isTop ? 'warning' : 'success'" @click="handleToggleTop(row)">
              {{ row.isTop ? '取消置顶' : '置顶' }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :total="total"
        :page="page"
        :page-size="pageSize"
        @change="handlePageChange"
      />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑视频' : '新增视频'" width="600px">
      <el-form :model="formData" label-width="100px">
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
          <el-input v-model="formData.videoUrl" placeholder="或手动输入视频地址" style="margin-top: 10px" />
          <div v-if="formData.videoUrl" style="margin-top: 10px">
            <video :src="formData.videoUrl" controls style="max-width: 100%; max-height: 200px"></video>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const videoUploading = ref(false)
const formData = ref({
  id: null,
  title: '',
  videoUrl: ''
})

const { data: tableData, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/videos', { params })
)

// 视频上传前验证
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

// 视频上传成功
const handleVideoSuccess = (response: any, file: any) => {
  videoUploading.value = false
  console.log('视频上传响应:', response)

  // 尝试从不同的响应格式中提取 URL
  const videoUrl = response?.url || response?.data?.url || response?.data

  if (videoUrl) {
    formData.value.videoUrl = videoUrl

    // 自动提取视频标题（如果标题为空）
    if (!formData.value.title && file?.name) {
      // 移除文件扩展名
      const fileName = file.name.replace(/\.[^/.]+$/, '')
      formData.value.title = fileName
    }

    ElMessage.success('视频上传成功')
  } else {
    console.error('响应中未找到视频URL:', response)
    ElMessage.error('视频上传失败：未返回视频地址')
  }
}

// 视频上传失败
const handleVideoError = (error: any) => {
  videoUploading.value = false
  console.error('视频上传失败:', error)
  // 尝试从不同的错误对象中提取错误信息
  let errorMsg = '视频上传失败，请重试'
  if (error?.response?.data?.message) {
    errorMsg = error.response.data.message
  } else if (error?.message) {
    errorMsg = error.message
  }
  ElMessage.error(errorMsg)
}

const handleAdd = () => {
  formData.value = { id: null, title: '', videoUrl: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/videos/${row.id}`)
      ElMessage.success('删除成功')
      fetch()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

const handleToggleTop = async (row: any) => {
  try {
    await http.patch(`/videos/${row.id}/toggle-top`)
    ElMessage.success(row.isTop ? '取消置顶成功' : '置顶成功')
    fetch()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleSave = async () => {
  try {
    // 只提取需要的字段，避免发送额外字段导致验证失败
    const data = {
      title: formData.value.title,
      videoUrl: formData.value.videoUrl
    }

    if (formData.value.id) {
      await http.patch(`/videos/${formData.value.id}`, data)
    } else {
      await http.post('/videos', data)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

onMounted(() => {
  fetch()
})
</script>

<style scoped lang="scss">
.videos-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-uploader {
  :deep(.el-upload) {
    display: block;
  }
}
</style>
