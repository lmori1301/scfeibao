<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { emailRule, idCardRule, phoneRule, requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'
import { parsePhotoUrlListForDisplay } from '@/utils/photo-urls'
import {
  isLocalhostHostname,
  qrcodePortalBaseQuery,
  qrcodePortalRequestConfig,
} from '@/utils/portal-public-url'

const route = useRoute()

const qrcodePortalQuery = () => qrcodePortalBaseQuery()
const warnPhoneNeedLanIp = ref(false)

const warnQrUrlNotReachableOnPhone = computed(() => {
  const u = qrcodeData.value.url || ''
  return /127\.0\.0\.1|localhost/i.test(u)
})

/** 与侧栏、路由 meta 一致，避免手写面包屑与菜单不同步 */
const pageCrumb = computed(() => {
  const group = String(route.meta.groupTitle ?? '').trim()
  const title = String(route.meta.title ?? '').trim()
  if (group && title) return `系统首页 / ${group} / ${title}`
  return '系统首页 / 档案台账 / 人员台账'
})

type PersonnelListScope = '' | '在岗队员' | '待培训' | '已离岗'

const searchForm = ref({
  personnelNo: '',
  name: '',
  department: '',
  status: '',
  listScope: '' as PersonnelListScope,
})
const dialogVisible = ref(false)
const dialogTitle = ref('新增人员')
const formRef = ref()
const formData = ref<{
  id?: number
  personnelCode: string
  name: string
  idCard: string
  phone: string
  department: string
  workUnit: string
  position: string
  joinDate: string
  email: string
  taskCount: number
  trainingHours: number
  auditStatus: number
  status: string
  photo: string
}>({
  personnelCode: '',
  name: '',
  idCard: '',
  phone: '',
  department: '',
  workUnit: '',
  position: '',
  joinDate: '',
  email: '',
  taskCount: 0,
  trainingHours: 0,
  auditStatus: 1,
  status: '在职',
  photo: '',
})

const qrcodeDialogVisible = ref(false)
const qrcodeData = ref({ qrcode: '', url: '' })
const qrcodeLoading = ref(false)

const detailDialogVisible = ref(false)
const detailData = ref<any>(null)

const personnelFormPreviewUrl = computed(() => parsePhotoUrlListForDisplay(formData.value.photo)[0] || '')

const detailPersonnelPhotoUrls = computed(() =>
  detailData.value ? parsePhotoUrlListForDisplay(detailData.value.photoUrl) : []
)

const selectedRows = ref<any[]>([])

const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
}

const rules = {
  name: [requiredRule('姓名')],
  idCard: [idCardRule()],
  phone: [phoneRule()],
  email: [emailRule()],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/personnel', { params: filteredParams })
})

/** 与 QueryPersonnelDto 对齐：id、team、keyword、status */
const buildPersonnelQuery = () => {
  const f = searchForm.value
  const q: Record<string, string | number> = {}
  if (f.department) q.team = f.department
  if (f.name) q.keyword = f.name
  if (f.status === '在职') q.status = 1
  else if (f.status === '离职') q.status = 0
  const raw = String(f.personnelNo || '').trim()
  if (raw !== '') {
    const idNum = parseInt(raw, 10)
    if (!Number.isNaN(idNum) && String(idNum) === raw) q.id = idNum
    else q.personnelCode = raw
  }
  return q
}

const getStatusText = (status: any) => (status === 1 ? '在职' : '离职')

const auditStatusLabel = (v: number | undefined) => {
  if (v === 0) return '待审核'
  if (v === 1) return '已通过'
  if (v === 2) return '已拒绝'
  return '—'
}

const toIsoDate = (value: string | Date | undefined) => {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string' && value.includes('T')) return value
  return `${value}T00:00:00.000Z`
}

const tableRows = computed(() =>
  data.value.filter((item: any) => {
    const scope = searchForm.value.listScope
    if (scope === '在岗队员') return item.status === 1
    if (scope === '待培训') return item.status === 1 && !item.position
    if (scope === '已离岗') return item.status !== 1
    return true
  })
)

const handleSearch = () => {
  page.value = 1
  fetch(buildPersonnelQuery())
}
const handleReset = () => {
  searchForm.value = { personnelNo: '', name: '', department: '', status: '', listScope: '' }
  page.value = 1
  fetch({})
}

