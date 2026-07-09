<template>
    <div ref="scrollContainerRef" class="query-system-index-page query-system-index-scroll scroll-container-1_2501" :style="wrapperStyle">
        <div id="1_2501" ref="frameRef" class="query-system-index-frame Pixso-frame-1_2501" :style="frameStyle">
            <div id="1_2502" class="Pixso-vector-1_2502"></div>
            <div id="1_2503" class="Pixso-vector-1_2503"></div>
            <div id="1_2506" class="Pixso-vector-1_2506"></div>
            <!-- 主导航条浅蓝底（与证书查询首页 1_2411 一致，「查询系统」区域高亮） -->
            <div id="1_2411" class="Pixso-vector-1_2411"></div>
            <!-- 与证书查询首页 certificate-index 完全一致：首页方块 + 主导航 -->
            <router-link to="/" id="17_12" class="Pixso-vector-17_12" style="cursor: pointer;" aria-label="返回首页"></router-link>
            <p id="1_2509" class="Pixso-paragraph-1_2509">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_2510" class="Pixso-paragraph-1_2510">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <p id="1_2519" class="Pixso-paragraph-1_2519">
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/certificate" class="query-breadcrumb-link">证书查询系统</router-link> > <span class="query-breadcrumb-current">证书列表</span>
            </p>
            <div ref="resultsPanelRef" class="cert-query-results-panel" v-loading="listLoading">
              <div class="cert-query-results-head">
                <div class="cert-query-results-title-wrap">
                  <svg class="cert-query-results-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                    <rect fill="#3277d0" x="0" y="0" width="6.5" height="6.5" rx="0.5" />
                    <rect fill="#3277d0" x="9.5" y="0" width="6.5" height="6.5" rx="0.5" />
                    <rect fill="#3277d0" x="0" y="9.5" width="6.5" height="6.5" rx="0.5" />
                    <rect fill="#3277d0" x="9.5" y="9.5" width="6.5" height="6.5" rx="0.5" />
                  </svg>
                  <span class="cert-query-results-title">查询结果</span>
                  <span v-if="hasListQuery && !listLoading" class="cert-query-results-meta">
                    <template v-if="totalCount > 0">共找到 {{ totalCount }} 条记录</template>
                    <template v-else>未找到符合条件的证书</template>
                  </span>
                </div>
              </div>
              <p v-if="!hasListQuery" class="cert-query-results-hint">
                请从「证书查询系统」页面填写姓名、身份证号或证书编号后查询；本页不展示全库数据。
              </p>
              <div v-else class="cert-query-results-tablewrap">
                <p v-if="!listLoading && !paginatedData.length" class="cert-query-results-empty">未找到符合条件的证书，请核对查询条件。</p>
                <table v-else-if="paginatedData.length" class="cert-result-grid">
                  <thead>
                    <tr>
                      <th class="cert-result-grid__col-num">序号</th>
                      <th class="cert-result-grid__col-no">证书编号</th>
                      <th class="cert-result-grid__col-type">证书类型</th>
                      <th class="cert-result-grid__col-name">姓名</th>
                      <th class="cert-result-grid__col-unit">发证机构</th>
                      <th class="cert-result-grid__col-date">发证日期</th>
                      <th class="cert-result-grid__col-date">有效期至</th>
                      <th class="cert-result-grid__col-status">状态</th>
                      <th class="cert-result-grid__col-action">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in paginatedData" :key="row.id">
                      <td class="cert-result-grid__col-num">{{ (currentPage - 1) * pageSize + idx + 1 }}</td>
                      <td class="cert-result-grid__col-no">
                        <router-link class="cert-result-no-link" :to="certificateDetailTo(row.certificateNo)" :title="row.certificateNo">
                          {{ row.certificateNo }}
                        </router-link>
                      </td>
                      <td class="cert-result-grid__cell-ellipsis cert-result-grid__col-type" :title="row.certificateType">{{ row.certificateType }}</td>
                      <td class="cert-result-grid__cell-ellipsis cert-result-grid__col-name" :title="row.name">{{ row.name }}</td>
                      <td class="cert-result-grid__cell-ellipsis cert-result-grid__col-unit" :title="row.workUnit">{{ row.workUnit }}</td>
                      <td class="cert-result-grid__col-date">{{ row.issueDate }}</td>
                      <td class="cert-result-grid__col-date">{{ row.expiryDate }}</td>
                      <td class="cert-result-grid__col-status">
                        <span class="cert-status" :class="`cert-status--${row.statusTag}`">{{ row.statusLabel }}</span>
                      </td>
                      <td class="cert-result-grid__col-action">
                        <router-link class="cert-query-detail-link" :to="certificateDetailTo(row.certificateNo)">查看详情</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="hasListQuery && totalCount > 0" class="cert-query-results-pagination">
                <Pagination
                  variant="portal"
                  :total="totalCount"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-size-options="[10, 20, 50]"
                  @page-change="handlePageChange"
                />
              </div>
            </div>


            <div id="33_210" class="Pixso-group-33_210" @click.stop>
            <div id="33_211" class="Pixso-vector-33_211"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_213"
                class="Pixso-vector-33_213"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <router-link id="1_2487" to="/overview-info" class="Pixso-paragraph-1_2487 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <router-link id="1_2488" to="/team-building" class="Pixso-paragraph-1_2488 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <router-link id="1_2490" to="/party-building" class="Pixso-paragraph-1_2490 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <router-link id="1_2489" to="/info-public" class="Pixso-paragraph-1_2489 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="1_2491" to="/dynamic-news" class="Pixso-paragraph-1_2491 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="1_2492" to="/policy-regulations" class="Pixso-paragraph-1_2492 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <div id="1_2497" class="Pixso-vector-1_2497"></div>
            <div id="1_2498" class="Pixso-vector-1_2498"></div>
            <div id="1_2499" class="Pixso-vector-1_2499 nav-underline-hide"></div>
            <router-link id="1_2500" to="/query-system" class="Pixso-paragraph-1_2500 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>

          <!-- 底部信息（与查询系统首页一致） -->
          <div id="1_113" ref="footerBgRef" class="Pixso-vector-1_113 query-footer-bg" :style="queryFooterBgStyle"></div>
          <div id="32_8" ref="footerInfoRef" class="Pixso-group-32_8 query-footer-info" :style="queryFooterInfoStyle">
              <p id="1_118" class="Pixso-paragraph-1_118 query-footer-line query-footer-line-1" :style="queryFooterLineStyles.line1">
                  {{ websiteConfig.host_unit }}
              </p>
              <p id="1_119" class="Pixso-paragraph-1_119 query-footer-line query-footer-line-2" :style="queryFooterLineStyles.line2">
                  {{ websiteConfig.organizer_unit }}
              </p>
              <p id="1_120" class="Pixso-paragraph-1_120 query-footer-line query-footer-line-3" :style="queryFooterLineStyles.line3">
                  {{ websiteConfig.icp_number }}
              </p>
              <p id="1_121" class="Pixso-paragraph-1_121 query-footer-line query-footer-line-4" :style="queryFooterLineStyles.line4">
                  {{ websiteConfig.copyright }}
              </p>
                                      </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'
