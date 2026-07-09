<template>
  <div ref="scrollContainerRef" class="scroll-container-1_2107">
      <div id="1_2107" ref="frameRef" class="Pixso-frame-1_2107">
          <div id="1_2108" class="Pixso-vector-1_2108"></div>
          <div id="1_2109" class="Pixso-vector-1_2109"></div>
          <div id="1_2112" class="Pixso-vector-1_2112"></div>
          <p id="1_2115" class="Pixso-paragraph-1_2115">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_2116" class="Pixso-paragraph-1_2116">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <div id="1_2125" class="Pixso-vector-1_2125"></div>
          <p id="1_2126" class="Pixso-paragraph-1_2126">
              当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > 动态要闻
          </p>
          <div v-if="headlineNews" id="1_2127" class="Pixso-text-1_2127">
              <p id="1_2127_0" class="Pixso-paragraph-1_2127_0">
                  <span id="1_2127_0_1" class="Pixso-span-1_2127_0_1">
                      {{ getHeadlineSummary(headlineNews) }}
                  </span>
                  <router-link :to="`/dynamic-news/detail/${headlineNews.id}`" class="detail-link">[查看详情]</router-link>
              </p>
          </div>
          <!-- 大标题（动态获取） -->
          <p v-if="headlineNews" id="1_2128" class="Pixso-paragraph-1_2128">
              {{ headlineNews.title }}
          </p>

          <!-- 轮播容器（支持鼠标悬停暂停） -->
          <div v-if="carouselData.length > 0" class="carousel-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <!-- 左侧图片（动态切换） -->
            <div id="1_2129" class="Pixso-vector-1_2129"
                 :style="{ backgroundImage: `url(${carouselData[currentIndex].leftImage})` }"></div>

            <!-- 右侧图片区域（保持不变） -->
            <div id="1_2132" class="Pixso-vector-1_2132"></div>

            <!-- 右侧标题（动态切换，可点击） -->
            <router-link :to="carouselData[currentIndex].link" class="carousel-title-link">
              <p id="1_2133" class="Pixso-paragraph-1_2133">
                  {{ carouselData[currentIndex].title }}
              </p>
            </router-link>

            <!-- 右侧内容（动态切换，可点击） -->
            <router-link :to="carouselData[currentIndex].link" class="carousel-content-link">
              <div id="1_2134" class="Pixso-text-1_2134">
                  <p id="1_2134_0" class="Pixso-paragraph-1_2134_0">
                      <span id="1_2134_0_1" class="Pixso-span-1_2134_0_1">
                          {{ carouselData[currentIndex].content }}
                      </span>
                  </p>
              </div>
            </router-link>
          </div>
          <!-- 圆点指示器（4个，可点击切换） -->
          <div id="1_2135" class="Pixso-vector-1_2135 carousel-dot"
               :class="{ 'carousel-dot-active': currentIndex === 0 }"
               @click="switchToIndex(0)"></div>
          <div id="1_2136" class="Pixso-vector-1_2136 carousel-dot"
               :class="{ 'carousel-dot-active': currentIndex === 1 }"
               @click="switchToIndex(1)"></div>
          <div id="1_2137" class="Pixso-vector-1_2137 carousel-dot"
               :class="{ 'carousel-dot-active': currentIndex === 2 }"
               @click="switchToIndex(2)"></div>
          <div id="1_2138" class="Pixso-vector-1_2138 carousel-dot"
               :class="{ 'carousel-dot-active': currentIndex === 3 }"
               @click="switchToIndex(3)"></div>
          <div id="1_2139" class="Pixso-vector-1_2139"></div>
          <div id="1_2158" class="Pixso-vector-1_2158"></div>
          <div id="1_2159" class="Pixso-vector-1_2159" style="visibility: hidden;"></div>
          <!-- 改造1：Tab页签 - 选中态蓝底高亮文字，未选中无蓝底无高亮；可随意切换 -->
          <p 
            id="1_2160" 
            class="Pixso-paragraph-1_2160 tab-item"
            :class="{ 'tab-item-active': activeTab === 'local' }"
            @click="switchTab('local')"
            :style="tabStyle('local')"
          >{{ "各地动态" }}</p>
          <p 
            id="1_2161" 
            class="Pixso-paragraph-1_2161 tab-item"
            :class="{ 'tab-item-active': activeTab === 'rescue' }"
            @click="switchTab('rescue')"
            :style="tabStyle('rescue')"
          >{{ "救援行动" }}</p>
          <p 
            id="1_2162" 
            class="Pixso-paragraph-1_2162 tab-item"
            :class="{ 'tab-item-active': activeTab === 'policy' }"
            @click="switchTab('policy')"
            :style="tabStyle('policy')"
          >{{ "政策解读" }}</p>
          <p 
            id="1_2163" 
            class="Pixso-paragraph-1_2163 tab-item"
            :class="{ 'tab-item-active': activeTab === 'media' }"
            @click="switchTab('media')"
            :style="tabStyle('media')"
          >{{ "媒体播报" }}</p>

          <!-- 动态渲染当前 Tab 对应列表（标题 + 时间） -->
          <template v-for="(item, index) in currentList.left" :key="`left_${index}`">
            <div
              class="news-item-wrapper"
              :style="{
                position: 'absolute',
                left: item.left,
                top: item.top
              }"
            >
              <router-link
                :to="item.link"
                class="title-link"
                :style="{
                  display: 'inline-block',
                  fontSize: '20px',
                  fontFamily: 'Alibaba PuHuiTi-Regular',
                  color: 'rgba(39,39,39,1)',
                  textDecoration: 'none'
                }"
              >
                {{ item.title }}
              </router-link>
              <span
                v-if="item.isNew"
                class="news-new-badge"
                :style="{
                  display: 'inline-block',
                  marginLeft: '8px'
                }"
              >NEW</span>
            </div>
            <p
              :id="`time_left_${index}`"
              class="Pixso-paragraph-1_2164"
              :style="{
                position: 'absolute',
                left: item.timeLeft,
                top: item.top,
                fontSize: '20px',
                color: 'rgba(132,132,132,1)',
                whiteSpace: 'nowrap'
              }"
            >{{ item.time }}</p>
          </template>

          <template v-for="(item, index) in currentList.right" :key="`right_${index}`">
            <div
              class="news-item-wrapper"
              :style="{
                position: 'absolute',
                left: item.left,
                top: item.top
              }"
            >
              <router-link
                :to="item.link"
                class="title-link title-link-right"
                :style="{
                  display: 'inline-block',
                  fontSize: '20px',
                  fontFamily: 'Alibaba PuHuiTi-Regular',
                  fontWeight: 400,
                  color: 'rgba(39,39,39,1)',
                  textDecoration: 'none'
                }"
              >
                {{ item.title }}
              </router-link>
              <span
                v-if="item.isNew"
                class="news-new-badge"
                :style="{
                  display: 'inline-block',
                  marginLeft: '8px'
                }"
              >NEW</span>
            </div>
            <p
              :id="`time_right_${index}`"
              class="Pixso-paragraph-1_2170"
              :style="{
                position: 'absolute',
                left: item.timeLeft,
                top: item.top,
                fontSize: '20px',
                color: 'rgba(132,132,132,1)',
                whiteSpace: 'nowrap'
              }"
            >{{ item.time }}</p>
          </template>
          <div id="1_2182" class="Pixso-vector-1_2182"></div>
          <router-link to="/" id="17_31" class="Pixso-vector-17_31" style="cursor: pointer;"></router-link>
          <div id="1_2187" class="Pixso-vector-1_2187"></div>
          <router-link id="1_2188" to="/overview-info" class="Pixso-paragraph-1_2188 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
          <router-link id="1_2189" to="/team-building" class="Pixso-paragraph-1_2189 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
          <router-link id="1_2190" to="/party-building" class="Pixso-paragraph-1_2190 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
          <router-link id="1_2191" to="/info-public" class="Pixso-paragraph-1_2191 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
          <router-link id="1_2192" to="/dynamic-news" class="Pixso-paragraph-1_2192 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
          <router-link id="1_2193" to="/policy-regulations" class="Pixso-paragraph-1_2193 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
          <router-link id="6_781" to="/query-system" class="Pixso-paragraph-6_781 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>
          <div id="33_300" class="Pixso-group-33_300" @click.stop>
            <div id="33_301" class="Pixso-vector-33_301"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_303"
                class="Pixso-vector-33_303"
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
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, onActivated, watch } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { useRouter, useRoute } from 'vue-router'
import http from '@/utils/http'
import image1 from '@/assets/images/Vector_1_2129.png'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 2205)
const router = useRouter()
const route = useRoute()

