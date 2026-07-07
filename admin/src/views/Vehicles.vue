<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Download, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'
import { parsePhotoUrlListForDisplay } from '@/utils/photo-urls'

const route = useRoute()

const pageCrumb = computed(() => {
  const group = String(route.meta.groupTitle ?? '').trim()
  const title = String(route.meta.title ?? '').trim()
  if (group && title) return `系统首页 / ${group} / ${title}`
  return '系统首页 / 档案台账 / 车辆台账'
})

type VehicleListScope = '' | '值勤中' | '可调度' | '停用维护'

const searchForm = ref({ plate: '', type: '', status: '', listScope: '' as VehicleListScope })
const dialogVisible = ref(false)
const dialogTitle = ref('新增车辆')
const formRef = ref()
const formData = ref({
  unit: '',
  vehicleNo: '',
  type: '',
  plate: '',
  brand: '',
  engineNo: '',
  frameNo: '',
  color: '',
  equipDate: '',
  issueDate: '',
  validUntil: '',
  status: '正常',
  photo: '',
})

const detailDialogVisible = ref(false)
const detailData = ref<any>(null)

const vehicleTypes = [
  '应急救援指挥车', '救援运输车', '地震救援车', '抗洪抢险车', '应急炊事车',
  '应急宿营车', '通信指挥车', '应急救援装备车', '应急照明车', '医疗救援车',
  '移动方舱医疗车', '内勤车',
]

const rules = {
  plate: [requiredRule('车辆号牌')],
  type: [requiredRule('车辆类型')],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/vehicles', { params: filteredParams })
})

/** 与 QueryVehicleDto 对齐：vehicleType、keyword（号牌）、status */
const buildVehicleQuery = () => {
  const f = searchForm.value
  const q: Record<string, string | number> = {}
  if (f.type) q.vehicleType = f.type
  if (f.plate) q.keyword = f.plate
  if (f.status === '正常') q.status = 1
  else if (f.status === '停用' || f.status === '维修中') q.status = 0
  return q
}

const getStatusText = (status: any) => (status === 1 ? '正常' : '停用')

const toIsoDate = (value: string | Date | undefined) => {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string' && value.includes('T')) return value
  return `${value}T00:00:00.000Z`
}

const tableRows = computed(() =>
  data.value.filter((item: any) => {
    const scope = searchForm.value.listScope
    if (scope === '值勤中') return item.status === 1 && !!item.team
    if (scope === '可调度') return item.status === 1
    if (scope === '停用维护') return item.status !== 1
    return true
  })
)

const previewPhotoUrl = computed(() => parsePhotoUrlListForDisplay(formData.value.photo)[0] || '')

const detailPhotoUrls = computed(() =>
  detailData.value ? parsePhotoUrlListForDisplay(detailData.value.photoUrl) : []
)

const handleSearch = () => {
  page.value = 1
  fetch(buildVehicleQuery())
}
const handleReset = () => {
  searchForm.value = { plate: '', type: '', status: '', listScope: '' }
  page.value = 1
  fetch({})
}

