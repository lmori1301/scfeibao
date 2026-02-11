<template>
  <div class="scroll-container-1_2107">
      <div id="1_2107" class="Pixso-frame-1_2107">
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
              {{ "当前位置：首页 > 动态要闻" }}
          </p>
          <div id="1_2127" class="Pixso-text-1_2127">
              <p id="1_2127_0" class="Pixso-paragraph-1_2127_0">
                  <span id="1_2127_0_1" class="Pixso-span-1_2127_0_1">
                      11月9日，2020年"119"消防宣传月启动仪式暨成都"飞系"消防救援专业队伍技能汇报演练在成都市成都市消防救援支队培训基地隆重举行，
                  </span>
              </p>
              <p id="1_2127_1" class="Pixso-paragraph-1_2127_1">
                  <span id="1_2127_1_1" class="Pixso-span-1_2127_1_1">
                      开启了我省消防主题宣传系列活动，掀起全民消防、全民参与的新浪潮…
                  </span>
                  <router-link to="/dynamic-news/1" class="detail-link">[查看详情]</router-link>
              </p>
          </div>
          <!-- 大标题（固定不变） -->
          <p id="1_2128" class="Pixso-paragraph-1_2128">
              2020年"119"消防宣传月启动仪式举行，"飞系"集结亮相！
          </p>

          <!-- 轮播容器（支持鼠标悬停暂停） -->
          <div class="carousel-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
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
                  <p id="1_2134_1" class="Pixso-paragraph-1_2134_1">
                      <span id="1_2134_1_1" class="Pixso-span-1_2134_1_1">
                          {{ carouselData[currentIndex].content2 }}
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
            <router-link
              :to="item.link"
              class="title-link"
              :style="{
                position: 'absolute',
                left: item.left,
                top: item.top,
                fontSize: '20px',
                fontFamily: 'Alibaba PuHuiTi-Regular',
                color: 'rgba(39,39,39,1)',
                textDecoration: 'none'
              }"
            >
              {{ item.title }}
            </router-link>
            <p
              :id="`time_left_${index}`"
              class="Pixso-paragraph-1_2164"
              :style="{
                position: 'absolute',
                left: item.timeLeft,
                top: item.top,
                fontSize: '20px',
                color: 'rgba(132,132,132,1)'
              }"
            >{{ item.time }}</p>
          </template>

          <template v-for="(item, index) in currentList.right" :key="`right_${index}`">
            <router-link
              :to="item.link"
              class="title-link title-link-right"
              :style="{
                position: 'absolute',
                left: item.left,
                top: item.top,
                fontSize: '20px',
                fontFamily: 'Alibaba PuHuiTi-Regular',
                fontWeight: 400,
                color: 'rgba(39,39,39,1)',
                textDecoration: 'none'
              }"
            >
              {{ item.title }}
            </router-link>
            <p
              :id="`time_right_${index}`"
              class="Pixso-paragraph-1_2170"
              :style="{
                position: 'absolute',
                left: item.timeLeft,
                top: item.top,
                fontSize: '20px',
                color: 'rgba(132,132,132,1)'
              }"
            >{{ item.time }}</p>
          </template>
          <div id="1_2176" class="Pixso-vector-1_2176"></div>
          <div id="1_2179" class="Pixso-vector-1_2179"></div>
          <div id="1_2182" class="Pixso-vector-1_2182"></div>
          <div id="17_31" class="Pixso-vector-17_31"></div>
          <div id="1_2187" class="Pixso-vector-1_2187"></div>
          <router-link id="1_2188" to="/overview-info" class="Pixso-paragraph-1_2188 main-nav-link">概况信息</router-link>
          <router-link id="1_2189" to="/team-building" class="Pixso-paragraph-1_2189 main-nav-link">队伍建设</router-link>
          <router-link id="1_2190" to="/party-building" class="Pixso-paragraph-1_2190 main-nav-link">党建专栏</router-link>
          <router-link id="1_2191" to="/info-public" class="Pixso-paragraph-1_2191 main-nav-link">信息公开</router-link>
          <router-link id="1_2192" to="/dynamic-news" class="Pixso-paragraph-1_2192 main-nav-link">动态要闻</router-link>
          <router-link id="1_2193" to="/policy-regulations" class="Pixso-paragraph-1_2193 main-nav-link">政策法规</router-link>
          <router-link id="6_781" to="/query-system" class="Pixso-paragraph-6_781 main-nav-link">查询系统</router-link>
          <div id="33_300" class="Pixso-group-33_300">
              <div id="33_301" class="Pixso-vector-33_301"></div>
              <p id="33_302" class="Pixso-paragraph-33_302">
                  {{ "请输入您要搜索的内容" }}
              </p>
              <div id="33_303" class="Pixso-vector-33_303"></div>
          </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import image1 from '@/assets/images/Vector_1_2129.png'