// 响应式数据
const loading = ref(false)
const headlineNews = ref<any>(null)
const localNews = ref<any[]>([])
const rescueNews = ref<any[]>([])
const policyNews = ref<any[]>([])
const mediaNews = ref<any[]>([])

// 去除HTML标签，提取纯文本
const stripHtml = (html: string): string => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

// 获取头条新闻摘要（限制100字符）
const getHeadlineSummary = (news: any): string => {
  const text = stripHtml(news.summary || news.content || '')
  if (text.length <= 100) {
    return text
  }
  return text.substring(0, 100) + '…'
}

// 获取各分类新闻数据
const fetchNewsByCategory = async (category: string, limit: number = 12) => {
  try {
    const res = await http.get('/home/news', {
      params: {
        category,
        status: 1,
        pageSize: limit,
        page: 1
      }
    })
    let result = []
    if (Array.isArray(res.data)) {
      result = res.data
    } else if (res.data?.data?.list) {
      result = res.data.data.list
    } else if (res.data?.list) {
      result = res.data.list
    } else if (res.data?.items) {
      result = res.data.items
    }
    return result
  } catch (error) {
    return []
  }
}

// 加载所有新闻数据
const loadAllNews = async () => {
  loading.value = true
  try {
    const [local, rescue, policy, media] = await Promise.all([
      fetchNewsByCategory('各地动态', 12),
      fetchNewsByCategory('救援行动', 12),
      fetchNewsByCategory('政策解读', 12),
      fetchNewsByCategory('媒体播报', 12)
    ])
    localNews.value = local
    rescueNews.value = rescue
    policyNews.value = policy
    mediaNews.value = media
  } finally {
    loading.value = false
  }
}

