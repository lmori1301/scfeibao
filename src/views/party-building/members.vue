<template>
    <div class="scroll-container-1_1494">
        <div id="1_1494" class="Pixso-frame-1_1494">
            <div id="1_1495" class="Pixso-vector-1_1495"></div>
            <div id="1_1496" class="Pixso-vector-1_1496"></div>
            <div id="1_1499" class="Pixso-vector-1_1499"></div>
            <p id="1_1502" class="Pixso-paragraph-1_1502">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_1503" class="Pixso-paragraph-1_1503">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_1512" class="Pixso-vector-1_1512"></div>
            <div id="1_1513" class="Pixso-vector-1_1513"></div>
            <router-link to="/" id="17_9" class="Pixso-vector-17_9" style="cursor: pointer;"></router-link>
            <div id="1_1518" class="Pixso-vector-1_1518"></div>
            <router-link to="/overview-info" id="1_1525" class="Pixso-paragraph-1_1525 main-nav-link">概况信息</router-link>
            <router-link to="/team-building" id="1_1526" class="Pixso-paragraph-1_1526 main-nav-link">队伍建设</router-link>
            <router-link to="/party-building" id="1_1531" class="Pixso-paragraph-1_1531 main-nav-link">党建专栏</router-link>
            <router-link to="/info-public" id="1_1527" class="Pixso-paragraph-1_1527 main-nav-link">信息公开</router-link>
            <router-link to="/dynamic-news" id="1_1528" class="Pixso-paragraph-1_1528 main-nav-link">动态要闻</router-link>
            <router-link to="/policy-regulations" id="1_1529" class="Pixso-paragraph-1_1529 main-nav-link">政策法规</router-link>
            <router-link to="/query-system" id="1_1530" class="Pixso-paragraph-1_1530 main-nav-link">查询系统</router-link>
            <p id="1_1532" class="Pixso-paragraph-1_1532">
                {{ "当前位置：首页 > 党建专栏> 党员先锋" }}
            </p>
            <!-- 动态文章列表 -->
            <template v-if="paginatedMembers.length > 0">
                <!-- 第一条 -->
                <div v-if="paginatedMembers[0]" id="1_1533" class="Pixso-vector-1_1533" @click="goToDetail(paginatedMembers[0].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedMembers[0]" id="1_1545" class="Pixso-vector-1_1545"></div>
                <p v-if="paginatedMembers[0]" id="6_736" class="Pixso-paragraph-6_736">{{ formatDate(paginatedMembers[0].publishDate).year }}</p>
                <p v-if="paginatedMembers[0]" id="6_737" class="Pixso-paragraph-6_737">{{ formatDate(paginatedMembers[0].publishDate).day }}</p>
                <p v-if="paginatedMembers[0]" id="1_1567" class="Pixso-paragraph-1_1567" @click="goToDetail(paginatedMembers[0].id)" style="cursor: pointer;">{{ paginatedMembers[0].title }}</p>
                <p v-if="paginatedMembers[0]" id="1_1563" class="Pixso-paragraph-1_1563">{{ paginatedMembers[0].summary }}</p>

                <!-- 第二条 -->
                <div v-if="paginatedMembers[1]" id="1_1536" class="Pixso-vector-1_1536" @click="goToDetail(paginatedMembers[1].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedMembers[1]" id="1_1546" class="Pixso-vector-1_1546"></div>
                <p v-if="paginatedMembers[1]" id="1_1555" class="Pixso-paragraph-1_1555">{{ formatDate(paginatedMembers[1].publishDate).year }}</p>
                <p v-if="paginatedMembers[1]" id="1_1556" class="Pixso-paragraph-1_1556">{{ formatDate(paginatedMembers[1].publishDate).day }}</p>
                <p v-if="paginatedMembers[1]" id="1_1568" class="Pixso-paragraph-1_1568" @click="goToDetail(paginatedMembers[1].id)" style="cursor: pointer;">{{ paginatedMembers[1].title }}</p>
                <p v-if="paginatedMembers[1]" id="1_1564" class="Pixso-paragraph-1_1564">{{ paginatedMembers[1].summary }}</p>

                <!-- 第三条 -->
                <div v-if="paginatedMembers[2]" id="1_1539" class="Pixso-vector-1_1539" @click="goToDetail(paginatedMembers[2].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedMembers[2]" id="1_1547" class="Pixso-vector-1_1547"></div>
                <p v-if="paginatedMembers[2]" id="1_1558" class="Pixso-paragraph-1_1558">{{ formatDate(paginatedMembers[2].publishDate).year }}</p>
                <p v-if="paginatedMembers[2]" id="1_1559" class="Pixso-paragraph-1_1559">{{ formatDate(paginatedMembers[2].publishDate).day }}</p>
                <p v-if="paginatedMembers[2]" id="1_1569" class="Pixso-paragraph-1_1569" @click="goToDetail(paginatedMembers[2].id)" style="cursor: pointer;">{{ paginatedMembers[2].title }}</p>
                <p v-if="paginatedMembers[2]" id="1_1565" class="Pixso-paragraph-1_1565">{{ paginatedMembers[2].summary }}</p>

                <!-- 第四条 -->
                <div v-if="paginatedMembers[3]" id="1_1542" class="Pixso-vector-1_1542" @click="goToDetail(paginatedMembers[3].id)" style="cursor: pointer;"></div>
                <div v-if="paginatedMembers[3]" id="1_1548" class="Pixso-vector-1_1548"></div>
                <p v-if="paginatedMembers[3]" id="1_1561" class="Pixso-paragraph-1_1561">{{ formatDate(paginatedMembers[3].publishDate).year }}</p>
                <p v-if="paginatedMembers[3]" id="1_1562" class="Pixso-paragraph-1_1562">{{ formatDate(paginatedMembers[3].publishDate).day }}</p>
                <p v-if="paginatedMembers[3]" id="1_1570" class="Pixso-paragraph-1_1570" @click="goToDetail(paginatedMembers[3].id)" style="cursor: pointer;">{{ paginatedMembers[3].title }}</p>
                <p v-if="paginatedMembers[3]" id="1_1566" class="Pixso-paragraph-1_1566">{{ paginatedMembers[3].summary }}</p>
            </template>
            <template v-else>
                <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">暂无数据</div>
            </template>
            <div id="1_1647" class="Pixso-vector-1_1647"></div>
            <div id="1_1648" class="Pixso-vector-1_1648"></div>
            <div id="1_1649" class="Pixso-vector-1_1649"></div>
            <div id="1_1650" class="Pixso-vector-1_1650"></div>
            <p id="1_1651" class="Pixso-paragraph-1_1651">{{ "PBCOL" }}</p>
            <p id="1_1652" class="Pixso-paragraph-1_1652">{{ "党建专栏" }}</p>
            <router-link id="1_1653" to="/party-building/team-work" class="Pixso-paragraph-1_1653 party-sidebar-link">{{ "团建工作" }}</router-link>
            <router-link id="1_1654" to="/party-building/study" class="Pixso-paragraph-1_1654 party-sidebar-link">党员学"习"</router-link>
            <div id="1_1655" class="Pixso-vector-1_1655"></div>
            <router-link id="1_1656" to="/party-building/party-work" class="Pixso-paragraph-1_1656 party-sidebar-link">{{ "党建工作" }}</router-link>
            <div id="1_1657" class="Pixso-vector-1_1657"></div>
            <router-link id="1_1658" to="/party-building/members" class="Pixso-paragraph-1_1658 party-sidebar-link">
                {{ "党员先锋                          >" }}
            </router-link>
            <div id="1_1659" class="Pixso-vector-1_1659"></div>
            <div id="1_1660" class="Pixso-vector-1_1660"></div>
            <div id="33_183" class="Pixso-group-33_183" @click.stop>
            <div id="33_184" class="Pixso-vector-33_184"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_186"
                class="Pixso-vector-33_186"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <!-- 分页组件 -->
            <div style="position: absolute; right: 5.52%; top: 79.33%; height: 2.22%;">
                <Pagination
                    :total="totalMembers"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[4, 8, 12]"
                    @page-change="handlePageChange"
                />
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
import { ref, computed, onMounted } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { useRouter } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(4)