import { getWebsiteConfig } from '@/api/config'
import { getCertificateList } from '@/api/query'
import { getCertificateDisplayStatus } from '@/utils/certificate-status'

type CertListRow = {
  id: number
  certificateNo: string
  certificateType: string
  name: string
  workUnit: string
  issueDate: string
  expiryDate: string
  statusLabel: string
  statusTag: 'success' | 'warning' | 'danger' | 'info'
  idCard: string
}

function formatYmd(v: string | Date | null | undefined): string {
  if (v == null || v === '') return '—'
  const s = typeof v === 'string' ? v : (v as Date).toISOString?.() || String(v)
  return s.slice(0, 10)
}

const DESIGN_WIDTH = 1920
const FOOTER_HEIGHT = 340
const FOOTER_INFO_TOP_OFFSET = 85
const CONTENT_FOOTER_GAP = 56
const MIN_FOOTER_TOP = 840

const scrollContainerRef = ref<HTMLElement | null>(null)
const frameRef = ref<HTMLElement | null>(null)
const resultsPanelRef = ref<HTMLElement | null>(null)
const footerBgRef = ref<HTMLElement | null>(null)
const footerInfoRef = ref<HTMLElement | null>(null)
const pageScale = ref(1)
const frameHeight = ref(MIN_FOOTER_TOP + FOOTER_HEIGHT)
const wrapperHeight = ref(0)
const footerTop = ref(MIN_FOOTER_TOP)
let resizeObserver: ResizeObserver | null = null

