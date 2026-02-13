<template>
  <div class="scroll-container-1_1110">
      <div id="1_1110" class="Pixso-frame-1_1110">
          <div id="1_1111" class="Pixso-vector-1_1111"></div>
          <div id="1_1112" class="Pixso-vector-1_1112"></div>
          <div id="1_1115" class="Pixso-vector-1_1115"></div>
          <p id="1_1118" class="Pixso-paragraph-1_1118">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_1119" class="Pixso-paragraph-1_1119">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <div id="1_1128" class="Pixso-vector-1_1128"></div>
          <div id="1_1129" class="Pixso-vector-1_1129"></div>
          <div id="17_6" class="Pixso-vector-17_6"></div>
          <div id="1_1134" class="Pixso-vector-1_1134"></div>
          <router-link id="1_1141" to="/overview-info" class="Pixso-paragraph-1_1141 main-nav-link">概况信息</router-link>
          <router-link id="1_1142" to="/team-building" class="Pixso-paragraph-1_1142 main-nav-link">队伍建设</router-link>
          <router-link id="1_1147" to="/party-building" class="Pixso-paragraph-1_1147 main-nav-link">党建专栏</router-link>
          <router-link id="1_1143" to="/info-public" class="Pixso-paragraph-1_1143 main-nav-link">信息公开</router-link>
          <router-link id="1_1144" to="/dynamic-news" class="Pixso-paragraph-1_1144 main-nav-link">动态要闻</router-link>
          <router-link id="1_1145" to="/policy-regulations" class="Pixso-paragraph-1_1145 main-nav-link">政策法规</router-link>
          <router-link id="1_1146" to="/query-system" class="Pixso-paragraph-1_1146 main-nav-link">查询系统</router-link>
          <p id="1_1148" class="Pixso-paragraph-1_1148">
              当前位置：<router-link to="/" class="party-breadcrumb-link">首页</router-link> > <router-link to="/party-building" class="party-breadcrumb-link">党建专栏</router-link> > <span class="party-breadcrumb-current">党建工作</span>
          </p>
          <!-- 动态文章列表 -->
          <template v-if="loading">
              <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">加载中...</div>
          </template>
          <template v-else-if="loadFailed">
              <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">
                  <p>数据加载失败，请稍后重试</p>
                  <button @click="fetchArticleList" style="margin-top: 12px; padding: 8px 20px; font-size: 14px; color: #1e88e5; background: #fff; border: 1px solid #1e88e5; border-radius: 4px; cursor: pointer;">重新加载</button>
    </div>
          </template>
          <template v-else-if="articleList.length > 0">
              <!-- 第一条：左侧日期 + 右侧内容 -->
              <div v-if="articleList[0]" id="1_1149" class="Pixso-vector-1_1149" @click="goToDetail(articleList[0].id)" style="cursor: pointer;"></div>
              <div v-if="articleList[0]" id="1_1161" class="Pixso-vector-1_1161"></div>
              <p v-if="articleList[0]" id="1_1166" class="Pixso-paragraph-1_1166">{{ formatDate(articleList[0].publishDate).year }}</p>
              <p v-if="articleList[0]" id="1_1167" class="Pixso-paragraph-1_1167">{{ formatDate(articleList[0].publishDate).day }}</p>
              <p v-if="articleList[0]" id="1_1181" class="Pixso-paragraph-1_1181">{{ articleList[0].title }}</p>
              <p v-if="articleList[0]" id="1_1177" class="Pixso-paragraph-1_1177">{{ articleList[0].summary || (articleList[0].content?.substring(0, 80) + '...') }}</p>
              
              <!-- 第二条 -->
              <div v-if="articleList[1]" id="1_1152" class="Pixso-vector-1_1152" @click="goToDetail(articleList[1].id)" style="cursor: pointer;"></div>
              <div v-if="articleList[1]" id="1_1162" class="Pixso-vector-1_1162"></div>
              <p v-if="articleList[1]" id="1_1169" class="Pixso-paragraph-1_1169">{{ formatDate(articleList[1].publishDate).year }}</p>
              <p v-if="articleList[1]" id="1_1170" class="Pixso-paragraph-1_1170">{{ formatDate(articleList[1].publishDate).day }}</p>
              <p v-if="articleList[1]" id="1_1182" class="Pixso-paragraph-1_1182">{{ articleList[1].title }}</p>
              <p v-if="articleList[1]" id="1_1178" class="Pixso-paragraph-1_1178">{{ articleList[1].summary || (articleList[1].content?.substring(0, 80) + '...') }}</p>
              
              <!-- 第三条 -->
              <div v-if="articleList[2]" id="1_1155" class="Pixso-vector-1_1155" @click="goToDetail(articleList[2].id)" style="cursor: pointer;"></div>
              <div v-if="articleList[2]" id="1_1163" class="Pixso-vector-1_1163"></div>
              <p v-if="articleList[2]" id="1_1172" class="Pixso-paragraph-1_1172">{{ formatDate(articleList[2].publishDate).year }}</p>
              <p v-if="articleList[2]" id="1_1173" class="Pixso-paragraph-1_1173">{{ formatDate(articleList[2].publishDate).day }}</p>
              <p v-if="articleList[2]" id="1_1183" class="Pixso-paragraph-1_1183">{{ articleList[2].title }}</p>
              <p v-if="articleList[2]" id="1_1179" class="Pixso-paragraph-1_1179">{{ articleList[2].summary || (articleList[2].content?.substring(0, 80) + '...') }}</p>
              
              <!-- 第四条 -->
              <div v-if="articleList[3]" id="1_1158" class="Pixso-vector-1_1158" @click="goToDetail(articleList[3].id)" style="cursor: pointer;"></div>
              <div v-if="articleList[3]" id="1_1164" class="Pixso-vector-1_1164"></div>
              <p v-if="articleList[3]" id="1_1175" class="Pixso-paragraph-1_1175">{{ formatDate(articleList[3].publishDate).year }}</p>
              <p v-if="articleList[3]" id="1_1176" class="Pixso-paragraph-1_1176">{{ formatDate(articleList[3].publishDate).day }}</p>
              <p v-if="articleList[3]" id="1_1184" class="Pixso-paragraph-1_1184">{{ articleList[3].title }}</p>
              <p v-if="articleList[3]" id="1_1180" class="Pixso-paragraph-1_1180">{{ articleList[3].summary || (articleList[3].content?.substring(0, 80) + '...') }}</p>
          </template>
          <template v-else>
              <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">暂无数据</div>
          </template>
          <div id="1_1261" class="Pixso-vector-1_1261"></div>
          <div id="1_1262" class="Pixso-vector-1_1262"></div>
          <div id="1_1263" class="Pixso-vector-1_1263"></div>
          <div id="1_1264" class="Pixso-vector-1_1264"></div>
          <div id="1_1265" class="Pixso-vector-1_1265"></div>
          <div id="1_1266" class="Pixso-vector-1_1266"></div>
          <p id="1_1267" class="Pixso-paragraph-1_1267">{{ "PBCOL" }}</p>
          <p id="1_1268" class="Pixso-paragraph-1_1268">{{ "党建专栏" }}</p>
          <router-link id="1_1269" to="/party-building/party-work" class="Pixso-paragraph-1_1269 party-sidebar-link">
              {{ "党建工作                          >" }}
          </router-link>
          <router-link id="1_1270" to="/party-building/team-work" class="Pixso-paragraph-1_1270 party-sidebar-link">团建工作</router-link>
          <router-link id="1_1271" to="/party-building/members" class="Pixso-paragraph-1_1271 party-sidebar-link">党员先锋</router-link>
          <router-link id="1_1272" to="/party-building/study" class="Pixso-paragraph-1_1272 party-sidebar-link">党员学"习"</router-link>
          <div id="1_1273" class="Pixso-vector-1_1273"></div>
          <div id="1_1274" class="Pixso-vector-1_1274"></div>
          <!-- 分页组件 -->
          <div style="position: absolute; right: 5.52%; top: 79.33%; height: 2.22%;">
              <Pagination
                  :total="total"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-size-options="[4, 8, 12]"
                  @page-change="handlePageChange"
                  @size-change="handleSizeChange"
              />
          </div>
          <div id="33_165" class="Pixso-group-33_165" @click.stop>
              <div id="33_166" class="Pixso-vector-33_166"></div>
              <!-- 输入框 -->
              <input
                  v-model="searchKey"
                  @keyup.enter="doSearch"
                  placeholder="请输入您要搜索的内容"
                  class="search-input"
              />
              <!-- 搜索图标点击 -->
              <div
                  id="33_168"
                  class="Pixso-vector-33_168"
                  style="cursor: pointer"
                  @click="doSearch"
              ></div>
        </div>
            </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPartyWorkList } from '@/api/party-building'