// 党员先锋数据
const membersList = ref([
  {
    id: 1,
    title: '优秀党员：张明 - 冲锋在前的救援先锋',
    summary: '张明同志在多次重大救援任务中表现突出，始终冲锋在前，用实际行动践行共产党员的初心使命...',
    publishDate: '2025-12-06'
  },
  {
    id: 2,
    title: '模范党员：李华 - 技术攻关的带头人',
    summary: '李华同志在救援技术研究方面成果显著，带领团队攻克多项技术难题，为救援工作提供有力支撑...',
    publishDate: '2025-12-06'
  },
  {
    id: 3,
    title: '先进党员：王强 - 无私奉献的志愿者',
    summary: '王强同志长期参与志愿服务活动，用爱心和行动温暖他人，展现了共产党员的良好形象...',
    publishDate: '2025-12-06'
  },
  {
    id: 4,
    title: '优秀党员：刘芳 - 细致入微的后勤保障',
    summary: '刘芳同志在后勤保障工作中兢兢业业，确保每次救援任务的顺利进行，是队伍的坚强后盾...',
    publishDate: '2025-12-06'
  },
  {
    id: 5,
    title: '党员标兵：陈军 - 勇于担当的队长',
    summary: '陈军同志作为救援队队长，带领团队完成多次艰巨任务，展现了优秀的领导能力和担当精神...',
    publishDate: '2025-11-28'
  },
  {
    id: 6,
    title: '先进个人：赵敏 - 医疗救护的专家',
    summary: '赵敏同志在医疗救护方面经验丰富，多次在关键时刻挽救伤员生命，是队伍的医疗骨干...',
    publishDate: '2025-11-20'
  },
  {
    id: 7,
    title: '优秀党员：孙伟 - 装备维护的能手',
    summary: '孙伟同志负责救援装备的维护保养，确保装备始终处于最佳状态，为救援工作提供装备保障...',
    publishDate: '2025-11-15'
  },
  {
    id: 8,
    title: '模范党员：周丽 - 宣传工作的排头兵',
    summary: '周丽同志在宣传工作中表现出色，通过多种渠道传播正能量，提升了救援队的社会影响力...',
    publishDate: '2025-11-10'
  },
  {
    id: 9,
    title: '先进党员：吴涛 - 培训教育的专家',
    summary: '吴涛同志负责队员培训工作，设计科学的培训课程，不断提升队员的专业技能和综合素质...',
    publishDate: '2025-11-05'
  },
  {
    id: 10,
    title: '优秀党员：郑红 - 协调沟通的桥梁',
    summary: '郑红同志在对外协调工作中表现突出，建立了良好的合作关系，为救援工作创造有利条件...',
    publishDate: '2025-10-30'
  },
  {
    id: 11,
    title: '党员楷模：黄勇 - 应急响应的快手',
    summary: '黄勇同志在应急响应方面反应迅速，多次第一时间赶赴现场，为救援争取了宝贵时间...',
    publishDate: '2025-10-25'
  },
  {
    id: 12,
    title: '先进个人：林静 - 心理疏导的专家',
    summary: '林静同志在心理疏导方面经验丰富，帮助受灾群众和队员缓解心理压力，维护心理健康...',
    publishDate: '2025-10-20'
  }
])