// 获取头条新闻（优先获取设置为头条的新闻）
const fetchHeadlineNews = async () => {
  try {
    const res = await http.get('/home/news', {
      params: {
        category: '动态要闻',
        status: 1,
        pageSize: 10,
        page: 1
      }
    })
    let items = []
    if (Array.isArray(res.data)) {
      items = res.data
    } else if (res.data?.data?.list) {
      items = res.data.data.list
    } else if (res.data?.list) {
      items = res.data.list
    } else if (res.data?.items) {
      items = res.data.items
    }

    // 优先选择设置为头条的新闻
    const headlineItem = items.find((item: any) => item.isHeadline === 1)

    if (headlineItem) {
      headlineNews.value = headlineItem
    } else if (items.length > 0) {
      // 如果没有设置头条的新闻，使用第一条
      headlineNews.value = items[0]
    }
  } catch (error) {
    headlineNews.value = null
  }
}

// 轮播新闻数据（从图文资讯分类获取前4条）
const carouselNews = ref<any[]>([])

// 获取轮播新闻数据
const fetchCarouselNews = async () => {
  try {
    const res = await http.get('/home/news', {
      params: {
        category: '图文资讯',
        status: 1,
        pageSize: 4,
        page: 1
      }
    })
    let newsData = []
    if (Array.isArray(res.data)) {
      newsData = res.data
    } else if (res.data?.data?.list) {
      newsData = res.data.data.list
    } else if (res.data?.list) {
      newsData = res.data.list
    } else if (res.data?.items) {
      newsData = res.data.items
    }

    carouselNews.value = newsData
    currentIndex.value = 0
  } catch (error) {
    carouselNews.value = []
  }
}

