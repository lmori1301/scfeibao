<template>
    <div ref="scrollContainerRef" class="scroll-container-1_1836">
        <div id="1_1836" ref="frameRef" class="Pixso-frame-1_1836">
            <div id="1_1837" class="Pixso-vector-1_1837"></div>
            <div id="1_1838" class="Pixso-vector-1_1838"></div>
            <div id="1_1841" class="Pixso-vector-1_1841"></div>
            <p id="1_1844" class="Pixso-paragraph-1_1844">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_1845" class="Pixso-paragraph-1_1845">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_1854" class="Pixso-vector-1_1854"></div>
            <p id="1_1861" class="Pixso-paragraph-1_1861">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/info-public" style="color: inherit; text-decoration: none;">信息公开</router-link> > {{ activeTabLabel }}
            </p>
            <div id="1_1862" class="Pixso-vector-1_1862"></div>
            <div id="33_383" class="Pixso-vector-33_383"></div>
            <router-link to="/" id="17_5" class="Pixso-vector-17_5" style="cursor: pointer;"></router-link>
            <router-link id="1_1868" to="/overview-info" class="Pixso-paragraph-1_1868 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <router-link id="1_1869" to="/team-building" class="Pixso-paragraph-1_1869 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <router-link id="1_1870" to="/info-public" class="Pixso-paragraph-1_1870 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="1_1871" to="/dynamic-news" class="Pixso-paragraph-1_1871 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="1_1872" to="/policy-regulations" class="Pixso-paragraph-1_1872 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <router-link id="1_1873" to="/query-system" class="Pixso-paragraph-1_1873 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>
            <router-link id="1_1874" to="/party-building" class="Pixso-paragraph-1_1874 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <div id="1_1875" class="Pixso-vector-1_1875"></div>
            <!-- 导航高亮带：跟随当前tab移动（人事任免/信息公开各就位） -->
            <div
                id="1_1876"
                class="Pixso-vector-1_1876"
                :class="{ 'info-nav-band-disclosure': activeTab === 'disclosure' }"
            ></div>
            <div id="1_1877" class="Pixso-vector-1_1877"></div>
            <p id="1_1878" class="Pixso-paragraph-1_1878">{{ "FOIA" }}</p>
            <p id="1_1879" class="Pixso-paragraph-1_1879">{{ "信息公开" }}</p>
            <!-- 左侧导航：人事任免 / 信息公开（样式一致，点击切换列表） -->
            <div class="info-nav-item" :class="{ active: activeTab === 'appointment' }" @click="switchTab('appointment')">
                <div id="1_1881" class="Pixso-vector-1_1881"></div>
                <p id="1_1880" class="Pixso-paragraph-1_1880">
                    {{ "人事任免                          >" }}
                </p>
            </div>
            <div class="info-nav-item" :class="{ active: activeTab === 'disclosure' }" @click="switchTab('disclosure')">
                <div id="1_1901" class="Pixso-vector-1_1901"></div>
                <p id="1_1900" class="Pixso-paragraph-1_1900">
                    {{ "信息公开                          >" }}
                </p>
            </div>

            <!-- 动态渲染列表（人事任免 / 信息公开） -->
            <template v-for="(item, index) in currentList" :key="`${activeTab}_${item.id}`">
                <!-- 背景卡片 -->
                <div :id="`1_${1961 + index}`" :class="`Pixso-vector-1_${1961 + index}`"></div>

                <!-- 标题 -->
                <p :id="`1_${1964 + index}`" :class="`Pixso-paragraph-1_${1964 + index}`">
                    {{ item.title }}
                </p>

                <!-- 文档信息 -->
                <p :id="`1_${1967 + index}`" :class="`Pixso-paragraph-1_${1967 + index}`">
                    {{ metaLine(item) }}
                </p>

                <!-- 下载按钮 -->
                <div
                    :id="`1_${1970 + index * 2}`"
                    :class="`Pixso-vector-1_${1970 + index * 2}`"
                    @click="downloadFile(item)"
                    style="cursor: pointer;"
                    v-if="hasAttachment(item)"
                ></div>
                <p
                    :id="`1_${1971 + index * 2}`"
                    :class="`Pixso-paragraph-1_${1971 + index * 2}`"
                    @click="downloadFile(item)"
                    style="cursor: pointer;"
                    v-if="hasAttachment(item)"
                >{{ "下载文件" }}</p>
            </template>

            <div id="1_1976" class="Pixso-vector-1_1976"></div>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 5.57%; top: 74.63%; height: 2.83%;">
                <Pagination
                    :total="currentTotal"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[3, 6, 9]"
                    @page-change="handlePageChange"
                />
            </div>
            <div id="33_156" class="Pixso-group-33_156" @click.stop>
            <div id="33_157" class="Pixso-vector-33_157"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_159"
                class="Pixso-vector-33_159"
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
import { ref, computed, watch, onMounted } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/common/Pagination.vue'
import http from '@/utils/http'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1486)
const router = useRouter()
const route = useRoute()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(3)