// 计算总数
const totalMembers = computed(() => membersList.value.length)

// 计算当前页显示的数据
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return membersList.value.slice(start, end)
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

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到详情页
function goToDetail(id: number) {
  router.push(`/party-building/members/${id}`)
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
  host_unit: '四川飞豹救援',
  organizer_unit: '四川飞豹救援新闻宣传处',
  icp_number: '蜀ICP备XXXXXXX号',
  copyright: 'Copyright®2025 sc.feibao.com All rights reserved'
})

const fetchWebsiteConfig = async () => {
  try {
    const res = await getWebsiteConfig()
    if (res.data) {
      websiteConfig.value = {
        host_unit: res.data.host_unit || '四川飞豹救援',
        organizer_unit: res.data.organizer_unit || '四川飞豹救援新闻宣传处',
        icp_number: res.data.icp_number || '蜀ICP备XXXXXXX号',
        copyright: res.data.copyright || 'Copyright®2025 sc.feibao.com All rights reserved'
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
.scroll-container-1_1494 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_1494 {
    width: 1920px;
    height: 1892px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1495 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_1495.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_1496 {
    width: 100%;
    height: 10.25%;
    background-image: url(@/assets/images/Vector_1_1496.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 89.75%;
}
.Pixso-vector-1_1499 {
    width: 6.72%;
    height: 6.82%;
    background-image: url(@/assets/images/Vector_1_1499.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.74%;
    bottom: 91.44%;
}
.Pixso-paragraph-1_1502 {
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
.Pixso-paragraph-1_1503 {
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
.Pixso-vector-1_1512 {
    width: 100%;
    height: 3.7%;
    background-image: url(@/assets/images/Vector_1_1512.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 10.25%;
    bottom: 86.05%;
}
.Pixso-vector-1_1513 {
    width: 10.62%;
    height: 3.7%;
    background-image: url(@/assets/images/Vector_1_1513.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 34.95%;
    right: 54.43%;
    top: 10.25%;
    bottom: 86.05%;
}
.Pixso-vector-17_9 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_9.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_1525 {
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
.Pixso-paragraph-1_1526 {
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
.Pixso-paragraph-1_1527 {
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
.Pixso-paragraph-1_1528 {
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
.Pixso-paragraph-1_1529 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
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
.Pixso-paragraph-1_1530 {
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
.Pixso-paragraph-1_1531 {
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
.Pixso-paragraph-1_1532 {
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
.Pixso-vector-1_1533 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1533.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 51.82%;
    top: 18.18%;
    bottom: 68.08%;
}
.Pixso-vector-1_1536 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1536.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 51.82%;
    top: 33.25%;
    bottom: 53.01%;
}
.Pixso-vector-1_1539 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1539.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 51.82%;
    top: 48.31%;
    bottom: 37.95%;
}
.Pixso-vector-1_1542 {
    width: 22.03%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1542.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 51.82%;
    top: 63.37%;
    bottom: 22.89%;
}
.Pixso-vector-1_1545 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1545.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 18.18%;
    bottom: 68.08%;
}
.Pixso-vector-1_1546 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1546.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 33.25%;
    bottom: 53.01%;
}
.Pixso-vector-1_1547 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1547.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 48.31%;
    bottom: 37.95%;
}
.Pixso-vector-1_1548 {
    width: 46.25%;
    height: 13.74%;
    background-image: url(@/assets/images/Vector_1_1548.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.23%;
    right: 5.52%;
    top: 63.37%;
    bottom: 22.89%;
}
.Pixso-vector-1_1549 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1549.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 21.83%;
    bottom: 71.67%;
}
.Pixso-vector-1_1554 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1554.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 36.89%;
    bottom: 56.61%;
}
.Pixso-paragraph-1_1555 {
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
.Pixso-paragraph-6_736 {
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
    top: 25.85%;
    bottom: 73.1%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1556 {
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
.Pixso-paragraph-6_737 {
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
    top: 23.15%;
    bottom: 74.21%;
}
.Pixso-vector-1_1557 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1557.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 51.96%;
    bottom: 41.54%;
}
.Pixso-paragraph-1_1558 {
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
.Pixso-paragraph-1_1559 {
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
.Pixso-vector-1_1560 {
    width: 0%;
    height: 6.5%;
    background-image: url(@/assets/images/Vector_1_1560.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.43%;
    right: 45.57%;
    top: 67.02%;
    bottom: 26.48%;
}
.Pixso-paragraph-1_1561 {
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
.Pixso-paragraph-1_1562 {
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
.Pixso-paragraph-1_1563 {
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
.Pixso-paragraph-1_1564 {
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
.Pixso-paragraph-1_1565 {
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
.Pixso-paragraph-1_1566 {
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
    top: 71.46%;
    bottom: 25.37%;
}
.Pixso-paragraph-1_1567 {
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
.Pixso-paragraph-1_1568 {
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
.Pixso-paragraph-1_1569 {
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
.Pixso-paragraph-1_1570 {
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
    top: 66.44%;
    bottom: 29.33%;
}
.Pixso-vector-1_1647 {
    width: 18.38%;
    height: 8.61%;
    background-image: url(@/assets/images/Vector_1_1647.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 18.13%;
    bottom: 73.26%;
}
.Pixso-vector-1_1648 {
    width: 18.38%;
    height: 6.07%;
    background-image: url(@/assets/images/Vector_1_1648.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 32.88%;
    bottom: 61.05%;
}
.Pixso-vector-1_1649 {
    width: 18.38%;
    height: 6.08%;
    background-image: url(@/assets/images/Vector_1_1649.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 45.14%;
    bottom: 48.78%;
}
.Pixso-vector-1_1650 {
    width: 18.38%;
    height: 31.02%;
    background-image: url(@/assets/images/Vector_1_1650.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 51.27%;
    bottom: 17.71%;
}
.Pixso-paragraph-1_1651 {
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
.Pixso-paragraph-1_1652 {
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
.Pixso-paragraph-1_1653 {
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
.Pixso-paragraph-1_1654 {
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
.Pixso-vector-1_1655 {
    width: 18.38%;
    height: 6.08%;
    background-image: url(@/assets/images/Vector_1_1655.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 26.74%;
    bottom: 67.18%;
}
.Pixso-paragraph-1_1656 {
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
.Pixso-vector-1_1657 {
    width: 18.38%;
    height: 6.08%;
    background-image: url(@/assets/images/Vector_1_1657.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 39.06%;
    bottom: 54.86%;
}
.Pixso-paragraph-1_1658 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.77%;
    height: 1.06%;
    position: absolute;
    left: 8.75%;
    right: 79.48%;
    top: 41.49%;
    bottom: 57.45%;
}
.Pixso-vector-1_1659 {
    width: 0.2%;
    height: 1.21%;
    background-image: url(@/assets/images/Vector_1_1659.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.07%;
    right: 91.88%;
    top: 41.44%;
    bottom: 57.35%;
}
.Pixso-vector-1_1660 {
    width: 2.13%;
    height: 2.22%;
    background-image: url(@/assets/images/Boolean_operation_1_1660.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.92%;
    right: 89.95%;
    top: 20.51%;
    bottom: 77.27%;
}
.Pixso-group-33_183 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1476px;
    top: 90px;
}
.Pixso-vector-33_184 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_184.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_185 {
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
.Pixso-vector-33_186 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_186.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-group-34_4 {
    width: 35.89%;
    height: 2.22%;
    position: absolute;
    left: 58.54%;
    right: 5.57%;
    top: 79.18%;
    bottom: 18.6%;
}
.Pixso-vector-34_5 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_34_5.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-34_79 {
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
