<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule, phoneRule, idCardRule, emailRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ personnelNo: '', name: '', department: '', status: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增人员')
const formRef = ref()
const formData = ref({
  personnelNo: '', name: '', idCard: '', phone: '', department: '', position: '',
  joinDate: '', email: '', taskCount: 0, trainingHours: 0, status: '在职', photo: ''
})

const rules = {
  name: [requiredRule('姓名')],
  idCard: [idCardRule()],
  phone: [phoneRule()],
  email: [emailRule()]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/personnel', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { personnelNo: '', name: '', department: '', status: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增人员'
  formData.value = {
    personnelNo: '', name: '', idCard: '', phone: '', department: '', position: '',
    joinDate: new Date().toISOString().split('T')[0], email: '', taskCount: 0,
    trainingHours: 0, status: '在职', photo: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑人员'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该人员吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/personnel/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/personnel/${formData.value.id}`, formData.value)
  } else {
    await http.post('/personnel', formData.value)
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
        <el-form-item label="人员编号">
          <el-input v-model="searchForm.personnelNo" placeholder="请输入人员编号" clearable />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="searchForm.department" placeholder="请输入部门" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
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
        <h3>人员列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="personnelNo" label="人员编号" width="120" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="department" label="所属部门" width="100" />
        <el-table-column prop="position" label="职位" width="100" />
        <el-table-column prop="joinDate" label="入职日期" width="110" />
        <el-table-column prop="taskCount" label="任务次数" width="90" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '在职' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="800px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="人员照片">
          <ImageUpload v-model="formData.photo" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="人员编号">
              <el-input v-model="formData.personnelNo" placeholder="请输入人员编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-input v-model="formData.department" placeholder="请输入所属部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位">
              <el-input v-model="formData.position" placeholder="请输入职位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="formData.joinDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入电子邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="任务次数">
              <el-input-number v-model="formData.taskCount" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训时长">
              <el-input-number v-model="formData.trainingHours" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="formData.status" style="width: 100%">
                <el-option label="在职" value="在职" />
                <el-option label="离职" value="离职" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