// 计算轮播数据格式
const carouselData = computed(() => {
  return carouselNews.value.map((news: any) => {
    let text = stripHtml(news.summary || news.content || '')
    // 去除换行符和多余空格
    text = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()
    const maxLength = 300
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '…' : text

    return {
      leftImage: news.coverImage || image1,
      title: news.title,
      content: truncatedText,
      link: `/dynamic-news/detail/${news.id}`
    }
  })
})

// 当前轮播索引
const currentIndex = ref(0)

// 定时器
let timer: number | null = null

// 切换到指定索引
const switchToIndex = (index: number) => {
  currentIndex.value = index
}

// 切换到下一条
const nextSlide = () => {
  if (carouselData.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % carouselData.value.length
}

// 启动自动轮播
const startAutoPlay = () => {
  if (timer) clearInterval(timer)
  timer = window.setInterval(() => {
    nextSlide()
  }, 3000)
}

// 停止自动轮播
const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 鼠标悬停暂停
const handleMouseEnter = () => {
  stopAutoPlay()
}

// 鼠标移开恢复
const handleMouseLeave = () => {
  startAutoPlay()
}

// 生命周期：组件挂载时加载数据并启动自动轮播
onMounted(async () => {
  currentIndex.value = 0
  stopAutoPlay()
  await Promise.all([fetchHeadlineNews(), fetchCarouselNews(), loadAllNews(), fetchWebsiteConfig()])
  startAutoPlay()
})

// 生命周期：组件卸载时清理定时器
onUnmounted(() => {
  stopAutoPlay()
})

// 生命周期：组件激活时（从其他页面返回时）重新加载数据
onActivated(async () => {
  currentIndex.value = 0
  stopAutoPlay()
  await Promise.all([fetchHeadlineNews(), fetchCarouselNews(), loadAllNews()])
  startAutoPlay()
})

// 监听路由变化，从详情页返回时刷新数据
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/dynamic-news' && oldPath?.includes('/detail')) {
    fetchHeadlineNews()
    fetchCarouselNews()
    loadAllNews()
    if (!timer) {
      startAutoPlay()
    }
  }
})

// 核心1：定义选中的Tab（默认各地动态）
const activeTab = ref('local')

// 核心2：Tab切换方法（极简）
const switchTab = (tabKey: string) => {
  activeTab.value = tabKey
}

// 与各地动态蓝条同高；蓝条位置与宽度保证文字在原始位置且政策解读与媒体播报不挤
const TAB_BAR_HEIGHT = '3.32%'
const TAB_BAR_TOP = '60.63%'
// 四页签蓝条统一宽度 10%、等间距 1%，选中时文字在蓝条内居中
const TAB_BAR_WIDTH_UNIFIED = '10%'
const TAB_BAR: Record<string, { left: string; width: string }> = {
  local: { left: '5.78%', width: TAB_BAR_WIDTH_UNIFIED },
  rescue: { left: '16.78%', width: TAB_BAR_WIDTH_UNIFIED },   // 5.78+10+1
  policy: { left: '27.78%', width: TAB_BAR_WIDTH_UNIFIED },    // 16.78+10+1
  media: { left: '38.78%', width: TAB_BAR_WIDTH_UNIFIED },     // 27.78+10+1，文案 39.06% 在蓝条内
}