// 左侧tab：人事任免 / 信息公开（与后台 appointments、public-info 两个模块同步）
type InfoTab = 'appointment' | 'disclosure'
const activeTab = ref<InfoTab>('appointment')
const activeTabLabel = computed(() => (activeTab.value === 'appointment' ? '人事任免' : '信息公开'))

// 人事任免数据
const personnelList = ref<any[]>([])
const totalPersonnel = ref(0)

// 信息公开数据（GET /api/public-info，后台「信息公开管理」同步）
const disclosureList = ref<any[]>([])
const totalDisclosure = ref(0)

// 从后端API获取人事任免数据
const fetchPersonnelData = async () => {
  try {
    const res = await http.get('/appointments', {
      params: {
        page: 1,
        pageSize: 100 // 获取所有数据用于前端分页
      }
    })
    personnelList.value = res.data.items || []
    totalPersonnel.value = res.data.total || 0
  } catch (error) {
    ElMessage.error('获取人事任免数据失败')
    console.error('获取人事任免数据失败:', error)
  }
}

// 从后端API获取信息公开数据
const fetchDisclosureData = async () => {
  try {
    const res = await http.get('/public-info', {
      params: {
        page: 1,
        pageSize: 100 // 获取所有数据用于前端分页
      }
    })
    disclosureList.value = res.data.items || []
    totalDisclosure.value = res.data.total || 0
  } catch (error) {
    ElMessage.error('获取信息公开数据失败')
    console.error('获取信息公开数据失败:', error)
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchPersonnelData()
  fetchDisclosureData()
})

// 当前tab的总数与列表（供分页与渲染共用）
const currentTotal = computed(() =>
  activeTab.value === 'appointment' ? totalPersonnel.value : totalDisclosure.value
)

const currentList = computed(() => {
  const list = activeTab.value === 'appointment' ? personnelList.value : disclosureList.value
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return list.slice(start, end)
})

// 本地时区日期格式化，避免 toISOString() 的 UTC 偏移导致日期少一天
const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// 列表元信息行：人事任免=文号/发布日期/生效日期/发布部门；信息公开=分类/发布日期
const metaLine = (item: any) => {
  if (activeTab.value === 'appointment') {
    return `文号：${item.docNumber}     发布日期：${item.publishDate}     生效日期：${item.effectiveDate}     发布部门：${item.department}`
  }
  return `分类：${item.category || '暂无'}     发布日期：${formatDate(item.publishDate) || '暂无'}`
}

// 是否有可下载附件：人事任免取 attachment（走后端下载接口），信息公开取 attachmentUrl（直链）
const hasAttachment = (item: any) =>
  activeTab.value === 'appointment' ? !!item.attachment : !!item.attachmentUrl

// 下载文件
function downloadFile(item: any) {
  if (activeTab.value === 'appointment') {
    if (!item?.id) {
      console.warn('文件ID为空，无法下载')
      return
    }
    // 使用后端下载接口
    window.open(`/api/appointments/${item.id}/download`, '_blank')
    return
  }
  if (!item?.attachmentUrl) {
    ElMessage.warning('该信息暂无附件')
    return
  }
  window.open(item.attachmentUrl, '_blank')
}