const wrapperStyle = computed(() => ({
  height: wrapperHeight.value > 0 ? `${wrapperHeight.value}px` : 'auto',
}))

const frameStyle = computed(() => ({
  height: `${frameHeight.value}px`,
  transform: `scale(${pageScale.value})`,
  transformOrigin: 'top left',
}))

const queryFooterBgStyle = computed(() => ({
  top: `${footerTop.value}px`,
  bottom: 'auto',
  height: `${FOOTER_HEIGHT}px`,
  zIndex: '1',
}))

const queryFooterInfoStyle = computed(() => ({
  top: `${footerTop.value + FOOTER_INFO_TOP_OFFSET}px`,
  bottom: 'auto',
  zIndex: '2',
}))

const updateWrapperLayout = async () => {
  await nextTick()
  const container = scrollContainerRef.value
  if (!container) return

  const width = container.clientWidth || window.innerWidth || DESIGN_WIDTH
  pageScale.value = width / DESIGN_WIDTH

  await nextTick()
  const resultsBottom = resultsPanelRef.value
    ? resultsPanelRef.value.offsetTop + resultsPanelRef.value.offsetHeight
    : MIN_FOOTER_TOP
  footerTop.value = Math.max(MIN_FOOTER_TOP, resultsBottom + CONTENT_FOOTER_GAP)
  frameHeight.value = footerTop.value + FOOTER_HEIGHT
  wrapperHeight.value = Math.ceil(frameHeight.value * pageScale.value)
}
const router = useRouter()
const route = useRoute()

// 从路由获取查询参数
const queryName = ref((route.query.name as string) || '')
const queryIdCard = ref((route.query.idCard as string) || '')
const queryCertificateNo = ref((route.query.certificateNo as string) || '')

const hasListQuery = computed(
  () =>
    !!(
      queryCertificateNo.value?.trim() ||
      queryName.value?.trim() ||
      queryIdCard.value?.trim()
    ),
)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

const paginatedData = ref<CertListRow[]>([])
const totalCount = ref(0)
const listLoading = ref(false)

function certificateDetailTo(certificateNo: string) {
  const no = String(certificateNo || '').trim()
  return {
    path: `/query-system/certificate/detail/${encodeURIComponent(no)}`,
    query: {
      ...(queryName.value ? { name: queryName.value } : {}),
      ...(queryIdCard.value ? { idCard: queryIdCard.value } : {}),
      ...(queryCertificateNo.value ? { certificateNo: queryCertificateNo.value } : {}),
    },
  }
}

