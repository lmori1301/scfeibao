<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Download, Plus, RefreshRight, Search, Tickets } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePagination } from '@/composables/usePagination'
import { idCardRule, phoneRule, requiredRule } from '@/utils/validate'
import Pagination from '@/components/Pagination.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import http from '@/utils/http'
import { parsePhotoUrlListForDisplay } from '@/utils/photo-urls'

type CertificateListScope = '' | '有效资质' | '即将到期' | '已失效'

const searchForm = ref({
  certificateNo: '',
  type: '',
  name: '',
  status: '',
  listScope: '' as CertificateListScope,
})
const dialogVisible = ref(false)
const dialogTitle = ref('新增证书')
const formRef = ref()
const formData = ref({
  certificateNo: '',
  type: '',
  name: '',
  idCard: '',
  phone: '',
  workUnit: '',
  department: '',
  position: '',
  issueDate: '',
  validUntil: '',
  status: '有效',
  photo: '',
})

const detailDialogVisible = ref(false)
const detailData = ref<any>(null)

const certificateFormPreviewUrl = computed(() => parsePhotoUrlListForDisplay(formData.value.photo)[0] || '')

const formPreviewDisplayStatus = computed(() =>
  getCertificateDisplayStatus({
    status: formData.value.status === '有效' ? 1 : 0,
    expiryDate: formData.value.validUntil,
  })
)

const detailCertificatePhotoUrls = computed(() =>
  detailData.value ? parsePhotoUrlListForDisplay(detailData.value.photoUrl) : []
)

const certificateTypes = [
  '应急指挥专家', '绳索救援技术员', '潜水救援教练', '城市搜救技术员', '山地救援教练',
  '急救医疗专家', '高级急救师', '水域救援技术员', '无人机操作师', '装备管理工程师',
]

const rules = {
  certificateNo: [requiredRule('证书编号')],
  type: [requiredRule('证书类型')],
  name: [requiredRule('姓名')],
  idCard: [idCardRule()],
  phone: [phoneRule()],
}

const { data, total, loading, page, pageSize, fetch, handlePageChange } = usePagination((params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  )
  return http.get('/certificates', { params: filteredParams })
})

/** 与 QueryCertificateDto 对齐：certificateType、certificateNumber、keyword、status */
const buildCertificateQuery = () => {
  const f = searchForm.value
  const q: Record<string, string | number> = {}
  if (f.type) q.certificateType = f.type
  if (f.certificateNo) q.certificateNumber = f.certificateNo
  if (f.name) q.keyword = f.name
  if (f.status === '有效' || f.status === '过期' || f.status === '即将过期') q.status = 1
  else if (f.status === '失效') q.status = 0
  return q
}

const MS_PER_DAY = 86400000
/** 到期前预警天数（含到期当天，即剩余 0～5 天标「即将过期」） */
const PRE_EXPIRY_WARN_DAYS = 5

const startOfLocalDay = (d: Date) => {
  const x = new Date(d)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime()
}

const expiryDayStart = (expiryValue: unknown): number | null => {
  if (expiryValue === undefined || expiryValue === null || expiryValue === '') return null
  const d = new Date(expiryValue as string | Date)
  if (Number.isNaN(d.getTime())) return null
  return startOfLocalDay(d)
}

/** 有效期至的次日零点起视为过期（当天仍有效） */
const isCalendarExpired = (expiryValue: unknown) => {
  const exp = expiryDayStart(expiryValue)
  if (exp === null) return false
  return startOfLocalDay(new Date()) > exp
}

/** 距离到期日的剩余整天数：0=今天到期，5=还有5天到到期日 */
const wholeDaysUntilExpiry = (expiryValue: unknown): number | null => {
  const exp = expiryDayStart(expiryValue)
  if (exp === null) return null
  return Math.round((exp - startOfLocalDay(new Date())) / MS_PER_DAY)
}

const isWithinPreExpiryWindow = (expiryValue: unknown, days = PRE_EXPIRY_WARN_DAYS) => {
  const left = wholeDaysUntilExpiry(expiryValue)
  if (left === null) return false
  return left >= 0 && left <= days
}

