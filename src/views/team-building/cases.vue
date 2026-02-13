<template>
    <div class="scroll-container-1_700">
        <div id="1_700" class="Pixso-frame-1_700">
            <div id="1_701" class="Pixso-vector-1_701"></div>
            <div id="1_702" class="Pixso-vector-1_702"></div>
            <div id="1_705" class="Pixso-vector-1_705"></div>
            <p id="1_708" class="Pixso-paragraph-1_708">{{ "四川飞豹救援" }}</p>
            <p id="1_709" class="Pixso-paragraph-1_709">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_718" class="Pixso-vector-1_718"></div>
            <p id="1_721" class="Pixso-paragraph-1_721">
                {{ "主办单位：四川飞豹救援" }}
            </p>
            <p id="1_722" class="Pixso-paragraph-1_722">
                {{ "承办单位：四川飞豹救援新闻宣传处" }}
            </p>
            <p id="1_723" class="Pixso-paragraph-1_723">
                {{ "蜀ICP备XXXXXXX号" }}
            </p>
            <p id="1_724" class="Pixso-paragraph-1_724">
                {{ "Copyright®2025 sc.119.gov.cn All rights reserved" }}
            </p>
            <p id="1_725" class="Pixso-paragraph-1_725">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/team-building" style="color: inherit; text-decoration: none;">队伍建设</router-link> > 救援案例
            </p>
            <div id="1_726" class="Pixso-vector-1_726"></div>
            <div id="1_733" class="Pixso-vector-1_733"></div>
            <div id="1_734" class="Pixso-vector-1_734"></div>
            <div id="1_735" class="Pixso-vector-1_735"></div>
            <div id="1_736" class="Pixso-vector-1_736"></div>
            <p id="1_737" class="Pixso-paragraph-1_737">{{ "TBDEV" }}</p>
            <p id="1_738" class="Pixso-paragraph-1_738">{{ "队伍建设" }}</p>
            <router-link to="/team-building/about" id="1_739" class="Pixso-paragraph-1_739">{{ "关于队伍" }}</router-link>
            <router-link to="/team-building/showcase" id="1_740" class="Pixso-paragraph-1_740">{{ "队伍风采" }}</router-link>
            <div id="1_741" class="Pixso-vector-1_741"></div>
            <div id="1_742" class="Pixso-vector-1_742"></div>
            <router-link to="/team-building/cases" id="1_743" class="Pixso-paragraph-1_743">
                {{ "救援案例                          >" }}
            </router-link>
            <div id="1_744" class="Pixso-vector-1_744"></div>
            <div id="1_745" class="Pixso-vector-1_745"></div>
            <div id="33_367" class="Pixso-vector-33_367"></div>
            <div id="17_2" class="Pixso-vector-17_2"></div>
            <router-link id="1_751" to="/party-building" class="Pixso-paragraph-1_751 main-nav-link">党建专栏</router-link>
            <router-link id="1_752" to="/info-public" class="Pixso-paragraph-1_752 main-nav-link">信息公开</router-link>
            <router-link id="1_753" to="/dynamic-news" class="Pixso-paragraph-1_753 main-nav-link">动态要闻</router-link>
            <router-link id="1_754" to="/policy-regulations" class="Pixso-paragraph-1_754 main-nav-link">政策法规</router-link>
            <router-link id="1_755" to="/query-system" class="Pixso-paragraph-1_755 main-nav-link">查询系统</router-link>
            <router-link id="1_756" to="/overview-info" class="Pixso-paragraph-1_756 main-nav-link">概况信息</router-link>
            <router-link id="1_757" to="/team-building" class="Pixso-paragraph-1_757 main-nav-link">队伍建设</router-link>
            <!-- 动态案例列表 -->
            <template v-for="(caseItem, index) in paginatedCases" :key="`case_${index}`">
                <!-- 案例图片 -->
                <div
                    class="case-image"
                    :style="{
                        backgroundImage: `url(${caseItem.image})`,
                        left: caseItem.left,
                        top: caseItem.top
                    }"
                    @click="goToCaseDetail((currentPage - 1) * pageSize + index)"
                ></div>

                <!-- 案例标题 -->
                <p
                    class="case-title"
                    :style="{
                        left: caseItem.titleLeft,
                        top: caseItem.titleTop
                    }"
                    @click="goToCaseDetail((currentPage - 1) * pageSize + index)"
                >
                    {{ caseItem.title }}
                </p>
            </template>
            <div id="1_870" class="Pixso-vector-1_870"></div>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 8.13%; top: 77%; height: 2.2%;">
                <Pagination
                    :total="totalCases"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[9, 18]"
                    @page-change="handlePageChange"
                />
            </div>
            <div id="32_14" class="Pixso-group-32_14">
                <p id="32_15" class="Pixso-paragraph-32_15">
                    {{ "主办单位：四川飞豹救援" }}
                </p>
                <p id="32_16" class="Pixso-paragraph-32_16">
                    {{ "承办单位：四川飞豹救援新闻宣传处" }}
                </p>
                <p id="32_17" class="Pixso-paragraph-32_17">
                    {{ "蜀ICP备XXXXXXX号" }}
                </p>
                <p id="32_18" class="Pixso-paragraph-32_18">
                    {{ "Copyright®2025 sc.feibao.com All rights reserved" }}
                </p>
            </div>
            <div id="33_129" class="Pixso-group-33_129" @click.stop>
                <div id="33_130" class="Pixso-vector-33_130"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_132"
                    class="Pixso-vector-33_132"
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
const pageSize = ref(9)

