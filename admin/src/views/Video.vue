<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import http from '@/utils/http'

const searchForm = ref({
  title: ''
})

const tableData = ref([])
const loading = ref(false)

const fetchVideos = async () => {
  loading.value = true
  try {
    const res = await http.get('/home/videos')
    tableData.value = res.data.items.map((item: any) => ({
      id: item.id,
      title: item.title,
      cover: item.cover,
      url: item.url,
      duration: item.duration || '-',
      sort: item.sort || 0,
      description: item.description || '',
      author: item.author || '管理员',
      createdAt: item.createdAt?.split('T')[0] || ''
    }))
  } catch (error) {
    ElMessage.error('获取视频列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVideos()
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增视频')
const formData = ref({
  title: '',
  cover: '',
  url: '',
  duration: '',
  sort: 0,
  description: '',
  author: ''
})
const coverUrl = ref('')

const handleSearch = () => {
  ElMessage.success('查询成功')
}

const handleReset = () => {
  searchForm.value = { title: '' }
}

const handleAdd = () => {
  dialogTitle.value = '新增视频'
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  formData.value = {
    title: '',
    cover: '',
    url: '',
    duration: '',
    sort: 0,
    description: '',
    author: user.realName || user.username || '管理员'
  }
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
  ElMessageBox.confirm('确定删除该视频吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await http.delete(`/home/videos/${row.id}`)
      ElMessage.success('删除成功')
      fetchVideos()
    } catch (error) {
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
      author: formData.value.author
    }
    if (formData.value.id) {
      await http.patch(`/home/videos/${formData.value.id}`, payload)
    } else {
      await http.post('/home/videos', payload)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetchVideos()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleCoverSuccess = (response: any) => {
  coverUrl.value = response.url
  formData.value.cover = response.url
  ElMessage.success('封面上传成功')
}

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}
</script>

<template>
  <div class="video">
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <div class="table-header">
        <h3>视频列表</h3>
        <div class="table-actions">
          <el-button type="success" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增
          </el-button>
          <el-button type="danger" plain>
            <el-icon><Delete /></el-icon>
            批量删除
          </el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe :loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column label="封面" width="100">
          <template #default="{ row }">
            <el-image v-if="row.cover" :src="row.cover" style="width: 80px; height: 45px" fit="cover" />
            <span v-else>暂无封面</span>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="时长" width="80" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="110" :formatter="formatDate" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="900px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="标题" required>
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="视频链接" required>
          <el-input v-model="formData.url" placeholder="请输入视频链接" />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="image-uploader"
            action="/api/upload/image"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
          >
            <img v-if="coverUrl" :src="coverUrl" class="uploaded-image" />
            <el-icon v-else class="uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="时长">
              <el-input v-model="formData.duration" placeholder="如: 5:30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number v-model="formData.sort" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formData.author" placeholder="请输入作者" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.video {
  .search-card {
    margin-bottom: 16px;

    :deep(.el-card__body) {
      padding: 16px;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .table-card {
    :deep(.el-card__body) {
      padding: 0;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }

      .table-actions {
        display: flex;
        gap: 8px;
      }
    }

    :deep(.el-table) {
      .el-button--text {
        padding: 0;
        margin-right: 8px;
      }
    }
  }
}

.image-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      border-color: #409eff;
    }
  }
}

.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.uploaded-image {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>
