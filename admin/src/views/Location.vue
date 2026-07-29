<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Phone, Plus, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import { getTeamUnitOptions, type TeamUnitItem } from '@/api/team-unit'
import { applyAmapSecurityConfig } from '@/utils/amap-security'
import http from '@/utils/http'

interface LocationItem {
  id?: number
  name: string
  pointName: string
  address: string
  phone: string
  longitude: number | null
  latitude: number | null
  zoom?: number
  sort?: number
  status?: number
}

type LocationSavePayload = Omit<LocationItem, 'id'> & { id?: number }
const AMAP_KEY = import.meta.env.VITE_AMAP_KEY || 'e2f3c362950ac5d432a489b7f74e16cf'
let amapLoaderPromise: Promise<any> | null = null

declare global {
  interface Window {
    AMap?: any
  }
}

const tableData = ref<LocationItem[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const geoResolving = ref(false)
const batchGeoResolving = ref(false)
const saving = ref(false)
const createDefaultFormData = (): LocationItem => ({
  name: '',
  pointName: '',
  address: '',
  phone: '',
  longitude: null,
  latitude: null,
  zoom: 15,
  sort: 0,
  status: 1,
})
const formData = ref<LocationItem>(createDefaultFormData())
const originalFormData = ref<LocationItem | null>(null)
const isEdit = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const statusFilter = ref('' as '' | '启用中' | '已禁用')
const LOCATION_BATCH_PAGE_SIZE = 100
const teamUnitOptions = ref<TeamUnitItem[]>([])
let coordinateResolveTimer: number | null = null
let coordinateRequestToken = 0

const loadAmap = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('地图环境不可用'))
  }

  applyAmapSecurityConfig()

  if (window.AMap) {
    return Promise.resolve(window.AMap)
  }

  if (amapLoaderPromise) {
    return amapLoaderPromise
  }

  amapLoaderPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-amap-admin-loader="true"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.AMap))
      existingScript.addEventListener('error', () => reject(new Error('高德地图脚本加载失败')))
      return
    }

    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&plugin=AMap.Geocoder`
    script.async = true
    script.defer = true
    script.dataset.amapAdminLoader = 'true'
    script.onload = () => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        reject(new Error('高德地图初始化失败'))
      }
    }
    script.onerror = () => reject(new Error('高德地图脚本加载失败，请确认当前访问域名已加入高德白名单'))
    document.head.appendChild(script)
  }).catch((error) => {
    amapLoaderPromise = null
    throw error
  })

  return amapLoaderPromise
}

const toOptionalNumber = (value: unknown, fallback: number | null = null) => {
  if (value === '' || value === null || value === undefined) return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toLocationFormData = (row?: Partial<LocationItem>): LocationItem => ({
  id: row?.id,
  name: row?.name || '',
  pointName: row?.pointName || '',
  address: row?.address || '',
  phone: row?.phone || '',
  longitude: toOptionalNumber(row?.longitude),
  latitude: toOptionalNumber(row?.latitude),
  zoom: toOptionalNumber(row?.zoom, 15) ?? 15,
  sort: toOptionalNumber(row?.sort, 0) ?? 0,
  status: toOptionalNumber(row?.status, 1) ?? 1,
})

const toLocationPayload = (row: LocationItem): LocationSavePayload => ({
  name: row.name,
  pointName: row.pointName,
  address: row.address,
  phone: row.phone,
  longitude: row.longitude ?? 0,
  latitude: row.latitude ?? 0,
  zoom: row.zoom ?? 15,
  sort: row.sort ?? 0,
  status: row.status ?? 1,
})

const fetchList = async () => {
  loading.value = true
  try {
    const response = await http.get('/locations', {
      params: { page: page.value, pageSize: pageSize.value },
    })
    tableData.value = response.data.items || []
    total.value = response.data.total || 0
  } catch {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const fetchAllLocations = async () => {
  const items: LocationItem[] = []
  let currentPage = 1
  let totalPages = 1

  while (currentPage <= totalPages) {
    const response = await http.get('/locations', {
      params: { page: currentPage, pageSize: LOCATION_BATCH_PAGE_SIZE },
    })
    const data = response.data || {}
    items.push(...(data.items || []).map((item: LocationItem) => toLocationFormData(item)))
    totalPages = Number(data.totalPages || 1)
    currentPage += 1
  }

  return items
}

const tableRows = computed(() =>
  tableData.value.filter((item) => {
    if (statusFilter.value === '启用中') return item.status === 1
    if (statusFilter.value === '已禁用') return item.status !== 1
    return true
  })
)

const getTeamPreset = (name?: string) => teamUnitOptions.value.find((item) => item.name === name)

const handleAdd = () => {
  formData.value = createDefaultFormData()
  originalFormData.value = null
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: LocationItem) => {
  formData.value = toLocationFormData(row)
  originalFormData.value = toLocationFormData(row)
  isEdit.value = true
  dialogVisible.value = true
}

const handleTeamNameChange = (teamName: string) => {
  const preset = getTeamPreset(teamName)
  if (!preset) return

  const previousPreset = getTeamPreset(originalFormData.value?.name)
  const currentPointName = formData.value.pointName.trim()

  if (!currentPointName || currentPointName === previousPreset?.pointName) {
    formData.value.pointName = preset.pointName
  }

  if ((formData.value.sort ?? 0) === 0 || formData.value.sort === previousPreset?.sort) {
    formData.value.sort = preset.sort
  }
}

const fetchTeamUnitOptions = async () => {
  try {
    const response = await getTeamUnitOptions()
    teamUnitOptions.value = response.data || []
  } catch {
    ElMessage.error('获取队伍字典失败')
  }
}

const buildGeocodeAddress = (row: LocationItem) => {
  return [row.address?.trim(), row.pointName?.trim(), row.name?.trim()]
    .filter(Boolean)
    .join(' ')
    .trim()
}

const fetchResolvedCoordinate = async (row: Pick<LocationItem, 'name' | 'pointName' | 'address'>) => {
  const response = await http.post('/locations/resolve-coordinate', {
    name: row.name?.trim() || '',
    pointName: row.pointName?.trim() || '',
    address: row.address?.trim() || '',
  })
  return response.data as { lng: number; lat: number }
}

const fetchResolvedCoordinateByAmapJs = async (row: Pick<LocationItem, 'name' | 'pointName' | 'address'>) => {
  const AMap = await loadAmap()
  const keyword = buildGeocodeAddress({
    id: undefined,
    name: row.name || '',
    pointName: row.pointName || '',
    address: row.address || '',
    phone: '',
    longitude: null,
    latitude: null,
  })

  return new Promise<{ lng: number; lat: number }>((resolve, reject) => {
    const geocoder = new AMap.Geocoder({
      city: '全国',
      extensions: 'base',
    })

    geocoder.getLocation(keyword, (status: string, result: any) => {
      if (status === 'complete' && result?.geocodes?.length) {
        const location = result.geocodes[0]?.location
        const lng = Number(location?.lng)
        const lat = Number(location?.lat)
        if (Number.isFinite(lng) && Number.isFinite(lat)) {
          resolve({ lng, lat })
          return
        }
      }

      reject(new Error(result?.info || '地址解析失败'))
    })
  })
}

const resolveLocationCoordinate = async (
  row: LocationItem,
  options: { suppressErrorMessage?: boolean } = {}
) => {
  const { suppressErrorMessage = false } = options
  const address = buildGeocodeAddress(row)
  if (!address) {
    if (!suppressErrorMessage) {
      ElMessage.warning('请先填写地址或点位名称')
    }
    return false
  }

  geoResolving.value = true
  try {
    let result: { lng: number; lat: number } | null = null
    let lastError: any = null

    try {
      result = await fetchResolvedCoordinateByAmapJs(row)
    } catch (error: any) {
      lastError = error
    }

    if (!result) {
      try {
        result = await fetchResolvedCoordinate(row)
      } catch (error: any) {
        lastError = error
      }
    }

    if (!result) {
      throw lastError || new Error('地址解析失败')
    }

    const longitude = Number(result?.lng)
    const latitude = Number(result?.lat)
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      ElMessage.error('解析到的坐标无效，请手动检查')
      return false
    }

    row.longitude = longitude
    row.latitude = latitude

    if (row === formData.value || (row.id && row.id === formData.value.id)) {
      formData.value.longitude = longitude
      formData.value.latitude = latitude
    }

    if (!suppressErrorMessage) {
      ElMessage.success('已按最新地址更新坐标')
    }
    return true
  } catch (error: any) {
    if (!suppressErrorMessage) {
      ElMessage.error(error?.message || '地址解析失败，请稍后重试')
    }
    return false
  } finally {
    geoResolving.value = false
  }
}

const clearCoordinateResolveTimer = () => {
  if (coordinateResolveTimer !== null) {
    window.clearTimeout(coordinateResolveTimer)
    coordinateResolveTimer = null
  }
}

const scheduleAutoResolveCoordinate = () => {
  clearCoordinateResolveTimer()

  if (!dialogVisible.value) return

  const address = formData.value.address.trim()
  if (!address) return

  const requestToken = ++coordinateRequestToken
  coordinateResolveTimer = window.setTimeout(async () => {
    try {
      const result = await fetchResolvedCoordinate(formData.value)
      if (requestToken !== coordinateRequestToken) return
      formData.value.longitude = Number(result.lng)
      formData.value.latitude = Number(result.lat)
    } catch {
      if (requestToken !== coordinateRequestToken) return
      formData.value.longitude = null
      formData.value.latitude = null
    }
  }, 500)
}

const handleBatchSyncCoordinates = async () => {
  if (!tableData.value.length) {
    ElMessage.warning('暂无可校准的数据')
    return
  }

  try {
    await ElMessageBox.confirm(
      '将按当前后台地址批量重新解析并回写坐标。地址越精确，定位越准确。是否继续？',
      '批量校准坐标',
      { type: 'warning' }
    )
  } catch {
    return
  }

  batchGeoResolving.value = true
  let successCount = 0
  const failedItems: string[] = []

  try {
    const allItems = await fetchAllLocations()

    for (const row of allItems) {
      const resolved = await resolveLocationCoordinate(row)
      if (!resolved) {
        failedItems.push(row.name)
        continue
      }

      try {
        await http.patch(`/locations/${row.id}`, toLocationPayload(row))
        successCount += 1
      } catch {
        failedItems.push(row.name)
      }
    }

    await fetchList()

    if (!failedItems.length) {
      ElMessage.success(`批量校准完成，共更新 ${successCount} 条`)
      return
    }

    ElMessage.warning(`已更新 ${successCount} 条，失败 ${failedItems.length} 条：${failedItems.join('、')}`)
  } finally {
    batchGeoResolving.value = false
  }
}

const hasUsableCoordinate = (row?: Partial<LocationItem> | null) => {
  const longitude = Number(row?.longitude)
  const latitude = Number(row?.latitude)
  return Number.isFinite(longitude) && Number.isFinite(latitude) && longitude !== 0 && latitude !== 0
}

const handleDelete = async (row: LocationItem) => {
  try {
    await ElMessageBox.confirm(`确定删除地址“${row.name}”吗？`, '提示', { type: 'warning' })
    await http.delete(`/locations/${row.id}`)
    ElMessage.success('删除成功')
    fetchList()
  } catch (error: any) {
    if (error !== 'cancel') ElMessage.error('删除失败')
  }
}

const handleSave = async () => {
  if (saving.value) return

  saving.value = true
  try {
    if (!formData.value.name.trim()) {
      ElMessage.warning('请填写单位名称')
      return
    }
    if (!getTeamPreset(formData.value.name.trim())) {
      ElMessage.warning('单位名称需从固定队伍列表中选择')
      return
    }
    if (!formData.value.pointName.trim()) {
      ElMessage.warning('请填写点位名称')
      return
    }
    if (!formData.value.address.trim()) {
      ElMessage.warning('请填写详细地址')
      return
    }
    const payload = toLocationPayload(formData.value)
    if (isEdit.value && formData.value.id) {
      await http.patch(`/locations/${formData.value.id}`, payload)
      ElMessage.success('更新成功')
    } else {
      await http.post('/locations', payload)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchList()
  } catch (error: any) {
    const detail = error?.response?.data?.message
    const message = Array.isArray(detail)
      ? detail.join('；')
      : detail || '保存失败'
    ElMessage.error(message)
  } finally {
    saving.value = false
  }
}

const handleDialogClosed = () => {
  clearCoordinateResolveTimer()
  coordinateRequestToken += 1
  formData.value = createDefaultFormData()
  originalFormData.value = null
  isEdit.value = false
}

const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage
  pageSize.value = newPageSize
  fetchList()
}

onMounted(() => {
  fetchTeamUnitOptions()
  fetchList()
})

watch(
  () => [dialogVisible.value, formData.value.name, formData.value.pointName, formData.value.address],
  ([visible]) => {
    if (!visible) {
      clearCoordinateResolveTimer()
      return
    }
    scheduleAutoResolveCoordinate()
  }
)

onBeforeUnmount(() => {
  clearCoordinateResolveTimer()
})
</script>

<template>
  <div class="location-page admin-view-stack">
    <div class="page-crumb">系统首页 / 门户内容 / 地理位置</div>

    <div class="admin-card admin-card--search">
      <section class="location-panel location-toolbar">
        <el-select v-model="statusFilter" placeholder="启用状态" clearable class="location-toolbar__filter">
          <el-option label="全部地址" value="" />
          <el-option label="启用中" value="启用中" />
          <el-option label="已禁用" value="已禁用" />
        </el-select>
      </section>
    </div>

    <section class="admin-card admin-card--table location-panel location-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">地理位置列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchList">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button :loading="batchGeoResolving" @click="handleBatchSyncCoordinates">
            批量校准坐标
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增地址
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" stripe v-loading="loading">
        <el-table-column type="selection" width="46" />
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="name" label="单位名称" min-width="180" show-overflow-tooltip />
        <el-table-column prop="pointName" label="点位名称" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.pointName || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细地址" min-width="260" show-overflow-tooltip />
        <el-table-column label="联系电话" min-width="180">
          <template #default="{ row }">
            <div class="meta-item">
              <el-icon><Phone /></el-icon>
              <span>{{ row.phone || '--' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑地理位置' : '新增地理位置'" width="980px" @closed="handleDialogClosed">
      <div class="location-dialog">
        <el-form :model="formData" label-width="96px" @submit.prevent="handleSave">
          <section class="location-form-section">
            <div class="location-form-section__header">
              <strong>联系信息</strong>
              <span>统一维护单位名称、点位名称、地址与联系电话，保持前台地图与详情一致。</span>
            </div>
            <div class="location-form-section__body">
              <el-form-item label="单位名称">
                <el-select
                  v-model="formData.name"
                  placeholder="请选择固定队伍名称"
                  filterable
                  style="width: 100%"
                  @change="handleTeamNameChange"
                >
                  <el-option
                    v-for="item in teamUnitOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="点位名称">
                <el-input v-model="formData.pointName" placeholder="请输入地图点位名称" />
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input
                  v-model="formData.address"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入完整地址，系统将自动计算高德GCJ02坐标"
                />
              </el-form-item>
              <el-form-item label="经度（lng）">
                <el-input
                  v-model="formData.longitude"
                  readonly
                  placeholder="请填写高德GCJ02格式经度"
                />
              </el-form-item>
              <el-form-item label="纬度（lat）">
                <el-input
                  v-model="formData.latitude"
                  readonly
                  placeholder="请填写高德GCJ02格式纬度"
                />
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="formData.phone" placeholder="请输入联系电话" />
              </el-form-item>
            </div>
          </section>

          <section class="location-form-section">
            <div class="location-form-section__header">
              <strong>展示设置</strong>
              <span>通过排序和状态控制前台地图展示顺序，坐标会随详细地址自动更新。</span>
            </div>
            <div class="location-form-section__body">
              <el-form-item label="排序值">
                <el-input-number v-model="formData.sort" :min="0" style="width: 100%" />
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="formData.status">
                  <el-radio :value="1">启用</el-radio>
                  <el-radio :value="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </section>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.location-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.location-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}

.location-form-section + .location-form-section {
  margin-top: 16px;
}

.location-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}

.location-form-section__header strong {
  color: #1f2f46;
  font-size: 15px;
  font-weight: 700;
}

.location-form-section__header span {
  color: #7a879d;
  font-size: 12px;
  line-height: 1.6;
}

.location-form-section__body {
  padding: 18px 20px 4px;
}

.location-form-section__body :deep(.el-form-item) {
  margin-bottom: 14px;
}

.location-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px 16px;
}

.location-toolbar__filters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
  min-width: 0;
}

/* 启用状态：短标签，收窄避免占满整行 */
.location-toolbar__filter {
  width: 120px;
  max-width: 120px;
  flex: 0 0 auto;
}

.location-toolbar__filter :deep(.el-select__wrapper) {
  width: 100%;
}

.location-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-shrink: 0;
}

.location-cell {
  display: flex;
  gap: 14px;
  align-items: center;
}

.location-cell__icon,
.preview-card__icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%);
  color: #2f67ff;
  font-size: 24px;
  flex: 0 0 auto;
}

.location-cell__meta {
  min-width: 0;

  strong {
    display: block;
    color: #1f2f46;
    font-size: 15px;
    line-height: 1.5;
  }

  em {
    display: block;
    margin-top: 4px;
    color: #6b7a99;
    font-style: normal;
    font-size: 12px;
    line-height: 1.5;
  }

  span {
    display: block;
    margin-top: 6px;
    color: #7b879b;
    font-size: 12px;
    line-height: 1.6;
  }
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #607089;
  font-size: 13px;
}

.meta-item--stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.location-dialog {
  min-width: 0;
}

@media (max-width: 1200px) {
}
</style>