const handleAdd = () => {
  dialogTitle.value = '新增人员'
  formData.value = {
    id: undefined,
    personnelCode: '',
    name: '',
    idCard: '',
    phone: '',
    department: '',
    workUnit: '',
    position: '',
    joinDate: new Date().toISOString().split('T')[0],
    email: '',
    taskCount: 0,
    trainingHours: 0,
    auditStatus: 1,
    status: '在职',
    photo: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑人员'
  formData.value = {
    id: row.id,
    personnelCode: row.personnelCode || '',
    name: row.name || '',
    idCard: row.idCard || '',
    phone: row.phone || '',
    department: row.team || '',
    workUnit: row.workUnit || '',
    position: row.position || '',
    joinDate: row.joinDate || '',
    email: row.email || '',
    taskCount: row.taskCount ?? 0,
    trainingHours: row.trainingHours ?? 0,
    auditStatus: row.auditStatus ?? 1,
    status: row.status === 1 ? '在职' : '离职',
    photo: row.photoUrl || '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleQRCodeDialogClosed = () => {
  qrcodeLoading.value = false
  qrcodeData.value = { qrcode: '', url: '' }
}

const handleDetailDialogClosed = () => {
  detailData.value = null
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定移除人员“${row.name}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/personnel/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleSave = async () => {
  await formRef.value.validate()

  const saveData = {
    personnelCode: formData.value.personnelCode || undefined,
    name: formData.value.name,
    idCard: formData.value.idCard,
    phone: formData.value.phone,
    email: formData.value.email || undefined,
    team: formData.value.department,
    workUnit: formData.value.workUnit || undefined,
    position: formData.value.position,
    joinDate: toIsoDate(formData.value.joinDate),
    photoUrl: formData.value.photo,
    taskCount: formData.value.taskCount,
    trainingHours: formData.value.trainingHours,
    auditStatus: formData.value.auditStatus,
    status: formData.value.status === '在职' ? 1 : 0,
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

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

const handleGenerateQRCode = async (row: any) => {
  try {
    qrcodeLoading.value = true
    qrcodeDialogVisible.value = true
    const response = await http.get(
      `/personnel/${row.id}/qrcode${qrcodePortalQuery()}`,
      qrcodePortalRequestConfig()
    )
    qrcodeData.value = response.data
  } catch (error: any) {
    ElMessage.error(error.message || '生成二维码失败')
    qrcodeDialogVisible.value = false
  } finally {
    qrcodeLoading.value = false
  }
}

const handleDownloadQRCode = () => {
  const link = document.createElement('a')
  link.href = qrcodeData.value.qrcode
  link.download = `personnel-qrcode-${Date.now()}.png`
  link.click()
}

const handleViewDetail = async (row: any) => {
  try {
    const response = await http.get(`/personnel/${row.id}`)
    detailData.value = response?.data ?? response
    detailDialogVisible.value = true
  } catch (error: any) {
    ElMessage.error(error.message || '获取详情失败')
  }
}

const handleBatchGenerateQRCode = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要生成二维码的人员')
    return
  }

  try {
    ElMessage.info('正在生成二维码，请稍候...')
    const qrcodePromises = selectedRows.value.map((row) =>
      http.get(`/personnel/${row.id}/qrcode${qrcodePortalQuery()}`, qrcodePortalRequestConfig())
    )
    const results = await Promise.all(qrcodePromises)
    const htmlContent = generateQRCodeHTML(
      results.map((res, index) => ({
        name: selectedRows.value[index].name,
        position: selectedRows.value[index].position || '队员',
        team: selectedRows.value[index].team || '',
        qrcode: res.data.qrcode,
      }))
    )

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

const generateQRCodeHTML = (qrcodes: any[]) => {
  const items = qrcodes
    .map(
      (item) => `
      <div class="qrcode-item">
        <img src="${item.qrcode}" alt="${item.name}" />
        <div class="info">
          <h3>${item.name}</h3>
          <p>${item.position}</p>
          <p class="team">${item.team}</p>
        </div>
      </div>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>人员二维码</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f7fb; padding: 20px; }
    .header { text-align: center; margin-bottom: 24px; }
    .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .qrcode-item { background: #fff; border-radius: 12px; padding: 18px; text-align: center; border: 1px solid #e6edf7; }
    .qrcode-item img { width: 200px; height: 200px; object-fit: contain; border: 1px solid #e6edf7; border-radius: 0; padding: 8px; }
    .info h3 { margin: 12px 0 8px; }
    .team { color: #7b879b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>四川飞豹救援 - 人员二维码</h1>
    <p>共 ${qrcodes.length} 人</p>
  </div>
  <div class="container">${items}</div>
</body>
</html>`
}

fetch()

onMounted(() => {
  warnPhoneNeedLanIp.value = isLocalhostHostname()
})
</script>

<template>
  <div class="personnel-page admin-view-stack">
    <div class="page-crumb">{{ pageCrumb }}</div>

    <div class="admin-card admin-card--search">
    <div class="admin-list-toolbar">
      <div class="admin-list-toolbar__filters personnel-toolbar__filters">
        <el-select v-model="searchForm.listScope" placeholder="列表范围" clearable>
          <el-option label="在岗队员" value="在岗队员" />
          <el-option label="待培训" value="待培训" />
          <el-option label="已离岗" value="已离岗" />
        </el-select>
        <el-input v-model="searchForm.personnelNo" placeholder="人员编号" clearable />
        <el-input v-model="searchForm.name" placeholder="姓名" clearable>
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-input v-model="searchForm.department" placeholder="所属部门" clearable />
        <el-select v-model="searchForm.status" placeholder="人员状态" clearable>
          <el-option label="在职" value="在职" />
          <el-option label="离职" value="离职" />
        </el-select>
      </div>
      <div class="admin-list-toolbar__actions">
        <div class="admin-toolbar-actions__primary">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
    </div>

    <section class="admin-card admin-card--table personnel-panel personnel-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">人员列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button type="success" plain :disabled="selectedRows.length === 0" @click="handleBatchGenerateQRCode">
            批量二维码 ({{ selectedRows.length }})
          </el-button>
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增队员
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="name" label="姓名" width="100" show-overflow-tooltip />
        <el-table-column label="人员编号" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.personnelCode || row.id }}</template>
        </el-table-column>
        <el-table-column prop="team" label="所属部门" min-width="130" show-overflow-tooltip>
          <template #default="{ row }">{{ row.team || '—' }}</template>
        </el-table-column>
        <el-table-column prop="workUnit" label="工作单位" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.workUnit || '—' }}</template>
        </el-table-column>
        <el-table-column prop="position" label="职务" min-width="110" show-overflow-tooltip>
          <template #default="{ row }">{{ row.position || '—' }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="130" show-overflow-tooltip>
          <template #default="{ row }">{{ row.phone || '—' }}</template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.idCard || '—' }}</template>
        </el-table-column>
        <el-table-column label="入职日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.joinDate) }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusText(row.status) === '在职' ? 'success' : 'info'">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="264"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleViewDetail(row)">查看</el-button>
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="success" @click="handleGenerateQRCode(row)">二维码</el-button>
              <el-button link type="danger" @click="handleDelete(row)">移除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1100px" @closed="handleDialogClosed">
      <div class="personnel-dialog">
        <div class="personnel-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="personnel-form-section">
              <div class="personnel-form-section__header">
                <strong>人员形象</strong>
                <span>支持上传多张照片（最多 9 张），右侧卡片显示首张预览。</span>
              </div>
              <div class="personnel-form-section__body">
                <el-form-item label="人员照片">
                  <ImageUpload v-model="formData.photo" :limit="9" />
                </el-form-item>
              </div>
            </section>

            <section class="personnel-form-section">
              <div class="personnel-form-section__header">
                <strong>身份资料</strong>
                <span>单列维护编号、姓名、证件与联系方式，避免表单压缩。</span>
              </div>
              <div class="personnel-form-section__body">
                <el-form-item v-if="formData.id" label="系统ID">
                  <el-input :model-value="String(formData.id)" disabled />
                </el-form-item>
                <el-form-item label="人员编号">
                  <el-input v-model="formData.personnelCode" placeholder="如 FB3100001" />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="formData.phone" placeholder="请输入联系电话" />
                </el-form-item>
              </div>
            </section>

            <section class="personnel-form-section">
              <div class="personnel-form-section__header">
                <strong>岗位信息</strong>
                <span>按组织归属和任职信息分组录入，层次更清楚。</span>
              </div>
              <div class="personnel-form-section__body">
                <el-form-item label="所属部门">
                  <el-input v-model="formData.department" placeholder="请输入所属部门" />
                </el-form-item>
                <el-form-item label="工作单位">
                  <el-input v-model="formData.workUnit" placeholder="如 四川飞豹救援队" />
                </el-form-item>
                <el-form-item label="职务">
                  <el-input v-model="formData.position" placeholder="请输入职务" />
                </el-form-item>
                <el-form-item label="入职日期">
                  <el-date-picker v-model="formData.joinDate" type="date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="formData.email" placeholder="请输入电子邮箱" />
                </el-form-item>
                <el-form-item label="审核状态">
                  <el-select v-model="formData.auditStatus" style="width: 100%">
                    <el-option label="待审核" :value="0" />
                    <el-option label="已通过" :value="1" />
                    <el-option label="已拒绝" :value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="在职状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="在职" value="在职" />
                    <el-option label="离职" value="离职" />
                  </el-select>
                </el-form-item>
              </div>
            </section>

            <section class="personnel-form-section">
              <div class="personnel-form-section__header">
                <strong>履历数据</strong>
                <span>任务和培训数据纵向展示，便于编辑时逐项核对。</span>
              </div>
              <div class="personnel-form-section__body">
                <el-form-item label="出勤次数">
                  <el-input-number v-model="formData.taskCount" :min="0" style="width: 100%" />
                </el-form-item>
                <el-form-item label="培训时长(小时)">
                  <el-input-number v-model="formData.trainingHours" :min="0" style="width: 100%" />
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="personnel-dialog__side">
          <div class="preview-card">
            <div class="preview-card__photo">
              <img
                v-if="personnelFormPreviewUrl"
                :src="personnelFormPreviewUrl"
                :alt="formData.name || '照片'"
              />
              <div v-else class="preview-card__empty">队员照片预览</div>
            </div>
            <strong>{{ formData.name || '未填写姓名' }}</strong>
            <p>{{ formData.department || '待分配部门' }} · {{ formData.position || '待分配岗位' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.status }}</span>
              <span>{{ formData.joinDate || '未填写入队日期' }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="qrcodeDialogVisible"
      title="人员二维码"
      width="540px"
      align-center
      append-to-body
      destroy-on-close
      class="personnel-qrcode-dialog"
      @closed="handleQRCodeDialogClosed"
    >
      <div v-loading="qrcodeLoading" class="qrcode-panel">
        <div v-if="qrcodeData.qrcode" class="qrcode-panel__content">
          <img :src="qrcodeData.qrcode" alt="二维码" class="qrcode-panel__image" />
          <p>使用微信扫描，将打开与「查看」一致的人员详情页（官网展示）</p>
          <span class="qrcode-panel__url">{{ qrcodeData.url }}</span>
          <p v-if="warnPhoneNeedLanIp || warnQrUrlNotReachableOnPhone" class="qrcode-panel__hint">
            二维码中的地址在手机无法打开（本机回环无效）。任选其一：
            用 <strong>http://本机局域网IP:5176</strong> 访问后台后重新生成；
            或在 <code>admin/.env.development</code> 设置 <code>VITE_PORTAL_PUBLIC_URL</code>（如测试站
            https://test.scfb.org.cn）；
            或在 <code>backend/.env</code> 设置 <code>PORTAL_PUBLIC_URL</code> 后重启后端再生成。
          </p>
        </div>
      </div>
      <template #footer>
        <el-button @click="qrcodeDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleDownloadQRCode">下载二维码</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="detailDialogVisible" title="人员详情" width="920px" align-center @closed="handleDetailDialogClosed">
      <div v-if="detailData" class="personnel-detail">
        <div class="personnel-detail__info">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="人员编号">{{ detailData.personnelCode || detailData.id || '—' }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ detailData.name || '—' }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ detailData.idCard || '—' }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ detailData.phone || '—' }}</el-descriptions-item>
            <el-descriptions-item label="工作单位">{{ detailData.workUnit || '—' }}</el-descriptions-item>
            <el-descriptions-item label="所属部门">{{ detailData.team || '—' }}</el-descriptions-item>
            <el-descriptions-item label="职务">{{ detailData.position || '—' }}</el-descriptions-item>
            <el-descriptions-item label="入职日期">{{ formatDate(null, null, detailData.joinDate) }}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱">{{ detailData.email || '—' }}</el-descriptions-item>
            <el-descriptions-item label="出勤次数">{{ detailData.taskCount != null ? `${detailData.taskCount} 次` : '—' }}</el-descriptions-item>
            <el-descriptions-item label="培训时长">{{ detailData.trainingHours != null ? `${detailData.trainingHours} 小时` : '—' }}</el-descriptions-item>
            <el-descriptions-item label="在职状态">
              <el-tag :type="detailData.status === 1 ? 'success' : 'info'">{{ detailData.status === 1 ? '在职' : '离职' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="审核状态">
              <el-tag :type="detailData.auditStatus === 1 ? 'success' : detailData.auditStatus === 0 ? 'warning' : 'danger'">
                {{ auditStatusLabel(detailData.auditStatus) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="personnel-detail__photo-block">
          <div class="personnel-detail__photo-title">人员照片</div>
          <div v-if="detailPersonnelPhotoUrls.length" class="personnel-detail__photo-grid">
            <el-image
              v-for="(url, idx) in detailPersonnelPhotoUrls"
              :key="`${url}-${idx}`"
              :src="url"
              :preview-src-list="detailPersonnelPhotoUrls"
              :initial-index="idx"
              fit="contain"
              class="personnel-detail__photo-thumb"
              preview-teleported
            />
          </div>
          <div v-else class="personnel-detail__photo-empty">暂无人员照片</div>
        </div>
      </div>
      <template #footer><el-button @click="detailDialogVisible = false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.personnel-page { display: flex; flex-direction: column; gap: 18px; }
.personnel-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.personnel-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.personnel-dialog__main { min-width: 0; }
.personnel-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.personnel-form-section + .personnel-form-section { margin-top: 16px; }
.personnel-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.personnel-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.personnel-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.personnel-form-section__body { padding: 18px 20px 4px; }
.personnel-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.preview-card__photo {
  width: 72px; height: 72px; border-radius: 0; overflow: hidden; background: #edf3fb; flex: 0 0 auto;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.preview-card__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8b98ad; }
.personnel-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; line-height: 1.7; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span { padding: 6px 10px; border-radius: 999px; background: rgba(47,103,255,.1); color: #2f67ff; font-size: 12px; font-weight: 600; }
.qrcode-panel { min-height: 300px; }
.qrcode-panel__content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.qrcode-panel__image { width: 220px; height: 220px; object-fit: contain; padding: 12px; border: 1px solid #e8ecf5; border-radius: 0; background: #fff; }
.qrcode-panel p { color: #666; font-size: 13px; }
.qrcode-panel__url {
  color: #9aa3b2;
  font-size: 12px;
  word-break: break-all;
  text-align: center;
  max-width: 100%;
}

.qrcode-panel__hint {
  margin: 8px 0 0;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.55;
  color: #7a879d;
  text-align: left;
  background: #f5f8fc;
  border-radius: 10px;
  border: 1px solid #e8ecf5;
}

.qrcode-panel__hint code {
  font-size: 11px;
  padding: 0 4px;
  background: #eef3fa;
  border-radius: 4px;
}
.personnel-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.personnel-detail__info {
  width: 100%;
  min-width: 0;
}
.personnel-detail__photo-block {
  margin-top: 4px;
  padding-top: 18px;
  border-top: 1px solid #eef3fb;
}
.personnel-detail__photo-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2f46;
  margin-bottom: 12px;
}
.personnel-detail__photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 14px;
}
.personnel-detail__photo-thumb {
  width: 100%;
  min-height: clamp(200px, 34vh, 360px);
  max-height: min(46vh, 420px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6edf7;
  cursor: pointer;
  background: #f7faff;
}
.personnel-detail__photo-thumb :deep(.el-image) {
  width: 100%;
  height: 100%;
  display: block;
}
.personnel-detail__photo-thumb :deep(.el-image__inner) {
  width: 100%;
  height: 100%;
  min-height: clamp(200px, 34vh, 360px);
  max-height: min(46vh, 420px);
  object-fit: contain;
}
.personnel-detail__photo-empty {
  min-height: 200px;
  display: grid;
  place-items: center;
  color: #8b98ad;
  font-size: 14px;
  padding: 24px;
  border: 1px dashed #d8e3fa;
  border-radius: 12px;
  background: #fafcff;
}
@media (max-width: 1280px) {
  .personnel-dialog { grid-template-columns: 1fr; }
  .personnel-dialog__side { order: -1; }
}
@media (max-width: 900px) {
  .personnel-detail__photo-thumb { min-height: 180px; max-height: 40vh; }
  .personnel-detail__photo-thumb :deep(.el-image__inner) { min-height: 180px; max-height: 40vh; }
}
</style>
