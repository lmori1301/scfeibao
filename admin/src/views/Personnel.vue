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

// 二维码对话框
const qrcodeDialogVisible = ref(false)
const qrcodeData = ref({ qrcode: '', url: '' })
const qrcodeLoading = ref(false)

// 详情对话框
const detailDialogVisible = ref(false)
const detailData = ref<any>(null)

// 批量选择
const selectedRows = ref<any[]>([])
const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
}

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
  formData.value = {
    id: row.id,
    personnelNo: row.id || '',
    name: row.name || '',
    idCard: row.idCard || '',
    phone: row.phone || '',
    department: row.team || '',
    position: row.position || '',
    joinDate: row.joinDate || '',
    email: '',
    taskCount: 0,
    trainingHours: 0,
    status: row.status === 1 ? '在职' : '离职',
    photo: row.photoUrl || ''
  }
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

  const saveData = {
    name: formData.value.name,
    idCard: formData.value.idCard,
    phone: formData.value.phone,
    team: formData.value.department,
    position: formData.value.position,
    joinDate: formData.value.joinDate,
    photoUrl: formData.value.photo,
    status: formData.value.status === '在职' ? 1 : 0
  }

  if (formData.value.id) {
    await http.patch(`/personnel/${formData.value.id}`, saveData)
  } else {
    await http.post('/personnel', saveData)
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

// 生成二维码
const handleGenerateQRCode = async (row: any) => {
  try {
    qrcodeLoading.value = true
    qrcodeDialogVisible.value = true

    const response = await http.get(`/personnel/${row.id}/qrcode`)
    qrcodeData.value = response.data
  } catch (error: any) {
    ElMessage.error(error.message || '生成二维码失败')
    qrcodeDialogVisible.value = false
  } finally {
    qrcodeLoading.value = false
  }
}

// 下载二维码
const handleDownloadQRCode = () => {
  const link = document.createElement('a')
  link.href = qrcodeData.value.qrcode
  link.download = `personnel-qrcode-${Date.now()}.png`
  link.click()
}

// 查看详情
const handleViewDetail = async (row: any) => {
  try {
    const response = await http.get(`/personnel/${row.id}`)
    detailData.value = response
    detailDialogVisible.value = true
  } catch (error: any) {
    ElMessage.error(error.message || '获取详情失败')
  }
}

// 批量生成二维码
const handleBatchGenerateQRCode = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要生成二维码的人员')
    return
  }

  try {
    ElMessage.info('正在生成二维码，请稍候...')

    // 批量获取二维码
    const qrcodePromises = selectedRows.value.map(row =>
      http.get(`/personnel/${row.id}/qrcode`)
    )

    const results = await Promise.all(qrcodePromises)

    // 创建一个包含所有二维码的HTML页面
    const htmlContent = generateQRCodeHTML(results.map((res, index) => ({
      name: selectedRows.value[index].name,
      position: selectedRows.value[index].position || '队员',
      team: selectedRows.value[index].team || '',
      qrcode: res.data.qrcode
    })))

    // 下载HTML文件
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `人员二维码-${new Date().toLocaleDateString()}.html`
    link.click()
    URL.revokeObjectURL(url)

    ElMessage.success(`成功生成${selectedRows.value.length}个二维码`)
  } catch (error: any) {
    ElMessage.error(error.message || '批量生成二维码失败')
  }
}

