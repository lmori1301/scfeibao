<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule, phoneRule, idCardRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'

const searchForm = ref({ certificateNo: '', type: '', name: '', status: '' })
const dialogVisible = ref(false)
const dialogTitle = ref('新增证书')
const formRef = ref()
const formData = ref({
  certificateNo: '', type: '', name: '', idCard: '', phone: '', workUnit: '',
  department: '', position: '', issueDate: '', validUntil: '', status: '有效', photo: ''
})

// 详情对话框
const detailDialogVisible = ref(false)
const detailData = ref<any>(null)

const certificateTypes = [
  '应急指挥专家', '绳索救援技术员', '潜水救援教练', '城市搜救技术员', '山地救援教练',
  '急救医疗专家', '高级急救师', '水域救援技术员', '无人机操作师', '装备管理工程师'
]

const rules = {
  certificateNo: [requiredRule('证书编号')],
  type: [requiredRule('证书类型')],
  name: [requiredRule('姓名')],
  idCard: [idCardRule()],
  phone: [phoneRule()]
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination(
  (params) => http.get('/certificates', { params })
)

const handleSearch = () => fetch(searchForm.value)
const handleReset = () => {
  searchForm.value = { certificateNo: '', type: '', name: '', status: '' }
  fetch()
}

const handleAdd = () => {
  dialogTitle.value = '新增证书'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    certificateNo: '', type: '', name: '', idCard: '', phone: '', workUnit: '',
    department: '', position: '', issueDate: today, validUntil: '', status: '有效', photo: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑证书'
  formData.value = {
    id: row.id,
    certificateNo: row.certificateNumber || '',
    type: row.certificateType || '',
    name: row.holderName || '',
    idCard: row.holderIdCard || '',
    phone: '',
    workUnit: row.issuingAuthority || '',
    department: '',
    position: '',
    issueDate: row.issueDate || '',
    validUntil: row.expiryDate || '',
    status: row.status === 1 ? '有效' : '失效',
    photo: ''
  }
  dialogVisible.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该证书吗？', '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/certificates/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

// 查看详情
const handleViewDetail = async (row: any) => {
  try {
    const response = await http.get(`/certificates/${row.id}`)
    detailData.value = response
    detailDialogVisible.value = true
  } catch (error: any) {
    ElMessage.error(error.message || '获取详情失败')
  }
}

const handleSave = async () => {
  await formRef.value.validate()

  const saveData = {
    certificateNumber: formData.value.certificateNo,
    certificateName: formData.value.type,
    certificateType: formData.value.type,
    holderName: formData.value.name,
    holderIdCard: formData.value.idCard,
    issuingAuthority: formData.value.workUnit,
    issueDate: formData.value.issueDate,
    expiryDate: formData.value.validUntil,
    status: formData.value.status === '有效' ? 1 : 0
  }

  if (formData.value.id) {
    await http.patch(`/certificates/${formData.value.id}`, saveData)
  } else {
    await http.post('/certificates', saveData)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetch()
}

// 格式化日期为 YYYY-MM-DD
const formatDate = (row: any, column: any, cellValue: any) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

fetch()
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-md">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="证书编号">
          <el-input v-model="searchForm.certificateNo" placeholder="请输入证书编号" clearable />
        </el-form-item>
        <el-form-item label="证书类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option v-for="type in certificateTypes" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="有效" value="有效" />
            <el-option label="过期" value="过期" />
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
        <h3>证书列表</h3>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="data" v-loading="loading" stripe>
        <el-table-column prop="certificateNo" label="证书编号" width="120" />
        <el-table-column prop="type" label="证书类型" width="140" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="phone" label="联系电话" width="120" />
        <el-table-column prop="workUnit" label="工作单位" width="140" />
        <el-table-column prop="position" label="职位" width="100" />
        <el-table-column prop="issueDate" label="发证日期" width="110" :formatter="formatDate" />
        <el-table-column prop="validUntil" label="有效期限" width="110" :formatter="formatDate" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '有效' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button text type="info" size="small" @click="handleViewDetail(row)">详情</el-button>
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1000px">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="证书照片">
          <ImageUpload v-model="formData.photo" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="证书编号" prop="certificateNo">
              <el-input v-model="formData.certificateNo" placeholder="请输入证书编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择证书类型" style="width: 100%">
                <el-option v-for="type in certificateTypes" :key="type" :label="type" :value="type" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位">
              <el-input v-model="formData.workUnit" placeholder="请输入工作单位" />
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
            <el-form-item label="发证日期">
              <el-date-picker v-model="formData.issueDate" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期限">
              <el-date-picker v-model="formData.validUntil" type="date" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="formData.status" style="width: 100%">
                <el-option label="有效" value="有效" />
                <el-option label="过期" value="过期" />
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

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="证书详情" width="700px">
      <div v-if="detailData" class="detail-container">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="证书编号">{{ detailData.certificateNumber || '-' }}</el-descriptions-item>
          <el-descriptions-item label="证书类型">{{ detailData.certificateType || '-' }}</el-descriptions-item>
          <el-descriptions-item label="证书名称">{{ detailData.certificateName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="持证人姓名">{{ detailData.holderName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ detailData.holderIdCard || '-' }}</el-descriptions-item>
          <el-descriptions-item label="发证机构">{{ detailData.issuingAuthority || '-' }}</el-descriptions-item>
          <el-descriptions-item label="发证日期">{{ formatDate(null, null, detailData.issueDate) }}</el-descriptions-item>
          <el-descriptions-item label="有效期至">{{ formatDate(null, null, detailData.expiryDate) }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="detailData.status === 1 ? 'success' : 'info'">
              {{ detailData.status === 1 ? '有效' : '失效' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
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

.detail-container {
  padding: 10px 0;
}
</style>
