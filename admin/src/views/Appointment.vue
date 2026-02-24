<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '', department: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增人事任免')
const formRef = ref()
const formData = ref({
  title: '', docNumber: '', publishDate: '', effectiveDate: '', department: '', attachment: ''
})

const rules = {
  title: [requiredRule('标题')],
  docNumber: [requiredRule('文号')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/appointments', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { title: '', department: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增人事任免'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '', docNumber: '', publishDate: today, effectiveDate: '', department: '', attachment: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑人事任免'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该人事任免信息吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/appointments/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/appointments/${formData.value.id}`, formData.value)
  } else {
    await http.post('/appointments', formData.value)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

const fileUploading = ref(false)

const handleFileUpload = async (options: any) => {
  const { file } = options
  fileUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await http.post('/admin/upload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    formData.value.attachment = res.url
    ElMessage.success('文件上传成功')
  } catch (error) {
    ElMessage.error('文件上传失败')
  } finally {
    fileUploading.value = false
  }
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
        <el-form-item label="发文部门">
          <el-input v-model="searchForm.department" placeholder="请输入部门" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="flex-between mb-md">
        <h3>人事任免列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="docNumber" label="文号" width="150" />
        <el-table-column prop="department" label="发文部门" width="120" />
        <el-table-column prop="publishDate" label="发布日期" width="110" />
        <el-table-column prop="effectiveDate" label="生效日期" width="110" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文号" prop="docNumber">
              <el-input v-model="formData.docNumber" placeholder="请输入文号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发文部门">
              <el-input v-model="formData.department" placeholder="请输入发文部门" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发布日期">
              <el-date-picker v-model="formData.publishDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效日期">
              <el-date-picker v-model="formData.effectiveDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <div style="display: flex; gap: 10px; align-items: center;">
            <el-upload
              :http-request="handleFileUpload"
              :show-file-list="false"
              :loading="fileUploading"
              style="flex: 1;"
            >
              <el-button type="primary" :loading="fileUploading">
                {{ fileUploading ? '上传中...' : '上传文件' }}
              </el-button>
            </el-upload>
            <el-input
              v-model="formData.attachment"
              placeholder="文件URL（自动生成）"
              readonly
              style="flex: 2;"
            />
            <el-button
              v-if="formData.attachment"
              text
              type="primary"
              @click="window.open(formData.attachment)"
            >
              预览
            </el-button>
          </div>
          <div style="color: #909399; font-size: 12px; margin-top: 5px;">
            支持所有文件格式，最大50MB
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

<style scoped lang="scss">
.page-container {
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