// 救援案例数据
const cases = ref([
    {
        title: "6·3普洱6.4级地震",
        image: new URL('@/assets/images/Vector_1_834.png', import.meta.url).href,
        date: "2014-06-03",
        description: "2014年6月3日，云南省普洱市发生6.4级地震，四川飞豹救援队第一时间赶赴灾区开展救援工作..."
    },
    {
        title: "8·7舟曲山体滑坡泥石流",
        image: new URL('@/assets/images/Vector_1_840.png', import.meta.url).href,
        date: "2010-08-07",
        description: "2010年8月7日，甘肃省舟曲县发生特大山洪泥石流灾害，救援队紧急出动参与救援..."
    },
    {
        title: "8·8九寨沟7.0级地震",
        image: new URL('@/assets/images/Vector_1_837.png', import.meta.url).href,
        date: "2017-08-08",
        description: "2017年8月8日，四川省九寨沟县发生7.0级地震，救援队迅速响应，全力开展救援..."
    },
    {
        title: "5·12汶川8.0级地震",
        image: new URL('@/assets/images/Vector_1_843.png', import.meta.url).href,
        date: "2008-05-12",
        description: "2008年5月12日，四川省汶川县发生8.0级特大地震，救援队员冒着生命危险深入灾区..."
    },
    {
        title: "4·20芦山7.0级地震",
        image: new URL('@/assets/images/Vector_1_849.png', import.meta.url).href,
        date: "2013-04-20",
        description: "2013年4月20日，四川省雅安市芦山县发生7.0级地震，救援队快速集结投入救援..."
    },
    {
        title: "6·24茂县山体滑坡",
        image: new URL('@/assets/images/Vector_1_846.png', import.meta.url).href,
        date: "2017-06-24",
        description: "2017年6月24日，四川省阿坝州茂县发生山体滑坡，救援队全力搜救被困群众..."
    },
    {
        title: "4·14玉树7.1级地震",
        image: new URL('@/assets/images/Vector_1_852.png', import.meta.url).href,
        date: "2010-04-14",
        description: "2010年4月14日，青海省玉树县发生7.1级地震，救援队克服高原反应参与救援..."
    },
    {
        title: "8·3鲁甸6.5级地震",
        image: new URL('@/assets/images/Vector_1_858.png', import.meta.url).href,
        date: "2014-08-03",
        description: "2014年8月3日，云南省昭通市鲁甸县发生6.5级地震，救援队紧急驰援灾区..."
    },
    {
        title: "7·20郑州特大暴雨",
        image: new URL('@/assets/images/Vector_1_855.png', import.meta.url).href,
        date: "2021-07-20",
        description: "2021年7月20日，河南省郑州市遭遇特大暴雨，救援队参与抢险救援工作..."
    },
    {
        title: "9·5泸定6.8级地震",
        image: new URL('@/assets/images/Vector_1_834.png', import.meta.url).href,
        date: "2022-09-05",
        description: "2022年9月5日，四川省甘孜州泸定县发生6.8级地震，救援队迅速响应展开救援..."
    },
    {
        title: "6·17长宁6.0级地震",
        image: new URL('@/assets/images/Vector_1_840.png', import.meta.url).href,
        date: "2019-06-17",
        description: "2019年6月17日，四川省宜宾市长宁县发生6.0级地震，救援队第一时间赶赴现场..."
    },
    {
        title: "10·11金沙江堰塞湖",
        image: new URL('@/assets/images/Vector_1_837.png', import.meta.url).href,
        date: "2018-10-11",
        description: "2018年10月11日，金沙江发生山体滑坡形成堰塞湖，救援队参与应急处置..."
    },
    {
        title: "8·13甘肃舟曲泥石流",
        image: new URL('@/assets/images/Vector_1_843.png', import.meta.url).href,
        date: "2010-08-13",
        description: "2010年8月13日，甘肃省舟曲县再次发生泥石流灾害，救援队持续开展救援..."
    },
    {
        title: "7·22定西6.6级地震",
        image: new URL('@/assets/images/Vector_1_849.png', import.meta.url).href,
        date: "2013-07-22",
        description: "2013年7月22日，甘肃省定西市发生6.6级地震，救援队紧急出动参与救援..."
    },
    {
        title: "5·30东方之星沉船",
        image: new URL('@/assets/images/Vector_1_846.png', import.meta.url).href,
        date: "2015-05-30",
        description: "2015年5月30日，长江客轮东方之星翻沉，救援队参与水上搜救行动..."
    },
    {
        title: "11·3金沙江白格堰塞湖",
        image: new URL('@/assets/images/Vector_1_852.png', import.meta.url).href,
        date: "2018-11-03",
        description: "2018年11月3日，金沙江再次发生堰塞湖险情，救援队参与应急救援..."
    },
    {
        title: "6·1重庆武隆山体滑坡",
        image: new URL('@/assets/images/Vector_1_858.png', import.meta.url).href,
        date: "2009-06-01",
        description: "2009年6月1日，重庆市武隆县发生山体滑坡，救援队全力搜救被困人员..."
    },
    {
        title: "8·12天津港爆炸事故",
        image: new URL('@/assets/images/Vector_1_855.png', import.meta.url).href,
        date: "2015-08-12",
        description: "2015年8月12日，天津港发生特大爆炸事故，救援队参与应急救援和善后处置..."
    }
])

