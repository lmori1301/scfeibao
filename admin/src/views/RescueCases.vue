<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '' })
const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({ id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' })

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/rescue-cases', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { title: '' }
  fetch()
}

const handleAdd = () => {
  formData.value = { id: null, title: '', location: '', rescueDate: '', coverImage: '', content: '' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' }).then(async () => {
    try {
      await http.delete(`/rescue-cases/${row.id}`)
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
      await http.patch(`/rescue-cases/${formData.value.id}`, formData.value)
    } else {
      await http.post('/rescue-cases', formData.value)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
    fetch()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="rescue-cases">
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="标题"><el-input v-model="searchForm.title" placeholder="请输入标题" clearable /></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button><el-button @click="handleReset">重置</el-button></el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card" shadow="never">
      <div class="table-header">
        <h3>救援案例列表</h3>
        <el-button type="success" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
      </div>
      <el-table :data="data" stripe v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="location" label="地点" min-width="180" />
        <el-table-column prop="rescueDate" label="救援日期" width="110" :formatter="formatDate" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
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

    <el-dialog v-model="dialogVisible" title="救援案例" width="1200px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="标题"><el-input v-model="formData.title" /></el-form-item>
        <el-form-item label="地点"><el-input v-model="formData.location" /></el-form-item>
        <el-form-item label="救援日期"><el-date-picker v-model="formData.rescueDate" type="date" style="width: 100%" /></el-form-item>
        <el-form-item label="封面图"><el-input v-model="formData.coverImage" placeholder="请输入封面图地址" /></el-form-item>
        <el-form-item label="内容"><el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入救援案例内容" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.rescue-cases { .search-card { margin-bottom: 16px; :deep(.el-card__body) { padding: 16px; } :deep(.el-form-item) { margin-bottom: 0; } } .table-card { :deep(.el-card__body) { padding: 0; } .table-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; h3 { margin: 0; font-size: 16px; font-weight: 500; } } :deep(.el-table .el-button--text) { padding: 0; margin-right: 8px; } } }
.image-uploader { :deep(.el-upload) { border: 1px dashed #d9d9d9; border-radius: 6px; cursor: pointer; overflow: hidden; &:hover { border-color: #409eff; } } }
.uploader-icon { font-size: 28px; color: #8c939d; width: 178px; height: 178px; text-align: center; line-height: 178px; }
.uploaded-image { width: 178px; height: 178px; display: block; object-fit: cover; }
</style>