async function loadCertificates() {
  if (!hasListQuery.value) {
    paginatedData.value = []
    totalCount.value = 0
    listLoading.value = false
    return
  }

  listLoading.value = true
  try {
    const res = await getCertificateList({
      certificateNo: queryCertificateNo.value || undefined,
      name: queryName.value || undefined,
      idCard: queryIdCard.value || undefined,
      page: currentPage.value,
      pageSize: pageSize.value,
    })
    if (res.code === 200 && res.data?.items) {
      totalCount.value = Math.max(0, Math.floor(Number(res.data.total)) || 0)
      paginatedData.value = res.data.items.map((item: Record<string, unknown>) => {
        const st = getCertificateDisplayStatus({
          status: Number(item.status) === 1 ? 1 : 0,
          expiryDate: item.expiryDate,
        })
        return {
          id: item.id as number,
          certificateNo: String(item.certificateNumber ?? ''),
          certificateType: String(item.certificateType || item.certificateName || '—'),
          name: String(item.holderName ?? '—'),
          workUnit:
            String(
              (item as Record<string, unknown>).workUnit ??
                (item as Record<string, unknown>).holderWorkUnit ??
                '',
            ).trim() ||
            String(item.issuingAuthority ?? '').trim() ||
            '四川飞豹救援',
          issueDate: formatYmd(item.issueDate as string | Date),
          expiryDate: formatYmd(item.expiryDate as string | Date),
          statusLabel: st.label,
          statusTag: st.tag,
          idCard: String(item.holderIdCard ?? ''),
        }
      })
    } else {
      paginatedData.value = []
      totalCount.value = 0
    }
  } catch {
    paginatedData.value = []
    totalCount.value = 0
  } finally {
    listLoading.value = false
    updateWrapperLayout()
  }
}

watch(
  () =>
    [
      route.query.name,
      route.query.idCard,
      route.query.certificateNo
    ] as const,
  () => {
    queryName.value = (route.query.name as string) || ''
    queryIdCard.value = (route.query.idCard as string) || ''
    queryCertificateNo.value = (route.query.certificateNo as string) || ''
    currentPage.value = 1
  }
)

watch(
  [currentPage, pageSize, queryName, queryIdCard, queryCertificateNo, hasListQuery],
  () => {
    loadCertificates()
    updateWrapperLayout()
  },
)

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

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  updateWrapperLayout()
}

const websiteConfig = ref({
  host_unit: '',
  organizer_unit: '',
  icp_number: '',
  copyright: ''
})

const queryFooterLineStyles = {
  line1: { left: '50%', top: '0%', transform: 'translateX(calc(-50% + 0.5px))' },
  line2: { left: '50%', top: '29.41%', transform: 'translateX(calc(-50% + 0.5px))' },
  line3: { left: '50%', top: '58.82%', transform: 'translateX(calc(-50% + 0.5px))' },
  line4: { left: '50%', top: '88.24%', transform: 'translateX(calc(-50% + 0.5px))' }
}

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
  } finally {
    updateWrapperLayout()
  }
}

