<template>
    <div ref="scrollContainerRef" class="scroll-container-1_183">
        <div ref="frameRef" id="1_183" class="Pixso-frame-1_183">
            <div id="1_184" class="Pixso-vector-1_184"></div>
            <div id="1_185" class="Pixso-vector-1_185"></div>
            <div id="1_186" class="Pixso-vector-1_186"></div>
            <div id="1_189" class="Pixso-vector-1_189"></div>
            <router-link to="/" id="17_34" class="Pixso-vector-17_34" style="cursor: pointer;"></router-link>
            <div id="1_194" class="Pixso-vector-1_194"></div>
            <p id="1_197" class="Pixso-paragraph-1_197">{{ "四川飞豹救援" }}</p>
            <p id="1_198" class="Pixso-paragraph-1_198">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_214" class="Pixso-vector-1_214"></div>
            <div id="1_215" class="Pixso-vector-1_215"></div>
            <div id="1_216" class="Pixso-vector-1_216"></div>
            <div id="1_217" class="Pixso-vector-1_217"></div>
            <div id="1_218" class="Pixso-vector-1_218"></div>
            <p id="1_219" class="Pixso-paragraph-1_219">{{ "OVERV" }}</p>
            <p id="1_220" class="Pixso-paragraph-1_220">{{ "概况信息" }}</p>
            <router-link to="/overview-info/leadership" id="1_221" class="Pixso-paragraph-1_221">
                {{ "领导信息                          >" }}
            </router-link>
            <router-link to="/overview-info/organization" id="1_222" class="Pixso-paragraph-1_222 overview-nav-item">组织机构</router-link>
            <router-link to="/overview-info/geography" id="1_223" class="Pixso-paragraph-1_223 overview-nav-item">地理位置</router-link>
            <p id="1_224" class="Pixso-paragraph-1_224">
                当前位置：<router-link to="/" class="breadcrumb-link">首页</router-link> > <router-link to="/overview-info" class="breadcrumb-link">概况信息</router-link> > <span class="breadcrumb-current">领导信息</span>
            </p>
            <p id="1_237" class="Pixso-paragraph-1_237">{{ "领导信息" }}</p>
            <div class="leaders-grid">
                <div
                    v-for="(leader, index) in paginatedLeaders"
                    :key="leader.id"
                    class="leader-grid-card"
                    @click="openDetail((currentPage - 1) * pageSize + index)"
                >
                    <div class="leader-grid-photo" :style="getLeaderPhotoStyle(leader)"></div>
                    <p class="leader-grid-name">{{ leader.name }}</p>
                    <div class="leader-grid-position">
                        <p
                            v-for="(line, lineIndex) in splitLeaderPosition(leader.position)"
                            :key="`${leader.id}-${lineIndex}`"
                            class="leader-grid-position-line"
                        >
                            {{ line }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- 底部信息 -->
            <div ref="bottomBgRef" id="1_113" class="Pixso-vector-1_113"></div>
            <div ref="bottomTextRef" id="32_8" class="Pixso-group-32_8">
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

            <!-- 分页组件 -->
            <div class="pagination-wrapper">
                <div class="pagination-container">
                    <!-- 总条数 -->
                    <div class="pagination-total">
                        共计 {{ leaders.length }} 条
                    </div>

                    <!-- 分页控制 -->
                    <div class="pagination-controls">
                        <!-- 上一页 -->
                        <button
                            class="pagination-btn prev-btn"
                            :disabled="currentPage === 1"
                            @click="handlePageChange(currentPage - 1)"
                        >
                            &lt;
                        </button>

                        <!-- 第一页 -->
                        <button
                            v-if="totalPages > 0"
                            class="pagination-btn page-btn"
                            :class="{ active: currentPage === 1 }"
                            @click="handlePageChange(1)"
                        >
                            1
                        </button>

                        <!-- 左侧省略号 -->
                        <span v-if="showLeftEllipsis" class="pagination-ellipsis">...</span>

                        <!-- 中间页码 -->
                        <button
                            v-for="page in visiblePages"
                            :key="page"
                            v-show="page !== 1 && page !== totalPages"
                            class="pagination-btn page-btn"
                            :class="{ active: currentPage === page }"
                            @click="handlePageChange(page)"
                        >
                            {{ page }}
                        </button>

                        <!-- 右侧省略号 -->
                        <span v-if="showRightEllipsis" class="pagination-ellipsis">...</span>

                        <!-- 最后一页 -->
                        <button
                            v-if="totalPages > 1"
                            class="pagination-btn page-btn"
                            :class="{ active: currentPage === totalPages }"
                            @click="handlePageChange(totalPages)"
                        >
                            {{ totalPages }}
                        </button>

                        <!-- 下一页 -->
                        <button
                            class="pagination-btn next-btn"
                            :disabled="currentPage === totalPages"
                            @click="handlePageChange(currentPage + 1)"
                        >
                            &gt;
                        </button>
                    </div>

                    <!-- 每页条数选择 -->
                    <div class="pagination-size">
                        <select
                            :value="pageSize"
                            @change="handleSizeChange"
                            class="pagination-select"
                        >
                            <option :value="12">12条/页</option>
                            <option :value="24">24条/页</option>
                        </select>
                    </div>

                    <!-- 跳页功能 -->
                    <div class="pagination-jump">
                        <input
                            type="number"
                            v-model.number="jumpPage"
                            :min="1"
                            :max="totalPages"
                            class="pagination-input"
                            @keyup.enter="handleJump"
                        >
                        <button
                            class="pagination-btn jump-btn"
                            @click="handleJump"
                        >
                            前往
                        </button>
                    </div>
                </div>
            </div>
            <div id="33_336" class="Pixso-group-33_336" @click.stop>
                <div id="33_337" class="Pixso-vector-33_337"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_339"
                    class="Pixso-vector-33_339"
                    style="cursor: pointer"
                    @click="doSearch"
                ></div>
            </div>
            <div id="33_976" class="Pixso-vector-33_976"></div>
            <router-link id="33_977" to="/overview-info" class="Pixso-paragraph-33_977 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <router-link id="33_978" to="/team-building" class="Pixso-paragraph-33_978 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <router-link id="33_979" to="/party-building" class="Pixso-paragraph-33_979 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <router-link id="33_980" to="/info-public" class="Pixso-paragraph-33_980 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="33_981" to="/dynamic-news" class="Pixso-paragraph-33_981 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="33_982" to="/policy-regulations" class="Pixso-paragraph-33_982 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <router-link id="33_983" to="/query-system" class="Pixso-paragraph-33_983 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>
        </div>

        <!-- 领导详情弹窗（按设计图排版） -->
        <Teleport to="body">
            <div v-show="detailVisible" class="leader-detail-mask" @click.self="closeDetail">
                <div class="leader-detail-dialog">
                    <button type="button" class="leader-detail-close" aria-label="关闭" @click="closeDetail">×</button>
                    <div v-if="currentLeader" class="leader-detail-content">
                        <img
                            class="leader-detail-photo"
                            :src="currentLeader.photoUrl"
                            :alt="`${currentLeader.name}肖像`"
                            loading="lazy"
                            decoding="async"
                            @error="handleLeaderPhotoError"
                        />
                        <div class="leader-detail-right">
                            <div class="leader-detail-name-row">
                                <h2 class="leader-detail-name">{{ currentLeader.name }}</h2>
                                <span class="leader-detail-title">{{ currentLeader.position }}</span>
                            </div>
                            <p class="leader-detail-bio">{{ currentLeader.bio }}</p>
                            <h3 class="leader-detail-label">工作职责</h3>
                            <p class="leader-detail-duty">{{ currentLeader.duty }}</p>
                            <div class="leader-detail-cards">
                                <div class="leader-detail-card">
                                    <span class="leader-detail-card-label">救援经验</span>
                                    <span class="leader-detail-card-value">{{ currentLeader.experience }}</span>
                                </div>
                                <div class="leader-detail-card">
                                    <span class="leader-detail-card-label">参与行动</span>
                                    <span class="leader-detail-card-value">{{ currentLeader.actions }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { getLeadershipList, type LeadershipApiItem, type LeadershipListData } from '@/api/overview-info'
import { useRouter, useRoute } from 'vue-router'
import defaultLeaderPhoto from '@/assets/images/Vector_1_277.png'
import { usePixsoScale } from '@/composables/use-pixso-scale'

interface LeaderItem {
    id: number
    name: string
    position: string
    duty: string
    bio: string
    experience: string
    actions: string
    photoUrl?: string
}

function resolveMediaUrl(url: string | undefined | null) {
    if (!url || !String(url).trim()) return ''
    const u = String(url).trim()
    if (/^https?:\/\/(?:cdn\.)?example\.com\//i.test(u)) return ''
    if (u.startsWith('http://') || u.startsWith('https://')) return u
    return u.startsWith('/') ? u : `/${u}`
}

function buildBio(row: LeadershipApiItem) {
    const parts = [row.gender, row.nation, row.birth, row.education, row.political].filter(
        (x) => x !== undefined && x !== null && String(x).trim() !== ''
    ) as string[]
    return parts.length ? parts.join('，') : ''
}

function fmtExperienceYears(n?: number | null) {
    if (n === undefined || n === null || Number.isNaN(Number(n)) || Number(n) <= 0) return '—'
    return `${Number(n)}+年`
}

function fmtActionsCount(n?: number | null) {
    if (n === undefined || n === null || Number.isNaN(Number(n)) || Number(n) <= 0) return '—'
    return `${Number(n)}+次`
}

function mapApiToLeaderItem(row: LeadershipApiItem): LeaderItem {
    const resolved = resolveMediaUrl(row.photo ?? '')
    return {
        id: row.id,
        name: row.name || '—',
        position: row.position || '—',
        duty: (row.duty && String(row.duty).trim()) || '—',
        bio: buildBio(row) || '—',
        experience: fmtExperienceYears(row.experience ?? undefined),
        actions: fmtActionsCount(row.actions ?? undefined),
        photoUrl: resolved || defaultLeaderPhoto,
    }
}

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 2343)
const leaders = ref<LeaderItem[]>([])

const fetchLeaders = async () => {
    try {
        const res = (await getLeadershipList({ page: 1, pageSize: 500 })) as {
            data?: LeadershipListData
        }
        const items = res?.data?.items ?? []
        leaders.value = items.map(mapApiToLeaderItem)
    } catch {
        leaders.value = []
    }
}

const router = useRouter()
const route = useRoute()

// 容器和底部元素引用
const bottomBgRef = ref<HTMLElement | null>(null)
const bottomTextRef = ref<HTMLElement | null>(null)

const detailVisible = ref(false)
const detailIndex = ref(0)

// 分页状态
const currentPage = ref(1)
const pageSize = ref(12)
const jumpPage = ref(1)

// 计算总页数
const totalPages = computed(() => Math.max(1, Math.ceil(leaders.value.length / pageSize.value)))

// 计算当前页显示的领导列表
const paginatedLeaders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return leaders.value.slice(start, end)
})

