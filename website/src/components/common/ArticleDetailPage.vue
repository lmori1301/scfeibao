<template>
  <div ref="scrollContainerRef" class="news-detail-scale-wrapper" :style="wrapperStyle">
    <div ref="frameRef" class="news-detail-page" :style="frameStyle">
      <header class="site-header">
        <div class="site-header-main">
          <router-link to="/" class="brand">
            <img class="brand-mark" src="@/assets/images/Vector_1_2199.png" alt="四川飞豹救援" />
            <span class="brand-text">
              <strong>四川飞豹救援</strong>
              <span>Sichuan Feibao Rescue</span>
            </span>
          </router-link>
          <div class="search-panel" @click.stop>
            <input
              v-model="searchKey"
              @keyup.enter="doSearch"
              placeholder="请输入您要搜索的内容"
              class="detail-search-input"
            />
            <button class="search-button" type="button" aria-label="搜索" @click="doSearch"></button>
          </div>
        </div>

        <nav class="site-nav">
          <router-link to="/" class="home-link" aria-label="首页"></router-link>
          <router-link to="/overview-info" :class="{ active: isActive('/overview-info') }">概况信息</router-link>
          <router-link to="/team-building" :class="{ active: isActive('/team-building') }">队伍建设</router-link>
          <router-link to="/party-building" :class="{ active: isActive('/party-building') }">党建专栏</router-link>
          <router-link to="/info-public" :class="{ active: isActive('/info-public') }">信息公开</router-link>
          <router-link to="/dynamic-news" :class="{ active: isActive('/dynamic-news') }">动态要闻</router-link>
          <router-link to="/policy-regulations" :class="{ active: isActive('/policy-regulations') }">政策法规</router-link>
          <router-link to="/query-system" :class="{ active: isActive('/query-system') }">查询系统</router-link>
        </nav>
      </header>

      <main ref="mainRef" class="news-detail-main">
        <p class="detail-breadcrumb">
          当前位置：<router-link to="/">首页</router-link>
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <span v-if="crumb.to"> &gt; <router-link :to="crumb.to">{{ crumb.text }}</router-link></span>
            <span v-else> &gt; {{ crumb.text }}</span>
          </template>
        </p>
        <section ref="cardRef" class="news-detail-card">
          <h1 v-if="title" class="detail-title">{{ title }}</h1>
          <p v-if="metaText" class="detail-meta">{{ metaText }}</p>
          <div class="detail-divider"></div>
          <div class="news-content">
            <img
              v-if="cover"
              class="detail-cover"
              :class="{ 'detail-cover--avatar': coverMode === 'avatar' }"
              :src="cover"
              alt="封面图"
            />
            <div
              v-if="content"
              ref="contentInnerRef"
              class="news-content-inner"
              v-html="content"
            ></div>
            <div v-else-if="loading" ref="contentInnerRef" class="news-content-inner empty-text">
              加载中...
            </div>
            <div v-else ref="contentInnerRef" class="news-content-inner empty-text">
              暂无内容
            </div>
          </div>
          <div v-if="attachmentUrl" class="detail-attachment">
            <span class="detail-attachment__label">附件下载：</span>
            <a class="detail-attachment__link" :href="attachmentUrl" :download="attachmentName || ''">{{ attachmentName || '下载文件' }}</a>
          </div>
        </section>
      </main>

      <footer ref="footerRef" class="site-footer">
        <p>{{ websiteConfig.host_unit }}</p>
        <p>{{ websiteConfig.organizer_unit }}</p>
        <p>{{ websiteConfig.icp_number }}</p>
        <p>{{ websiteConfig.copyright }}</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { useRouter } from 'vue-router'

