<template>
    <div ref="scrollContainerRef" class="scroll-container-1_631">
        <div id="1_631" ref="frameRef" class="Pixso-frame-1_631">
            <div id="1_632" class="Pixso-vector-1_632"></div>
            <div id="1_633" class="Pixso-vector-1_633"></div>
            <div id="1_636" class="Pixso-vector-1_636"></div>
            <p id="1_639" class="Pixso-paragraph-1_639">{{ "四川飞豹救援" }}</p>
            <p id="1_640" class="Pixso-paragraph-1_640">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_649" class="Pixso-vector-1_649"></div>
            <div id="1_650" class="Pixso-vector-1_650"></div>
            <router-link to="/" id="17_1" class="Pixso-vector-17_1" style="cursor: pointer;"></router-link>
            <router-link id="1_662" to="/party-building" class="Pixso-paragraph-1_662 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <router-link id="1_663" to="/info-public" class="Pixso-paragraph-1_663 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="1_664" to="/dynamic-news" class="Pixso-paragraph-1_664 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="1_665" to="/policy-regulations" class="Pixso-paragraph-1_665 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <router-link id="1_666" to="/query-system" class="Pixso-paragraph-1_666 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>
            <router-link id="1_667" to="/overview-info" class="Pixso-paragraph-1_667 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <p id="1_668" class="Pixso-paragraph-1_668">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/team-building" style="color: inherit; text-decoration: none;">队伍建设</router-link> > 关于队伍
            </p>
            <router-link id="1_669" to="/team-building" class="Pixso-paragraph-1_669 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <div id="1_677" class="Pixso-vector-1_677"></div>
            <div id="1_678" class="Pixso-vector-1_678"></div>
            <div id="1_679" class="Pixso-vector-1_679"></div>
            <div id="1_680" class="Pixso-vector-1_680"></div>
            <div id="1_681" class="Pixso-vector-1_681"></div>
            <p id="1_682" class="Pixso-paragraph-1_682">{{ "TBDEV" }}</p>
            <p id="1_683" class="Pixso-paragraph-1_683">{{ "队伍建设" }}</p>
            <router-link to="/team-building/about" id="1_684" class="Pixso-paragraph-1_684">
                {{ "关于队伍                          >" }}
            </router-link>
            <router-link to="/team-building/cases" id="1_685" class="Pixso-paragraph-1_685">{{ "救援案例" }}</router-link>
            <router-link to="/team-building/showcase" id="1_686" class="Pixso-paragraph-1_686">{{ "队伍风采" }}</router-link>
            <div id="1_687" class="Pixso-vector-1_687"></div>
            <div id="1_688" class="Pixso-vector-1_688"></div>
            <div id="team-about-rich-text" class="team-about-rich-text" v-html="aboutRichHtml"></div>
            <div id="1_694" class="Pixso-vector-1_694"></div>
            <div id="33_120" class="Pixso-group-33_120" @click.stop>
                <div id="33_121" class="Pixso-vector-33_121"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_123"
                    class="Pixso-vector-33_123"
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
import { ref, onMounted } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { getTeamAbout } from '@/api/team-building'
import { useRouter } from 'vue-router'
import { usePixsoScale } from '@/composables/use-pixso-scale'
import { sanitizeRichText } from '@/utils/rich-text'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1872)
const router = useRouter()

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

const defaultAboutHtml = sanitizeRichText([
  '四川飞豹救援坚持人民至上、生命至上，围绕综合应急救援、专业训练、装备保障和社会服务持续提升队伍能力。',
  '队伍常态化开展山地、水域、高空、地震等专业训练，积极参与突发事件应急处置和安全宣传。',
  '队伍建立专业化训练体系，配备救援车辆、通信装备、绳索装备、水域救援装备和医疗急救器材，持续提升复杂环境下的快速响应和协同处置能力。'
].join('\n\n'))
const aboutRichHtml = ref(defaultAboutHtml)

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

const fetchTeamAbout = async () => {
  try {
    const res = await getTeamAbout()
    const content = res.data?.content || res.data?.description || ''
    aboutRichHtml.value = sanitizeRichText(content) || defaultAboutHtml
  } catch (error) {
    // 保留默认文案，避免接口异常时页面空白。
  }
}

onMounted(() => {
  fetchWebsiteConfig()
  fetchTeamAbout()
})