// 计算总数
const totalCases = computed(() => cases.value.length)

// 计算当前页显示的案例
const paginatedCases = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const items = cases.value.slice(start, end)

    // 定义9个位置（3×3网格）
    const positions = [
        { left: "28.49%", top: "21.08%", titleLeft: "33.23%", titleTop: "35.24%" },  // 第1列第1行
        { left: "28.49%", top: "38.91%", titleLeft: "32.86%", titleTop: "53.07%" },  // 第1列第2行
        { left: "28.49%", top: "56.74%", titleLeft: "32.66%", titleTop: "70.9%" },   // 第1列第3行
        { left: "50.26%", top: "21.08%", titleLeft: "55%", titleTop: "35.24%" },     // 第2列第1行
        { left: "50.26%", top: "38.91%", titleLeft: "54.63%", titleTop: "53.07%" },  // 第2列第2行
        { left: "50.26%", top: "56.74%", titleLeft: "54.43%", titleTop: "70.9%" },   // 第2列第3行
        { left: "72.03%", top: "21.08%", titleLeft: "76.77%", titleTop: "35.24%" },  // 第3列第1行
        { left: "72.03%", top: "38.91%", titleLeft: "76.4%", titleTop: "53.07%" },   // 第3列第2行
        { left: "72.03%", top: "56.74%", titleLeft: "76.2%", titleTop: "70.9%" }     // 第3列第3行
    ]

    return items.map((item, index) => ({
        ...item,
        ...positions[index % 9]
    }))
})