import { getMockPartyWorkList } from '@/mock/party'
import type { PartyWorkItem } from '@/types/party'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()

// 响应式数据
const loading = ref(false)
const loadFailed = ref(false) // 接口失败时展示友好提示，避免仅依赖全局报错
const articleList = ref<PartyWorkItem[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(4)
const searchKeyword = ref('')
const jumpPage = ref(1)

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 计算可见页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return {
    year: `${year}-${month}`,
    day
  }
}

// 获取文章列表
const fetchArticleList = async () => {
  loading.value = true
  loadFailed.value = false
  try {
    const res = await getPartyWorkList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined
    })
    articleList.value = res.data?.list || []
    total.value = res.data?.total ?? 0
  } catch (error: any) {
    console.error('获取党建工作列表失败:', error)
    
    // 开发环境：如果后端返回500错误，使用Mock数据降级
    const isDev = import.meta.env.DEV
    const errorStatus = error?.response?.status
    const errorCode = error?.code
    const isServerError = errorStatus === 500 || errorCode === 'ERR_NETWORK' || errorCode === 'ECONNREFUSED'
    
    console.log('🔍 错误详情:', {
      isDev,
      errorStatus,
      errorCode,
      isServerError,
      errorMessage: error?.message
    })
    
    if (isDev && isServerError) {
      console.warn('⚠️ 后端服务不可用（500错误），使用Mock数据降级显示')
      try {
        const mockRes = getMockPartyWorkList(currentPage.value, pageSize.value)
        // 如果有搜索关键词，过滤Mock数据
        let filteredList = mockRes.data.list
        if (searchKeyword.value) {
          const keyword = searchKeyword.value.toLowerCase()
          filteredList = filteredList.filter((item: PartyWorkItem) => 
            item.title.toLowerCase().includes(keyword) ||
            item.summary?.toLowerCase().includes(keyword) ||
            item.content?.toLowerCase().includes(keyword)
          )
        }
        articleList.value = filteredList
        total.value = filteredList.length
        console.log('✅ 已使用Mock数据:', filteredList.length, '条')
        // Mock数据加载成功，不显示错误提示
        loadFailed.value = false
      } catch (mockError) {
        console.error('Mock数据加载失败:', mockError)
    articleList.value = []
    total.value = 0
        loadFailed.value = true
      }
    } else {
      // 生产环境或其他错误：显示错误提示
      console.log('❌ 显示错误提示（非开发环境或非500错误）')
      articleList.value = []
      total.value = 0
      loadFailed.value = true
    }
  } finally {
    loading.value = false
  }
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

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchArticleList()
}