onMounted(() => {
  fetchWebsiteConfig()
  loadCertificates()
  updateWrapperLayout()
  resizeObserver = new ResizeObserver(() => {
    updateWrapperLayout()
  })
  if (scrollContainerRef.value) {
    resizeObserver.observe(scrollContainerRef.value)
  }
  if (frameRef.value) {
    resizeObserver.observe(frameRef.value)
  }
  if (resultsPanelRef.value) {
    resizeObserver.observe(resultsPanelRef.value)
  }
  if (footerBgRef.value) {
    resizeObserver.observe(footerBgRef.value)
  }
  if (footerInfoRef.value) {
    resizeObserver.observe(footerInfoRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

</script>
<style>
.scroll-container-1_2501 {
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* 证书查询结果：政务门户浅蓝表头 + 蓝色细线全网格（对齐设计稿） */
.cert-query-results-panel {
  --cert-grid-blue: #3277d0;
  position: absolute;
  left: 5%;
  right: 5%;
  top: 360px;
  width: auto;
  min-height: 448px;
  overflow: visible;
  z-index: 120;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 16px 14px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #d9e6f5;
  box-shadow: 0 4px 16px rgba(0, 51, 102, 0.08);
  box-sizing: border-box;
}
.cert-query-results-head {
  flex-shrink: 0;
}
.cert-query-results-title-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
}
.cert-query-results-icon {
  flex-shrink: 0;
  display: block;
}
.cert-query-results-title {
  font-size: 17px;
  font-weight: 700;
  color: #333;
}
.cert-query-results-meta {
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
.cert-query-results-hint {
  margin: 0;
  padding: 4px 0 8px;
  font-size: 14px;
  color: #666;
  line-height: 1.65;
}
.cert-query-results-tablewrap {
  flex: 0 1 auto;
  min-height: 0;
  overflow: visible;
}
.cert-query-results-empty {
  margin: 0;
  padding: 24px 12px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.cert-result-grid {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
  border: 1px solid var(--cert-grid-blue);
}
.cert-result-grid thead th {
  background: #e6f0ff;
  color: #333;
  font-weight: 700;
  border: 1px solid var(--cert-grid-blue);
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
}
.cert-result-grid tbody td {
  border: 1px solid var(--cert-grid-blue);
  padding: 12px 8px;
  color: #333;
  text-align: center;
  vertical-align: middle;
  background: #fff;
}
.cert-result-grid__col-num {
  width: 52px;
}
.cert-result-grid__col-no {
  width: 14%;
}
.cert-result-grid__col-type {
  width: 14%;
}
.cert-result-grid__col-name {
  width: 88px;
}
.cert-result-grid__col-unit {
  width: 14%;
}
.cert-result-grid__col-date {
  width: 108px;
}
.cert-result-grid__col-status {
  width: 96px;
}
.cert-result-grid__col-action {
  width: 88px;
}
.cert-result-grid__cell-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.cert-result-no-link {
  color: #3277d0;
  font-weight: 500;
  text-decoration: none;
}
.cert-result-no-link:hover {
  text-decoration: underline;
  color: #0055aa;
}
.cert-status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 2px;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 500;
}
.cert-status--success {
  color: #52c41a;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}
.cert-status--warning {
  color: #d48806;
  background: #fffbe6;
  border: 1px solid #ffe58f;
}
.cert-status--danger {
  color: #f5222d;
  background: #fff1f0;
  border: 1px solid #ffa39e;
}
.cert-status--info {
  color: #595959;
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
}
.cert-query-results-pagination {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-top: 10px;
  padding-top: 0;
}
.cert-query-detail-link {
  color: #3277d0;
  font-weight: 500;
  text-decoration: none;
}
.cert-query-detail-link:hover {
  text-decoration: underline;
  color: #0055aa;
}

.Pixso-frame-1_2501 {
    width: 1920px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_2411 {
  width: 100%;
  height: 70px;
  background-image: url(@/assets/images/Vector_1_2411.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 194px;
  bottom: auto;
  z-index: 1;
}
.Pixso-vector-17_12 {
  position: absolute;
  left: 113px;
  top: 194px;
  bottom: auto;
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_12.png);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 3;
}
.Pixso-paragraph-1_2487 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + -595px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-paragraph-1_2488 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + -391px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-paragraph-1_2489 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + 17px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-paragraph-1_2490 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + -187px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-paragraph-1_2491 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + 221px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-paragraph-1_2492 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + 425px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-vector-1_2497 {
  width: 0.16%;
  height: 0.22%;
  background-image: url(@/assets/images/Vector_1_2497.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.94%;
  right: 50.9%;
  top: 66.8%;
  bottom: 32.98%;
}
.Pixso-vector-1_2498 {
  width: 0.15%;
  height: 0.2%;
  background-image: url(@/assets/images/Vector_1_2498.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 49%;
  right: 50.85%;
  top: 66.89%;
  bottom: 32.91%;
}
.Pixso-vector-1_2499 {
  width: 204px;
  height: 70px;
  background-image: url(@/assets/images/Vector_1_2499.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 194px;
  bottom: auto;
  transform: translateX(calc(-50% + 627px));
  z-index: 2;
}
.Pixso-paragraph-1_2500 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 217px;
  bottom: auto;
  transform: translateX(calc(-50% + 627px));
  white-space: pre;
  flex-grow: 0;
  z-index: 3;
}
.Pixso-vector-1_2502 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_2502.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_2503 {
    width: 100%;
    height: 194px;
    background-image: url(@/assets/images/Vector_1_2503.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: auto;
}
.Pixso-vector-1_2506 {
    width: 6.72%;
    height: 129px;
    background-image: url(@/assets/images/Vector_1_2506.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 33px;
    bottom: auto;
}
.Pixso-paragraph-1_2509 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.67%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 58px;
    bottom: auto;
}
.Pixso-paragraph-1_2510 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.66%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 120px;
    bottom: auto;
}
.Pixso-paragraph-1_2519 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 30%;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 64.17%;
    top: 295px;
    bottom: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.Pixso-paragraph-1_2526 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2527 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2527.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2528 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2529 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2529.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2530 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2531 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2531.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2532 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2533 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2533.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2534 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2535 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2535.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2536 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2537 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2537.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2538 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2539 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2539.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2540 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2541 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2541.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2542 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2543 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2543.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2544 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2545 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2545.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2546 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2547 {
    width: 13.02%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2547.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2548 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2548.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2549 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2550 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2550.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2551 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2552 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2552.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2553 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2554 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2554.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2555 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2556 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2556.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2557 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2558 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2558.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2559 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2560 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2560.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2561 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2562 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2562.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2563 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2564 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2564.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2565 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2566 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2566.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2567 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2568 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2568.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2569 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2570 {
    width: 10.41%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2570.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2571 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2571.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2572 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 24.22%;
    right: 66.93%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2573 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2573.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2575 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2575.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2577 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2577.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2579 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2579.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2581 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2581.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2583 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2583.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2585 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2585.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2587 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2587.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2589 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2589.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2591 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2591.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2593 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2593.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 36.55%;
    bottom: 61.68%;
}
.Pixso-paragraph-1_2594 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 36.55%;
    bottom: 61.76%;
}
.Pixso-vector-1_2595 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2595.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2596 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2597 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2597.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2598 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2599 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2599.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2600 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2601 {
    width: 6.4%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2601.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2602 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2603 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2603.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2604 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2605 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2605.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 55.28%;
    bottom: 42.95%;
}
.Pixso-paragraph-1_2606 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2607 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2607.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2608 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2609 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2609.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2610 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2611 {
    width: 6.4%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2611.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2612 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2613 {
    width: 7.3%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2613.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2614 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2614.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2615 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2616 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2616.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2617 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2618 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2618.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2619 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2620 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2620.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2621 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2622 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2622.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2623 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2624 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2624.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2625 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2626 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2626.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2627 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2628 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2628.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2629 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2630 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2630.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2631 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2632 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2632.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2633 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2634 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2634.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2635 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2636 {
    width: 13.02%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2636.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2637 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2637.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2638 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2639 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2639.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2640 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2641 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2641.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2642 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2643 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2643.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2644 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2645 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2645.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2646 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2647 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2647.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2648 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2649 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2649.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2650 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2651 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2651.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2652 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2653 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2653.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2654 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2655 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2655.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2656 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2657 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2657.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2658 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2659 {
    width: 10.41%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2659.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2660 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2660.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2661 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2662 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2662.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2663 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2664 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2664.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2665 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2666 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2666.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2667 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2668 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2668.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2669 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2670 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2670.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2671 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2672 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2672.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2673 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2674 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2674.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2675 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2676 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2676.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2677 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2678 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2678.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2679 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2680 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2680.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2681 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2682 {
    width: 10.42%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2682.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2683 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2683.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2684 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2685 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2685.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2686 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2687 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2687.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2688 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2689 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2689.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2690 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2691 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2691.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2692 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2693 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2693.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2694 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2695 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2695.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2696 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2697 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2697.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2698 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2699 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2699.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2700 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2701 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2701.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2702 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2703 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2703.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2704 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2705 {
    width: 7.29%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2705.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2706 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2706.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2707 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.73%;
    height: 1.7%;
    position: absolute;
    left: 75.78%;
    right: 18.49%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2708 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2708.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2710 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2710.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2712 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2712.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2714 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2714.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2716 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2716.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2718 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2718.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2720 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2720.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2722 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2722.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2724 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2724.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2726 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2726.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2728 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2728.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 36.78%;
    bottom: 61.45%;
}
.Pixso-paragraph-1_2729 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 36.78%;
    bottom: 61.68%;
}
.Pixso-vector-1_2730 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2730.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2731 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 39.86%;
    bottom: 58.6%;
}
.Pixso-vector-1_2732 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2732.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2733 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 46.03%;
    bottom: 52.43%;
}
.Pixso-vector-1_2734 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2734.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2735 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 49.11%;
    bottom: 49.34%;
}
.Pixso-vector-1_2736 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2736.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2737 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 58.37%;
    bottom: 40.09%;
}
.Pixso-vector-1_2738 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2738.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2739 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 61.45%;
    bottom: 37.01%;
}
.Pixso-vector-1_2740 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2740.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2741 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 64.53%;
    bottom: 33.92%;
}
.Pixso-vector-1_2742 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2742.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 55.2%;
    bottom: 43.02%;
}
.Pixso-paragraph-1_2743 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 55.2%;
    bottom: 43.25%;
}
.Pixso-vector-1_2744 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2744.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2745 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 52.2%;
    bottom: 46.26%;
}
.Pixso-vector-1_2746 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2746.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2747 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 42.95%;
    bottom: 55.51%;
}
.Pixso-vector-1_2748 {
    width: 10.42%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2748.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2749 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2749.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2750 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 83.07%;
    right: 8.07%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2751 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2751.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2753 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2753.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2755 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2755.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2757 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2757.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2759 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2759.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2761 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2761.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2763 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2763.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2765 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2765.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2767 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2767.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2769 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2769.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2771 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2771.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 36.78%;
    bottom: 61.45%;
}
.Pixso-paragraph-1_2772 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2773 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2773.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2774 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2775 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2775.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2776 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2777 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2777.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2778 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2779 {
    width: 3.74%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2779.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2780 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2781 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2781.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2782 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2783 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2783.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 55.28%;
    bottom: 42.95%;
}
.Pixso-paragraph-1_2784 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2785 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2785.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2786 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2787 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2787.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2788 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2789 {
    width: 3.74%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2789.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2790 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2791 {
    width: 1.12%;
    height: 1.45%;
    background-image: url(@/assets/images/Boolean_operation_1_2791.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.07%;
    right: 91.81%;
    top: 29.08%;
    bottom: 69.47%;
}
.Pixso-paragraph-1_2802 {
    font-size: 16px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: left;
    line-height: 22px;
    color: rgba(50, 50, 50, 1);
    white-space: nowrap;
    width: auto;
    height: 1.7%;
    position: absolute;
    left: 8.4%;
    top: 28.91%;
    bottom: 69.39%;
}
.Pixso-vector-1_2879 {
    width: 100%;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_1_2879.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 14.96%;
    bottom: 79.65%;
}
.Pixso-vector-17_26 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_26.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_2892 {
    width: 1920px;
    height: 280px;
    background-image: url(@/assets/images/Vector_1_2892.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 510.5px));
}
.Pixso-group-33_237 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1472px;
    top: 90px;
}
.Pixso-vector-33_238 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_238.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_239 {
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
.Pixso-vector-33_240 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_240.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-paragraph-33_785 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -595px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_786 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -391px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_787 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_788 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_789 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_790 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-33_791 {
    width: 204px;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_33_791.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 14.96%;
    bottom: 79.65%;
    transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_792 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 627px));
    white-space: pre;
    flex-grow: 0;
}
.query-breadcrumb-link {
  color: #848484;
  text-decoration: none;
}
.query-breadcrumb-link:hover {
  opacity: 0.9;
}
.query-breadcrumb-link:active,
.query-breadcrumb-link:visited {
  text-decoration: underline;
}
.query-breadcrumb-current {
  color: inherit;
}

.Pixso-group-33_210 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1472px;
  top: 90px;
  z-index: 130;
}
.Pixso-vector-33_211 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_211.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-vector-33_213 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_213.png);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-input::placeholder {
  color: #999;
  font-size: 14px;
}