// 轮播数据（4条）
const carouselData = [
  {
    leftImage: image1,
    title: '"应急使命·2025"演习总结会在京召开',
    content: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办，应急管理部、工业和信息化部、中央广电总台、黑龙江省人民政府联合承办。应急管理部党委委员、副部长徐加爱，黑龙江省委常委、常务副省长陈少波出席会议并讲话。',
    content2: '会议指出，各有关方面深入贯彻落实习近平总书记关于应急管理的重要论述，坚持底线思维、极限思维，聚焦极端性、专业性、实战性，突出新装备、新技术、新材料、新战法等新质救援能力运用，以案例找难题、以难题定需求、以需求广征集、以征集搞比测、以比测促攻关……',
    link: '/dynamic-news/17'
  },
  {
    leftImage: image1,
    title: '全国消防救援队伍改革发展成效显著',
content: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办，应急管理部、工业和信息化部、中央广电总台、黑龙江省人民政府联合承办。应急管理部党委委员、副部长徐加爱，黑龙江省委常委、常务副省长陈少波出席会议并讲话。',
    content2: '会议指出，各有关方面深入贯彻落实习近平总书记关于应急管理的重要论述，坚持底线思维、极限思维，聚焦极端性、专业性、实战性，突出新装备、新技术、新材料、新战法等新质救援能力运用，以案例找难题、以难题定需求、以需求广征集、以征集搞比测、以比测促攻关……',
    link: '/dynamic-news/18'
  },
  {
    leftImage: image1,
    title: '四川消防救援队伍建设取得新突破',
content: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办，应急管理部、工业和信息化部、中央广电总台、黑龙江省人民政府联合承办。应急管理部党委委员、副部长徐加爱，黑龙江省委常委、常务副省长陈少波出席会议并讲话。',
    content2: '会议指出，各有关方面深入贯彻落实习近平总书记关于应急管理的重要论述，坚持底线思维、极限思维，聚焦极端性、专业性、实战性，突出新装备、新技术、新材料、新战法等新质救援能力运用，以案例找难题、以难题定需求、以需求广征集、以征集搞比测、以比测促攻关……',
    link: '/dynamic-news/19'
  },
  {
    leftImage: image1,
    title: '消防救援装备现代化水平持续提升',
content: '10月31日，"应急使命·2025"演习总结会召开，此次演习由国家防灾减灾救灾委员会、国务院安全生产委员会主办，应急管理部、工业和信息化部、中央广电总台、黑龙江省人民政府联合承办。应急管理部党委委员、副部长徐加爱，黑龙江省委常委、常务副省长陈少波出席会议并讲话。',
    content2: '会议指出，各有关方面深入贯彻落实习近平总书记关于应急管理的重要论述，坚持底线思维、极限思维，聚焦极端性、专业性、实战性，突出新装备、新技术、新材料、新战法等新质救援能力运用，以案例找难题、以难题定需求、以需求广征集、以征集搞比测、以比测促攻关……',
    link: '/dynamic-news/20'
  }
]

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
  currentIndex.value = (currentIndex.value + 1) % carouselData.length
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

// 生命周期：组件挂载时启动自动轮播
onMounted(() => {
  startAutoPlay()
})