const props = defineProps<{
  /** 面包屑：首页之后的层级，最后一级不传 to 即为当前页 */
  breadcrumbs: Array<{ text: string; to?: string }>
  /** 当前导航高亮模块路径 */
  activeNav?: string
  title?: string
  metaText?: string
  /** 正文 HTML */
  content?: string
  /** 封面图 URL */
  cover?: string
  /** 封面形态：banner=横幅全宽；avatar=圆形头像 */
  coverMode?: 'banner' | 'avatar'
  loading?: boolean
  /** 附件下载地址（绝对路径） */
  attachmentUrl?: string
  attachmentName?: string
}>()

const router = useRouter()
const scrollContainerRef = ref<HTMLElement | null>(null)
const frameRef = ref<HTMLElement | null>(null)
const mainRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const contentInnerRef = ref<HTMLElement | null>(null)
const pageScale = ref(1)
const wrapperHeight = ref(0)
let resizeObserver: ResizeObserver | null = null

const wrapperStyle = computed(() => ({
  height: wrapperHeight.value > 0 ? `${wrapperHeight.value}px` : 'auto',
}))

const frameStyle = computed(() => ({
  transform: `scale(${pageScale.value})`,
  transformOrigin: 'top left',
}))

const updateWrapperLayout = async () => {
  await nextTick()
  const container = scrollContainerRef.value
  const frame = frameRef.value
  if (!container || !frame) return

  const width = container.clientWidth || window.innerWidth || 1920
  pageScale.value = width / 1920

  await nextTick()
  const contentBottom = Math.max(
    mainRef.value ? mainRef.value.offsetTop + mainRef.value.offsetHeight : 0,
    cardRef.value ? cardRef.value.offsetTop + cardRef.value.offsetHeight : 0,
    footerRef.value ? footerRef.value.offsetTop + footerRef.value.offsetHeight : 0,
    contentInnerRef.value ? contentInnerRef.value.offsetTop + contentInnerRef.value.offsetHeight : 0,
  )
  wrapperHeight.value = Math.ceil(contentBottom * pageScale.value)
}

const observeContentInner = async () => {
  await nextTick()
  if (resizeObserver && contentInnerRef.value) {
    resizeObserver.observe(contentInnerRef.value)
  }
}

// 数据到达后重新测量高度（v-html 渲染、封面图加载都会改变高度）
watch(
  () => [props.content, props.title, props.cover, props.metaText, props.loading, props.attachmentUrl],
  () => {
    observeContentInner()
    updateWrapperLayout()
  },
)

// 搜索
const searchKey = ref('')

const searchModules = [
  { name: '概况信息', path: '/overview-info' },
  { name: '队伍建设', path: '/team-building' },
  { name: '党建专栏', path: '/party-building' },
  { name: '信息公开', path: '/info-public' },
  { name: '动态要闻', path: '/dynamic-news' },
  { name: '政策法规', path: '/policy-regulations' },
  { name: '查询系统', path: '/query-system' },
]

const doSearch = () => {
  const key = searchKey.value?.trim()
  if (!key) return

  const target = searchModules.find(m =>
    m.name.includes(key) || key.includes(m.name)
  )

  if (target) {
    router.push({ path: target.path, query: { keyword: key } })
  } else {
    router.push({ path: '/search-result', query: { keyword: key } })
  }
}

const isActive = (path: string) => props.activeNav === path

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
  } finally {
    updateWrapperLayout()
  }
}