// 页签样式：四个页签始终用 TAB_BAR 固定占位，选中=蓝底+白字居中，未选中=无蓝底+灰字居中；媒体播报在政策解读选中时位置与媒体播报选中时一致
const tabStyle = (tabKey: string) => {
  const isActive = activeTab.value === tabKey
  const bar = TAB_BAR[tabKey]
  const base: Record<string, string | number> = {
    cursor: 'pointer',
    fontWeight: 400,
    color: isActive ? 'rgba(255,255,255,1)' : 'rgba(142,142,142,1)',
    backgroundColor: isActive ? 'rgba(0, 88, 160, 1)' : 'transparent',
    position: 'absolute',
    left: bar.left,
    width: bar.width,
    height: TAB_BAR_HEIGHT,
    top: TAB_BAR_TOP,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    lineHeight: 1,
  }
  return base
}


// 格式化新闻数据为显示格式（添加位置信息）
const formatNewsForDisplay = (newsList: any[], isRightColumn: boolean = false) => {
  const leftPositions = [
    { left: "7.63%", top: "66.21%", timeLeft: "37.53%" },
    { left: "7.58%", top: "69.16%", timeLeft: "37.47%" },
    { left: "7.58%", top: "72.11%", timeLeft: "37.47%" },
    { left: "7.63%", top: "75.06%", timeLeft: "37.53%" },
    { left: "7.58%", top: "78%", timeLeft: "37.47%" },
    { left: "7.58%", top: "80.95%", timeLeft: "37.47%" }
  ]
  const rightPositions = [
    { left: "54.92%", top: "66.21%", timeLeft: "84.82%" },
    { left: "54.87%", top: "69.16%", timeLeft: "84.77%" },
    { left: "54.87%", top: "72.11%", timeLeft: "84.77%" },
    { left: "54.92%", top: "75.06%", timeLeft: "84.82%" },
    { left: "54.87%", top: "78%", timeLeft: "84.77%" },
    { left: "54.87%", top: "80.95%", timeLeft: "84.77%" }
  ]
  const positions = isRightColumn ? rightPositions : leftPositions

  return newsList.slice(0, 6).map((news: any, index: number) => ({
    title: news.title,
    time: news.publishedAt?.split('T')[0] || news.createdAt?.split('T')[0] || '',
    link: `/dynamic-news/detail/${news.id}`,
    isNew: news.isNew === 1,
    ...positions[index]
  }))
}