/** 列表/详情展示用：先看过期与临期，再看是否已作废 */
const getCertificateDisplayStatus = (row: { status: number; expiryDate?: unknown }) => {
  if (row.status !== 1) {
    return { label: '失效' as const, tag: 'info' as const }
  }
  if (isCalendarExpired(row.expiryDate)) {
    return { label: '过期' as const, tag: 'danger' as const }
  }
  if (isWithinPreExpiryWindow(row.expiryDate, PRE_EXPIRY_WARN_DAYS)) {
    return { label: '即将过期' as const, tag: 'warning' as const }
  }
  return { label: '有效' as const, tag: 'success' as const }
}

/** 相对路径走 Vite 代理 /uploads */
const resolveMediaUrl = (url: string | undefined | null) => {
  if (!url || !String(url).trim()) return ''
  const u = String(url).trim()
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  return u.startsWith('/') ? u : `/${u}`
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
    const dispLabel = getCertificateDisplayStatus(item).label
    if (scope === '有效资质') {
      return item.status === 1 && !isCalendarExpired(item.expiryDate)
    }
    if (scope === '即将到期') {
      return item.status === 1 && !isCalendarExpired(item.expiryDate) && isWithinPreExpiryWindow(item.expiryDate)
    }
    if (scope === '已失效') return item.status !== 1
    const st = searchForm.value.status
    if (st === '有效') return dispLabel === '有效'
    if (st === '失效') return item.status !== 1
    if (st === '过期') return dispLabel === '过期'
    if (st === '即将过期') return dispLabel === '即将过期'
    return true
  })
)

const handleSearch = () => {
  page.value = 1
  fetch(buildCertificateQuery())
}
const handleReset = () => {
  searchForm.value = { certificateNo: '', type: '', name: '', status: '', listScope: '' }
  page.value = 1
  fetch({})
}

const handleAdd = () => {
  dialogTitle.value = '新增证书'
  const today = new Date().toISOString().split('T')[0]
  formData.value = {
    certificateNo: '',
    type: '',
    name: '',
    idCard: '',
    phone: '',
    workUnit: '',
    department: '',
    position: '',
    issueDate: today,
    validUntil: '',
    status: '有效',
    photo: '',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
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
  ElMessageBox.confirm(`确定作废证书“${row.certificateNumber}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/certificates/${row.id}`)
    ElMessage.success('删除成功')
    fetch()
  })
}

