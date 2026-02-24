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
        <el-table-column prop="coverUrl" label="封面地址" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
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
            :before-upload="beforeVideoUpload"
            accept="video/*"
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
        <el-form-item label="封面上传">
          <el-upload
            class="cover-uploader"
            action="/api/admin/upload/image"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
            accept="image/*"
          >
            <img v-if="formData.coverUrl" :src="formData.coverUrl" class="cover-preview" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-input v-model="formData.coverUrl" placeholder="或手动输入封面地址" style="margin-top: 10px" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
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
import { Plus } from '@element-plus/icons-vue'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const dialogVisible = ref(false)
const videoUploading = ref(false)
const formData = ref({
  id: null,
  title: '',
  videoUrl: '',
  coverUrl: '',
  sort: 0
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
const handleVideoSuccess = (response: any) => {
  videoUploading.value = false
  if (response.url) {
    formData.value.videoUrl = response.url
    ElMessage.success('视频上传成功')
  } else {
    ElMessage.error('视频上传失败')
  }
}

// 封面上传前验证
const beforeCoverUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB')
    return false
  }
  return true
}

// 封面上传成功
const handleCoverSuccess = (response: any) => {
  if (response.url) {
    formData.value.coverUrl = response.url
    ElMessage.success('封面上传成功')
  } else {
    ElMessage.error('封面上传失败')
  }
}

const handleAdd = () => {
  formData.value = { id: null, title: '', videoUrl: '', coverUrl: '', sort: 0 }
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

const handleSave = async () => {
  try {
    if (formData.value.id) {
      await http.patch(`/videos/${formData.value.id}`, formData.value)
    } else {
      await http.post('/videos', formData.value)
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

.cover-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;

    &:hover {
      border-color: #409eff;
    }
  }
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.cover-preview {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>
