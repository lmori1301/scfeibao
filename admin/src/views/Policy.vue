<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import http from '@/utils/http'

const searchForm = ref({ title: '', category: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增政策文件')
const formRef = ref()
const formData = ref({
  title: '', docNumber: '', category: '', publishDate: '',
  effectiveDate: '', expiryDate: '', department: '', attachment: ''
})

const policyCategories = ['法律法规', '部门规章', '行业标准']

const rules = {
  title: [requiredRule('标题')],
  category: [requiredRule('分类')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/policies', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { title: '', category: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增政策文件'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    title: '', docNumber: '', category: '', publishDate: today,
    effectiveDate: '', expiryDate: '', department: '', attachment: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑政策文件'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该政策文件吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/policies/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/policies/${formData.value.id}`, formData.value)
  } else {
    await http.post('/policies', formData.value)
  }
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
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类" clearable>
            <el-option v-for="cat in policyCategories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <div class="flex-between mb-md">
        <h3>政策文件列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="docNumber" label="文号" width="150" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="department" label="发文部门" width="140" />
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
            <el-form-item label="文号">
              <el-input v-model="formData.docNumber" placeholder="请输入文号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类" prop="category">
              <el-select v-model="formData.category" placeholder="请选择分类" style="width: 100%">
                <el-option v-for="cat in policyCategories" :key="cat" :label="cat" :value="cat" />
              </el-select>
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="失效日期">
              <el-date-picker v-model="formData.expiryDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发文部门">
              <el-input v-model="formData.department" placeholder="请输入发文部门" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <el-input v-model="formData.attachment" placeholder="请输入附件链接" />
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