onMounted(() => {
  fetchWebsiteConfig()
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
  if (mainRef.value) {
    resizeObserver.observe(mainRef.value)
  }
  if (cardRef.value) {
    resizeObserver.observe(cardRef.value)
  }
  if (footerRef.value) {
    resizeObserver.observe(footerRef.value)
  }
  observeContentInner()
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<style>
.news-detail-scale-wrapper {
  width: 100%;
  overflow: hidden;
  background: #f6f6f6;
}

.news-detail-page {
  width: 1920px;
  background: #f6f6f6;
  color: #585858;
}

.site-header {
  background-color: #fff;
  background-image: url(@/assets/images/Vector_1_7.webp);
  background-size: 100% 191px;
  background-repeat: no-repeat;
  background-position: top center;
}

.site-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1700px;
  margin: 0 auto;
  padding: 32px 0 30px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 26px;
  text-decoration: none;
}

.brand-mark {
  width: 129px;
  height: 129px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  color: #d92626;
  font-family: "FZDaHei-B02S-Regular";
}

.brand-text strong {
  font-size: 53px;
  font-weight: 400;
  line-height: 1.1;
}

.brand-text span {
  margin-top: 10px;
  font-size: 28px;
  line-height: 1;
}

.search-panel {
  display: flex;
  align-items: center;
  width: 338px;
  height: 42px;
  padding: 0 18px;
  box-sizing: border-box;
  background-image: url(@/assets/images/Vector_33_292.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.detail-search-input {
  flex: 1;
  min-width: 0;
  height: 24px;
  line-height: 24px;
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

.detail-search-input::placeholder {
  color: #999;
  font-size: 14px;
}

.search-button {
  width: 25px;
  height: 25px;
  margin-left: 12px;
  border: none;
  background: url(@/assets/images/Group_33_294.png) center / contain no-repeat;
  cursor: pointer;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background-image: url(@/assets/images/Vector_1_2182.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.site-nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 204px;
  height: 70px;
  color: #fff;
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  line-height: 25px;
  text-decoration: none;
}

.site-nav .home-link {
  width: 150px;
  margin-right: 18px;
  background-image: url(@/assets/images/Group_17_30.png);
  background-size: 150px 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.site-nav .active {
  background-image: url(@/assets/images/Vector_1_2243.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.news-detail-main {
  padding: 36px 0 72px;
}

.news-detail-card {
  width: 1700px;
  min-height: 420px;
  margin: 36px auto 0;
  padding: 80px 70px 82px;
  box-sizing: border-box;
  background: #fff;
}

.detail-breadcrumb {
  width: 1600px;
  margin: 0 auto;
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  line-height: 20px;
  color: #848484;
}

.detail-breadcrumb a {
  color: inherit;
  text-decoration: none;
}

.detail-title {
  max-width: 1373px;
  margin: 0 auto;
  color: #585858;
  font-size: 40px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 70px;
  text-align: center;
}

.detail-meta {
  margin: 34px 0 0;
  color: #848484;
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  line-height: 20px;
  text-align: center;
}

.detail-divider {
  width: 100%;
  height: 1px;
  margin: 52px auto 44px;
  background: #e9e9e9;
}

.news-content {
  width: 1373px;
  max-width: 100%;
  margin: 0 auto;
}

.news-content-inner {
  min-height: 0;
  color: #6a6a6a;
  /* 与后台 wangEditor 默认字号(14px)一致：正文不加内联字号时按编辑器原生大小渲染 */
  font-size: 14px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 1.75;
  overflow-wrap: break-word;
}

.news-content-inner p {
  margin: 0 0 20px;
}

.news-content-inner img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 30px auto;
}

.news-content-inner a {
  color: #1570ce;
}

.empty-text {
  color: #999;
  text-align: center;
}

.detail-cover {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto 44px;
}

.detail-cover--avatar {
  width: 240px;
  height: 240px;
  max-width: 240px;
  margin: 0 auto 44px;
  border-radius: 50%;
  object-fit: cover;
}

.detail-attachment {
  width: 1373px;
  max-width: 100%;
  margin: 48px auto 0;
  padding-top: 28px;
  border-top: 1px solid #e9e9e9;
  font-size: 22px;
  font-family: "Alibaba PuHuiTi-Regular";
  line-height: 32px;
  color: #848484;
}

.detail-attachment__link {
  color: #1570ce;
  text-decoration: none;
  word-break: break-all;
}

.detail-attachment__link:hover {
  text-decoration: underline;
}

.site-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  padding: 48px 0;
  box-sizing: border-box;
  background-image: url(@/assets/images/Vector_1_113.webp);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  line-height: 1.4;
  text-align: center;
}

.site-footer p {
  margin: 10px 0;
}
</style>