const handleViewDetail = async (row: any) => {
  try {
    const response = await http.get(`/certificates/${row.id}`)
    detailData.value = response?.data ?? response
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
    issueDate: toIsoDate(formData.value.issueDate),
    expiryDate: toIsoDate(formData.value.validUntil),
    photoUrl: formData.value.photo || undefined,
    status: formData.value.status === '有效' ? 1 : 0,
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

const formatDate = (_row: any, _column: any, cellValue: any) => {
  if (!cellValue) return '--'
  const date = new Date(cellValue)
  return date.toISOString().split('T')[0]
}

fetch()
</script>

<template>
  <div class="certificates-page admin-view-stack">
    <div class="page-crumb">系统首页 / 档案台账 / 证书台账</div>

    <div class="admin-card admin-card--search">
    <div class="admin-list-toolbar certificates-toolbar">
      <div class="admin-list-toolbar__filters certificates-toolbar__filters">
        <el-select v-model="searchForm.listScope" placeholder="列表范围" clearable>
          <el-option label="有效资质" value="有效资质" />
          <el-option label="即将到期" value="即将到期" />
          <el-option label="已失效" value="已失效" />
        </el-select>
        <el-select v-model="searchForm.type" placeholder="证书类型" clearable>
          <el-option v-for="type in certificateTypes" :key="type" :label="type" :value="type" />
        </el-select>
        <el-select v-model="searchForm.status" placeholder="证件状态" clearable>
          <el-option label="有效" value="有效" />
          <el-option label="即将过期" value="即将过期" />
          <el-option label="过期" value="过期" />
          <el-option label="失效" value="失效" />
        </el-select>
        <el-input v-model="searchForm.name" placeholder="持证人姓名" clearable />
        <el-input v-model="searchForm.certificateNo" placeholder="输入证书编号" clearable>
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

    <div class="admin-card admin-card--table certificates-panel certificates-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">证件列表</div>
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
            新增证书
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="certificateNumber" label="证书编号" min-width="160" show-overflow-tooltip />
        <el-table-column prop="certificateType" label="证书类型" min-width="160" show-overflow-tooltip>
          <template #default="{ row }">{{ row.certificateType || row.certificateName || '—' }}</template>
        </el-table-column>
        <el-table-column prop="holderIdCard" label="身份证号" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.holderIdCard || '—' }}</template>
        </el-table-column>
        <el-table-column
          prop="holderName"
          label="姓名"
          min-width="100"
          align="left"
          header-align="left"
          class-name="certificates-table__col-holder"
          label-class-name="certificates-table__col-holder--h"
          show-overflow-tooltip
        />
        <el-table-column prop="issuingAuthority" label="发证机构" min-width="140" show-overflow-tooltip />
        <el-table-column label="发证日期" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.issueDate) }}</template>
        </el-table-column>
        <el-table-column label="有效期至" width="120">
          <template #default="{ row }">{{ formatDate(null, null, row.expiryDate) }}</template>
        </el-table-column>
        <el-table-column label="状态" width="108">
          <template #default="{ row }">
            <el-tag :type="getCertificateDisplayStatus(row).tag">{{ getCertificateDisplayStatus(row).label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleViewDetail(row)">查看</el-button>
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">作废</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1120px" @closed="handleDialogClosed">
      <div class="certificates-dialog">
        <div class="certificates-dialog__main">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="96px">
            <section class="certificates-form-section">
              <div class="certificates-form-section__header">
                <strong>证件形象</strong>
                <span>支持上传多张证书照片（最多 9 张），右侧预览显示首张。</span>
              </div>
              <div class="certificates-form-section__body">
                <el-form-item label="证书照片">
                  <ImageUpload v-model="formData.photo" :limit="9" />
                </el-form-item>
              </div>
            </section>

            <section class="certificates-form-section">
              <div class="certificates-form-section__header">
                <strong>证件基础信息</strong>
                <span>按证件编号、类型、人员信息依次录入，避免横向拥挤。</span>
              </div>
              <div class="certificates-form-section__body">
                <el-form-item label="证书编号" prop="certificateNo"><el-input v-model="formData.certificateNo" /></el-form-item>
                <el-form-item label="证书类型" prop="type">
                  <el-select v-model="formData.type" style="width: 100%">
                    <el-option v-for="type in certificateTypes" :key="type" :label="type" :value="type" />
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name"><el-input v-model="formData.name" /></el-form-item>
                <el-form-item label="身份证号" prop="idCard"><el-input v-model="formData.idCard" /></el-form-item>
                <el-form-item label="联系电话" prop="phone"><el-input v-model="formData.phone" /></el-form-item>
                <el-form-item label="工作单位"><el-input v-model="formData.workUnit" /></el-form-item>
                <el-form-item label="所属部门"><el-input v-model="formData.department" /></el-form-item>
                <el-form-item label="职位"><el-input v-model="formData.position" /></el-form-item>
              </div>
            </section>

            <section class="certificates-form-section">
              <div class="certificates-form-section__header">
                <strong>有效期信息</strong>
                <span>按发证、到期和状态顺序维护，便于核验证件有效性。</span>
              </div>
              <div class="certificates-form-section__body">
                <el-form-item label="发证日期"><el-date-picker v-model="formData.issueDate" type="date" style="width: 100%" /></el-form-item>
                <el-form-item label="有效期限">
                  <el-date-picker v-model="formData.validUntil" type="date" style="width: 100%" />
                  <div class="certificates-form-hint">到期前 {{ PRE_EXPIRY_WARN_DAYS }} 天列表标「即将过期」；超过「有效期至」当日次日标「过期」。作废请选「失效」。</div>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="有效" value="有效" />
                    <el-option label="失效" value="失效" />
                  </el-select>
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="certificates-dialog__side">
          <div class="preview-card">
            <div class="preview-card__thumb">
              <img
                v-if="certificateFormPreviewUrl"
                :src="certificateFormPreviewUrl"
                :alt="formData.certificateNo || '证书照片'"
              />
              <div v-else class="preview-card__icon"><el-icon><Tickets /></el-icon></div>
            </div>
            <strong>{{ formData.certificateNo || '未填写证书编号' }}</strong>
            <p>{{ formData.type || '待选证书类型' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.name || '待填持证人' }}</span>
              <span>{{ formPreviewDisplayStatus.label }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>

    <el-dialog v-model="detailDialogVisible" title="证书详情" width="920px" align-center @closed="handleDetailDialogClosed">
      <div v-if="detailData" class="certificate-detail">
        <div class="certificate-detail__info">
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
              <el-tag :type="getCertificateDisplayStatus(detailData).tag">{{ getCertificateDisplayStatus(detailData).label }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="certificate-detail__photo-block">
          <div class="certificate-detail__photo-title">证书照片</div>
          <div v-if="detailCertificatePhotoUrls.length" class="certificate-detail__photo-grid">
            <el-image
              v-for="(url, idx) in detailCertificatePhotoUrls"
              :key="`${url}-${idx}`"
              :src="url"
              :preview-src-list="detailCertificatePhotoUrls"
              :initial-index="idx"
              fit="contain"
              class="certificate-detail__photo-thumb"
              preview-teleported
            />
          </div>
          <div v-else class="certificate-detail__photo-empty">暂无证书照片</div>
        </div>
      </div>
      <template #footer><el-button @click="detailDialogVisible = false">关闭</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.certificates-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }

/* 查询条：单行与宽度由 global.scss 的 .admin-card--search 统一控制 */
.certificates-toolbar.admin-list-toolbar {
  align-items: center;
}
.certificates-panel.certificates-table-panel {
  padding: 0;
  border: 0;
  background: transparent;
}

/* 持证人列：内容贴左，收紧左侧内边距（宽表下避免「左侧一大块空白」观感） */
.certificates-panel.certificates-table-panel :deep(td.certificates-table__col-holder.el-table__cell) {
  text-align: left;
  padding-left: 8px;
}
.certificates-panel.certificates-table-panel :deep(th.certificates-table__col-holder--h.el-table__cell) {
  text-align: left;
  padding-left: 8px;
}
.certificates-panel.certificates-table-panel :deep(.certificates-table__col-holder .cell) {
  text-align: left;
}
.certificates-dialog__main { min-width: 0; }
.certificates-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.certificates-form-section + .certificates-form-section { margin-top: 16px; }
.certificates-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.certificates-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.certificates-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.certificates-form-section__body { padding: 18px 20px 4px; }
.certificates-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.certificates-form-hint {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.5;
  color: #8a96aa;
}
.preview-card__thumb {
  width: 100%;
  min-height: 120px;
  border-radius: 14px;
  overflow: hidden;
  background: #edf3fb;
  display: grid;
  place-items: center;
  img {
    width: 100%;
    max-height: 180px;
    object-fit: contain;
  }
}
.preview-card__icon {
  width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center; background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2f67ff; font-size: 24px; flex: 0 0 auto;
}
.certificate-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.certificate-detail__info {
  width: 100%;
  min-width: 0;
}
.certificate-detail__photo-block {
  margin-top: 4px;
  padding-top: 18px;
  border-top: 1px solid #eef3fb;
}
.certificate-detail__photo-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2f46;
  margin-bottom: 12px;
}
.certificate-detail__photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 14px;
}
.certificate-detail__photo-thumb {
  width: 100%;
  min-height: clamp(200px, 34vh, 360px);
  max-height: min(46vh, 420px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6edf7;
  cursor: pointer;
  background: #f7faff;
}
.certificate-detail__photo-thumb :deep(.el-image) {
  width: 100%;
  height: 100%;
  display: block;
}
.certificate-detail__photo-thumb :deep(.el-image__inner) {
  width: 100%;
  height: 100%;
  min-height: clamp(200px, 34vh, 360px);
  max-height: min(46vh, 420px);
  object-fit: contain;
}
.certificate-detail__photo-empty {
  min-height: 200px;
  width: 100%;
  display: grid;
  place-items: center;
  color: #8b98ad;
  font-size: 14px;
  padding: 24px;
  text-align: center;
  border: 1px dashed #d8e3fa;
  border-radius: 12px;
  background: #fafcff;
}
.certificates-dialog { display: grid; grid-template-columns: minmax(0, 1.35fr) 320px; gap: 24px; }
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span { padding: 6px 10px; border-radius: 999px; background: rgba(47,103,255,.1); color: #2f67ff; font-size: 12px; font-weight: 600; }
.detail-card { padding: 10px 0; }
@media (max-width: 1280px) {
  .certificates-dialog { grid-template-columns: 1fr; }
  .certificates-dialog__side { order: -1; }
}
@media (max-width: 900px) {
  .certificate-detail__photo-thumb { min-height: 180px; max-height: 40vh; }
  .certificate-detail__photo-thumb :deep(.el-image__inner) { min-height: 180px; max-height: 40vh; }
}
</style>
