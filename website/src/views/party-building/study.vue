<template>
    <div ref="scrollContainerRef" class="scroll-container-1_1666">
        <div id="1_1666" ref="frameRef" class="Pixso-frame-1_1666">
            <div id="1_1667" class="Pixso-vector-1_1667"></div>
            <div id="1_1668" class="Pixso-vector-1_1668"></div>
            <div id="1_1671" class="Pixso-vector-1_1671"></div>
            <p id="1_1674" class="Pixso-paragraph-1_1674">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_1675" class="Pixso-paragraph-1_1675">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_1684" class="Pixso-vector-1_1684"></div>
            <router-link to="/" id="17_10" class="Pixso-vector-17_10" style="cursor: pointer;"></router-link>
            <div id="1_1690" class="Pixso-vector-1_1690"></div>
            <p id="1_1704" class="Pixso-paragraph-1_1704">
                {{ "当前位置：首页 > 党建专栏> 党员学“习”" }}
            </p>
            <!-- 动态文章列表 -->
            <template v-if="paginatedStudy.length > 0">
                <!-- 第一条 -->
                <div v-if="paginatedStudy[0]" id="1_1705" class="Pixso-vector-1_1705" @click="goToDetail(paginatedStudy[0].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedStudy[0]" id="1_1709" class="Pixso-vector-1_1709"></div>
                <p v-if="paginatedStudy[0]" id="1_1710" class="Pixso-paragraph-1_1710">{{ formatDate(paginatedStudy[0].publishDate).year }}</p>
                <p v-if="paginatedStudy[0]" id="1_1711" class="Pixso-paragraph-1_1711">{{ formatDate(paginatedStudy[0].publishDate).day }}</p>
                <p v-if="paginatedStudy[0]" id="1_1725" class="Pixso-paragraph-1_1725" @click="goToDetail(paginatedStudy[0].id)" style="cursor: pointer;">{{ paginatedStudy[0].title }}</p>
                <p v-if="paginatedStudy[0]" id="1_1721" class="Pixso-paragraph-1_1721">{{ paginatedStudy[0].summary }}</p>

                <!-- 第二条 -->
                <div v-if="paginatedStudy[1]" id="1_1706" class="Pixso-vector-1_1706" @click="goToDetail(paginatedStudy[1].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedStudy[1]" id="1_1712" class="Pixso-vector-1_1712"></div>
                <p v-if="paginatedStudy[1]" id="1_1713" class="Pixso-paragraph-1_1713">{{ formatDate(paginatedStudy[1].publishDate).year }}</p>
                <p v-if="paginatedStudy[1]" id="1_1714" class="Pixso-paragraph-1_1714">{{ formatDate(paginatedStudy[1].publishDate).day }}</p>
                <p v-if="paginatedStudy[1]" id="1_1726" class="Pixso-paragraph-1_1726" @click="goToDetail(paginatedStudy[1].id)" style="cursor: pointer;">{{ paginatedStudy[1].title }}</p>
                <p v-if="paginatedStudy[1]" id="1_1722" class="Pixso-paragraph-1_1722">{{ paginatedStudy[1].summary }}</p>

                <!-- 第三条 -->
                <div v-if="paginatedStudy[2]" id="1_1707" class="Pixso-vector-1_1707" @click="goToDetail(paginatedStudy[2].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedStudy[2]" id="1_1715" class="Pixso-vector-1_1715"></div>
                <p v-if="paginatedStudy[2]" id="1_1716" class="Pixso-paragraph-1_1716">{{ formatDate(paginatedStudy[2].publishDate).year }}</p>
                <p v-if="paginatedStudy[2]" id="1_1717" class="Pixso-paragraph-1_1717">{{ formatDate(paginatedStudy[2].publishDate).day }}</p>
                <p v-if="paginatedStudy[2]" id="1_1727" class="Pixso-paragraph-1_1727" @click="goToDetail(paginatedStudy[2].id)" style="cursor: pointer;">{{ paginatedStudy[2].title }}</p>
                <p v-if="paginatedStudy[2]" id="1_1723" class="Pixso-paragraph-1_1723">{{ paginatedStudy[2].summary }}</p>

                <!-- 第四条 -->
                <div v-if="paginatedStudy[3]" id="1_1708" class="Pixso-vector-1_1708" @click="goToDetail(paginatedStudy[3].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedStudy[3]" id="1_1718" class="Pixso-vector-1_1718"></div>
                <p v-if="paginatedStudy[3]" id="1_1719" class="Pixso-paragraph-1_1719">{{ formatDate(paginatedStudy[3].publishDate).year }}</p>
                <p v-if="paginatedStudy[3]" id="1_1720" class="Pixso-paragraph-1_1720">{{ formatDate(paginatedStudy[3].publishDate).day }}</p>
                <p v-if="paginatedStudy[3]" id="1_1728" class="Pixso-paragraph-1_1728" @click="goToDetail(paginatedStudy[3].id)" style="cursor: pointer;">{{ paginatedStudy[3].title }}</p>
                <p v-if="paginatedStudy[3]" id="1_1724" class="Pixso-paragraph-1_1724">{{ paginatedStudy[3].summary }}</p>
            </template>
            <template v-else>
                <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">暂无数据</div>
            </template>
            <div id="1_1805" class="Pixso-vector-1_1805"></div>
            <div id="1_1806" class="Pixso-vector-1_1806"></div>
            <div id="1_1807" class="Pixso-vector-1_1807"></div>
            <p id="1_1808" class="Pixso-paragraph-1_1808">{{ "PBCOL" }}</p>
            <p id="1_1809" class="Pixso-paragraph-1_1809">{{ "党建专栏" }}</p>
            <router-link id="1_1810" to="/party-building/team-work" class="Pixso-paragraph-1_1810 party-sidebar-link">{{ "团建工作" }}</router-link>
            <div id="1_1811" class="Pixso-vector-1_1811"></div>
            <router-link id="1_1812" to="/party-building/party-work" class="Pixso-paragraph-1_1812 party-sidebar-link">{{ "党建工作" }}</router-link>
            <div id="1_1813" class="Pixso-vector-1_1813"></div>
            <router-link id="1_1814" to="/party-building/study" class="Pixso-paragraph-1_1814 party-sidebar-link">
                党员学"习"                        >
            </router-link>
            <div id="1_1815" class="Pixso-vector-1_1815"></div>
            <div id="1_1816" class="Pixso-vector-1_1816"></div>
            <router-link id="1_1817" to="/party-building/members" class="Pixso-paragraph-1_1817 party-sidebar-link">{{ "党员先锋" }}</router-link>
            <div v-if="paginatedStudy[0]" id="1_1818" class="Pixso-vector-1_1818"></div>
            <div v-if="paginatedStudy[1]" id="1_1821" class="Pixso-vector-1_1821"></div>
            <div v-if="paginatedStudy[2]" id="1_1824" class="Pixso-vector-1_1824"></div>
            <div v-if="paginatedStudy[3]" id="1_1827" class="Pixso-vector-1_1827"></div>
            <div id="1_1830" class="Pixso-vector-1_1830"></div>
            <!-- 分页组件 -->
            <div style="position: absolute; right: 5.52%; top: 79.33%; height: 2.22%;">
                <Pagination
                    :total="totalStudy"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[4, 8, 12]"
                    @page-change="handlePageChange"
                />
            </div>
            <div id="33_192" class="Pixso-group-33_192" @click.stop>
            <div id="33_193" class="Pixso-vector-33_193"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_195"
                class="Pixso-vector-33_195"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <div id="33_515" class="Pixso-vector-33_515"></div>
            <router-link to="/overview-info" id="33_516" class="Pixso-paragraph-33_516">概况信息</router-link>
            <router-link to="/team-building" id="33_517" class="Pixso-paragraph-33_517">队伍建设</router-link>
            <router-link to="/info-public" id="33_518" class="Pixso-paragraph-33_518">信息公开</router-link>
            <router-link to="/dynamic-news" id="33_519" class="Pixso-paragraph-33_519">动态要闻</router-link>
            <router-link to="/policy-regulations" id="33_520" class="Pixso-paragraph-33_520">政策法规</router-link>
            <router-link to="/query-system" id="33_521" class="Pixso-paragraph-33_521">查询系统</router-link>
            <router-link to="/party-building" id="33_522" class="Pixso-paragraph-33_522">党建专栏</router-link>

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
import { ref, computed, onMounted } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { getStudyMaterials } from '@/api/party-building'
import { useRouter } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1892)
const router = useRouter()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(4)

