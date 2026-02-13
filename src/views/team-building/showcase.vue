<template>
    <div class="scroll-container-1_876">
        <div id="1_876" class="Pixso-frame-1_876">
            <div id="1_877" class="Pixso-vector-1_877"></div>
            <div id="1_878" class="Pixso-vector-1_878"></div>
            <div id="1_881" class="Pixso-vector-1_881"></div>
            <p id="1_884" class="Pixso-paragraph-1_884">{{ "四川飞豹救援" }}</p>
            <p id="1_885" class="Pixso-paragraph-1_885">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_893" class="Pixso-vector-1_893"></div>
            <p id="1_896" class="Pixso-paragraph-1_896">
                {{ "主办单位：四川飞豹救援" }}
            </p>
            <p id="1_897" class="Pixso-paragraph-1_897">
                {{ "承办单位：四川飞豹救援新闻宣传处" }}
            </p>
            <p id="1_898" class="Pixso-paragraph-1_898">
                {{ "蜀ICP备XXXXXXX号" }}
            </p>
            <p id="1_899" class="Pixso-paragraph-1_899">
                {{ "Copyright®2025 sc.119.gov.cn All rights reserved" }}
            </p>
            <p id="1_900" class="Pixso-paragraph-1_900">
                当前位置：<router-link to="/" class="team-breadcrumb-link">首页</router-link> > <router-link to="/team-building" class="team-breadcrumb-link">队伍建设</router-link> > <span class="team-breadcrumb-current">队伍风采</span>
            </p>
            <div id="1_901" class="Pixso-vector-1_901"></div>
            <div id="1_908" class="Pixso-vector-1_908"></div>
            <div id="1_909" class="Pixso-vector-1_909"></div>
            <div id="1_910" class="Pixso-vector-1_910"></div>
            <p id="1_911" class="Pixso-paragraph-1_911">{{ "TBDEV" }}</p>
            <p id="1_912" class="Pixso-paragraph-1_912">{{ "队伍建设" }}</p>
            <router-link to="/team-building/about" id="1_913" class="Pixso-paragraph-1_913 team-nav-item">关于队伍</router-link>
            <div id="1_914" class="Pixso-vector-1_914"></div>
            <router-link to="/team-building/showcase" id="1_915" class="Pixso-paragraph-1_915">
                {{ "队伍风采                          >" }}
            </router-link>
            <div id="1_916" class="Pixso-vector-1_916"></div>
            <div id="1_917" class="Pixso-vector-1_917"></div>
            <div id="1_918" class="Pixso-vector-1_918"></div>
            <div id="17_3" class="Pixso-vector-17_3"></div>
            <router-link id="1_923" to="/party-building" class="Pixso-paragraph-1_923 main-nav-link">党建专栏</router-link>
            <router-link id="1_928" to="/overview-info" class="Pixso-paragraph-1_928 main-nav-link">概况信息</router-link>
            <router-link id="1_929" to="/team-building" class="Pixso-paragraph-1_929 main-nav-link">队伍建设</router-link>
            <router-link id="1_924" to="/info-public" class="Pixso-paragraph-1_924 main-nav-link">信息公开</router-link>
            <router-link id="1_925" to="/dynamic-news" class="Pixso-paragraph-1_925 main-nav-link">动态要闻</router-link>
            <router-link id="1_926" to="/policy-regulations" class="Pixso-paragraph-1_926 main-nav-link">政策法规</router-link>
            <router-link id="1_927_query" to="/query-system" class="Pixso-paragraph-1_927 main-nav-link">查询系统</router-link>
            <div id="1_930" class="Pixso-vector-1_930"></div>
            <router-link to="/team-building/cases" id="1_931" class="Pixso-paragraph-1_931 team-nav-item">救援案例</router-link>

            <!-- 左侧大图区域 -->
            <div
                v-for="(item, index) in paginatedShowcaseItems"
                :key="`image_${index}`"
                class="Pixso-vector-1_932 showcase-image showcase-clickable"
                :style="{ backgroundImage: `url(${item.image})`, top: item.imageTop }"
                @click="goToDetail((currentPage - 1) * pageSize + index)"
            ></div>

            <!-- 右侧内容区域 -->
            <template v-for="(item, index) in paginatedShowcaseItems" :key="`content_${index}`">
                <!-- 背景容器 -->
                <div
                    class="Pixso-vector-1_1023 showcase-content-bg showcase-clickable"
                    :style="{ top: item.contentTop }"
                    @click="goToDetail(index)"
                ></div>

                <!-- 日期显示 -->
                <p class="Pixso-paragraph-1_1028 showcase-date-year showcase-clickable" :style="{ top: item.dateYearTop }" @click="goToDetail(index)">
                    {{ item.dateYear }}
                </p>
                <p class="Pixso-paragraph-1_1029 showcase-date-day showcase-clickable" :style="{ top: item.dateDayTop }" @click="goToDetail(index)">
                    {{ item.dateDay }}
                </p>

                <!-- 分隔线 -->
                <div class="Pixso-vector-1_1027 showcase-divider" :style="{ top: item.dividerTop }"></div>

                <!-- 内容摘要 -->
                <p class="Pixso-paragraph-1_1039 showcase-summary showcase-clickable" :style="{ top: item.summaryTop }" @click="goToDetail(index)">
                    {{ item.summary }}
                </p>

                <!-- 标题 -->
                <p class="Pixso-paragraph-1_1043 showcase-title showcase-clickable" :style="{ top: item.titleTop }" @click="goToDetail(index)">
                    {{ item.title }}
                </p>
            </template>

            <!-- 其他内容项的容器(保持原有布局) -->
            <div id="1_1047" class="Pixso-vector-1_1047"></div>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 6.5%; top: 80%; height: 2.2%;">
                <Pagination
                    :total="totalShowcases"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[4, 8, 12]"
                    @page-change="handlePageChange"
                />
            </div>

            <div id="33_138" class="Pixso-group-33_138" @click.stop>
                <div id="33_139" class="Pixso-vector-33_139"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_141"
                    class="Pixso-vector-33_141"
                    style="cursor: pointer"
                    @click="doSearch"
                ></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(4)