function splitLeaderPosition(position: string) {
  return String(position || '—')
    .split(/\n|、/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getLeaderPhotoStyle(leader: LeaderItem) {
  return {
    backgroundImage: `url(${leader.photoUrl || defaultLeaderPhoto})`,
  }
}

function handleLeaderPhotoError(event: Event) {
  const target = event.target as HTMLImageElement
  if (target.src !== defaultLeaderPhoto) {
    target.src = defaultLeaderPhoto
  }
}

// 计算显示的页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    // 总页数<=7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数>7，显示省略号
    if (current <= 4) {
      // 当前页在前面
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 3) {
      // 当前页在后面
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }

  return pages
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value > 4
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value < totalPages.value - 3
})

const currentLeader = computed<LeaderItem | null>(() => leaders.value[detailIndex.value] ?? null)

function openDetail(index: number) {
    detailIndex.value = index
    detailVisible.value = true
}

function closeDetail() {
    detailVisible.value = false
}

// 分页处理函数
function handlePageChange(page: number) {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  pageSize.value = parseInt(target.value)
  currentPage.value = 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleJump() {
  const page = Math.max(1, Math.min(jumpPage.value, totalPages.value))
  if (page !== currentPage.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  jumpPage.value = page
}

function goToOrganization() {
    router.push('/overview-info/organization')
}

function goToGeography() {
    router.push('/overview-info/geography')
}

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

// 初始化页面布局和底部元素位置
const initializePageLayout = async () => {
  // 等待DOM完全渲染
  await nextTick()

  // 强制设置容器高度并触发布局重算
  if (frameRef.value) {
    frameRef.value.style.height = '2343px'
    frameRef.value.offsetHeight
  }

  // 动态设置底部元素位置
  if (bottomBgRef.value && bottomTextRef.value && frameRef.value) {
    const containerHeight = 2343
    const bgHeight = 280
    const textTopPosition = 2118

    // 设置底部背景位置
    bottomBgRef.value.style.top = `${containerHeight - bgHeight}px`
    bottomBgRef.value.style.position = 'absolute'
    bottomBgRef.value.style.height = `${bgHeight}px`

    // 设置底部文字容器位置
    bottomTextRef.value.style.top = `${textTopPosition}px`
    bottomTextRef.value.style.position = 'absolute'

    // 强制触发重排
    bottomBgRef.value.offsetHeight
    bottomTextRef.value.offsetHeight
  }

  // 使用setTimeout确保浏览器完成布局计算后再重置滚动
  setTimeout(() => {
    window.scrollTo(0, 0)
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTop = 0
      scrollContainerRef.value.offsetHeight
    }
  }, 50)
}

// 监听路由变化，确保每次导航到此页面时都重新初始化布局
watch(() => route.path, async (newPath) => {
  if (newPath === '/overview-info/leadership' || newPath === '/overview-info') {
    await fetchLeaders()
    await initializePageLayout()
  }
}, { immediate: false })

// 组件挂载时拉取领导列表并初始化布局
onMounted(async () => {
  await fetchLeaders()
  await initializePageLayout()
  fetchWebsiteConfig()
})

const websiteConfig = ref({
  host_unit: '四川飞豹救援',
  organizer_unit: '四川飞豹救援新闻宣传处',
  icp_number: '蜀ICP备2026009479',
  copyright: 'Copyright®2026 www.scfeibao.com All rights reserved'
})

const fetchWebsiteConfig = async () => {
  try {
    const res = await getWebsiteConfig()
    if (res.data) {
      websiteConfig.value = {
        host_unit: res.data.host_unit || '四川飞豹救援',
        organizer_unit: res.data.organizer_unit || '四川飞豹救援新闻宣传处',
        icp_number: res.data.icp_number || '蜀ICP备2026009479',
        copyright: res.data.copyright || 'Copyright®2026 www.scfeibao.com All rights reserved'
      }
    }
  } catch (error) {
    console.error('获取网站配置失败:', error)
  }
}

</script>

<style>
.scroll-container-1_183 {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.overview-nav-item {
    cursor: pointer;
}
.breadcrumb-link {
    color: #848484;
    text-decoration: none;
}
.breadcrumb-link:hover {
    color: #848484;
    opacity: 0.9;
}
.breadcrumb-link:active,
.breadcrumb-link:visited {
    text-decoration: underline;
}
.breadcrumb-current {
    color: inherit;
}
.main-nav-link {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}
.main-nav-link:hover {
    opacity: 0.9;
}
.Pixso-frame-1_183 {
    width: 1920px;
    height: 2343px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_184 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_184.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0.64%;
    bottom: -0.64%;
}
.Pixso-vector-1_185 {
    width: 68.33%;
    height: 70.88%;
    background-image: url(@/assets/images/Vector_1_185.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.78%;
    right: 5.89%;
    top: 14.94%;
    bottom: 13.66%;
}
.Pixso-vector-1_186 {
    width: 100%;
    height: 8.28%;
    background-image: url(@/assets/images/Vector_1_186.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 91.72%;
}
.Pixso-vector-1_189 {
    width: 100%;
    height: 2.99%;
    background-image: url(@/assets/images/Vector_1_189.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 8.28%;
    bottom: 88.73%;
}
.Pixso-vector-17_34 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_34.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_194 {
    width: 6.72%;
    height: 5.5%;
    background-image: url(@/assets/images/Vector_1_194.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.41%;
    bottom: 93.09%;
}
.Pixso-paragraph-1_197 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 2.26%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 2.48%;
    bottom: 95.26%;
}
.Pixso-paragraph-1_198 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.03%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 5.12%;
    bottom: 93.85%;
}
.Pixso-vector-1_214 {
    width: 18.38%;
    height: 6.95%;
    background-image: url(@/assets/images/Vector_1_214.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 12.51%;
    bottom: 80.54%;
}
.Pixso-vector-1_215 {
    width: 18.38%;
    height: 4.91%;
    background-image: url(@/assets/images/Vector_1_215.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 19.5%;
    bottom: 75.59%;
}
.Pixso-vector-1_216 {
    width: 18.38%;
    height: 4.9%;
    background-image: url(@/assets/images/Vector_1_216.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 24.46%;
    bottom: 70.64%;
}
.Pixso-vector-1_217 {
    width: 18.38%;
    height: 4.9%;
    background-image: url(@/assets/images/Vector_1_217.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 29.41%;
    bottom: 65.69%;
}
.Pixso-vector-1_218 {
    width: 18.38%;
    height: 53%;
    background-image: url(@/assets/images/Vector_1_218.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 32.82%;
    bottom: 13.66%;
}
.Pixso-paragraph-1_219 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 13.75%;
    height: 3.2%;
    position: absolute;
    left: 10%;
    right: 76.25%;
    top: 14.47%;
    bottom: 82.33%;
    opacity: 0.5;
}
.Pixso-paragraph-1_220 {
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
    top: 14.21%;
    bottom: 83.65%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_221 {
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
    top: 21.47%;
    bottom: 77.68%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_222 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.22%;
    height: 0.86%;
    position: absolute;
    left: 8.7%;
    right: 87.08%;
    top: 26.46%;
    bottom: 72.68%;
}
.Pixso-paragraph-1_223 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 4.22%;
    height: 0.86%;
    position: absolute;
    left: 8.7%;
    right: 87.08%;
    top: 31.41%;
    bottom: 67.73%;
}
.Pixso-paragraph-1_224 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 26.25%;
    right: 56.15%;
    top: 12.89%;
    bottom: 86.26%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-text-1_225 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 32.45%;
    right: 62.34%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_225_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_225_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_225_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_225_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_226 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 31.93%;
    right: 61.82%;
    top: 55.83%;
    bottom: 41.61%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_226_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_226_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_226_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_226_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_227 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.23%;
    right: 44.48%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_227_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_227_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_227_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_227_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_228 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.75%;
    right: 45%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_228_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_228_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_228_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_228_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_229 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 64.48%;
    right: 28.23%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_229_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_229_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_229_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_229_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_230 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 64.9%;
    right: 28.85%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_230_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_230_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_230_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_230_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_231 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 81.56%;
    right: 12.19%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_231_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_231_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_231_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_231_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_232 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 82.08%;
    right: 12.71%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_232_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_232_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_232_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_232_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_233 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 81.46%;
    right: 12.29%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_233_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_233_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_233_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_233_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_234 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.31%;
    right: 29.48%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_234_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_234_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_234_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_234_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_235 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.65%;
    right: 45.1%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_235_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_235_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_235_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_235_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_236 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 31.82%;
    right: 61.93%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_236_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_236_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_236_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_236_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_237 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(134, 134, 134, 1);
    width: 4.27%;
    height: 0.85%;
    position: absolute;
    left: 28.65%;
    right: 67.08%;
    top: 16.35%;
    bottom: 82.8%;
}
.Pixso-paragraph-1_238 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 34.78%;
    bottom: 64.15%;
    white-space: nowrap;
}
.Pixso-paragraph-1_239 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 54.12%;
    bottom: 44.81%;
    white-space: nowrap;
}
.Pixso-paragraph-1_240 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 45.16%;
    right: 42.03%;
    top: 54.16%;
    bottom: 44.77%;
    white-space: nowrap;
}
.Pixso-paragraph-1_241 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 45.16%;
    right: 42.03%;
    top: 34.78%;
    bottom: 64.15%;
    white-space: nowrap;
}
.Pixso-paragraph-1_242 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 61.67%;
    right: 25.52%;
    top: 54.16%;
    bottom: 44.77%;
    white-space: nowrap;
}
.Pixso-paragraph-1_243 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 61.67%;
    right: 25.52%;
    top: 34.78%;
    bottom: 64.15%;
    white-space: nowrap;
}
.Pixso-paragraph-1_244 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 34.78%;
    bottom: 64.15%;
    white-space: nowrap;
}
.Pixso-paragraph-1_245 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 54.16%;
    bottom: 44.77%;
    white-space: nowrap;
}
.Pixso-paragraph-1_246 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 74.09%;
    bottom: 24.84%;
    white-space: nowrap;
}
.Pixso-paragraph-1_247 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 61.61%;
    right: 25.57%;
    top: 74.09%;
    bottom: 24.84%;
    white-space: nowrap;
}
.Pixso-paragraph-1_248 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 45.47%;
    right: 41.72%;
    top: 74.09%;
    bottom: 24.84%;
    white-space: nowrap;
}
.Pixso-paragraph-1_249 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    height: 1.07%;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 74.09%;
    bottom: 24.84%;
    white-space: nowrap;
}
.Pixso-vector-1_250 {
    width: 3.96%;
    height: 6px;
    background-image: url(@/assets/images/Vector_1_250.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.8%;
    right: 67.24%;
    top: 50%;
    transform: translateY(calc(-50% + -750.5px));
}
.Pixso-vector-1_251 {
    width: 57.3%;
    height: 1px;
    background-image: url(@/assets/images/Vector_1_251.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 8.85%;
    top: 50%;
    transform: translateY(calc(-50% + -753px));
}
.Pixso-vector-1_252 {
    width: 0.2%;
    height: 0.98%;
    background-image: url(@/assets/images/Vector_1_252.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.05%;
    right: 91.75%;
    top: 21.45%;
    bottom: 77.57%;
}
.Pixso-vector-1_253 {
    width: 12.81%;
    height: 12.98%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 45.16%;
    right: 42.03%;
    top: 20.91%;
    bottom: 66.11%;
}
.Pixso-vector-1_256 {
    width: 12.81%;
    height: 12.98%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 61.67%;
    right: 25.52%;
    top: 20.91%;
    bottom: 66.11%;
}
.Pixso-vector-1_259 {
    width: 12.81%;
    height: 12.98%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 20.91%;
    bottom: 66.11%;
}
.Pixso-vector-1_262 {
    width: 12.81%;
    height: 12.93%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 45.16%;
    right: 42.03%;
    top: 40.27%;
    bottom: 46.8%;
}
.Pixso-vector-1_265 {
    width: 12.81%;
    height: 12.93%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 61.67%;
    right: 25.52%;
    top: 40.27%;
    bottom: 46.8%;
}
.Pixso-vector-1_275 {
    width: 12.81%;
    height: 13.02%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 20.91%;
    bottom: 66.07%;
}
.Pixso-vector-1_276 {
    width: 12.81%;
    height: 12.93%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 40.31%;
    bottom: 46.76%;
}
.Pixso-vector-1_277 {
    width: 12.81%;
    height: 13.01%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 78.28%;
    right: 8.91%;
    top: 59.33%;
    bottom: 27.66%;
}
.Pixso-vector-1_278 {
    width: 12.82%;
    height: 13.01%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 61.61%;
    right: 25.57%;
    top: 59.33%;
    bottom: 27.66%;
}
.Pixso-vector-1_279 {
    width: 12.81%;
    height: 13.01%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 45.47%;
    right: 41.72%;
    top: 59.33%;
    bottom: 27.66%;
}
.Pixso-vector-1_280 {
    width: 12.81%;
    height: 13.01%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 59.33%;
    bottom: 27.66%;
}
.Pixso-vector-1_281 {
    width: 12.81%;
    height: 12.97%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.65%;
    right: 58.54%;
    top: 40.27%;
    bottom: 46.76%;
}
.Pixso-vector-1_354 {
    width: 2.14%;
    height: 1.79%;
    background-image: url(@/assets/images/Boolean_operation_1_354.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.02%;
    right: 89.84%;
    top: 14.47%;
    bottom: 83.74%;
}
.Pixso-group-6_660 {
    width: 35.88%;
    height: 1.79%;
    position: absolute;
    left: 56.2%;
    right: 7.92%;
    top: 82.29%;
    bottom: 15.92%;
}
.Pixso-vector-6_661 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_661.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_735 {
    font-size: 14px;
    font-family: "Helvetica Neue-Light";
    font-weight: 300;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 9.87%;
    height: 52.38%;
    position: absolute;
    left: 0%;
    right: 90.13%;
    top: 23.81%;
    bottom: 23.81%;
}
.Pixso-group-33_336 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1470px;
    top: 90px;
}
.Pixso-vector-33_337 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_337.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_338 {
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
.Pixso-vector-33_339 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_339.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-vector-33_976 {
    width: 204px;
    height: 2.99%;
    background-image: url(@/assets/images/Vector_33_976.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 8.28%;
    bottom: 88.73%;
    transform: translateX(calc(-50% + -596px));
}
.Pixso-paragraph-33_977 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + -596px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_978 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + -392px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_979 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_980 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_981 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_982 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_983 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 9.26%;
    bottom: 89.67%;
    transform: translateX(calc(-50% + 631px));
    white-space: pre;
    flex-grow: 0;
}

/* 领导照片可点击 */
.leader-photo-click {
    cursor: pointer;
}

/* 领导详情弹窗（参考设计图排版） */
.leader-detail-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}
.leader-detail-dialog {
    position: relative;
    width: 100%;
    max-width: 640px;
    max-height: 85vh;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
.leader-detail-close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    color: #555;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.leader-detail-close:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #333;
}
.leader-detail-content {
    padding: 28px 28px 24px;
    display: flex;
    gap: 24px;
    align-items: flex-start;
}
.leader-detail-photo {
    min-width: 120px;
    max-width: 140px;
    width: 140px;
    height: auto;
    aspect-ratio: 200 / 260;
    flex-shrink: 0;
    align-self: center;
    object-fit: cover;
    object-position: center;
    background: #e8e8e8;
    border-radius: 4px;
    display: block;
}
.leader-detail-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.leader-detail-name-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
}
.leader-detail-name {
    font-size: 18px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.3;
}
.leader-detail-title {
    font-size: 13px;
    font-weight: 400;
    font-family: "FZHei-B01S-Regular", "Alibaba PuHuiTi-Regular", sans-serif;
    color: #3578F8;
    line-height: 1.4;
}
.leader-detail-bio {
    font-size: 13px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
    margin: 0 0 12px;
    line-height: 1.5;
}
.leader-detail-label {
    font-size: 14px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #1a1a1a;
    margin: 0 0 6px;
    line-height: 1.4;
}
.leader-detail-duty {
    font-size: 13px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
    margin: 0 0 16px;
    line-height: 1.5;
}
.leader-detail-cards {
    display: flex;
    gap: 12px;
}
.leader-detail-card {
    flex: 1;
    min-width: 0;
    border: 1px solid #a8c8f0;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 70px;
    background: #F2F5FF;
}
.leader-detail-card-label {
    font-size: 13px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
}
.leader-detail-card-value {
    font-size: 20px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #1a1a1a;
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

/* 分页组件容器 */
.pagination-wrapper {
  position: absolute;
  left: 68.58%;
  right: 2%;
  top: 82.29%;
  bottom: 15.92%;
  width: 29.42%;
  height: 1.79%;
}

.pagination-container {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

/* 总条数显示 */
.pagination-total {
  font-size: 14px;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  line-height: 22px;
  color: #333;
  white-space: nowrap;
}

/* 分页控制区域 */
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 分页按钮基础样式 */
.pagination-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  border-color: #3578F8;
  color: #3578F8;
}

.pagination-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  background: #f5f5f5;
  border-color: #d9d9d9;
}

.pagination-btn.active {
  background: #3578F8;
  color: #fff;
  border-color: #3578F8;
}

/* 省略号 */
.pagination-ellipsis {
  padding: 0 4px;
  color: #999;
  font-size: 14px;
}

/* 每页条数选择器 */
.pagination-size {
  display: flex;
  align-items: center;
}

.pagination-select {
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.pagination-select:hover {
  border-color: #3578F8;
}

/* 跳页功能 */
.pagination-jump {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-input {
  width: 45px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  text-align: center;
  outline: none;
  font-size: 14px;
}

.pagination-input:focus {
  border-color: #3578F8;
}

.jump-btn {
  padding: 0 10px;
}

/* 底部信息样式 */
.Pixso-vector-1_113 {
    width: 1920px;
    height: 12%;
    background-image: url(@/assets/images/Vector_1_113.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 88%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 2118px;
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

.leaders-grid {
    position: absolute;
    left: 28.65%;
    right: 8.91%;
    top: 20.1%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 56px;
    row-gap: 34px;
    align-content: start;
    content-visibility: auto;
    contain: layout paint style;
}

.leader-grid-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 382px;
    cursor: pointer;
}

.leader-grid-photo {
    width: min(100%, 246px);
    aspect-ratio: 246 / 304;
    background-color: #d9d9d9;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.leader-grid-name {
    margin: 18px 0 10px;
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
}

.leader-grid-position {
    min-height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.leader-grid-position-line {
    margin: 0;
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
}

/* 领导照片、姓名、职务居中对齐样式 */
.Pixso-vector-1_259,
.Pixso-vector-1_253,
.Pixso-vector-1_256,
.Pixso-vector-1_275,
.Pixso-vector-1_281,
.Pixso-vector-1_262,
.Pixso-vector-1_265,
.Pixso-vector-1_276,
.Pixso-vector-1_280,
.Pixso-vector-1_279,
.Pixso-vector-1_278,
.Pixso-vector-1_277 {
    background-position: center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Pixso-paragraph-1_238,
.Pixso-paragraph-1_239,
.Pixso-paragraph-1_240,
.Pixso-paragraph-1_241,
.Pixso-paragraph-1_242,
.Pixso-paragraph-1_243,
.Pixso-paragraph-1_244,
.Pixso-paragraph-1_245,
.Pixso-paragraph-1_246,
.Pixso-paragraph-1_247,
.Pixso-paragraph-1_248,
.Pixso-paragraph-1_249 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.Pixso-text-1_225,
.Pixso-text-1_226,
.Pixso-text-1_227,
.Pixso-text-1_228,
.Pixso-text-1_229,
.Pixso-text-1_230,
.Pixso-text-1_231,
.Pixso-text-1_232,
.Pixso-text-1_233,
.Pixso-text-1_234,
.Pixso-text-1_235,
.Pixso-text-1_236 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
