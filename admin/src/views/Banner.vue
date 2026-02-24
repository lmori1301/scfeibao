<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const formatDate = (row: any) => {
  if (!row.createdAt) return ''
  const date = new Date(row.createdAt)
  return date.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).replace(/\//g, '-')
}

const searchForm = ref({ title: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增轮播图')
const formRef = ref()
const formData = ref({
  title: '',
  imageUrl: '',
  sort: 1,
  status: '显示'
})

const rules = {
  title: [requiredRule('标题')],
  imageUrl: [requiredRule('轮播图')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/banner/list', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { title: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增轮播图'
  formData.value = { title: '', imageUrl: '', sort: 1, status: '显示' }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑轮播图'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该轮播图吗？', '提示', {
    type: 'warning'
  }).then(async () => {
    await http.delete(`/banner/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  await http.post('/banner/save', formData.value)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

fetch()
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-md">
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

    <el-card shadow="never">
      <div class="flex-between mb-md">
        <h3>轮播图列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column label="图片" width="120">
          <template #default="{ row }">
            <el-image v-if="row.imageUrl" :src="row.imageUrl" :preview-src-list="[row.imageUrl]" style="width: 80px; height: 45px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '显示' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" :formatter="formatDate" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="轮播图" prop="imageUrl">
          <ImageUpload v-model="formData.imageUrl" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="1" style="width: 100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option label="显示" value="显示" />
            <el-option label="隐藏" value="隐藏" />
          </el-select>
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
.page-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  > .el-card {
    width: 100%;
    flex-shrink: 0;
  }
}

:deep(.el-table) {
  .el-table__cell {
    vertical-align: middle;
  }
}
</style>