const studyList = ref<any[]>([])
const totalStudy = ref(0)

// 计算当前页显示的数据
const paginatedStudy = computed(() => {
  return studyList.value
})

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return { year: '', day: '' }
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return { year: '', day: '' }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return {
    year: `${year}-${month}`,
    day
  }
}

// 页码改变处理
function handlePageChange() {
  fetchStudy()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到详情页
function goToDetail(id: number) {
  router.push(`/party-building/study/${id}`)
}

async function fetchStudy() {
  try {
    const res = await getStudyMaterials({ page: currentPage.value, pageSize: pageSize.value })
    const list = res.data?.list || res.data?.items || []
    studyList.value = list.map((item: any) => ({
      id: item.id,
      title: item.title || '',
      summary: item.summary || item.content?.replace(/<[^>]*>/g, '').slice(0, 120) || '',
      publishDate: item.publishDate || item.createdAt || ''
    }))
    totalStudy.value = res.data?.total || 0
  } catch (error) {
    console.error('获取党员学习失败:', error)
    studyList.value = []
    totalStudy.value = 0
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
  fetchStudy()
  fetchWebsiteConfig()
})

</script>
<style>
.scroll-container-1_1666 {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.Pixso-frame-1_1666 {
    width: 1920px;
    height: 1892px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1667 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_1667.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_1668 {
    width: 100%;
    height: 10.25%;
    background-image: url(@/assets/images/Vector_1_1668.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 89.75%;
}
.Pixso-vector-1_1671 {
    width: 6.72%;
    height: 6.82%;
    background-image: url(@/assets/images/Vector_1_1671.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.74%;
    bottom: 91.44%;
}
.Pixso-paragraph-1_1674 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 2.8%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.07%;
    bottom: 94.13%;
}
.Pixso-paragraph-1_1675 {
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
.Pixso-vector-1_1684 {
    width: 100%;
    height: 3.7%;
    background-image: url(@/assets/images/Vector_1_1684.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 10.25%;
    bottom: 86.05%;
}
.Pixso-vector-17_10 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_10.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_1704 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 74.74%;
    top: 15.59%;
    bottom: 83.35%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1705 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1705.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 18.18%;
    bottom: 68.08%;
}
.Pixso-vector-1_1706 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1706.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 33.25%;
    bottom: 53.01%;
}
.Pixso-vector-1_1707 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1707.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 48.31%;
    bottom: 37.95%;
}
.Pixso-vector-1_1708 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1708.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 63.37%;
    bottom: 22.89%;
}
.Pixso-vector-1_1709 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1709.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 21.83%;
    bottom: 71.67%;
}
.Pixso-paragraph-1_1710 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 4.79%;
    height: 1.06%;
    position: absolute;
    left: 48.8%;
    right: 46.41%;
    top: 25.9%;
    bottom: 73.04%;
}
.Pixso-paragraph-1_1711 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4%;
    height: 2.65%;
    position: absolute;
    left: 50.05%;
    right: 47.66%;
    top: 23.2%;
    bottom: 74.15%;
    text-align: center;
    white-space: nowrap;
}
.Pixso-vector-1_1712 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1712.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 36.89%;
    bottom: 56.61%;
}
.Pixso-paragraph-1_1713 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 4.79%;
    height: 1.06%;
    position: absolute;
    left: 48.8%;
    right: 46.41%;
    top: 40.96%;
    bottom: 57.98%;
}
.Pixso-paragraph-1_1714 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4%;
    height: 2.64%;
    position: absolute;
    left: 50.05%;
    right: 47.66%;
    top: 38.27%;
    bottom: 59.09%;
    text-align: center;
    white-space: nowrap;
}
.Pixso-vector-1_1715 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1715.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 51.96%;
    bottom: 41.54%;
}
.Pixso-paragraph-1_1716 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 4.79%;
    height: 1.05%;
    position: absolute;
    left: 48.8%;
    right: 46.41%;
    top: 56.03%;
    bottom: 42.92%;
}
.Pixso-paragraph-1_1717 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4%;
    height: 2.64%;
    position: absolute;
    left: 50.05%;
    right: 47.66%;
    top: 53.33%;
    bottom: 44.03%;
    text-align: center;
    white-space: nowrap;
}
.Pixso-vector-1_1718 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1718.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 67.02%;
    bottom: 26.48%;
}
.Pixso-paragraph-1_1719 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 4.79%;
    height: 1.06%;
    position: absolute;
    left: 48.8%;
    right: 46.41%;
    top: 71.09%;
    bottom: 27.85%;
}
.Pixso-paragraph-1_1720 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4%;
    height: 2.65%;
    position: absolute;
    left: 50.05%;
    right: 47.66%;
    top: 68.39%;
    bottom: 28.96%;
    text-align: center;
    white-space: nowrap;
}
.Pixso-paragraph-1_1721 {
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
.Pixso-paragraph-1_1722 {
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
.Pixso-paragraph-1_1723 {
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
.Pixso-paragraph-1_1724 {
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
.Pixso-paragraph-1_1725 {
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
.Pixso-paragraph-1_1726 {
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
.Pixso-paragraph-1_1727 {
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
.Pixso-paragraph-1_1728 {
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
.Pixso-vector-1_1805 {
    width: 18.38%;
    height: 8.61%;
    background-image: url(@/assets/images/Vector_1_1805.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 18.13%;
    bottom: 73.26%;
}
.Pixso-vector-1_1806 {
    width: 18.38%;
    height: 6.07%;
    background-image: url(@/assets/images/Vector_1_1806.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 32.88%;
    bottom: 61.05%;
}
.Pixso-vector-1_1807 {
    width: 18.38%;
    height: 31.50%;
    background-image: url(@/assets/images/Vector_1_1807.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 51.27%;
    bottom: 17.71%;
}
.Pixso-paragraph-1_1808 {
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
.Pixso-paragraph-1_1809 {
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
.Pixso-paragraph-1_1810 {
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
    top: 35.36%;
    bottom: 63.58%;
}
.Pixso-vector-1_1811 {
    width: 18.38%;
    height: 6.08%;
    background-image: url(@/assets/images/Vector_1_1811.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 26.74%;
    bottom: 67.18%;
}
.Pixso-paragraph-1_1812 {
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
    top: 29.23%;
    bottom: 69.71%;
}
.Pixso-vector-1_1813 {
    width: 18.38%;
    height: 6.08%;
    background-image: url(@/assets/images/Vector_1_1813.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 45.14%;
    bottom: 48.78%;
}
.Pixso-paragraph-1_1814 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.67%;
    height: 1.06%;
    position: absolute;
    left: 8.75%;
    right: 79.58%;
    top: 47.57%;
    bottom: 51.37%;
}
.Pixso-vector-1_1815 {
    width: 0.2%;
    height: 1.21%;
    background-image: url(@/assets/images/Vector_1_1815.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.07%;
    right: 91.88%;
    top: 47.52%;
    bottom: 51.27%;
}
.Pixso-vector-1_1816 {
    width: 18.38%;
    height: 6.07%;
    background-image: url(@/assets/images/Vector_1_1816.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 39.01%;
    bottom: 54.92%;
}
.Pixso-paragraph-1_1817 {
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
.Pixso-vector-1_1818 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1818.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 51.77%;
    top: 18.13%;
    bottom: 68.13%;
}
.Pixso-vector-1_1821 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1821.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 51.77%;
    top: 33.25%;
    bottom: 53.01%;
}
.Pixso-vector-1_1824 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1824.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 51.77%;
    top: 48.26%;
    bottom: 38%;
}
.Pixso-vector-1_1827 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1827.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 51.77%;
    top: 63.37%;
    bottom: 22.89%;
}
.Pixso-vector-1_1830 {
    width: 2.13%;
    height: 2.23%;
    background-image: url(@/assets/images/Boolean_operation_1_1830.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.92%;
    right: 89.95%;
    top: 20.45%;
    bottom: 77.32%;
}
.Pixso-group-6_18 {
    width: 35.89%;
    height: 2.22%;
    position: absolute;
    left: 58.59%;
    right: 5.52%;
    top: 79.33%;
    bottom: 18.45%;
}
.Pixso-vector-6_19 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_19.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_93 {
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
.Pixso-group-33_192 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1476px;
    top: 90px;
}
.Pixso-vector-33_193 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_193.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_194 {
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
.Pixso-vector-33_195 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_195.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-vector-33_515 {
    width: 10.62%;
    height: 3.7%;
    background-image: url(@/assets/images/Vector_33_515.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 34.95%;
    right: 54.43%;
    top: 10.25%;
    bottom: 86.05%;
}
.Pixso-paragraph-33_516 {
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
.Pixso-paragraph-33_517 {
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
.Pixso-paragraph-33_518 {
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
.Pixso-paragraph-33_519 {
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
.Pixso-paragraph-33_520 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 69.58%;
    right: 26.25%;
    top: 11.47%;
    bottom: 87.21%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_521 {
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
    top: 11.47%;
    bottom: 87.21%;
    transform: translateX(calc(-50% + 624px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_522 {
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
    background-image: url(@/assets/images/Vector_1_113.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 85%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1665px;
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
