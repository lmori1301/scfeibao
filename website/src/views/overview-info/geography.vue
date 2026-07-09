<template>
    <div ref="pageScaleContainerRef" class="scroll-container-1_562">
        <div id="1_562" ref="frameRef" class="Pixso-frame-1_562">
            <div id="1_563" class="Pixso-vector-1_563"></div>
            <div id="1_564" class="Pixso-vector-1_564"></div>
            <div id="1_567" class="Pixso-vector-1_567"></div>
            <p id="1_570" class="Pixso-paragraph-1_570">{{ "四川飞豹救援" }}</p>
            <p id="1_571" class="Pixso-paragraph-1_571">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_580" class="Pixso-vector-1_580"></div>
            <div id="1_581" class="Pixso-vector-1_581"></div>
            <div id="1_582" class="Pixso-vector-1_582"></div>
            <div id="1_583" class="Pixso-vector-1_583"></div>
            <p id="1_584" class="Pixso-paragraph-1_584">{{ "OVERV" }}</p>
            <p id="1_585" class="Pixso-paragraph-1_585">{{ "概况信息" }}</p>
            <router-link to="/overview-info/geography" id="1_586" class="Pixso-paragraph-1_586">
                {{ "地理位置                          >" }}
            </router-link>
            <router-link to="/overview-info/organization" id="1_587" class="Pixso-paragraph-1_587 overview-nav-item">
                {{ "组织机构                          " }}
            </router-link>
            <div id="1_588" class="Pixso-vector-1_588"></div>
            <div id="1_596" class="Pixso-vector-1_596"></div>
            <p id="1_597" class="Pixso-paragraph-1_597">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/overview-info" style="color: inherit; text-decoration: none;">概况信息</router-link> > 地理信息
            </p>
            <div id="1_598" class="Pixso-vector-1_598"></div>
            <div ref="mapAnchorRef" class="geography-map-anchor" aria-hidden="true"></div>
            <div id="1_599" class="Pixso-vector-1_599"></div>
            <router-link to="/overview-info/leadership" id="1_600" class="Pixso-paragraph-1_600 overview-nav-item">
                {{ "领导信息                         " }}
            </router-link>
            <div id="1_601" class="Pixso-vector-1_601"></div>
            <p id="1_602" class="Pixso-paragraph-1_602">{{ currentUnit.pointName || currentUnit.name }}</p>
            <p id="1_603" class="Pixso-paragraph-1_603">{{ "     " }}</p>
            <p id="1_604" class="Pixso-paragraph-1_604">
                {{ currentUnit.address }}
            </p>
            <p id="1_605" class="Pixso-paragraph-1_605">{{ currentUnit.phone }}</p>

            <!-- 单位tab flex容器 - 均匀分布 -->
            <div ref="unitTabsRef" class="unit-tabs-flex-container">
                <div
                    v-for="(unit, index) in units"
                    :key="unit.id ?? `${unit.name}-${index}`"
                    class="unit-tab-container"
                    role="button"
                    tabindex="0"
                    @click="switchUnit(index)"
                    @keydown.enter="switchUnit(index)"
                >
                    <p class="unit-tab-text" :class="{ 'unit-tab-active': activeIndex === index }">{{ unit.name }}</p>
                    <div v-show="activeIndex === index" class="unit-tab-underline"></div>
                </div>
            </div>
            <div id="1_613" class="Pixso-vector-1_613"></div>
            <router-link to="/" id="17_32" class="Pixso-vector-17_32" style="cursor: pointer;"></router-link>
            <div id="1_618" class="Pixso-vector-1_618"></div>
            <router-link to="/overview-info" id="1_619" class="Pixso-paragraph-1_619 main-nav-link" active-class="" exact-active-class="">{{ "概况信息" }}</router-link>
            <router-link to="/team-building" id="1_620" class="Pixso-paragraph-1_620 main-nav-link" active-class="" exact-active-class="">{{ "队伍建设" }}</router-link>
            <router-link to="/party-building" id="1_621" class="Pixso-paragraph-1_621 main-nav-link" active-class="" exact-active-class="">{{ "党建专栏" }}</router-link>
            <router-link to="/info-public" id="1_622" class="Pixso-paragraph-1_622 main-nav-link" active-class="" exact-active-class="">{{ "信息公开" }}</router-link>
            <router-link to="/dynamic-news" id="1_623" class="Pixso-paragraph-1_623 main-nav-link" active-class="" exact-active-class="">{{ "动态要闻" }}</router-link>
            <router-link to="/policy-regulations" id="1_624" class="Pixso-paragraph-1_624 main-nav-link" active-class="" exact-active-class="">{{ "政策法规" }}</router-link>
            <router-link to="/query-system" id="6_776" class="Pixso-paragraph-6_776 main-nav-link" active-class="" exact-active-class="">{{ "查询系统" }}</router-link>
            <div id="1_625" class="Pixso-vector-1_625"></div>
            <div id="33_309" class="Pixso-group-33_309" @click.stop>
                <div id="33_310" class="Pixso-vector-33_310"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_312"
                    class="Pixso-vector-33_312"
                    style="cursor: pointer"
                    @click="doSearch"
                ></div>
            </div>

            <!-- 底部信息 -->
            <div id="1_113" class="Pixso-vector-1_113"></div>
            <div id="32_8" class="Pixso-group-32_8">
                <p id="1_118" class="Pixso-paragraph-1_118">
                    {{ websiteConfig.host_unit }}
                </p>
                <p id="1_119" class="Pixso-paragraph-1_119">
                    {{ websiteConfig.organizer_unit }}
                </p>
              <p id="1_120" class="Pixso-paragraph-1_120">
                  {{ websiteConfig.icp_number }}
              </p>
              <p id="1_121" class="Pixso-paragraph-1_121">
                  {{ websiteConfig.copyright }}
              </p>
                                            </div>
        </div>
        <div class="geography-map-shell geography-map-shell--portal" :style="mapPortalStyle">
            <div class="geography-map-render">
                <div ref="mapContainerRef" class="geography-map-container"></div>
            </div>
            <div v-if="mapLoading" class="geography-map-state">地图加载中...</div>
            <div v-else-if="mapError" class="geography-map-state geography-map-state-error">{{ mapError }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { getTeamMapList, type TeamMapItem } from '@/api/location'
import { usePixsoScale } from '@/composables/use-pixso-scale'
import { applyAmapSecurityConfig } from '@/utils/amap-security'
import { useRouter } from 'vue-router'

declare global {
  interface Window {
    AMap?: any
  }
}

const AMAP_KEY = 'e2f3c362950ac5d432a489b7f74e16cf'
let amapLoaderPromise: Promise<any> | null = null

function loadAmap() {
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
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-amap-loader="true"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.AMap))
      existingScript.addEventListener('error', () => reject(new Error('高德地图脚本加载失败')))
      return
    }

    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&plugin=AMap.Scale,AMap.ToolBar`
    script.async = true
    script.defer = true
    script.dataset.amapLoader = 'true'
    script.onload = () => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        reject(new Error('高德地图初始化失败'))
      }
    }
    script.onerror = () => reject(new Error('高德地图脚本加载失败'))
    document.head.appendChild(script)
  }).catch((error) => {
    amapLoaderPromise = null
    throw error
  })

  return amapLoaderPromise
}

const { scrollContainerRef: pageScaleContainerRef, frameRef, scale: pageScale } = usePixsoScale(1920, 1584)
const router = useRouter()
const activeIndex = ref(0)
const mapAnchorRef = ref<HTMLElement | null>(null)
const mapContainerRef = ref<HTMLElement | null>(null)
const mapLoading = ref(true)
const mapError = ref('')
const MAP_DEFAULT_ZOOM = 16
const MAP_MOVE_DURATION = 800
const MAP_MARKER_OFFSET = [-12, -40] as const
const MAP_INFO_OFFSET = [0, -70] as const
const LOCATION_REFRESH_INTERVAL_MS = 30000
const mapPortalStyle = ref<Record<string, string>>({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
})
let amapInstance: any = null
let amapMarker: any = null
let amapInfoWindow: any = null
let locationRefreshTimer: number | null = null

// 滚动容器引用
const unitTabsRef = ref<HTMLElement | null>(null)

// 拖拽状态
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

// 单位信息数据
interface UnitInfo {
  id?: number
  name: string
  pointName: string
  address: string
  phone: string
  longitude: number
  latitude: number
  zoom: number
}

const emptyUnit: UnitInfo = {
  name: '',
  pointName: '',
  address: '',
  phone: '',
  longitude: 0,
  latitude: 0,
  zoom: MAP_DEFAULT_ZOOM,
}

const units = ref<UnitInfo[]>([])

// 当前选中的单位信息
const currentUnit = computed(() => units.value[activeIndex.value] ?? units.value[0] ?? emptyUnit)

function isValidCoordinate(longitude: number, latitude: number) {
  return Number.isFinite(longitude) && Number.isFinite(latitude) && longitude !== 0 && latitude !== 0
}

function syncMapPortalRect() {
  const container = pageScaleContainerRef.value
  const anchor = mapAnchorRef.value
  if (!container || !anchor) return

  const containerRect = container.getBoundingClientRect()
  const anchorRect = anchor.getBoundingClientRect()

  mapPortalStyle.value = {
    left: `${anchorRect.left - containerRect.left}px`,
    top: `${anchorRect.top - containerRect.top}px`,
    width: `${anchorRect.width}px`,
    height: `${anchorRect.height}px`,
  }
}

function startLocationAutoRefresh() {
  stopLocationAutoRefresh()
  locationRefreshTimer = window.setInterval(() => {
    void refreshLocationUnits(false)
  }, LOCATION_REFRESH_INTERVAL_MS)
}

function stopLocationAutoRefresh() {
  if (locationRefreshTimer !== null) {
    window.clearInterval(locationRefreshTimer)
    locationRefreshTimer = null
  }
}

function scrollActiveTabIntoView() {
  nextTick(() => {
    const container = unitTabsRef.value
    if (!container) return
    const activeTab = container.children.item(activeIndex.value) as HTMLElement | null
    activeTab?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  })
}

// 切换单位
const switchUnit = (index: number) => {
  if (index < 0 || index >= units.value.length) return
  activeIndex.value = index
}

function mapApiLocation(item: TeamMapItem): UnitInfo {
  return {
    id: undefined,
    name: item.unitName,
    pointName: item.pointName || item.unitName,
    address: item.address,
    phone: item.phone,
    longitude: Number(item.lng),
    latitude: Number(item.lat),
    zoom: MAP_DEFAULT_ZOOM,
  }
}

function buildInfoWindowContent(unit: UnitInfo) {
  return `
    <div class="geography-info-window">
      <h4>${unit.pointName || unit.name}</h4>
      <p>${unit.address || '--'}</p>
      <p>${unit.phone || '--'}</p>
    </div>
  `
}

function buildMarkerContent() {
  return `
    <div class="geography-marker-pin">
      <span class="geography-marker-pin-core"></span>
    </div>
  `
}

function clearMapOverlay() {
  if (amapMarker && amapInstance) {
    amapInstance.remove(amapMarker)
    amapMarker = null
  }

  if (amapInfoWindow) {
    amapInfoWindow.close()
    amapInfoWindow = null
  }
}

function moveMapTo(position: [number, number], zoom: number) {
  if (!amapInstance) return

  try {
    if (typeof amapInstance.setZoomAndCenter === 'function') {
      amapInstance.setZoomAndCenter(zoom, position, false, MAP_MOVE_DURATION)
      return
    }
  } catch (error) {
    console.warn('地图平滑定位降级为普通移动:', error)
  }

  if (typeof amapInstance.panTo === 'function') {
    amapInstance.panTo(position)
  } else {
    amapInstance.setCenter(position)
  }
  amapInstance.setZoom(zoom)
}

function renderUnitMarker(unit: UnitInfo) {
  if (!amapInstance || !window.AMap) return

  const position: [number, number] = [unit.longitude, unit.latitude]
  clearMapOverlay()

  amapMarker = new window.AMap.Marker({
    position,
    anchor: 'bottom-left',
    offset: new window.AMap.Pixel(MAP_MARKER_OFFSET[0], MAP_MARKER_OFFSET[1]),
    title: unit.pointName || unit.name,
    content: buildMarkerContent(),
    zIndex: 120,
  })

  amapInfoWindow = new window.AMap.InfoWindow({
    isCustom: false,
    anchor: 'bottom-center',
    offset: new window.AMap.Pixel(MAP_INFO_OFFSET[0], MAP_INFO_OFFSET[1]),
    content: buildInfoWindowContent(unit),
    closeWhenClickMap: false,
  })

  amapInstance.add(amapMarker)
  amapInfoWindow.open(amapInstance, position)
  moveMapTo(position, unit.zoom || MAP_DEFAULT_ZOOM)
}

function syncMapToUnit() {
  const unit = currentUnit.value
  if (!amapInstance || !isValidCoordinate(unit.longitude, unit.latitude)) return
  renderUnitMarker(unit)
}

async function initMap() {
  if (!mapContainerRef.value) return

  mapLoading.value = true
  mapError.value = ''

  try {
    const AMap = await loadAmap()
    const initialPosition: [number, number] = [currentUnit.value.longitude, currentUnit.value.latitude]
    if (!isValidCoordinate(initialPosition[0], initialPosition[1])) {
      throw new Error('缺少可用地图坐标')
    }

    amapInstance = new AMap.Map(mapContainerRef.value, {
      center: initialPosition,
      zoom: MAP_DEFAULT_ZOOM,
      resizeEnable: true,
      dragEnable: true,
      zoomEnable: true,
      animateEnable: true,
      jogEnable: true,
      viewMode: '2D',
      pitchEnable: false,
      expandZoomRange: true,
      zooms: [3, 20],
    })
    amapInstance.addControl(new AMap.Scale())
    amapInstance.addControl(new AMap.ToolBar({
      position: {
        top: '18px',
        right: '18px',
      },
    }))

    renderUnitMarker(currentUnit.value)

    amapInstance.on('complete', () => {
      mapLoading.value = false
    })

    window.setTimeout(() => {
      if (mapLoading.value) {
        mapLoading.value = false
      }
    }, 1200)
  } catch (error) {
    mapLoading.value = false
    mapError.value = '地图加载失败，请稍后重试'
    console.error('初始化地图失败:', error)
  }
}

async function fetchLocationUnits() {
  try {
    const response = await getTeamMapList()
    const items = response?.data ?? []
    const mapped = items
      .map(mapApiLocation)
      .filter((item) => isValidCoordinate(item.longitude, item.latitude))

    if (!mapped.length) {
      mapError.value = '后台暂未配置可用坐标'
      return false
    }

    const currentName = currentUnit.value.name
    units.value = mapped

    const matchedIndex = mapped.findIndex((item) => item.name === currentName)
    activeIndex.value = matchedIndex >= 0 ? matchedIndex : 0
    scrollActiveTabIntoView()
    return true
  } catch (error) {
    console.error('获取地理位置数据失败:', error)
    mapError.value = '地图点位数据加载失败'
    return false
  }
}

async function refreshLocationUnits(recenter = true) {
  const previousUnitName = currentUnit.value.name
  const loaded = await fetchLocationUnits()
  if (!loaded) return false

  const nextUnit = units.value[activeIndex.value] ?? units.value[0]
  if (!nextUnit) return false

  if (!amapInstance) return true

  if (!recenter && previousUnitName === nextUnit.name) {
    renderUnitMarker(nextUnit)
    return true
  }

  syncMapToUnit()
  return true
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    void refreshLocationUnits(false)
    startLocationAutoRefresh()
    return
  }

  stopLocationAutoRefresh()
}

// 鼠标按下事件
const handleMouseDown = (e: MouseEvent) => {
  if (!unitTabsRef.value) return
  isDragging.value = true
  startX.value = e.pageX - unitTabsRef.value.offsetLeft
  scrollLeft.value = unitTabsRef.value.scrollLeft
  unitTabsRef.value.style.cursor = 'grabbing'
}

// 鼠标移动事件
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !unitTabsRef.value) return
  e.preventDefault()
  const x = e.pageX - unitTabsRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  unitTabsRef.value.scrollLeft = scrollLeft.value - walk
}

// 鼠标滚轮/触控板滑动事件
const handleWheel = (e: WheelEvent) => {
  const container = unitTabsRef.value
  if (!container) return

  const canScrollHorizontally = container.scrollWidth > container.clientWidth
  if (!canScrollHorizontally) return

  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  if (delta === 0) return

  e.preventDefault()
  container.scrollLeft += delta
}

// 鼠标松开事件
const handleMouseUp = () => {
  isDragging.value = false
  if (unitTabsRef.value) {
    unitTabsRef.value.style.cursor = 'grab'
  }
}

// 鼠标离开事件
const handleMouseLeave = () => {
  isDragging.value = false
  if (unitTabsRef.value) {
    unitTabsRef.value.style.cursor = 'grab'
  }
}

// 组件挂载时添加事件监听
onMounted(() => {
  if (unitTabsRef.value) {
    unitTabsRef.value.addEventListener('mousedown', handleMouseDown)
    unitTabsRef.value.addEventListener('mousemove', handleMouseMove)
    unitTabsRef.value.addEventListener('mouseup', handleMouseUp)
    unitTabsRef.value.addEventListener('mouseleave', handleMouseLeave)
    unitTabsRef.value.addEventListener('wheel', handleWheel, { passive: false })
  }

  requestAnimationFrame(() => {
    syncMapPortalRect()
  })

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('focus', handleVisibilityChange)

  refreshLocationUnits().then((hasData) => {
    if (hasData) {
      nextTick(() => {
        syncMapPortalRect()
        initMap()
      })
      startLocationAutoRefresh()
      return
    }

    mapLoading.value = false
  })
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  stopLocationAutoRefresh()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('focus', handleVisibilityChange)

  if (unitTabsRef.value) {
    unitTabsRef.value.removeEventListener('mousedown', handleMouseDown)
    unitTabsRef.value.removeEventListener('mousemove', handleMouseMove)
    unitTabsRef.value.removeEventListener('mouseup', handleMouseUp)
    unitTabsRef.value.removeEventListener('mouseleave', handleMouseLeave)
    unitTabsRef.value.removeEventListener('wheel', handleWheel)
  }

  if (amapInstance) {
    amapInstance.destroy()
    amapInstance = null
    amapMarker = null
    amapInfoWindow = null
  }
})

watch(activeIndex, () => {
  scrollActiveTabIntoView()
  syncMapToUnit()
})

watch(pageScale, async () => {
  await nextTick()
  syncMapPortalRect()
  amapInstance?.resize?.()
})

// 搜索
const searchKey = ref('')

// 7个模块路由
const searchModules = [
  { name: '概况信息', path: '/overview-info' },
  { name: '队伍建设', path: '/team-building' },
  { name: '党建专栏', path: '/party-building' },
  { name: '信息公开', path: '/info-public' },
  { name: '动态要闻', path: '/dynamic-news' },
  { name: '政策法规', path: '/policy-regulations' },
  { name: '查询系统', path: '/query-system' },
]

// 执行搜索
const doSearch = () => {
  const key = searchKey.value?.trim()
  if (!key) return

  // 模糊匹配模块
  const target = searchModules.find(m =>
    m.name.includes(key) || key.includes(m.name)
  )

  if (target) {
    // 跳转到对应模块页面，并带上关键词
    router.push({
      path: target.path,
      query: { keyword: key }
    })
  } else {
    // 没匹配到，统一去搜索结果页
    router.push({
      path: '/search-result',
      query: { keyword: key }
    })
  }

  // 清空搜索框（可选）
  // searchKey.value = ''
}

const websiteConfig = ref({
  host_unit: '',
  organizer_unit: '',
  icp_number: '',
  copyright: ''
})

const fetchWebsiteConfig = async () => {
  try {
    const res = await getWebsiteConfig()
    if (res.data) {
      websiteConfig.value = {
        host_unit: res.data.host_unit || '',
        organizer_unit: res.data.organizer_unit || '',
        icp_number: res.data.icp_number || '',
        copyright: res.data.copyright || ''
      }
    }
  } catch (error) {
    console.error('获取网站配置失败:', error)
  }
}

onMounted(() => {
  fetchWebsiteConfig()
})

</script>
<style>
/* 概况信息导航项样式 */
.overview-nav-item {
    cursor: pointer;
}

/* 单位tabs flex容器 - 横向滚动 */
.unit-tabs-flex-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 50px;
    position: absolute;
    left: 28%;
    right: 10%;
    top: 25.32%;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    padding-bottom: 10px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    cursor: grab;
    user-select: none;
}

/* 隐藏滚动条但保持滚动功能 */
.unit-tabs-flex-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

/* 单位tab容器样式 */
.unit-tab-container {
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s ease;
}

.unit-tab-container:hover {
    opacity: 0.8;
}

/* 单位tab文字样式 */
.unit-tab-text {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    margin: 0;
    padding: 0;
    white-space: nowrap;
}

.unit-tab-text.unit-tab-active {
    color: rgba(21, 112, 206, 1);
}

/* 单位tab下划线样式 */
.unit-tab-underline {
    width: 100%;
    height: 6px;
    background-image: url(@/assets/images/Vector_1_607.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 8px;
}

/* 单位tab样式 */
.unit-tab {
    cursor: pointer;
    transition: all 0.3s ease;
}

.unit-tab:hover {
    opacity: 0.8;
}

.unit-tab-active {
    color: rgba(21, 112, 206, 1) !important;
}

.scroll-container-1_562 {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.Pixso-frame-1_562 {
    width: 1920px;
    height: 1584px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_563 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_563.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_564 {
    width: 100%;
    height: 12.25%;
    background-image: url(@/assets/images/Vector_1_564.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 87.75%;
}
.Pixso-vector-1_567 {
    width: 6.72%;
    height: 8.15%;
    background-image: url(@/assets/images/Vector_1_567.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.08%;
    bottom: 89.77%;
}
.Pixso-paragraph-1_570 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.35%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.66%;
    bottom: 92.99%;
}
.Pixso-paragraph-1_571 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.51%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 7.58%;
    bottom: 90.91%;
}
.Pixso-vector-1_580 {
    width: 18.38%;
    height: 10.29%;
    background-image: url(@/assets/images/Vector_1_580.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 18.5%;
    bottom: 71.21%;
}
.Pixso-vector-1_581 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_581.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 43.5%;
    bottom: 49.24%;
}
.Pixso-vector-1_582 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_582.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 36.17%;
    bottom: 56.57%;
}
.Pixso-vector-1_583 {
    width: 18.38%;
    height: 28.40%;
    background-image: url(@/assets/images/Vector_1_583.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 50.88%;
    bottom: 19.26%;
}
.Pixso-paragraph-1_584 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 14.27%;
    height: 4.74%;
    position: absolute;
    left: 10%;
    right: 75.73%;
    top: 21.4%;
    bottom: 73.86%;
    opacity: 0.5;
}
.Pixso-paragraph-1_585 {
    font-size: 50px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 11.15%;
    right: 78.59%;
    top: 21.02%;
    bottom: 75.82%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_586 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 8.7%;
    right: 79.01%;
    top: 46.4%;
    bottom: 52.34%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_587 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 4.22%;
    height: 1.26%;
    position: absolute;
    left: 8.7%;
    right: 87.08%;
    top: 39.14%;
    bottom: 59.6%;
}
.Pixso-vector-1_588 {
    width: 0.2%;
    height: 1.45%;
    background-image: url(@/assets/images/Vector_1_588.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.05%;
    right: 91.9%;
    top: 46.37%;
    bottom: 52.18%;
}
.Pixso-vector-1_596 {
    width: 68.44%;
    height: 56.80%;
    background-image: url(@/assets/images/Vector_1_596.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.78%;
    right: 5.78%;
    top: 22.47%;
    bottom: 19.26%;
}
.Pixso-paragraph-1_597 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 26.3%;
    right: 56.09%;
    top: 19.26%;
    bottom: 79.48%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_598 {
    width: 64.79%;
    height: 48.3%;
    background-image: url(@/assets/images/Vector_1_598.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 27.29%;
    right: 7.92%;
    top: 29.73%;
    bottom: 21.97%;
}
.geography-map-anchor {
    position: absolute;
    left: 27.29%;
    right: 7.92%;
    top: 29.73%;
    bottom: 21.97%;
    pointer-events: none;
    opacity: 0;
}

.geography-map-shell {
    position: absolute;
    overflow: hidden;
    z-index: 2;
}

.geography-map-shell--portal {
    position: absolute;
    overflow: hidden;
    z-index: 2;
}

.geography-map-render {
    width: 100%;
    height: 100%;
    will-change: transform;
}

.geography-map-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #edf3fb 0%, #e5edf8 100%);
}

.geography-map-state {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 248, 253, 0.86);
    color: #356fd1;
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    letter-spacing: 1px;
}

.geography-map-state-error {
    color: #d14343;
}

.geography-marker-pin {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    background: linear-gradient(135deg, #3f8cff 0%, #1b63d8 100%);
    box-shadow: 0 10px 18px rgba(27, 99, 216, 0.25);
}

.geography-marker-pin::after {
    content: '';
    position: absolute;
    left: 7px;
    top: 7px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
}

.geography-marker-pin-core {
    position: absolute;
    left: 11px;
    top: 11px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1b63d8;
    z-index: 1;
}

.geography-info-window {
    min-width: 280px;
    max-width: 360px;
    padding: 8px 2px 4px;
    color: #1f3558;
    font-family: "Alibaba PuHuiTi-Regular";
}

.geography-info-window h4 {
    margin: 0 0 8px;
    font-size: 16px;
    line-height: 1.4;
    color: #2058b8;
}

.geography-info-window p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: #52627d;
    word-break: break-all;
}

.Pixso-vector-1_599 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_599.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 28.85%;
    bottom: 63.89%;
}
.Pixso-paragraph-1_600 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 4.27%;
    height: 1.26%;
    position: absolute;
    left: 8.7%;
    right: 87.03%;
    top: 31.82%;
    bottom: 66.92%;
}
.Pixso-vector-1_601 {
    width: 31.67%;
    height: 9.66%;
    background-image: url(@/assets/images/Vector_1_601.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.33%;
    right: 40%;
    top: 66.67%;
    bottom: 23.67%;
    z-index: 3;
}
.Pixso-paragraph-1_602 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(10, 10, 10, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 29.64%;
    top: 68.24%;
    white-space: nowrap;
    z-index: 4;
}
.Pixso-paragraph-1_603 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(10, 10, 10, 1);
    white-space: pre-wrap;
    width: 0.11%;
    height: 1.58%;
    position: absolute;
    left: 35.78%;
    right: 64.11%;
    top: 25.19%;
    bottom: 73.23%;
}
.Pixso-paragraph-1_604 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(59, 59, 59, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 29.64%;
    top: 71.02%;
    white-space: nowrap;
    z-index: 4;
}
.Pixso-paragraph-1_605 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(59, 59, 59, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 29.64%;
    top: 73.48%;
    white-space: nowrap;
    z-index: 4;
}
.Pixso-paragraph-1_606 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 6.51%;
    height: 1.57%;
    position: absolute;
    left: 28.07%;
    right: 65.42%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-vector-1_607 {
    width: 6.2%;
    height: 0.38%;
    background-image: url(@/assets/images/Vector_1_607.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.23%;
    right: 65.57%;
    top: 27.78%;
    bottom: 71.84%;
}
.Pixso-paragraph-1_608 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 5.26%;
    height: 1.57%;
    position: absolute;
    left: 65.94%;
    right: 28.8%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-paragraph-1_609 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 36.41%;
    right: 52.03%;
    top: 25.32%;
    bottom: 73.11%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_610 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.9%;
    right: 35.99%;
    top: 25.32%;
    bottom: 73.11%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_611 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 9.12%;
    height: 1.57%;
    position: absolute;
    left: 73.02%;
    right: 17.86%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-paragraph-1_612 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 6.51%;
    height: 1.57%;
    position: absolute;
    left: 83.96%;
    right: 9.53%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-vector-1_613 {
    width: 100%;
    height: 4.42%;
    background-image: url(@/assets/images/Vector_1_613.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 12.25%;
    bottom: 83.33%;
}
.Pixso-vector-17_32 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_32.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_618 {
    width: 204px;
    height: 4.42%;
    background-image: url(@/assets/images/Vector_1_618.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 12.25%;
    bottom: 83.33%;
    transform: translateX(calc(-50% + -596px));
}
.Pixso-paragraph-1_619 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -596px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_620 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -392px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_621 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_622 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_623 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_624 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-6_776 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 631px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_625 {
    width: 2.14%;
    height: 2.65%;
    background-image: url(@/assets/images/Boolean_operation_1_625.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.33%;
    right: 89.53%;
    top: 21.15%;
    bottom: 76.2%;
}
.Pixso-group-33_309 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1470px;
    top: 90px;
}
.Pixso-vector-33_310 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_310.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_311 {
    font-size: 16px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(88, 83, 83, 1);
    width: 68.05%;
    height: 20px;
    position: absolute;
    left: 4.73%;
    right: 27.22%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-vector-33_312 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_312.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}

/* 搜索框样式覆盖原有文字，保持样式不变 */
.search-input {
  position: absolute;
  left: 4.73%;
  top: 50%;
  transform: translateY(-50%);
  width: 68.05%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-family: "Alibaba PuHuiTi-Regular";
  color: #333;
  border: none;
  outline: none;
  background: transparent;
}

/* 底部信息样式 */
.Pixso-vector-1_113 {
    width: 1920px;
    height: 17.68%;
    background-image: url(@/assets/images/Vector_1_113.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 82.32%;
    bottom: 0%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1359px;
    transform: translateX(calc(-50% + 0px));
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    z-index: 100;
}

.Pixso-paragraph-1_118 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 0%;
    bottom: 88.24%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}

.Pixso-paragraph-1_119 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 29.41%;
    bottom: 58.82%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}

.Pixso-paragraph-1_120 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 58.82%;
    bottom: 29.41%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}

.Pixso-paragraph-1_121 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 88.24%;
    bottom: 0%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}
</style>