</script>
<style>
.scroll-container-1_631 {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.Pixso-frame-1_631 {
    width: 1920px;
    height: 1872px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_632 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_632.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_633 {
    width: 100%;
    height: 10.36%;
    background-image: url(@/assets/images/Vector_1_633.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 89.64%;
}
.Pixso-vector-1_636 {
    width: 6.72%;
    height: 6.89%;
    background-image: url(@/assets/images/Vector_1_636.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.76%;
    bottom: 91.35%;
}
.Pixso-paragraph-1_639 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 2.83%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.1%;
    bottom: 94.07%;
}
.Pixso-paragraph-1_640 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.28%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 6.41%;
    bottom: 92.31%;
}
.Pixso-vector-1_649 {
    width: 100%;
    height: 3.74%;
    background-image: url(@/assets/images/Vector_1_649.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 10.36%;
    bottom: 85.9%;
}
.Pixso-vector-1_650 {
    width: 204px;
    height: 3.74%;
    background-image: url(@/assets/images/Vector_1_650.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 10.36%;
    bottom: 85.9%;
    transform: translateX(calc(-50% + -391px));
}
.Pixso-vector-17_1 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_662 {
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
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_663 {
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
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_664 {
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
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_665 {
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
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_666 {
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
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_667 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 17%;
    right: 79.69%;
    top: 11.59%;
    bottom: 87.07%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_668 {
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
    top: 15.6%;
    bottom: 83.33%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_669 {
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
    top: 11.59%;
    bottom: 87.07%;
    transform: translateX(calc(-50% + -394px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_677 {
    width: 18.39%;
    height: 8.71%;
    background-image: url(@/assets/images/Vector_1_677.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 18.11%;
    bottom: 73.18%;
}
.Pixso-vector-1_678 {
    width: 18.39%;
    height: 6.14%;
    background-image: url(@/assets/images/Vector_1_678.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 26.82%;
    bottom: 67.04%;
}
.Pixso-vector-1_679 {
    width: 18.39%;
    height: 6.15%;
    background-image: url(@/assets/images/Vector_1_679.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 33.01%;
    bottom: 60.84%;
}
.Pixso-vector-1_680 {
    width: 18.39%;
    height: 6.14%;
    background-image: url(@/assets/images/Vector_1_680.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 39.21%;
    bottom: 54.65%;
}
.Pixso-vector-1_681 {
    width: 18.39%;
    height: 36.80%;
    background-image: url(@/assets/images/Vector_1_681.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.57%;
    right: 76.04%;
    top: 45.41%;
    bottom: 17.04%;
}
.Pixso-paragraph-1_682 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 13.12%;
    height: 4%;
    position: absolute;
    left: 9.69%;
    right: 77.19%;
    top: 20.57%;
    bottom: 75.43%;
    opacity: 0.5;
}
.Pixso-paragraph-1_683 {
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
    top: 20.25%;
    bottom: 77.08%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_684 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre;
    width: 11.77%;
    height: 1.07%;
    position: absolute;
    left: 8.39%;
    right: 79.84%;
    top: 29.27%;
    bottom: 69.66%;
}
.Pixso-paragraph-1_685 {
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
    top: 35.52%;
    bottom: 63.41%;
}
.Pixso-paragraph-1_686 {
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
    top: 41.72%;
    bottom: 57.21%;
}
.Pixso-vector-1_687 {
    width: 0.2%;
    height: 1.23%;
    background-image: url(@/assets/images/Vector_1_687.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.71%;
    right: 92.24%;
    top: 29.22%;
    bottom: 69.55%;
}
.Pixso-vector-1_688 {
    width: 68.34%;
    height: 64%;
    background-image: url(@/assets/images/Vector_1_688.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.83%;
    right: 5.83%;
    top: 18.11%;
    bottom: 17.04%;
}
.team-about-rich-text {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 34px;
    color: rgba(132, 132, 132, 1);
    width: 64.12%;
    max-height: 58%;
    overflow: hidden;
    position: absolute;
    left: 28.02%;
    right: 7.86%;
    top: 20.83%;
}
.team-about-rich-text p {
    margin: 0 0 30px;
}
.team-about-rich-text img {
    display: block;
    width: 100%;
    max-height: 535px;
    object-fit: cover;
    margin: 28px 0 34px;
}
.Pixso-vector-1_694 {
    width: 2.14%;
    height: 2.25%;
    background-image: url(@/assets/images/Boolean_operation_1_694.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.55%;
    right: 90.31%;
    top: 20.67%;
    bottom: 77.08%;
}
.Pixso-group-33_120 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1470.001953125px;
    top: 90px;
}
.Pixso-vector-33_121 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_121.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_122 {
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
.Pixso-vector-33_123 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_123.png);
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
    top: 1647px;
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