// 页码改变处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchArticleList()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 改变每页显示数量
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchArticleList()
}

// 跳转到指定页
const handleJumpPage = () => {
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
    currentPage.value = jumpPage.value
    fetchArticleList()
  }
}

// 跳转到详情页
const goToDetail = (id: number) => {
  router.push(`/party-building/party-work/${id}`)
}

// 组件挂载时获取数据
onMounted(() => {
  fetchArticleList()
})
</script>

<style>
.scroll-container-1_1110 {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.party-breadcrumb-link {
  color: #848484;
  text-decoration: none;
}
.party-breadcrumb-link:hover { opacity: 0.9; }
.party-breadcrumb-link:active,
.party-breadcrumb-link:visited { text-decoration: underline; }
.party-breadcrumb-current { color: inherit; }
.main-nav-link {
    color: #fff;
    text-decoration: none;
  cursor: pointer;
}
.main-nav-link:hover { opacity: 0.9; }
.main-nav-link:active,
.main-nav-link:visited { text-decoration: none; }
.party-sidebar-link { color: #fff; text-decoration: none; cursor: pointer; }
.party-sidebar-link:hover { opacity: 0.9; }
.party-sidebar-link:active,
.party-sidebar-link:visited { text-decoration: none; }
.Pixso-frame-1_1110 {
  width: 1920px;
  height: 1892px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1111 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_1111.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-vector-1_1112 {
  width: 100%;
  height: 10.25%;
  background-image: url(@/assets/images/Vector_1_1112.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 89.75%;
}
.Pixso-vector-1_1115 {
  width: 6.72%;
  height: 6.82%;
  background-image: url(@/assets/images/Vector_1_1115.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
    position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 1.74%;
  bottom: 91.44%;
}
.Pixso-paragraph-1_1118 {
    font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 2.8%;
  position: absolute;
  left: 14.64%;
  right: 68.7%;
  top: 3.07%;
  bottom: 94.13%;
}
.Pixso-paragraph-1_1119 {
    font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.27%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 6.34%;
  bottom: 92.39%;
}
.Pixso-vector-1_1128 {
  width: 100%;
  height: 3.7%;
  background-image: url(@/assets/images/Vector_1_1128.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 10.25%;
  bottom: 86.05%;
}
.Pixso-vector-1_1129 {
  width: 10.63%;
  height: 3.7%;
  background-image: url(@/assets/images/Vector_1_1129.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 35%;
  right: 54.37%;
  top: 10.25%;
  bottom: 86.05%;
}
.Pixso-vector-17_6 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_6.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
}
.Pixso-vector-1_1134 {
  width: 100%;
  height: 14.8%;
  background-image: url(@/assets/images/Vector_1_1134.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 85.2%;
  bottom: 0%;
}
.Pixso-paragraph-1_1141 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 16.46%;
  right: 79.38%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1142 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 27.45%;
  right: 68.39%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1143 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
      font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 48.7%;
  right: 47.14%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1144 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
      font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 59.27%;
  right: 36.56%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1145 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 70.16%;
  right: 25.68%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1146 {
    font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 81.04%;
  right: 14.79%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1147 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
        position: absolute;
  left: 38.13%;
  right: 57.71%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1148 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 5.83%;
  right: 76.82%;
  top: 15.59%;
  bottom: 83.35%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-vector-1_1149 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1149.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 18.18%;
  bottom: 68.08%;
}
.Pixso-vector-1_1152 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1152.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 33.25%;
  bottom: 53.01%;
}
.Pixso-vector-1_1155 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1155.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 48.31%;
  bottom: 37.95%;
}
.Pixso-vector-1_1158 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1158.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 63.37%;
  bottom: 22.89%;
}
.Pixso-vector-1_1161 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1161.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 18.18%;
  bottom: 68.08%;
}
.Pixso-vector-1_1162 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1162.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 33.25%;
  bottom: 53.01%;
}
.Pixso-vector-1_1163 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1163.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 48.31%;
  bottom: 37.95%;
}
.Pixso-vector-1_1164 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1164.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 63.37%;
  bottom: 22.89%;
}
.Pixso-vector-1_1165 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1165.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 21.83%;
  bottom: 71.67%;
}
.Pixso-paragraph-1_1166 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 25.9%;
  bottom: 73.04%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1167 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.65%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 23.2%;
  bottom: 74.15%;
}
.Pixso-vector-1_1168 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1168.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 36.89%;
  bottom: 56.61%;
}
.Pixso-paragraph-1_1169 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
        text-align: center;
          line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 40.96%;
  bottom: 57.98%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1170 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.64%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 38.27%;
  bottom: 59.09%;
}
.Pixso-vector-1_1171 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1171.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 51.96%;
  bottom: 41.54%;
}
.Pixso-paragraph-1_1172 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 56.03%;
  bottom: 42.92%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1173 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.64%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 53.33%;
  bottom: 44.03%;
}
.Pixso-vector-1_1174 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1174.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 67.02%;
  bottom: 26.48%;
}
.Pixso-paragraph-1_1175 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 71.09%;
  bottom: 27.85%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1176 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.65%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 68.39%;
  bottom: 28.96%;
}
.Pixso-paragraph-1_1177 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 26.16%;
  bottom: 70.67%;
}
.Pixso-paragraph-1_1178 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 41.23%;
  bottom: 55.6%;
}
.Pixso-paragraph-1_1179 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 56.29%;
  bottom: 40.54%;
}
.Pixso-paragraph-1_1180 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 71.35%;
  bottom: 25.48%;
}
.Pixso-paragraph-1_1181 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
          line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.23%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 20.77%;
  bottom: 75%;
}
.Pixso-paragraph-1_1182 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.22%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 35.84%;
  bottom: 59.94%;
}
.Pixso-paragraph-1_1183 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.23%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 50.9%;
  bottom: 44.87%;
}
.Pixso-paragraph-1_1184 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 2.11%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 67.02%;
  bottom: 30.87%;
}
.Pixso-vector-1_1261 {
  width: 18.38%;
  height: 8.61%;
  background-image: url(@/assets/images/Vector_1_1261.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 18.13%;
  bottom: 73.26%;
}
.Pixso-vector-1_1262 {
  width: 18.38%;
  height: 6.08%;
  background-image: url(@/assets/images/Vector_1_1262.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 26.74%;
  bottom: 67.18%;
}
.Pixso-vector-1_1263 {
  width: 18.38%;
  height: 6.07%;
  background-image: url(@/assets/images/Vector_1_1263.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 32.88%;
  bottom: 61.05%;
}
.Pixso-vector-1_1264 {
  width: 18.38%;
  height: 6.07%;
  background-image: url(@/assets/images/Vector_1_1264.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 39.01%;
  bottom: 54.92%;
}
.Pixso-vector-1_1265 {
  width: 18.38%;
  height: 6.08%;
  background-image: url(@/assets/images/Vector_1_1265.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 45.14%;
  bottom: 48.78%;
}
.Pixso-vector-1_1266 {
  width: 18.38%;
  height: 31.02%;
  background-image: url(@/assets/images/Vector_1_1266.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 51.27%;
  bottom: 17.71%;
}
.Pixso-paragraph-1_1267 {
  font-size: 75px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 75px;
  color: rgba(188, 211, 255, 1);
  width: 14.01%;
  height: 3.96%;
  position: absolute;
  left: 10.05%;
  right: 75.94%;
  top: 20.56%;
  bottom: 75.48%;
  opacity: 0.5;
}
.Pixso-paragraph-1_1268 {
  font-size: 50px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 11.2%;
  right: 78.54%;
  top: 20.24%;
  bottom: 77.11%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1269 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: auto;
  height: auto;
  position: absolute;
  left: 8.75%;
  right: 79.58%;
  top: 29.18%;
  bottom: 69.77%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1270 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 4.48%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 86.77%;
  top: 35.36%;
  bottom: 63.58%;
}
.Pixso-paragraph-1_1271 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 4.22%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 87.03%;
  top: 41.49%;
  bottom: 57.45%;
}
.Pixso-paragraph-1_1272 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 6.3%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 84.95%;
  top: 47.62%;
  bottom: 51.32%;
}
.Pixso-vector-1_1273 {
  width: 0.2%;
  height: 1.22%;
  background-image: url(@/assets/images/Vector_1_1273.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.07%;
  right: 91.75%;
  top: 29.12%;
  bottom: 69.66%;
}
.Pixso-vector-1_1274 {
  width: 2.14%;
  height: 2.23%;
  background-image: url(@/assets/images/Boolean_operation_1_1274.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.07%;
  right: 89.79%;
  top: 20.45%;
  bottom: 77.32%;
}
.Pixso-group-6_246 {
  width: 35.89%;
  height: 2.22%;
  position: absolute;
  left: 58.59%;
  right: 5.52%;
  top: 79.33%;
  bottom: 18.45%;
}
.Pixso-vector-6_247 {
  width: 87.37%;
  height: 100%;
  background-image: url(@/assets/images/Vector_6_247.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 12.63%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-6_321 {
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
.Pixso-group-33_165 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1476px;
  top: 90px;
}
.Pixso-vector-33_166 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_166.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_167 {
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
.Pixso-vector-33_168 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_168.png);
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
</style>