function goToAbout() {
    router.push('/team-building/about')
}

function goToCases() {
    router.push('/team-building/cases')
}

function goToDetail(index: number) {
    router.push(`/team-building/showcase/${index}`)
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

// 队伍风采数据
const showcaseItems = ref([
    {
        title: "四川飞豹救援特勤大队",
        dateYear: "2025-12",
        dateDay: "06",
        summary: "认真践行习近平总书记关于党的自我革命的重要思想李炎溪，党的十八大以来，习近平总书记站在事关党的长期...",
        image: new URL('@/assets/images/Vector_1_1011.png', import.meta.url).href,
        imageTop: "18.2%",
        contentTop: "18.2%",
        dateYearTop: "25.97%",
        dateDayTop: "23.26%",
        dividerTop: "21.87%",
        summaryTop: "26.24%",
        titleTop: "21.87%"
    },
    {
        title: "四川飞豹救援峨眉山直属大队",
        dateYear: "2025-12",
        dateDay: "06",
        summary: "28日下午，洪峰再次过境榕江，四川飞豹救援峨眉山大队队员们沿着低洼街巷开展排查，确保居民及时转移……",
        image: new URL('@/assets/images/Vector_1_1014.png', import.meta.url).href,
        imageTop: "33.37%",
        contentTop: "33.37%",
        dateYearTop: "41.14%",
        dateDayTop: "38.42%",
        dividerTop: "37.04%",
        summaryTop: "41.41%",
        titleTop: "37.04%"
    },
    {
        title: "四川飞豹救援搜救犬大队",
        dateYear: "2025-12",
        dateDay: "06",
        summary: '搜救犬穿梭 嗅闻可能的幸存者 "西岭"一次又一次确认,现场的挖掘救援工作不断开展、深入 这100人和5只搜救犬...',
        image: new URL('@/assets/images/Vector_1_1017.png', import.meta.url).href,
        imageTop: "48.54%",
        contentTop: "48.54%",
        dateYearTop: "56.31%",
        dateDayTop: "53.59%",
        dividerTop: "52.21%",
        summaryTop: "56.57%",
        titleTop: "52%"
    },
    {
        title: "四川飞豹救援天府支队",
        dateYear: "2025-12",
        dateDay: "06",
        summary: '"以学铸魂，就是要做好学习贯彻新时代中国特色社会主义思想的深化、内化、转化工作，从思想上正本清源、固...',
        image: new URL('@/assets/images/Vector_1_1020.png', import.meta.url).href,
        imageTop: "63.7%",
        contentTop: "63.7%",
        dateYearTop: "71.47%",
        dateDayTop: "68.76%",
        dividerTop: "67.38%",
        summaryTop: "71.74%",
        titleTop: "67.38%"
    },
    {
        title: "四川飞豹救援成都支队",
        dateYear: "2025-11",
        dateDay: "28",
        summary: "成都支队积极开展应急救援演练，提升队伍实战能力，确保在关键时刻能够快速响应、高效救援...",
        image: new URL('@/assets/images/Vector_1_1011.png', import.meta.url).href,
        imageTop: "18.2%",
        contentTop: "18.2%",
        dateYearTop: "25.97%",
        dateDayTop: "23.26%",
        dividerTop: "21.87%",
        summaryTop: "26.24%",
        titleTop: "21.87%"
    },
    {
        title: "四川飞豹救援绵阳支队",
        dateYear: "2025-11",
        dateDay: "25",
        summary: "绵阳支队深入社区开展防灾减灾宣传活动，普及应急救援知识，提高群众自救互救能力...",
        image: new URL('@/assets/images/Vector_1_1014.png', import.meta.url).href,
        imageTop: "33.37%",
        contentTop: "33.37%",
        dateYearTop: "41.14%",
        dateDayTop: "38.42%",
        dividerTop: "37.04%",
        summaryTop: "41.41%",
        titleTop: "37.04%"
    },
    {
        title: "四川飞豹救援德阳支队",
        dateYear: "2025-11",
        dateDay: "20",
        summary: "德阳支队组织开展水域救援专项训练，强化队员水上救援技能，为汛期应急救援做好充分准备...",
        image: new URL('@/assets/images/Vector_1_1017.png', import.meta.url).href,
        imageTop: "48.54%",
        contentTop: "48.54%",
        dateYearTop: "56.31%",
        dateDayTop: "53.59%",
        dividerTop: "52.21%",
        summaryTop: "56.57%",
        titleTop: "52%"
    },
    {
        title: "四川飞豹救援乐山支队",
        dateYear: "2025-11",
        dateDay: "15",
        summary: "乐山支队参与地震救援演练，与多部门协同配合，检验应急响应机制，提升综合救援能力...",
        image: new URL('@/assets/images/Vector_1_1020.png', import.meta.url).href,
        imageTop: "63.7%",
        contentTop: "63.7%",
        dateYearTop: "71.47%",
        dateDayTop: "68.76%",
        dividerTop: "67.38%",
        summaryTop: "71.74%",
        titleTop: "67.38%"
    },
    {
        title: "四川飞豹救援宜宾支队",
        dateYear: "2025-11",
        dateDay: "10",
        summary: "宜宾支队开展山地救援技能培训，提升队员在复杂地形环境下的救援能力和安全意识...",
        image: new URL('@/assets/images/Vector_1_1011.png', import.meta.url).href,
        imageTop: "18.2%",
        contentTop: "18.2%",
        dateYearTop: "25.97%",
        dateDayTop: "23.26%",
        dividerTop: "21.87%",
        summaryTop: "26.24%",
        titleTop: "21.87%"
    },
    {
        title: "四川飞豹救援泸州支队",
        dateYear: "2025-11",
        dateDay: "05",
        summary: "泸州支队积极参与社会公益活动，为困难群众提供帮助，展现救援队伍的社会责任和担当...",
        image: new URL('@/assets/images/Vector_1_1014.png', import.meta.url).href,
        imageTop: "33.37%",
        contentTop: "33.37%",
        dateYearTop: "41.14%",
        dateDayTop: "38.42%",
        dividerTop: "37.04%",
        summaryTop: "41.41%",
        titleTop: "37.04%"
    },
    {
        title: "四川飞豹救援南充支队",
        dateYear: "2025-10",
        dateDay: "30",
        summary: "南充支队组织开展夜间救援演练，提升队员在低能见度环境下的救援能力和协同作战水平...",
        image: new URL('@/assets/images/Vector_1_1017.png', import.meta.url).href,
        imageTop: "48.54%",
        contentTop: "48.54%",
        dateYearTop: "56.31%",
        dateDayTop: "53.59%",
        dividerTop: "52.21%",
        summaryTop: "56.57%",
        titleTop: "52%"
    },
    {
        title: "四川飞豹救援达州支队",
        dateYear: "2025-10",
        dateDay: "25",
        summary: "达州支队深入学校开展应急救援知识讲座，培养青少年的安全意识和自救能力，传播救援文化...",
        image: new URL('@/assets/images/Vector_1_1020.png', import.meta.url).href,
        imageTop: "63.7%",
        contentTop: "63.7%",
        dateYearTop: "71.47%",
        dateDayTop: "68.76%",
        dividerTop: "67.38%",
        summaryTop: "71.74%",
        titleTop: "67.38%"
    }
])

// 计算总数
const totalShowcases = computed(() => showcaseItems.value.length)

// 计算当前页显示的数据
const paginatedShowcaseItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const items = showcaseItems.value.slice(start, end)

    // 为每个项目分配位置（循环使用4个位置）
    const positions = [
        {
            imageTop: "18.2%",
            contentTop: "18.2%",
            dateYearTop: "25.97%",
            dateDayTop: "23.26%",
            dividerTop: "21.87%",
            summaryTop: "26.24%",
            titleTop: "21.87%"
        },
        {
            imageTop: "33.37%",
            contentTop: "33.37%",
            dateYearTop: "41.14%",
            dateDayTop: "38.42%",
            dividerTop: "37.04%",
            summaryTop: "41.41%",
            titleTop: "37.04%"
        },
        {
            imageTop: "48.54%",
            contentTop: "48.54%",
            dateYearTop: "56.31%",
            dateDayTop: "53.59%",
            dividerTop: "52.21%",
            summaryTop: "56.57%",
            titleTop: "52%"
        },
        {
            imageTop: "63.7%",
            contentTop: "63.7%",
            dateYearTop: "71.47%",
            dateDayTop: "68.76%",
            dividerTop: "67.38%",
            summaryTop: "71.74%",
            titleTop: "67.38%"
        }
    ]

    return items.map((item, index) => ({
        ...item,
        ...positions[index % 4]
    }))
})