// 生命周期：组件卸载时清理定时器
onUnmounted(() => {
  stopAutoPlay()
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

// 核心3：定义各Tab对应的列表数据（匹配原有位置、标题、时间、详情链接）
const tabData = {
  // 各地动态
  local: {
    left: [
      { title: "建设高质量综合性消防救援队伍", time: "2020-11-11", left: "7.63%", top: "66.21%", timeLeft: "37.53%", link: "/dynamic-news/detail/3" },
      { title: "四川消防面向全省招募消防志愿者", time: "2020-11-11", left: "7.58%", top: "69.16%", timeLeft: "37.47%", link: "/dynamic-news/detail/5" },
      { title: "全省政府专职消防救援队伍建设现场会在成都召开", time: "2020-11-11", left: "7.58%", top: "72.11%", timeLeft: "37.47%", link: "/dynamic-news/detail/7" },
      { title: "应急管理部召开「智慧应急」建设现场推进会", time: "2020-11-11", left: "7.63%", top: "75.06%", timeLeft: "37.53%", link: "/dynamic-news/detail/4" },
      { title: "消防主题公园开园啦！四川省暨成都市１１９消防…", time: "2020-11-11", left: "7.58%", top: "78%", timeLeft: "37.47%", link: "/dynamic-news/detail/6" },
      { title: "护航校园安全，省安全应急科普在行动", time: "2020-11-11", left: "7.58%", top: "80.95%", timeLeft: "37.47%", link: "/dynamic-news/detail/8" },
    ],
    right: [
      { title: "中国消防救援力量到底强在哪里", time: "2020-11-11", left: "54.92%", top: "66.21%", timeLeft: "84.82%", link: "/dynamic-news/detail/9" },
      { title: "《你好，火焰蓝》开机！当青春「火焰蓝」…", time: "2020-11-11", left: "54.87%", top: "69.16%", timeLeft: "84.77%", link: "/dynamic-news/detail/11" },
      { title: "琼色局长参加国新办国家综合性消防救援队伍改革…", time: "2020-11-11", left: "54.87%", top: "72.11%", timeLeft: "84.77%", link: "/dynamic-news/detail/13" },
      { title: "开赛啦！中国消防动漫形象创意设计大赛于…", time: "2020-11-11", left: "54.92%", top: "75.06%", timeLeft: "84.82%", link: "/dynamic-news/detail/10" },
      { title: "全民消防安全学习云平台，正式上线启用啦！", time: "2020-11-11", left: "54.87%", top: "78%", timeLeft: "84.77%", link: "/dynamic-news/detail/12" },
      { title: "第五届全国119消防先进集体和先进个人拟表彰对象公示", time: "2020-11-11", left: "54.87%", top: "80.95%", timeLeft: "84.77%", link: "/dynamic-news/detail/14" },
    ]
  },
  // 救援行动
  rescue: {
    left: [
      { title: "成都消防成功处置高层火灾救援", time: "2020-11-11", left: "7.63%", top: "66.21%", timeLeft: "37.53%", link: "/dynamic-news/detail/1" },
      { title: "四川消防跨区域增援抗洪抢险", time: "2020-11-11", left: "7.58%", top: "69.16%", timeLeft: "37.47%", link: "/dynamic-news/detail/2" },
      { title: "消防救援演练进社区 提升应急能力", time: "2020-11-11", left: "7.58%", top: "72.11%", timeLeft: "37.47%", link: "/dynamic-news/detail/2" },
      { title: "森林消防支队扑灭川西林区火情", time: "2020-11-11", left: "7.63%", top: "75.06%", timeLeft: "37.53%", link: "/dynamic-news/detail/1" },
      { title: "救援直升机转运山区被困群众", time: "2020-11-11", left: "7.58%", top: "78%", timeLeft: "37.47%", link: "/dynamic-news/detail/2" },
      { title: "消防指战员寒夜救援落水人员", time: "2020-11-11", left: "7.58%", top: "80.95%", timeLeft: "37.47%", link: "/dynamic-news/detail/1" },
    ],
    right: [
      { title: "全国消防救援技能比武竞赛举行", time: "2020-11-11", left: "54.92%", top: "66.21%", timeLeft: "84.82%", link: "/dynamic-news/detail/2" },
      { title: "无人机助力消防救援精准定位", time: "2020-11-11", left: "54.87%", top: "69.16%", timeLeft: "84.77%", link: "/dynamic-news/detail/1" },
      { title: "跨省联动救援机制实战检验", time: "2020-11-11", left: "54.87%", top: "72.11%", timeLeft: "84.77%", link: "/dynamic-news/detail/2" },
      { title: "新装备列装 提升救援效率", time: "2020-11-11", left: "54.92%", top: "75.06%", timeLeft: "84.82%", link: "/dynamic-news/detail/1" },
      { title: "民间救援队与消防协同作战", time: "2020-11-11", left: "54.87%", top: "78%", timeLeft: "84.77%", link: "/dynamic-news/detail/2" },
      { title: "救援现场暖心瞬间：消防员背老人转移", time: "2020-11-11", left: "54.87%", top: "80.95%", timeLeft: "84.77%", link: "/dynamic-news/detail/1" },
    ]
  },
  // 政策解读
  policy: {
    left: [
      { title: "新《消防法》重点条款解读", time: "2020-11-11", left: "7.63%", top: "66.21%", timeLeft: "37.53%", link: "/dynamic-news/detail/3" },
      { title: "消防安全责任制实施细则解读", time: "2020-11-11", left: "7.58%", top: "69.16%", timeLeft: "37.47%", link: "/dynamic-news/detail/4" },
      { title: "消防救援队伍改革配套政策说明", time: "2020-11-11", left: "7.58%", top: "72.11%", timeLeft: "37.47%", link: "/dynamic-news/detail/3" },
      { title: "农村消防建设扶持政策解读", time: "2020-11-11", left: "7.63%", top: "75.06%", timeLeft: "37.53%", link: "/dynamic-news/detail/4" },
      { title: "企业消防安全奖惩政策说明", time: "2020-11-11", left: "7.58%", top: "78%", timeLeft: "37.47%", link: "/dynamic-news/detail/3" },
      { title: "消防设施维保新规解读", time: "2020-11-11", left: "7.58%", top: "80.95%", timeLeft: "37.47%", link: "/dynamic-news/detail/4" },
    ],
    right: [
      { title: "应急救援补贴政策落地实施", time: "2020-11-11", left: "54.92%", top: "66.21%", timeLeft: "84.82%", link: "/dynamic-news/detail/3" },
      { title: "消防培训收费规范政策解读", time: "2020-11-11", left: "54.87%", top: "69.16%", timeLeft: "84.77%", link: "/dynamic-news/detail/4" },
      { title: "新能源汽车消防安全政策说明", time: "2020-11-11", left: "54.87%", top: "72.11%", timeLeft: "84.77%", link: "/dynamic-news/detail/3" },
      { title: "高层建筑消防管理新规解读", time: "2020-11-11", left: "54.92%", top: "75.06%", timeLeft: "84.82%", link: "/dynamic-news/detail/4" },
      { title: "消防产品认证政策调整说明", time: "2020-11-11", left: "54.87%", top: "78%", timeLeft: "84.77%", link: "/dynamic-news/detail/3" },
      { title: "基层消防力量建设扶持政策", time: "2020-11-11", left: "54.87%", top: "80.95%", timeLeft: "84.77%", link: "/dynamic-news/detail/4" },
    ]
  },
  // 媒体播报
  media: {
    left: [
      { title: "央视《新闻联播》报道四川消防工作", time: "2020-11-11", left: "7.63%", top: "66.21%", timeLeft: "37.53%", link: "/dynamic-news/detail/15" },
      { title: "人民日报：消防救援队伍建设成效显著", time: "2020-11-11", left: "7.58%", top: "69.16%", timeLeft: "37.47%", link: "/dynamic-news/detail/16" },
      { title: "四川卫视专题报道「119」消防宣传月", time: "2020-11-11", left: "7.58%", top: "72.11%", timeLeft: "37.47%", link: "/dynamic-news/detail/15" },
      { title: "央广网专访消防救援总队总队长", time: "2020-11-11", left: "7.63%", top: "75.06%", timeLeft: "37.53%", link: "/dynamic-news/detail/16" },
      { title: "地方媒体聚焦消防救援先进事迹", time: "2020-11-11", left: "7.58%", top: "78%", timeLeft: "37.47%", link: "/dynamic-news/detail/15" },
      { title: "消防主题纪录片登陆各大卫视", time: "2020-11-11", left: "7.58%", top: "80.95%", timeLeft: "37.47%", link: "/dynamic-news/detail/16" },
    ],
    right: [
      { title: "新媒体平台消防科普内容破亿播放", time: "2020-11-11", left: "54.92%", top: "66.21%", timeLeft: "84.82%", link: "/dynamic-news/detail/15" },
      { title: "网红消防员直播讲解消防安全知识", time: "2020-11-11", left: "54.87%", top: "69.16%", timeLeft: "84.77%", link: "/dynamic-news/detail/16" },
      { title: "海外媒体关注中国消防救援发展", time: "2020-11-11", left: "54.87%", top: "72.11%", timeLeft: "84.77%", link: "/dynamic-news/detail/15" },
      { title: "消防短视频大赛获奖作品展播", time: "2020-11-11", left: "54.92%", top: "75.06%", timeLeft: "84.82%", link: "/dynamic-news/detail/16" },
      { title: "纸媒专版报道消防改革十年成果", time: "2020-11-11", left: "54.87%", top: "78%", timeLeft: "84.77%", link: "/dynamic-news/detail/15" },
      { title: "电台消防公益广告持续投放", time: "2020-11-11", left: "54.87%", top: "80.95%", timeLeft: "84.77%", link: "/dynamic-news/detail/16" },
    ]
  }
}

// 核心4：计算属性 - 根据选中的Tab返回对应列表
const currentList = computed(() => tabData[activeTab.value as keyof typeof tabData])
</script>
<style>
.scroll-container-1_2107 {
  height: 100%;
  width: 100%;
  overflow: auto;
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
  height: 69.39%;
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
  line-height: 20px;
  color: rgba(20, 100, 166, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 17.16%;
  right: 17.37%;
  top: 23.85%;
  bottom: 73.83%;
  white-space: nowrap;
  flex-grow: 0;
}
.Pixso-paragraph-1_2127_0 {
  line-height: 20px;
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
  font-size: 35px;
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
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: Regular;
  line-height: 35px;
  color: rgba(77, 77, 77, 1);
  width: 35.52%;
  height: 16.24%;
  position: absolute;
  left: 55.63%;
  right: 8.85%;
  top: 35.01%;
  bottom: 48.75%;
}
.Pixso-paragraph-1_2134_0 {
  line-height: 35px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2134_0_1 {
  font-size: 25px;
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
  width: 1.3%;
  height: 1.13%;
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
  width: 1.31%;
  height: 1.13%;
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
  width: 1.3%;
  height: 1.13%;
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
  width: 1.3%;
  height: 1.13%;
  background-image: url(@/assets/images/Vector_1_2138.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 91.04%;
  right: 7.66%;
  top: 55.6%;
  bottom: 43.27%;
}
.Pixso-vector-1_2139 {
  width: 100%;
  height: 12.7%;
  background-image: url(@/assets/images/Vector_1_2139.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 87.3%;
  bottom: 0%;
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
.Pixso-vector-1_2176 {
  width: 1.46%;
  height: 0.82%;
  background-image: url(@/assets/images/Vector_1_2176.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 22.81%;
  right: 75.73%;
  top: 66.3%;
  bottom: 32.88%;
}
.Pixso-vector-1_2179 {
  width: 1.46%;
  height: 0.82%;
  background-image: url(@/assets/images/Vector_1_2179.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 70.1%;
  right: 28.44%;
  top: 66.3%;
  bottom: 32.88%;
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
</style>