// 生成包含所有二维码的HTML
const generateQRCodeHTML = (qrcodes: any[]) => {
  const qrcodeItems = qrcodes.map(item => `
    <div class="qrcode-item">
      <img src="${item.qrcode}" alt="${item.name}" />
      <div class="info">
        <h3>${item.name}</h3>
        <p>${item.position}</p>
        <p class="team">${item.team}</p>
      </div>
    </div>
  `).join('')

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>人员二维码 - 四川飞豹救援</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 8px;
    }
    .header p {
      color: #666;
      font-size: 14px;
    }
    .container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .qrcode-item {
      background: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .qrcode-item img {
      width: 200px;
      height: 200px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 15px;
    }
    .info h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 8px;
    }
    .info p {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }
    .info .team {
      color: #999;
      font-size: 12px;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .header {
        box-shadow: none;
        border-bottom: 2px solid #eee;
        border-radius: 0;
      }
      .container {
        gap: 15px;
      }
      .qrcode-item {
        box-shadow: none;
        border: 1px solid #eee;
      }
    }
    @media (max-width: 768px) {
      .container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
      }
      .qrcode-item img {
        width: 160px;
        height: 160px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>四川飞豹救援 - 人员二维码</h1>
    <p>生成时间：${new Date().toLocaleString('zh-CN')}</p>
    <p style="margin-top: 8px; color: #999;">共 ${qrcodes.length} 人</p>
  </div>
  <div class="container">
    ${qrcodeItems}
  </div>
</body>
</html>
  `
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
        <div>
          <el-button
            type="success"
            :disabled="selectedRows.length === 0"
            @click="handleBatchGenerateQRCode"
          >
            批量生成二维码 ({{ selectedRows.length }})
          </el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
      </div>
      <el-table
        :data="data"
        v-loading="loading"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="personnelNo" label="人员编号" width="140" show-overflow-tooltip />
        <el-table-column prop="name" label="姓名" width="100" show-overflow-tooltip />
        <el-table-column prop="idCard" label="身份证号" width="180" show-overflow-tooltip />
        <el-table-column prop="phone" label="联系电话" width="130" show-overflow-tooltip />
        <el-table-column prop="department" label="所属部门" width="140" show-overflow-tooltip />
        <el-table-column prop="position" label="职位" width="120" show-overflow-tooltip />
        <el-table-column prop="joinDate" label="入职日期" width="110" :formatter="formatDate" />
        <el-table-column prop="taskCount" label="任务次数" width="90" />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '在职' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button text type="info" size="small" @click="handleViewDetail(row)">详情</el-button>
            <el-button text type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button text type="success" size="small" @click="handleGenerateQRCode(row)">二维码</el-button>
            <el-button text type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1000px">
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

    <!-- 二维码对话框 -->
    <el-dialog v-model="qrcodeDialogVisible" title="人员二维码" width="500px" center>
      <div v-loading="qrcodeLoading" class="qrcode-container">
        <div v-if="qrcodeData.qrcode" class="qrcode-content">
          <img :src="qrcodeData.qrcode" alt="二维码" class="qrcode-image" />
          <p class="qrcode-tip">使用微信扫描二维码查看人员信息</p>
          <p class="qrcode-url">{{ qrcodeData.url }}</p>
        </div>
      </div>
      <template #footer>
        <el-button @click="qrcodeDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleDownloadQRCode">下载二维码</el-button>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="人员详情" width="700px">
      <div v-if="detailData" class="detail-container">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="人员编号">{{ detailData.id || '-' }}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{ detailData.name || '-' }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ detailData.idCard || '-' }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ detailData.phone || '-' }}</el-descriptions-item>
          <el-descriptions-item label="所属部门">{{ detailData.team || '-' }}</el-descriptions-item>
          <el-descriptions-item label="职位">{{ detailData.position || '-' }}</el-descriptions-item>
          <el-descriptions-item label="入职日期">{{ formatDate(null, null, detailData.joinDate) }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="detailData.status === 1 ? 'success' : 'info'">
              {{ detailData.status === 1 ? '在职' : '离职' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="人员照片" :span="2">
            <el-image
              v-if="detailData.photoUrl"
              :src="detailData.photoUrl"
              style="width: 150px; height: 200px"
              fit="cover"
              :preview-src-list="[detailData.photoUrl]"
            />
            <span v-else>-</span>
          </el-descriptions-item>
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

.qrcode-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  .qrcode-content {
    text-align: center;

    .qrcode-image {
      width: 300px;
      height: 300px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 10px;
      background: #ffffff;
    }

    .qrcode-tip {
      margin-top: 16px;
      font-size: 14px;
      color: #666;
    }

    .qrcode-url {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
      word-break: break-all;
    }
  }
}
</style>