// 跳转到案例详情
function goToCaseDetail(index: number) {
    router.push(`/team-building/cases/${index}`)
}

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
</script>
<style>
.scroll-container-1_700 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_700 {
    width: 1920px;
    height: 1907px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_701 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_701.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_702 {
    width: 100%;
    height: 10.17%;
    background-image: url(@/assets/images/Vector_1_702.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 89.83%;
}
.Pixso-vector-1_705 {
    width: 6.72%;
    height: 6.77%;
    background-image: url(@/assets/images/Vector_1_705.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.73%;
    bottom: 91.5%;
}
.Pixso-paragraph-1_708 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 2.78%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.04%;
    bottom: 94.18%;
}
.Pixso-paragraph-1_709 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.26%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 6.29%;
    bottom: 92.45%;
}
.Pixso-vector-1_718 {
    width: 100%;
    height: 14.68%;
    background-image: url(@/assets/images/Vector_1_718.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 85.32%;
    bottom: 0%;
}
.Pixso-paragraph-1_721 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 11.41%;
    height: 1.05%;
    position: absolute;
    left: 44.27%;
    right: 44.32%;
    top: 88.15%;
    bottom: 10.8%;
}
.Pixso-paragraph-1_722 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 16.51%;
    height: 1.05%;
    position: absolute;
    left: 41.72%;
    right: 41.77%;
    top: 90.77%;
    bottom: 8.18%;
}
.Pixso-paragraph-1_723 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 9.28%;
    height: 1.05%;
    position: absolute;
    left: 45.36%;
    right: 45.36%;
    top: 96.07%;
    bottom: 2.88%;
}
.Pixso-paragraph-1_724 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 24.01%;
    height: 1.04%;
    position: absolute;
    left: 36.61%;
    right: 39.38%;
    top: 93.45%;
    bottom: 5.51%;
}
.Pixso-paragraph-1_725 {
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
    top: 15.31%;
    bottom: 83.64%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_726 {
    width: 1920px;
    height: 280px;
    background-image: url(@/assets/images/Vector_1_726.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 813.5px));
}
.Pixso-vector-1_733 {
    width: 18.39%;
    height: 8.54%;
    background-image: url(@/assets/images/Vector_1_733.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 17.78%;
    bottom: 73.68%;
}
.Pixso-vector-1_734 {
    width: 18.39%;
    height: 6.03%;
    background-image: url(@/assets/images/Vector_1_734.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 26.32%;
    bottom: 67.65%;
}
.Pixso-vector-1_735 {
    width: 18.39%;
    height: 6.03%;
    background-image: url(@/assets/images/Vector_1_735.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 38.49%;
    bottom: 55.48%;
}
.Pixso-vector-1_736 {
    width: 18.39%;
    height: 38.18%;
    background-image: url(@/assets/images/Vector_1_736.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 44.57%;
    bottom: 17.25%;
}
.Pixso-paragraph-1_737 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 13.12%;
    height: 3.93%;
    position: absolute;
    left: 9.69%;
    right: 77.19%;
    top: 20.19%;
    bottom: 75.88%;
    opacity: 0.5;
}
.Pixso-paragraph-1_738 {
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
    top: 19.87%;
    bottom: 77.5%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_739 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.21%;
    height: 1.05%;
    position: absolute;
    left: 8.39%;
    right: 87.4%;
    top: 28.79%;
    bottom: 70.16%;
}
.Pixso-paragraph-1_740 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.21%;
    height: 1.05%;
    position: absolute;
    left: 8.39%;
    right: 87.4%;
    top: 40.95%;
    bottom: 58%;
}
.Pixso-vector-1_741 {
    width: 68.33%;
    height: 64.4%;
    background-image: url(@/assets/images/Vector_1_741.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.78%;
    right: 5.89%;
    top: 18.35%;
    bottom: 17.25%;
}
.Pixso-vector-1_742 {
    width: 18.39%;
    height: 6.03%;
    background-image: url(@/assets/images/Vector_1_742.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 32.41%;
    bottom: 61.56%;
}
.Pixso-paragraph-1_743 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.77%;
    height: 1.05%;
    position: absolute;
    left: 8.39%;
    right: 79.84%;
    top: 34.82%;
    bottom: 64.13%;
}
.Pixso-vector-1_744 {
    width: 0.2%;
    height: 1.2%;
    background-image: url(@/assets/images/Vector_1_744.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.71%;
    right: 92.24%;
    top: 34.77%;
    bottom: 64.03%;
}
.Pixso-vector-1_745 {
    width: 100%;
    height: 3.67%;
    background-image: url(@/assets/images/Vector_1_745.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 10.17%;
    bottom: 86.16%;
}
.Pixso-vector-33_367 {
    width: 10.62%;
    height: 3.67%;
    background-image: url(@/assets/images/Vector_33_367.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 24.17%;
    right: 65.21%;
    top: 10.17%;
    bottom: 86.16%;
}
.Pixso-vector-17_2 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_2.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_751 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_752 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_753 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_754 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_755 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_756 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_757 {
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
    top: 11.38%;
    bottom: 87.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_834 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_834.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.49%;
    right: 51.67%;
    top: 21.08%;
    bottom: 65.92%;
}
.Pixso-vector-1_837 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_837.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.49%;
    right: 51.67%;
    top: 56.74%;
    bottom: 30.26%;
}
.Pixso-vector-1_840 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_840.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.49%;
    right: 51.67%;
    top: 38.91%;
    bottom: 48.09%;
}
.Pixso-vector-1_843 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_843.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50.26%;
    right: 29.9%;
    top: 21.08%;
    bottom: 65.92%;
}
.Pixso-vector-1_846 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_846.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50.26%;
    right: 29.9%;
    top: 56.74%;
    bottom: 30.26%;
}
.Pixso-vector-1_849 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_849.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50.26%;
    right: 29.9%;
    top: 38.91%;
    bottom: 48.09%;
}
.Pixso-vector-1_852 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_852.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 72.03%;
    right: 8.13%;
    top: 21.08%;
    bottom: 65.92%;
}
.Pixso-vector-1_855 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_855.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 72.03%;
    right: 8.13%;
    top: 56.74%;
    bottom: 30.26%;
}
.Pixso-vector-1_858 {
    width: 19.84%;
    height: 13%;
    background-image: url(@/assets/images/Vector_1_858.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 72.03%;
    right: 8.13%;
    top: 38.91%;
    bottom: 48.09%;
}
.Pixso-paragraph-1_861 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 33.23%;
    right: 56.51%;
    top: 35.24%;
    bottom: 63.45%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_862 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 32.66%;
    right: 55.99%;
    top: 70.9%;
    bottom: 27.79%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_863 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 31.61%;
    right: 54.84%;
    top: 53.07%;
    bottom: 45.62%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_864 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 54.64%;
    right: 34.32%;
    top: 35.24%;
    bottom: 63.45%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_865 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 54.9%;
    right: 34.69%;
    top: 70.9%;
    bottom: 27.79%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_866 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 54.69%;
    right: 34.48%;
    top: 53.07%;
    bottom: 45.62%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_867 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 76.56%;
    right: 12.81%;
    top: 35.24%;
    bottom: 63.45%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_868 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 76.67%;
    right: 12.92%;
    top: 70.9%;
    bottom: 27.79%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_869 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(93, 93, 93, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 76.77%;
    right: 12.97%;
    top: 53.07%;
    bottom: 45.62%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_870 {
    width: 2.14%;
    height: 2.2%;
    background-image: url(@/assets/images/Boolean_operation_1_870.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.55%;
    right: 90.31%;
    top: 19.98%;
    bottom: 77.82%;
}
.Pixso-group-6_474 {
    width: 35.88%;
    height: 2.2%;
    position: absolute;
    left: 55.99%;
    right: 8.13%;
    top: 76.46%;
    bottom: 21.34%;
}
.Pixso-vector-6_475 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_475.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_549 {
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
.Pixso-group-32_14 {
    width: 460px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 813.5px));
}
.Pixso-paragraph-32_15 {
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
    top: 50%;
    transform: translateX(calc(-50% + 0.5px)) translateY(calc(-50% + -75px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-32_16 {
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
    top: 50%;
    transform: translateX(calc(-50% + 0.5px)) translateY(calc(-50% + -25px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-32_17 {
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
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 75px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-32_18 {
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
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 25px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-group-33_129 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1468px;
    top: 90px;
}
.Pixso-vector-33_130 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_130.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_131 {
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
.Pixso-vector-33_132 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_132.png);
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

/* 动态案例样式 */
.case-image {
  width: 19.84%;
  height: 13%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.case-image:hover {
  opacity: 0.8;
}

.case-title {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(93, 93, 93, 1);
  width: auto;
  height: auto;
  position: absolute;
  white-space: pre;
  flex-grow: 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.case-title:hover {
  color: rgba(53, 120, 248, 1);
}
</style>