/* 表格单元格文本对齐和溢出处理 */
.Pixso-frame-1_2501 p[id^="1_2528"],
.Pixso-frame-1_2501 p[id^="1_2530"],
.Pixso-frame-1_2501 p[id^="1_2532"],
.Pixso-frame-1_2501 p[id^="1_2534"],
.Pixso-frame-1_2501 p[id^="1_2536"],
.Pixso-frame-1_2501 p[id^="1_2538"],
.Pixso-frame-1_2501 p[id^="1_2540"],
.Pixso-frame-1_2501 p[id^="1_2542"],
.Pixso-frame-1_2501 p[id^="1_2544"],
.Pixso-frame-1_2501 p[id^="1_2546"],
.Pixso-frame-1_2501 p[id^="1_255"],
.Pixso-frame-1_2501 p[id^="1_256"],
.Pixso-frame-1_2501 p[id^="1_259"],
.Pixso-frame-1_2501 p[id^="1_260"],
.Pixso-frame-1_2501 p[id^="1_261"],
.Pixso-frame-1_2501 p[id^="1_262"],
.Pixso-frame-1_2501 p[id^="1_263"],
.Pixso-frame-1_2501 p[id^="1_264"],
.Pixso-frame-1_2501 p[id^="1_265"],
.Pixso-frame-1_2501 p[id^="1_266"],
.Pixso-frame-1_2501 p[id^="1_267"],
.Pixso-frame-1_2501 p[id^="1_268"],
.Pixso-frame-1_2501 p[id^="1_269"],
.Pixso-frame-1_2501 p[id^="1_270"],
.Pixso-frame-1_2501 p[id^="1_272"],
.Pixso-frame-1_2501 p[id^="1_273"],
.Pixso-frame-1_2501 p[id^="1_274"],
.Pixso-frame-1_2501 a[id^="1_277"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* 隐藏证书类型的标签背景，改为纯文字显示 */
.Pixso-vector-1_2593,
.Pixso-vector-1_2595,
.Pixso-vector-1_2597,
.Pixso-vector-1_2599,
.Pixso-vector-1_2601,
.Pixso-vector-1_2603,
.Pixso-vector-1_2605,
.Pixso-vector-1_2607,
.Pixso-vector-1_2609,
.Pixso-vector-1_2611,
.Pixso-vector-1_2613 {
    display: none;
}

/* 将"查看详情"链接改为蓝色，表示可点击 */
.Pixso-paragraph-1_2772,
.Pixso-paragraph-1_2774,
.Pixso-paragraph-1_2776,
.Pixso-paragraph-1_2778,
.Pixso-paragraph-1_2780,
.Pixso-paragraph-1_2782,
.Pixso-paragraph-1_2784,
.Pixso-paragraph-1_2786,
.Pixso-paragraph-1_2788,
.Pixso-paragraph-1_2790 {
    color: #1890ff !important;
    cursor: pointer;
}

.Pixso-paragraph-1_2772:hover,
.Pixso-paragraph-1_2774:hover,
.Pixso-paragraph-1_2776:hover,
.Pixso-paragraph-1_2778:hover,
.Pixso-paragraph-1_2780:hover,
.Pixso-paragraph-1_2782:hover,
.Pixso-paragraph-1_2784:hover,
.Pixso-paragraph-1_2786:hover,
.Pixso-paragraph-1_2788:hover,
.Pixso-paragraph-1_2790:hover {
    color: #40a9ff !important;
    text-decoration: underline;
}

/* 底部信息样式 */
.Pixso-vector-1_113 {
    width: 1920px;
    height: 340px;
    background-image: url(@/assets/images/Vector_1_113.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: auto;
    bottom: auto;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: auto;
    bottom: auto;
    transform: translateX(calc(-50% + 0px));
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
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
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}

.query-footer-bg {
  height: 340px;
  top: auto;
  bottom: auto;
  z-index: 1;
}

.query-footer-info {
  top: auto;
  bottom: auto;
  z-index: 2;
}

.query-footer-line {
  left: 50%;
  transform: translateX(calc(-50% + 0.5px));
}

.query-footer-line-1 {
  top: 0%;
}
.query-footer-line-2 {
  top: 29.41%;
}
.query-footer-line-3 {
  top: 58.82%;
}
.query-footer-line-4 {
  top: 88.24%;
}

</style>