const handleAdd = () => {
  dialogTitle.value = '新增车辆'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    unit: '',
    vehicleNo: '',
    type: '',
    plate: '',
    brand: '',
    engineNo: '',
    frameNo: '',
    color: '',
    equipDate: today,
    issueDate: today,
    validUntil: '',
    status: '正常',
    photo: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const toDateInput = (value: string | Date | undefined) => {
  if (!value) return ''
  const s = typeof value === 'string' ? value : value.toISOString()
  return s.includes('T') ? s.slice(0, 10) : s.slice(0, 10)
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑车辆'
  formData.value = {
    id: row.id,
    unit: row.team || '',
    vehicleNo: row.vehicleNo != null && row.vehicleNo !== '' ? String(row.vehicleNo) : '',
    type: row.vehicleType || '',
    plate: row.plateNumber || '',
    brand: row.brandModel || '',
    engineNo: row.engineNumber || '',
    frameNo: row.chassisNumber || '',
    color: row.color || '',
    equipDate: toDateInput(row.purchaseDate),
    issueDate: toDateInput(row.issueDate),
    validUntil: toDateInput(row.validityDate),
    status: row.status === 1 ? '正常' : '停用',
    photo: row.photoUrl || '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDetailDialogClosed = () => {
  detailData.value = null
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定下线车辆“${row.plateNumber}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/vehicles/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleViewDetail = async (row: any) => {
  try {
    const response = await http.get(`/vehicles/${row.id}`)
    // 后端统一包装为 { code, message, data }，与列表接口一致取 data
    detailData.value = response?.data ?? response
    detailDialogVisible.value = true
  } catch (error: any) {
    ElMessage.error(error.message || '获取详情失败')
  }
}

const handleSave = async () => {
    await formRef.value.validate()
    const saveData = {
      plateNumber: formData.value.plate,
      vehicleNo: formData.value.vehicleNo || undefined,
      vehicleType: formData.value.type,
      brandModel: formData.value.brand,
      engineNumber: formData.value.engineNo || undefined,
      chassisNumber: formData.value.frameNo || undefined,
      color: formData.value.color,
      purchaseDate: toIsoDate(formData.value.equipDate),
      issueDate: toIsoDate(formData.value.issueDate),
      validityDate: toIsoDate(formData.value.validUntil),
      team: formData.value.unit,
      photoUrl: formData.value.photo,
      status: formData.value.status === '正常' ? 1 : 0,
    }
    if (formData.value.id) {
      await http.patch(`/vehicles/${formData.value.id}`, saveData)
    } else {
      await http.post('/vehicles', saveData)
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

fetch()
</script>

<template>
  <div class="vehicles-page admin-view-stack">
    <div class="page-crumb">{{ pageCrumb }}</div>

    <div class="admin-card admin-card--search">
    <div class="admin-list-toolbar">
      <div class="admin-list-toolbar__filters vehicles-toolbar__filters">
        <el-select v-model="searchForm.listScope" placeholder="列表范围" clearable>
          <el-option label="值勤中" value="值勤中" />
          <el-option label="可调度" value="可调度" />
          <el-option label="停用维护" value="停用维护" />
        </el-select>
        <el-select v-model="searchForm.type" placeholder="车辆类型" clearable>
          <el-option v-for="type in vehicleTypes" :key="type" :label="type" :value="type" />
        </el-select>
        <el-select v-model="searchForm.status" placeholder="使用状态" clearable>
          <el-option label="正常" value="正常" />
          <el-option label="维修中" value="维修中" />
          <el-option label="停用" value="停用" />
        </el-select>
        <el-input v-model="searchForm.plate" placeholder="输入车辆号牌" clearable>
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </div>
      <div class="admin-list-toolbar__actions">
        <div class="admin-toolbar-actions__primary">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
    </div>

    <section class="admin-card admin-card--table vehicles-panel vehicles-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">车辆列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain>
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button plain @click="fetch()">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增车辆
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="车辆号牌" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.plateNumber || '—' }}</template>
        </el-table-column>
        <el-table-column label="车辆编号" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.vehicleNo != null && row.vehicleNo !== '' ? row.vehicleNo : '—' }}</template>
        </el-table-column>
        <el-table-column label="车辆类型" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">{{ row.vehicleType || '—' }}</template>
        </el-table-column>
        <el-table-column label="车属单位" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.team || '—' }}</template>
        </el-table-column>
        <el-table-column label="厂牌型号" min-width="160" show-overflow-tooltip>
          <template #default="{ row }">{{ row.brandModel || '—' }}</template>
        </el-table-column>
        <el-table-column label="车体颜色" width="100" show-overflow-tooltip>
          <template #default="{ row }">{{ row.color || '—' }}</template>
        </el-table-column>
        <el-table-column label="装备日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.purchaseDate) }}</template>
        </el-table-column>
        <el-table-column label="当前状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusText(row.status) === '正常' ? 'success' : 'warning'">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="210"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleViewDetail(row)">查看</el-button>
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">下线</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1120px" @closed="handleDialogClosed">
      <div class="vehicles-dialog">
        <div class="vehicles-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="vehicles-form-section">
              <div class="vehicles-form-section__header">
                <strong>车辆形象</strong>
                <span>支持上传多张车辆照片（最多 9 张），右侧预览显示首张。</span>
              </div>
              <div class="vehicles-form-section__body">
                <el-form-item label="车辆照片">
                  <ImageUpload v-model="formData.photo" :limit="9" />
                </el-form-item>
              </div>
            </section>

            <section class="vehicles-form-section">
              <div class="vehicles-form-section__header">
                <strong>基础资料</strong>
                <span>按单位、编号、车型和车辆识别信息逐项录入，不再横向挤压。</span>
              </div>
              <div class="vehicles-form-section__body">
                <el-form-item label="车属单位"><el-input v-model="formData.unit" /></el-form-item>
                <el-form-item label="车辆编号"><el-input v-model="formData.vehicleNo" /></el-form-item>
                <el-form-item label="车辆类型" prop="type">
                  <el-select v-model="formData.type" style="width: 100%">
                    <el-option v-for="type in vehicleTypes" :key="type" :label="type" :value="type" />
                  </el-select>
                </el-form-item>
                <el-form-item label="车辆号牌" prop="plate"><el-input v-model="formData.plate" /></el-form-item>
                <el-form-item label="厂牌型号"><el-input v-model="formData.brand" /></el-form-item>
                <el-form-item label="发动机号"><el-input v-model="formData.engineNo" /></el-form-item>
                <el-form-item label="车架号码"><el-input v-model="formData.frameNo" /></el-form-item>
                <el-form-item label="车体颜色"><el-input v-model="formData.color" /></el-form-item>
              </div>
            </section>

            <section class="vehicles-form-section">
              <div class="vehicles-form-section__header">
                <strong>状态信息</strong>
                <span>按装备、发证、有效期和状态顺序维护台账时间轴。</span>
              </div>
              <div class="vehicles-form-section__body">
                <el-form-item label="装备日期"><el-date-picker v-model="formData.equipDate" type="date" style="width: 100%" /></el-form-item>
                <el-form-item label="发证日期"><el-date-picker v-model="formData.issueDate" type="date" style="width: 100%" /></el-form-item>
                <el-form-item label="有效期限"><el-date-picker v-model="formData.validUntil" type="date" style="width: 100%" /></el-form-item>
                <el-form-item label="当前状态"><el-select v-model="formData.status" style="width: 100%"><el-option label="正常" value="正常" /><el-option label="维修中" value="维修中" /><el-option label="停用" value="停用" /></el-select></el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="vehicles-dialog__side">
          <div class="preview-card">
            <div class="preview-card__photo">
              <img v-if="previewPhotoUrl" :src="previewPhotoUrl" :alt="formData.plate || '车辆照片'" />
              <div v-else class="preview-card__empty">车辆照片预览</div>
            </div>
            <strong>{{ formData.plate || '未填写车辆号牌' }}</strong>
            <p>{{ formData.type || '待选车辆类型' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.status }}</span>
              <span>{{ formData.unit || '未填写单位' }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>

    <el-dialog
      v-model="detailDialogVisible"
      title="车辆详情"
      width="880px"
      align-center
      @closed="handleDetailDialogClosed"
    >
      <div v-if="detailData" class="detail-card">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="车属单位">{{ detailData.team || '-' }}</el-descriptions-item>
          <el-descriptions-item label="车辆编号">{{ detailData.vehicleNo || '-' }}</el-descriptions-item>
          <el-descriptions-item label="车辆类型">{{ detailData.vehicleType || '-' }}</el-descriptions-item>
          <el-descriptions-item label="车辆号牌">{{ detailData.plateNumber || '-' }}</el-descriptions-item>
          <el-descriptions-item label="厂牌型号">{{ detailData.brandModel || '-' }}</el-descriptions-item>
          <el-descriptions-item label="发动机号">{{ detailData.engineNumber || '-' }}</el-descriptions-item>
          <el-descriptions-item label="车架号码">{{ detailData.chassisNumber || '-' }}</el-descriptions-item>
          <el-descriptions-item label="车体颜色">{{ detailData.color || '-' }}</el-descriptions-item>
          <el-descriptions-item label="装备日期">{{ formatDate(null, null, detailData.purchaseDate) }}</el-descriptions-item>
          <el-descriptions-item label="发证日期">{{ formatDate(null, null, detailData.issueDate) }}</el-descriptions-item>
          <el-descriptions-item label="有效期限">{{ formatDate(null, null, detailData.validityDate) }}</el-descriptions-item>
          <el-descriptions-item label="当前状态"><el-tag :type="detailData.status === 1 ? 'success' : 'warning'">{{ detailData.status === 1 ? '正常' : '停用' }}</el-tag></el-descriptions-item>
        </el-descriptions>
        <div class="detail-photos">
          <div class="detail-photos__title">车辆照片</div>
          <div v-if="detailPhotoUrls.length" class="detail-photos__grid">
            <el-image
              v-for="(url, idx) in detailPhotoUrls"
              :key="`${url}-${idx}`"
              :src="url"
              :preview-src-list="detailPhotoUrls"
              :initial-index="idx"
              fit="contain"
              class="detail-photos__thumb"
              preview-teleported
            />
          </div>
          <div v-else class="detail-photos__empty">暂无车辆照片</div>
        </div>
      </div>
      <template #footer><el-button @click="detailDialogVisible = false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.vehicles-page { display: flex; flex-direction: column; gap: 18px; }
.vehicles-dialog__main { min-width: 0; }
.vehicles-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.vehicles-form-section + .vehicles-form-section { margin-top: 16px; }
.vehicles-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.vehicles-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.vehicles-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.vehicles-form-section__body { padding: 18px 20px 4px; }
.vehicles-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.vehicles-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.vehicles-toolbar__filters :deep(.el-input),
.vehicles-toolbar__filters :deep(.el-select) {
  flex: 0 1 auto;
}
.vehicles-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.preview-card__photo {
  width: 92px; height: 70px; border-radius: 0; overflow: hidden; background: #edf3fb; flex: 0 0 auto;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.preview-card__empty { width: 100%; height: 100%; display: grid; place-items: center; color: #8b98ad; }
.vehicles-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span { padding: 6px 10px; border-radius: 999px; background: rgba(47,103,255,.1); color: #2f67ff; font-size: 12px; font-weight: 600; }
.detail-card { padding: 10px 0; }
.detail-photos {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #eef3fb;
}
.detail-photos__title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2f46;
  margin-bottom: 12px;
}
.detail-photos__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 14px;
}
.detail-photos__thumb {
  width: 100%;
  min-height: clamp(200px, 36vh, 380px);
  max-height: min(48vh, 440px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6edf8;
  cursor: pointer;
  background: #f7faff;
}
.detail-photos__thumb :deep(.el-image) {
  width: 100%;
  height: 100%;
  display: block;
}
.detail-photos__thumb :deep(.el-image__inner) {
  width: 100%;
  height: 100%;
  min-height: clamp(200px, 36vh, 380px);
  max-height: min(48vh, 440px);
  object-fit: contain;
}
.detail-photos__empty {
  min-height: 160px;
  display: grid;
  place-items: center;
  color: #8b98ad;
  font-size: 14px;
  border: 1px dashed #d8e3fa;
  border-radius: 12px;
  background: #fafcff;
  padding: 24px;
}
@media (max-width: 1280px) {
  .vehicles-dialog { grid-template-columns: 1fr; }
  .vehicles-dialog__side { order: -1; }
}
</style>