// 核心4：计算属性 - 根据选中的Tab返回对应列表
const currentList = computed(() => {
  let newsList: any[] = []
  switch (activeTab.value) {
    case 'local':
      newsList = localNews.value
      break
    case 'rescue':
      newsList = rescueNews.value
      break
    case 'policy':
      newsList = policyNews.value
      break
    case 'media':
      newsList = mediaNews.value
      break
  }

  return {
    left: formatNewsForDisplay(newsList.slice(0, 6), false),
    right: formatNewsForDisplay(newsList.slice(6, 12), true)
  }
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
.scroll-container-1_2107 {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.Pixso-frame-1_2107 {
  width: 1920px;
  height: 2205px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_2108 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2108.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-vector-1_2109 {
  width: 100%;
  height: 8.8%;
  background-image: url(@/assets/images/Vector_1_2109.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 91.2%;
}
.Pixso-vector-1_2112 {
  width: 6.72%;
  height: 5.85%;
  background-image: url(@/assets/images/Vector_1_2112.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 1.5%;
  bottom: 92.65%;
}
.Pixso-paragraph-1_2115 {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 2.4%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 2.63%;
  bottom: 94.97%;
}
.Pixso-paragraph-1_2116 {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.09%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 5.44%;
  bottom: 93.47%;
}
.Pixso-vector-1_2125 {
  width: 88.34%;
  height: 69%;
  background-image: url(@/assets/images/Vector_1_2125.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.83%;
  right: 5.83%;
  top: 15.96%;
  bottom: 14.65%;
}
.Pixso-paragraph-1_2126 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 6.46%;
  right: 81.15%;
  top: 13.61%;
  bottom: 85.49%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-text-1_2127 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: Regular;
  text-align: center;
  line-height: 40px;
  color: rgba(20, 100, 166, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 17.16%;
  right: 17.37%;
  top: 23.85%;
  bottom: 73.83%;
  white-space: normal;
  word-wrap: break-word;
  flex-grow: 0;
}
.Pixso-paragraph-1_2127_0 {
  line-height: 30px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2127_0_1 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  color: rgba(20, 100, 166, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_2127_1 {
  line-height: 20px;
  margin-top: 11px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2127_1_1 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  color: rgba(20, 100, 166, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_2128 {
  font-size: 50px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 70px;
  color: rgba(0, 88, 160, 1);
  width: 75.21%;
  height: 3.18%;
  position: absolute;
  left: 14.48%;
  right: 10.31%;
  top: 18.82%;
  bottom: 78%;
}
.Pixso-vector-1_2129 {
  width: 46.82%;
  height: 29.44%;
  background-image: url(@/assets/images/Vector_1_2129.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.78%;
  right: 47.4%;
  top: 28.66%;
  bottom: 41.9%;
}
.Pixso-vector-1_2132 {
  width: 41.51%;
  height: 29.44%;
  background-image: url(@/assets/images/Vector_1_2132.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 52.6%;
  right: 5.89%;
  top: 28.66%;
  bottom: 41.9%;
}
.Pixso-paragraph-1_2133 {
  font-size: 30px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 49px;
  color: rgba(0, 0, 0, 1);
  width: 35.52%;
  height: 2.23%;
  position: absolute;
  left: 55.63%;
  right: 8.85%;
  top: 30.7%;
  bottom: 67.07%;
}
.Pixso-text-1_2134 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: Regular;
  line-height: 35px;
  color: rgba(77, 77, 77, 1);
  width: 35.52%;
  height: auto;
  min-height: 16.24%;
  position: absolute;
  left: 55.63%;
  right: 8.85%;
  top: 35.01%;
  word-wrap: break-word;
}
.Pixso-paragraph-1_2134_0 {
  line-height: 35px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2134_0_1 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  white-space: pre-wrap;
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_2134_1 {
  line-height: 35px;
  margin-top: 8px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2134_1_1 {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
  white-space: pre-wrap;
  position: relative;
  flex-shrink: 0;
}
.Pixso-vector-1_2135 {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/images/Vector_1_2135.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 84.01%;
  right: 14.69%;
  top: 55.6%;
  bottom: 43.27%;
}
.Pixso-vector-1_2136 {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/images/Vector_1_2136.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 86.35%;
  right: 12.34%;
  top: 55.6%;
  bottom: 43.27%;
}
.Pixso-vector-1_2137 {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/images/Vector_1_2137.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 88.7%;
  right: 10%;
  top: 55.6%;
  bottom: 43.27%;
}
.Pixso-vector-1_2138 {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/images/Vector_1_2138.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 91.04%;
  right: 7.66%;
  top: 55.6%;
  bottom: 43.27%;
}
.Pixso-paragraph-1_2146 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.63%;
  right: 77.99%;
  top: 66.21%;
  bottom: 32.88%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2147 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.63%;
  right: 71.85%;
  top: 75.06%;
  bottom: 24.04%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2148 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.58%;
  right: 77.01%;
  top: 69.16%;
  bottom: 29.93%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2149 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.58%;
  right: 68.88%;
  top: 78%;
  bottom: 21.09%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2150 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.58%;
  right: 69.87%;
  top: 72.11%;
  bottom: 26.98%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2151 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 7.58%;
  right: 74.97%;
  top: 80.95%;
  bottom: 18.14%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2152 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.92%;
  right: 30.7%;
  top: 66.21%;
  bottom: 32.88%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2153 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.92%;
  right: 24.61%;
  top: 75.06%;
  bottom: 24.04%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2154 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.87%;
  right: 24.87%;
  top: 69.16%;
  bottom: 29.93%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2155 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.87%;
  right: 24.61%;
  top: 78%;
  bottom: 21.09%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2156 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.87%;
  right: 21.59%;
  top: 72.11%;
  bottom: 26.98%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2157 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(39, 39, 39, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 54.87%;
  right: 19.71%;
  top: 80.95%;
  bottom: 18.14%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-vector-1_2158 {
  width: 88.36%;
  height: 0.09%;
  background-image: url(@/assets/images/Vector_1_2158.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.78%;
  right: 5.86%;
  top: 64.01%;
  bottom: 35.9%;
}
.Pixso-vector-1_2159 {
  width: 11.41%;
  height: 3.32%;
  background-image: url(@/assets/images/Vector_1_2159.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.78%;
  right: 82.81%;
  top: 60.63%;
  bottom: 36.05%;
}
.Pixso-paragraph-1_2160 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: 5.93%;
  height: 1.27%;
  position: absolute;
  left: 8.18%;
  right: 85.89%;
  top: 61.63%;
  bottom: 37.1%;
}
.Pixso-paragraph-1_2161 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(142, 142, 142, 1);
  width: 5.94%;
  height: 1.27%;
  position: absolute;
  left: 19.58%;
  right: 74.48%;
  top: 61.63%;
  bottom: 37.1%;
}
.Pixso-paragraph-1_2162 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(142, 142, 142, 1);
  width: 5.94%;
  height: 1.27%;
  position: absolute;
  left: 29.32%;
  right: 64.74%;
  top: 61.63%;
  bottom: 37.1%;
}
.Pixso-paragraph-1_2163 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(142, 142, 142, 1);
  width: 5.94%;
  height: 1.27%;
  position: absolute;
  left: 39.06%;
  right: 55%;
  top: 61.63%;
  bottom: 37.1%;
}
.Pixso-paragraph-1_2164 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 37.53%;
  right: 56.64%;
  top: 66.21%;
  bottom: 32.88%;
}
.Pixso-paragraph-1_2165 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.9%;
  position: absolute;
  left: 37.53%;
  right: 56.64%;
  top: 75.06%;
  bottom: 24.04%;
}
.Pixso-paragraph-1_2166 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 37.47%;
  right: 56.69%;
  top: 69.16%;
  bottom: 29.93%;
}
.Pixso-paragraph-1_2167 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 37.47%;
  right: 56.69%;
  top: 78%;
  bottom: 21.09%;
}
.Pixso-paragraph-1_2168 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 37.47%;
  right: 56.69%;
  top: 72.11%;
  bottom: 26.98%;
}
.Pixso-paragraph-1_2169 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 37.47%;
  right: 56.69%;
  top: 80.95%;
  bottom: 18.14%;
}
.Pixso-paragraph-1_2170 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 84.82%;
  right: 9.35%;
  top: 66.21%;
  bottom: 32.88%;
}
.Pixso-paragraph-1_2171 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.9%;
  position: absolute;
  left: 84.82%;
  right: 9.35%;
  top: 75.06%;
  bottom: 24.04%;
}
.Pixso-paragraph-1_2172 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 84.77%;
  right: 9.4%;
  top: 69.16%;
  bottom: 29.93%;
}
.Pixso-paragraph-1_2173 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 84.77%;
  right: 9.4%;
  top: 78%;
  bottom: 21.09%;
}
.Pixso-paragraph-1_2174 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 84.77%;
  right: 9.4%;
  top: 72.11%;
  bottom: 26.98%;
}
.Pixso-paragraph-1_2175 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: 5.84%;
  height: 0.91%;
  position: absolute;
  left: 84.77%;
  right: 9.4%;
  top: 80.95%;
  bottom: 18.14%;
}
.Pixso-vector-1_2182 {
  width: 100%;
  height: 3.17%;
  background-image: url(@/assets/images/Vector_1_2182.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 8.8%;
  bottom: 88.03%;
}
.Pixso-vector-17_31 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_31.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
}
.Pixso-vector-1_2187 {
  width: 204px;
  height: 3.17%;
  background-image: url(@/assets/images/Vector_1_2187.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 8.8%;
  bottom: 88.03%;
  transform: translateX(calc(-50% + 220px));
}
.Pixso-paragraph-1_2188 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.84%;
  bottom: 89.02%;
  transform: translateX(calc(-50% + -595px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2189 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.84%;
  bottom: 89.02%;
  transform: translateX(calc(-50% + -391px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2190 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.84%;
  bottom: 89.02%;
  transform: translateX(calc(-50% + -187px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2191 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.84%;
  bottom: 89.02%;
  transform: translateX(calc(-50% + 17px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2192 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.84%;
  bottom: 89.02%;
  transform: translateX(calc(-50% + 220px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2193 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 69.43%;
  right: 26.41%;
  top: 9.84%;
  bottom: 89.02%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-6_781 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 80.05%;
  right: 15.78%;
  top: 9.84%;
  bottom: 89.02%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-group-33_300 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1470px;
  top: 90px;
}
.Pixso-vector-33_301 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_301.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_302 {
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
.Pixso-vector-33_303 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_303.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 85.21%;
  right: 7.4%;
  top: 50%;
  transform: translateY(calc(-50% + 0.5px));
}

/* Tab 页签、列表标题与时间均不加粗 */
.Pixso-paragraph-1_2160,
.Pixso-paragraph-1_2161,
.Pixso-paragraph-1_2162,
.Pixso-paragraph-1_2163,
.title-link,
.Pixso-paragraph-1_2164,
.Pixso-paragraph-1_2170 {
  font-weight: 400 !important;
}

/* 页签说明：选中态=与各地动态同尺寸蓝底+高亮文字，未选中=无蓝底+普通文字 */
.tab-item {
  box-sizing: border-box;
}
.tab-item-active {
  /* 选中时由 tabStyle 内联设定尺寸与定位；文字与蓝条垂直居中 */
  min-height: 0;
  line-height: 1 !important;
}

/* 标题链接hover样式 */
.title-link:hover {
  color: rgba(0, 88, 160, 1) !important;
  text-decoration: underline;
}

/* 圆点指示器样式 */
.carousel-dot {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  background-image: none !important;
}

.carousel-dot:hover {
  border-color: rgba(255, 255, 255, 1);
  transform: scale(1.15);
}

.carousel-dot-active {
  background-color: rgba(0, 88, 160, 1) !important;
  border-color: rgba(0, 88, 160, 1) !important;
  transform: scale(1.1);
}

/* 主导航链接样式 - 去掉下划线 */
.main-nav-link {
  text-decoration: none !important;
}

/* 查看详情链接样式 */
.detail-link {
  color: rgba(20, 100, 166, 1);
  text-decoration: none;
  cursor: pointer;
  margin-left: 4px;
}

.detail-link:hover {
  text-decoration: underline;
  color: rgba(0, 88, 160, 1);
}

/* 轮播标题链接样式 */
.carousel-title-link {
  text-decoration: none;
  cursor: pointer;
  display: block;
}

.carousel-title-link:hover p {
  color: rgba(0, 88, 160, 1);
}

/* 轮播内容链接样式 */
.carousel-content-link {
  text-decoration: none;
  cursor: pointer;
  display: block;
}

.carousel-content-link:hover {
  opacity: 0.8;
}

/* NEW标识样式 */
.news-new-badge {
  font-size: 12px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 77, 79, 1);
  padding: 2px 6px;
  border-radius: 3px;
  vertical-align: middle;
  line-height: 1;
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
    height: 15%;
    background-image: url(@/assets/images/Vector_1_113.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 87%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1980px;
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
</style>
