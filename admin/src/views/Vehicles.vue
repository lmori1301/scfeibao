<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ plate: '', type: '', status: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增车辆')
const formRef = ref()
const formData = ref({
  unit: '', vehicleNo: '', type: '', plate: '', brand: '', engineNo: '', frameNo: '',
  color: '', equipDate: '', issueDate: '', validUntil: '', status: '正常', photo: ''
})

const vehicleTypes = [
  '应急救援指挥车', '救援运输车', '地震救援车', '抗洪抢险车', '应急炊事车',
  '应急宿营车', '通信指挥车', '应急救援装备车', '应急照明车', '医疗救援车',
  '移动方舱医疗车', '内勤车'
]

const rules = {
  plate: [requiredRule('车牌号')],
  type: [requiredRule('车辆类型')]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/vehicles', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { plate: '', type: '', status: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增车辆'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    unit: '', vehicleNo: '', type: '', plate: '', brand: '', engineNo: '', frameNo: '',
    color: '', equipDate: today, issueDate: today, validUntil: '', status: '正常', photo: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑车辆'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该车辆吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/vehicles/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()
  if (formData.value.id) {
    await http.patch(`/vehicles/${formData.value.id}`, formData.value)
  } else {
    await http.post('/vehicles', formData.value)
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
        <el-form-item label="车牌号">
          <el-input v-model="searchForm.plate" placeholder="请输入车牌号" clearable />
        </el-form-item>
        <el-form-item label="车辆类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option v-for="type in vehicleTypes" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常" />
            <el-option label="维修中" value="维修中" />
            <el-option label="停用" value="停用" />
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
        <h3>车辆列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="vehicleNo" label="车辆编号" width="120" />
        <el-table-column prop="plate" label="车牌号" width="100" />
        <el-table-column prop="type" label="车辆类型" width="140" />
        <el-table-column prop="unit" label="车属单位" width="140" />
        <el-table-column prop="brand" label="厂牌型号" width="100" />
        <el-table-column prop="color" label="车体颜色" width="90" />
        <el-table-column prop="equipDate" label="装备日期" width="110" />
        <el-table-column prop="validUntil" label="有效期限" width="110" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'warning'">{{ row.status }}</el-tag>
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
        <el-form-item label="车辆照片">
          <ImageUpload v-model="formData.photo" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车属单位">
              <el-input v-model="formData.unit" placeholder="请输入车属单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆编号">
              <el-input v-model="formData.vehicleNo" placeholder="请输入车辆编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车辆类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择车辆类型" style="width: 100%">
                <el-option v-for="type in vehicleTypes" :key="type" :label="type" :value="type" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号" prop="plate">
              <el-input v-model="formData.plate" placeholder="请输入车牌号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="厂牌型号">
              <el-input v-model="formData.brand" placeholder="请输入厂牌型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发动机号">
              <el-input v-model="formData.engineNo" placeholder="请输入发动机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车架号码">
              <el-input v-model="formData.frameNo" placeholder="请输入车架号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车体颜色">
              <el-input v-model="formData.color" placeholder="请输入车体颜色" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="装备日期">
              <el-date-picker v-model="formData.equipDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发证日期">
              <el-date-picker v-model="formData.issueDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="有效期限">
              <el-date-picker v-model="formData.validUntil" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="formData.status" style="width: 100%">
                <el-option label="正常" value="正常" />
                <el-option label="维修中" value="维修中" />
                <el-option label="停用" value="停用" />
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