// 页码改变处理
function handlePageChange() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<style scoped>
.team-nav-item {
    cursor: pointer;
}
.showcase-clickable {
    cursor: pointer;
    transition: opacity 0.3s ease;
}
.showcase-clickable:hover {
    opacity: 0.8;
}
.team-breadcrumb-link {
    color: #848484;
    text-decoration: none;
}
.team-breadcrumb-link:hover {
    color: #848484;
    opacity: 0.9;
}
.team-breadcrumb-link:active,
.team-breadcrumb-link:visited {
    text-decoration: underline;
}
.team-breadcrumb-current {
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

/* 动态内容元素样式 */
.showcase-image {
    width: 22.03%;
    height: 13.84%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
}

.showcase-content-bg {
    width: 46.25%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1023.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 47.97%;
    right: 5.78%;
}

.showcase-date-year {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.45%;
    right: 47.58%;
}

.showcase-date-day {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4.38%;
    height: auto;
    position: absolute;
    left: 49.79%;
}

.showcase-divider {
    width: 0%;
    height: 6.55%;
    background-image: url(@/assets/images/Vector_1_1027.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 45.83%;
}

.showcase-summary {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(132, 132, 132, 1);
    width: 33.64%;
    height: 3.19%;
    position: absolute;
    left: 55.89%;
    right: 10.47%;
}

.showcase-title {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(56, 56, 56, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 55.83%;
    right: 28.54%;
}
</style>
<style>
.scroll-container-1_876 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_876 {
    width: 1920px;
    height: 1879px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_877 {
    width: 100%;
    height: 99.63%;
    background-image: url(@/assets/images/Vector_1_877.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0.37%;
}
.Pixso-vector-1_878 {
    width: 100%;
    height: 10.32%;
    background-image: url(@/assets/images/Vector_1_878.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 89.68%;
}
.Pixso-vector-1_881 {
    width: 6.72%;
    height: 6.86%;
    background-image: url(@/assets/images/Vector_1_881.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.76%;
    bottom: 91.38%;
}
.Pixso-paragraph-1_884 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 2.82%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.09%;
    bottom: 94.09%;
}
.Pixso-paragraph-1_885 {
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
    top: 6.39%;
    bottom: 92.34%;
}
.Pixso-vector-1_893 {
    width: 100%;
    height: 14.9%;
    background-image: url(@/assets/images/Vector_1_893.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 85.1%;
    bottom: 0%;
}
.Pixso-paragraph-1_896 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 11.41%;
    height: 1.07%;
    position: absolute;
    left: 44.27%;
    right: 44.32%;
    top: 87.97%;
    bottom: 10.96%;
}
.Pixso-paragraph-1_897 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 16.51%;
    height: 1.07%;
    position: absolute;
    left: 41.72%;
    right: 41.77%;
    top: 90.63%;
    bottom: 8.3%;
}
.Pixso-paragraph-1_898 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 9.28%;
    height: 1.06%;
    position: absolute;
    left: 45.36%;
    right: 45.36%;
    top: 96.01%;
    bottom: 2.93%;
}
.Pixso-paragraph-1_899 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 24.01%;
    height: 1.06%;
    position: absolute;
    left: 36.61%;
    right: 39.38%;
    top: 93.35%;
    bottom: 5.59%;
}
.Pixso-paragraph-1_900 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.73%;
    right: 76.67%;
    top: 15.54%;
    bottom: 83.4%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_901 {
    width: 100%;
    height: 14.9%;
    background-image: url(@/assets/images/Vector_1_901.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 85.1%;
    bottom: 0%;
}
.Pixso-vector-1_908 {
    width: 18.39%;
    height: 8.68%;
    background-image: url(@/assets/images/Vector_1_908.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 18.04%;
    bottom: 73.28%;
}
.Pixso-vector-1_909 {
    width: 18.39%;
    height: 6.12%;
    background-image: url(@/assets/images/Vector_1_909.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 26.72%;
    bottom: 67.16%;
}
.Pixso-vector-1_910 {
    width: 18.39%;
    height: 37.2%;
    background-image: url(@/assets/images/Vector_1_910.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 45.24%;
    bottom: 17.56%;
}
.Pixso-paragraph-1_911 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 13.12%;
    height: 3.99%;
    position: absolute;
    left: 9.69%;
    right: 77.19%;
    top: 20.49%;
    bottom: 75.52%;
    opacity: 0.5;
}
.Pixso-paragraph-1_912 {
    font-size: 50px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 10.83%;
    right: 78.91%;
    top: 20.17%;
    bottom: 77.17%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_913 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.21%;
    height: 1.06%;
    position: absolute;
    left: 8.39%;
    right: 87.4%;
    top: 29.22%;
    bottom: 69.72%;
}
.Pixso-vector-1_914 {
    width: 18.39%;
    height: 6.12%;
    background-image: url(@/assets/images/Vector_1_914.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 39.06%;
    bottom: 54.82%;
}
.Pixso-paragraph-1_915 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: auto;
    height: auto;
    position: absolute;
    left: 8.7%;
    right: 79.01%;
    top: 41.51%;
    bottom: 57.42%;
    flex-grow: 0;
}
.Pixso-vector-1_916 {
    width: 0.2%;
    height: 1.22%;
    background-image: url(@/assets/images/Vector_1_916.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.71%;
    right: 92.09%;
    top: 41.46%;
    bottom: 57.32%;
}
.Pixso-vector-1_917 {
    width: 100%;
    height: 3.73%;
    background-image: url(@/assets/images/Vector_1_917.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 10.32%;
    bottom: 85.95%;
}
.Pixso-vector-1_918 {
    width: 10.63%;
    height: 3.73%;
    background-image: url(@/assets/images/Vector_1_918.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 24.32%;
    right: 65.05%;
    top: 10.32%;
    bottom: 85.95%;
}
.Pixso-vector-17_3 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_3.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_923 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 38.02%;
    right: 57.81%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_924 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.65%;
    right: 47.19%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_925 {
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
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_926 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 69.9%;
    right: 25.94%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_927 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 80.52%;
    right: 15.31%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_928 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 16.15%;
    right: 79.69%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_929 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 27.4%;
    right: 68.44%;
    top: 11.55%;
    bottom: 87.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_930 {
    width: 18.39%;
    height: 6.12%;
    background-image: url(@/assets/images/Vector_1_930.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 32.89%;
    bottom: 60.99%;
}
.Pixso-paragraph-1_931 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.21%;
    height: 1.07%;
    position: absolute;
    left: 8.39%;
    right: 87.4%;
    top: 35.39%;
    bottom: 63.54%;
}
.Pixso-vector-1_932 {
    width: 22.03%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_932.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
    top: 18.2%;
    bottom: 67.96%;
}
.Pixso-vector-1_1011 {
    width: 22.03%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1011.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
    top: 18.2%;
    bottom: 67.96%;
}
.Pixso-vector-1_1014 {
    width: 22.03%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1014.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
    top: 33.37%;
    bottom: 52.79%;
}
.Pixso-vector-1_1017 {
    width: 22.03%;
    height: 13.83%;
    background-image: url(@/assets/images/Vector_1_1017.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
    top: 48.54%;
    bottom: 37.63%;
}
.Pixso-vector-1_1020 {
    width: 22.03%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1020.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.89%;
    right: 52.08%;
    top: 63.7%;
    bottom: 22.46%;
}
.Pixso-vector-1_1023 {
    width: 46.25%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1023.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 47.97%;
    right: 5.78%;
    top: 18.2%;
    bottom: 67.96%;
}
.Pixso-vector-1_1024 {
    width: 46.25%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1024.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 47.97%;
    right: 5.78%;
    top: 33.37%;
    bottom: 52.79%;
}
.Pixso-vector-1_1025 {
    width: 46.25%;
    height: 13.83%;
    background-image: url(@/assets/images/Vector_1_1025.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 47.97%;
    right: 5.78%;
    top: 48.54%;
    bottom: 37.63%;
}
.Pixso-vector-1_1026 {
    width: 46.25%;
    height: 13.84%;
    background-image: url(@/assets/images/Vector_1_1026.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 47.97%;
    right: 5.78%;
    top: 63.7%;
    bottom: 22.46%;
}
.Pixso-vector-1_1027 {
    width: 0%;
    height: 6.55%;
    background-image: url(@/assets/images/Vector_1_1027.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 45.83%;
    top: 21.87%;
    bottom: 71.58%;
}
.Pixso-paragraph-1_1028 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.45%;
    right: 47.58%;
    top: 25.97%;
    bottom: 72.96%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1029 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 4.38%;
    height: auto;
    position: absolute;
    left: 49.79%;
    right: 45.83%;
    top: 23.26%;
    bottom: 74.08%;
}
.Pixso-vector-1_1030 {
    width: 0%;
    height: 6.55%;
    background-image: url(@/assets/images/Vector_1_1030.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 45.83%;
    top: 37.04%;
    bottom: 56.41%;
}
.Pixso-paragraph-1_1031 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.45%;
    right: 47.58%;
    top: 41.14%;
    bottom: 57.8%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1032 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 2.29%;
    height: 2.67%;
    position: absolute;
    left: 49.79%;
    right: 47.92%;
    top: 38.42%;
    bottom: 58.91%;
}
.Pixso-vector-1_1033 {
    width: 0%;
    height: 6.54%;
    background-image: url(@/assets/images/Vector_1_1033.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 45.83%;
    top: 52.21%;
    bottom: 41.25%;
}
.Pixso-paragraph-1_1034 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.45%;
    right: 47.58%;
    top: 56.31%;
    bottom: 42.63%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1035 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 2.29%;
    height: 2.66%;
    position: absolute;
    left: 49.79%;
    right: 47.92%;
    top: 53.59%;
    bottom: 43.75%;
}
.Pixso-vector-1_1036 {
    width: 0%;
    height: 6.54%;
    background-image: url(@/assets/images/Vector_1_1036.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 45.83%;
    top: 67.38%;
    bottom: 26.08%;
}
.Pixso-paragraph-1_1037 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.45%;
    right: 47.58%;
    top: 71.47%;
    bottom: 27.46%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1038 {
    font-size: 50px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(41, 41, 41, 1);
    width: 2.29%;
    height: auto;
    position: absolute;
    left: 49.79%;
    right: 47.92%;
    top: 68.76%;
    bottom: 28.58%;
}
.Pixso-paragraph-1_1039 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(132, 132, 132, 1);
    width: 33.64%;
    height: 3.19%;
    position: absolute;
    left: 55.89%;
    right: 10.47%;
    top: 26.24%;
    bottom: 70.57%;
}
.Pixso-paragraph-1_1040 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(132, 132, 132, 1);
    width: 33.64%;
    height: 3.19%;
    position: absolute;
    left: 55.89%;
    right: 10.47%;
    top: 41.41%;
    bottom: 55.4%;
}
.Pixso-paragraph-1_1041 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(132, 132, 132, 1);
    width: 33.64%;
    height: 3.2%;
    position: absolute;
    left: 55.89%;
    right: 10.47%;
    top: 56.57%;
    bottom: 40.23%;
}
.Pixso-paragraph-1_1042 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(132, 132, 132, 1);
    width: 33.64%;
    height: 3.19%;
    position: absolute;
    left: 55.89%;
    right: 10.47%;
    top: 71.74%;
    bottom: 25.07%;
}
.Pixso-paragraph-1_1043 {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(56, 56, 56, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 55.83%;
    right: 28.54%;
    top: 21.87%;
    bottom: 76%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1044 {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(56, 56, 56, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 55.83%;
    right: 23.85%;
    top: 37.04%;
    bottom: 60.83%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1045 {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(56, 56, 56, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 55.83%;
    right: 26.98%;
    top: 52%;
    bottom: 45.88%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1046 {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(56, 56, 56, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 55.83%;
    right: 28.54%;
    top: 67.38%;
    bottom: 30.49%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1047 {
    width: 2.14%;
    height: 2.24%;
    background-image: url(@/assets/images/Boolean_operation_1_1047.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.29%;
    right: 90.57%;
    top: 20.22%;
    bottom: 77.54%;
}
.Pixso-group-6_398 {
    width: 35.89%;
    height: 2.24%;
    position: absolute;
    left: 58.33%;
    right: 5.78%;
    top: 79.88%;
    bottom: 17.88%;
}
.Pixso-vector-6_399 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_399.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_473 {
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
.Pixso-group-33_138 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1472px;
    top: 90px;
}
.Pixso-vector-33_139 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_139.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_140 {
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
.Pixso-vector-33_141 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_141.png);
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