// 切换tab（同步到 URL query，支持直接分享/刷新保持）
function switchTab(tab: InfoTab) {
  if (activeTab.value === tab) return
  activeTab.value = tab
  currentPage.value = 1
  router.replace({
    path: '/info-public/personnel',
    query: tab === 'disclosure' ? { type: 'disclosure' } : {}
  })
}

// 从 URL query 初始化/同步tab
watch(
  () => route.query.type,
  (t) => {
    const next: InfoTab = t === 'disclosure' ? 'disclosure' : 'appointment'
    if (next !== activeTab.value) {
      activeTab.value = next
      currentPage.value = 1
    }
  }
)
activeTab.value = route.query.type === 'disclosure' ? 'disclosure' : 'appointment'

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
.scroll-container-1_1836 {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding-bottom: 100px;
}
.Pixso-frame-1_1836 {
    width: 1920px;
    height: 1486px;
    overflow: visible;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}

.Pixso-vector-1_1837 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_1837.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_1838 {
    width: 100%;
    height: 13.06%;
    background-image: url(@/assets/images/Vector_1_1838.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 86.94%;
}
.Pixso-vector-1_1841 {
    width: 6.72%;
    height: 8.68%;
    background-image: url(@/assets/images/Vector_1_1841.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.22%;
    bottom: 89.1%;
}
.Pixso-paragraph-1_1844 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.57%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.9%;
    bottom: 92.53%;
}
.Pixso-paragraph-1_1845 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.61%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 8.08%;
    bottom: 90.31%;
}
.Pixso-paragraph-1_1861 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 76.56%;
    top: 19.85%;
    bottom: 78.8%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1862 {
    width: 100%;
    height: 4.71%;
    background-image: url(@/assets/images/Vector_1_1862.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 13.06%;
    bottom: 82.23%;
}
.Pixso-vector-33_383 {
    width: 10.62%;
    height: 4.71%;
    background-image: url(@/assets/images/Vector_33_383.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    right: auto;
    top: 13.06%;
    bottom: 82.23%;
  /* 导航高亮块：与本页「信息公开」文字同一 Δ(79px)，改前为百分比定位导致偏离 */
  transform: translateX(calc(-50% + +17px))
}
.Pixso-vector-17_5 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_5.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_1868 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + -595px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1869 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + -391px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1870 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + +17px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1871 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + +220px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1872 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + +413px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1873 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + +617px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1874 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%; transform: translateX(calc(-50% + -187px));
    right: auto;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1875 {
    width: 18.38%;
    height: 10.97%;
    background-image: url(@/assets/images/Vector_1_1875.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 22.81%;
    bottom: 66.22%;
}
.Pixso-vector-1_1876 {
    width: 18.38%;
    height: 7.74%;
    background-image: url(@/assets/images/Vector_1_1876.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 33.85%;
    bottom: 58.41%;
}
.Pixso-vector-1_1877 {
    width: 18.38%;
    height: 36.02%;
    background-image: url(@/assets/images/Vector_1_1877.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 41.66%;
    bottom: 20.32%;
}
.Pixso-paragraph-1_1878 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 9.22%;
    height: 5.05%;
    position: absolute;
    left: 10%;
    right: 80.78%;
    top: 25.91%;
    bottom: 69.04%;
    opacity: 0.5;
}
.Pixso-paragraph-1_1879 {
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
    top: 25.5%;
    bottom: 71.13%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1880 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.77%;
    height: 1.35%;
    position: absolute;
    left: 8.7%;
    right: 79.53%;
    top: 36.94%;
    bottom: 61.71%;
}
.Pixso-vector-1_1881 {
    width: 0.2%;
    height: 1.55%;
    background-image: url(@/assets/images/Vector_1_1881.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.02%;
    right: 91.93%;
    top: 36.88%;
    bottom: 61.57%;
}
.Pixso-paragraph-1_1882 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 25.37%;
    bottom: 73.28%;
}
.Pixso-paragraph-1_1883 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 42.53%;
    bottom: 56.12%;
}
.Pixso-paragraph-1_1884 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 59.69%;
    bottom: 38.96%;
}
.Pixso-vector-1_1961 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1961.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 22.75%;
    bottom: 61.78%;
}
.Pixso-vector-1_1962 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1962.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 39.91%;
    bottom: 44.62%;
}
.Pixso-vector-1_1963 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1963.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 57.07%;
    bottom: 27.46%;
}
.Pixso-paragraph-1_1964 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 42.97%;
    top: 25.37%;
    bottom: 73.28%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1965 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 41.51%;
    top: 42.53%;
    bottom: 56.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1966 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 41.51%;
    top: 59.69%;
    bottom: 38.96%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1967 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 29.34%;
    bottom: 69.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1968 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 46.5%;
    bottom: 52.15%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1969 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 63.66%;
    bottom: 34.99%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1970 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1970.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 33.31%;
    bottom: 64.27%;
}
.Pixso-paragraph-1_1971 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 33.85%;
    bottom: 64.8%;
}
.Pixso-vector-1_1972 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1972.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 50.47%;
    bottom: 47.11%;
}
.Pixso-paragraph-1_1973 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 51.01%;
    bottom: 47.64%;
}
.Pixso-vector-1_1974 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1974.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 67.63%;
    bottom: 29.95%;
}
.Pixso-paragraph-1_1975 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 68.17%;
    bottom: 30.48%;
}
.Pixso-vector-1_1976 {
    width: 2.14%;
    height: 2.83%;
    background-image: url(@/assets/images/Boolean_operation_1_1976.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.86%;
    right: 90%;
    top: 25.77%;
    bottom: 71.4%;
}
.Pixso-group-6_322 {
    width: 35.89%;
    height: 2.83%;
    position: absolute;
    left: 58.54%;
    right: 5.57%;
    top: 74.63%;
    bottom: 22.54%;
}
.Pixso-vector-6_323 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_323.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_397 {
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
.Pixso-group-33_156 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1475px;
    top: 90px;
}
.Pixso-vector-33_157 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_157.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_158 {
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
.Pixso-vector-33_159 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_159.png);
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
    height: 18%;
    background-image: url(@/assets/images/Vector_1_113.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 82%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1267px;
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

.scroll-container-1_1836 .Pixso-vector-1_113 {
    bottom: -100px !important;
}

.scroll-container-1_1836 .Pixso-group-32_8 {
    bottom: -35px !important;
}

/* 左侧导航项（人事任免 / 信息公开）：样式一致，点击切换，当前项高亮 */
.info-nav-item {
    cursor: pointer;
}
.info-nav-item .Pixso-paragraph-1_1880,
.info-nav-item .Pixso-paragraph-1_1900 {
    transition: color 0.2s ease;
}
.info-nav-item:not(.active) .Pixso-paragraph-1_1880,
.info-nav-item:not(.active) .Pixso-paragraph-1_1900 {
    color: rgba(255, 255, 255, 0.6);
}
.info-nav-item.active .Pixso-paragraph-1_1880,
.info-nav-item.active .Pixso-paragraph-1_1900 {
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
}

/* 「信息公开」导航项：复用「人事任免」的分隔线与文字样式，垂直下移 10% 落入下方面板 */
.Pixso-paragraph-1_1900 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.77%;
    height: 1.35%;
    position: absolute;
    left: 8.7%;
    right: 79.53%;
    top: 46.94%;
    bottom: 51.71%;
}
.Pixso-vector-1_1901 {
    width: 0.2%;
    height: 1.55%;
    background-image: url(@/assets/images/Vector_1_1881.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.02%;
    right: 91.93%;
    top: 46.88%;
    bottom: 51.57%;
}
/* 高亮带（Vector_1_1876 深蓝带）跟随 tab：默认在人事任免后，切到信息公开时下移 10%
   到信息公开项就位（与其文字中心对齐，与人事任免就位时的相对位置一致） */
.Pixso-vector-1_1876.info-nav-band-disclosure {
    top: 43.85%;
    bottom: 48.41%;
}
</style>
