<template>
  <div ref="scrollContainerRef" class="query-system-index-page query-system-index-scroll scroll-container-1_2975">
      <div ref="frameRef" id="1_2975" class="query-system-index-frame Pixso-frame-1_2975">
          <div id="1_2976" class="Pixso-vector-1_2976"></div>
          <div id="1_2977" class="Pixso-vector-1_2977"></div>
          <div class="query-nav-blue-bar" aria-hidden="true"></div>
          <router-link to="/" id="17_16" class="Pixso-vector-17_16" style="cursor: pointer;"></router-link>
          <div id="1_2980" class="Pixso-vector-1_2980"></div>
          <p id="1_2983" class="Pixso-paragraph-1_2983">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_2984" class="Pixso-paragraph-1_2984">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <p id="1_3000" class="Pixso-paragraph-1_3000">
              当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <span class="query-breadcrumb-current">内部查询系统</span>
          </p>
          <div id="1_3008" class="Pixso-vector-1_3008"></div>
          <router-link to="/query-system/vehicle" class="Pixso-group-17_19 query-tab-link">
              <div id="1_3002" class="Pixso-vector-1_3002"></div>
              <p id="1_3006" class="Pixso-paragraph-1_3006">
                  {{ "车辆管理系统" }}
              </p>
              <div id="1_3011" class="Pixso-vector-1_3011"></div>
          </router-link>
          <router-link to="/query-system/personnel" class="Pixso-group-17_18 query-tab-link query-tab-active">
              <div id="1_3003" class="Pixso-vector-1_3003"></div>
              <div id="1_3004" class="Pixso-vector-1_3004"></div>
              <p id="1_3007" class="Pixso-paragraph-1_3007">
                  {{ "内部管理系统" }}
              </p>
              <div id="1_3027" class="Pixso-vector-1_3027"></div>
          </router-link>
          <router-link to="/query-system/certificate" class="Pixso-group-17_17 query-tab-link">
              <div id="1_3001" class="Pixso-vector-1_3001"></div>
              <p id="1_3005" class="Pixso-paragraph-1_3005">
                  {{ "证书管理系统" }}
              </p>
              <div id="1_3038" class="Pixso-vector-1_3038"></div>
          </router-link>
          <div id="1_3046" class="Pixso-vector-1_3046"></div>
          <div id="1_3047" class="Pixso-text-1_3047">
              <p id="1_3047_0" class="Pixso-paragraph-1_3047_0">
                  <span id="1_3047_0_1" class="Pixso-span-1_3047_0_1">{{
                      "查询"
                  }}</span>
              </p>
              <p id="1_3047_1" class="Pixso-paragraph-1_3047_1">
                  <span id="1_3047_1_1" class="Pixso-span-1_3047_1_1">{{
                      "系统"
                  }}</span>
              </p>
          </div>
          <div id="1_3048" class="Pixso-vector-1_3048"></div>
          <p id="1_3049" class="Pixso-paragraph-1_3049">
              {{ "内部管理系统" }}
          </p>
          <div id="1_3050" class="Pixso-vector-1_3050"></div>
          <el-input v-model="formData.name" placeholder="姓名" class="personnel-input personnel-input-name" clearable />
          <el-input v-model="formData.idCard" placeholder="身份证号码" class="personnel-input personnel-input-idcard" clearable />
          <el-input v-model="formData.personnelId" placeholder="人员编号" class="personnel-input personnel-input-personnelid" clearable />
          <p id="1_3056_personnelid" class="Pixso-paragraph-1_3056_personnelid">{{ "人员编号" }}</p>
          <div
            id="1_3057"
            class="Pixso-vector-1_3057 personnel-query-btn"
            role="button"
            tabindex="0"
            @click="handleQuery"
            @keydown.enter="handleQuery"
          ></div>
          <div id="6_752" class="Pixso-vector-6_752"></div>
          <div id="33_219" class="Pixso-group-33_219" @click.stop>
            <div id="33_220" class="Pixso-vector-33_220"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_222"
                class="Pixso-vector-33_222"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
          <router-link id="33_645" to="/overview-info" class="Pixso-paragraph-33_645 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
          <router-link id="33_646" to="/team-building" class="Pixso-paragraph-33_646 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
          <router-link id="33_648" to="/party-building" class="Pixso-paragraph-33_648 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
          <router-link id="33_647" to="/info-public" class="Pixso-paragraph-33_647 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
          <router-link id="33_649" to="/dynamic-news" class="Pixso-paragraph-33_649 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
          <router-link id="33_650" to="/policy-regulations" class="Pixso-paragraph-33_650 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
          <div id="1_2497" class="Pixso-vector-1_2497"></div>
          <div id="1_2498" class="Pixso-vector-1_2498"></div>
          <div id="1_2499" class="Pixso-vector-1_2499 nav-underline-hide"></div>
          <router-link id="33_652" to="/query-system" class="Pixso-paragraph-33_652 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>

          <!-- 底部信息 -->
          <div id="1_113" class="Pixso-vector-1_113"></div>
          <div id="32_8" class="Pixso-group-32_8">
              <p id="1_118" class="Pixso-paragraph-1_118">
                  {{ "主办单位:四川飞豹救援" }}
              </p>
              <p id="1_119" class="Pixso-paragraph-1_119">
                  {{ "承办单位:四川飞豹救援新闻宣传处" }}
              </p>
                                      </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePixsoScale } from '@/composables/use-pixso-scale'
import { getWebsiteConfig } from '@/api/config'
import { ElMessage } from 'element-plus'
import type { PersonnelQueryParams, PersonnelInfo } from '@/types/query'
import { queryPersonnel } from '@/api/query'

const router = useRouter()
const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1444)

const formData = ref({ name: '', idCard: '', personnelId: '' })
const loading = ref(false)

const tips = '请核对查询条件，或联系管理员确认人员是否已备案，也可查看历史查询记录。'

async function handleQuery() {
  if (loading.value) return

  const name = formData.value.name.trim()
  const idCard = formData.value.idCard.trim().replace(/\s/g, '')
  const personnelId = formData.value.personnelId.trim()

  // 至少需要填写一项
  if (!name && !idCard && !personnelId) {
    ElMessage.warning('请至少填写一项查询条件')
    return
  }

  // 优先使用身份证号查询
  if (!idCard) {
    ElMessage.warning('请输入身份证号码进行查询')
    return
  }

  loading.value = true
  try {
    const res = await queryPersonnel(idCard)

    if (res.code === 200 && res.data) {
      // 查询成功，跳转到详情页
      router.push({ path: `/query-system/personnel/detail/${res.data.id}` })
    } else {
      ElMessage.warning({ message: `未找到匹配的人员信息。${tips}`, duration: 6000, showClose: true })
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      ElMessage.warning({ message: `未找到匹配的人员信息。${tips}`, duration: 6000, showClose: true })
    } else {
      ElMessage.error('系统查询异常，请稍后重试。')
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
.scroll-container-1_2975 {
  width: 100%;
  overflow: hidden;
  position: relative;
}
/* 主框架 - 与证书页 1_2406 一致 */
.Pixso-frame-1_2975 {
  width: 1920px;
  height: 1444px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_2976 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2976.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
/* 顶部头部区域 - 与证书页 1_2408 一致，避免蓝条高度偏移 */
.Pixso-vector-1_2977 {
  width: 100%;
  height: 13.43%;
  background-image: url(@/assets/images/Vector_1_2977.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 86.57%;
}
/* 主导航蓝条 - 与证书页 1_2411 完全一致（位置高度与证书查询系统相同） */
.query-nav-blue-bar {
  width: 100%;
  height: 4.85%;
  background-image: url(@/assets/images/Vector_1_2411.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 13.43%;
  bottom: 81.72%;
}
/* 左侧 LOGO - 与证书页 1_2416 一致 */
.Pixso-vector-1_2980 {
  width: 6.72%;
  height: 8.93%;
  background-image: url(@/assets/images/Vector_1_2980.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 2.29%;
  bottom: 88.78%;
}
/* 左侧名称（中文）- 与证书页 1_2419 一致 */
.Pixso-paragraph-1_2983 {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 3.67%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 4.02%;
  bottom: 92.31%;
}
/* 左侧名称（英文）- 与证书页 1_2420 一致 */
.Pixso-paragraph-1_2984 {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.66%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 8.31%;
  bottom: 90.03%;
}
.Pixso-vector-1_2993 {
  width: 100%;
  height: 19.44%;
  background-image: url(@/assets/images/Vector_1_2993.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 80.56%;
  bottom: 0%;
}
/* 面包屑 - 与证书页 1_2436 一致 */
.Pixso-paragraph-1_3000 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 5.83%;
  right: 79.69%;
  top: 20.43%;
  bottom: 78.19%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-vector-1_3008 {
  width: 0.59%;
  height: 0.1%;
  background-image: url(@/assets/images/Boolean_operation_1_3008.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.32%;
  right: 38.09%;
  top: 30.53%;
  bottom: 69.37%;
}
.Pixso-group-17_19 {
  width: 273px;
  height: 85px;
  position: absolute;
  left: 1137px;
  top: 391px;
}
.Pixso-vector-1_3002 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_3002.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_3006 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 127, 243, 1);
  width: 55.67%;
  height: 29.42%;
  position: absolute;
  left: 28.21%;
  right: 16.12%;
  top: 35.29%;
  bottom: 35.29%;
}
.Pixso-vector-1_3011 {
  width: 13.75%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_3011.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 9.99%;
  right: 76.26%;
  top: 28.55%;
  bottom: 27.28%;
}
.Pixso-group-17_18 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 881px;
  top: 395px;
}
.Pixso-vector-1_3003 {
  width: 100%;
  height: 56.47%;
  background-image: url(@/assets/images/Vector_1_3003.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 43.53%;
}
.Pixso-vector-1_3004 {
  width: 100%;
  height: 43.53%;
  background-image: url(@/assets/images/Vector_1_3004.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 56.47%;
  bottom: 0%;
}
.Pixso-paragraph-1_3007 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(251, 246, 71, 1);
  width: 59.37%;
  height: 29.41%;
  position: absolute;
  left: 30.08%;
  right: 10.55%;
  top: 32.94%;
  bottom: 37.65%;
}
.Pixso-vector-1_3027 {
  width: 14.67%;
  height: 44.18%;
  background-image: url(@/assets/images/Vector_1_3027.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.45%;
}
.Pixso-group-17_17 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 625px;
  top: 395px;
}
.Pixso-vector-1_3001 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_3001.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_3005 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 127, 243, 1);
  width: 59.37%;
  height: 29.42%;
  position: absolute;
  left: 30.08%;
  right: 10.55%;
  top: 35.29%;
  bottom: 35.29%;
}
.Pixso-vector-1_3038 {
  width: 14.67%;
  height: 44.18%;
  background-image: url(@/assets/images/Vector_1_3038.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.45%;
}
.Pixso-vector-1_3046 {
  width: 6.09%;
  height: 5.91%;
  background-image: url(@/assets/images/Vector_1_3046.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.46%;
  right: 67.45%;
  top: 27.15%;
  bottom: 66.94%;
}
.Pixso-text-1_3047 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: Regular;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: 2.76%;
  height: 3.48%;
  position: absolute;
  left: 28.13%;
  right: 69.11%;
  top: 28.26%;
  bottom: 68.26%;
}
.Pixso-paragraph-1_3047_0 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_3047_0_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_3047_1 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_3047_1_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-vector-1_3048 {
  width: 46.98%;
  height: 39.38%;
  background-image: url(@/assets/images/Vector_1_3048.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.56%;
  right: 26.46%;
  top: 34.93%;
  bottom: 25.69%;
}
/* 表单标题 - 与证书/车辆页中间对齐 */
.Pixso-paragraph-1_3049 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 127, 243, 1);
  width: 7.92%;
  height: 1.73%;
  position: absolute;
  left: 46.04%;
  right: 46.04%;
  top: 39.54%;
  bottom: 58.73%;
}
/* 输入框区域 - 与证书页中间对齐 */
.Pixso-vector-1_3050 {
  width: 19.85%;
  height: 4.02%;
  background-image: url(@/assets/images/Vector_1_3050.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 64.68%;
  bottom: 31.3%;
}
.Pixso-vector-1_3051 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3051.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 45.29%;
  bottom: 50.55%;
}
.Pixso-vector-1_3052 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3052.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 50.62%;
  bottom: 45.22%;
}
.Pixso-vector-1_3053 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3053.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 56.16%;
  bottom: 39.68%;
}
.Pixso-vector-1_3053_personnelid {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3053.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 56.16%;
  bottom: 39.68%;
}
.Pixso-paragraph-1_3054 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(94, 94, 94, 1);
  width: 6.3%;
  height: 1.38%;
  position: absolute;
  left: 40.73%;
  right: 52.97%;
  top: 46.61%;
  bottom: 52.01%;
}
.Pixso-paragraph-1_3055 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(177, 173, 173, 1);
  width: 2.19%;
  height: 1.38%;
  position: absolute;
  left: 40.73%;
  right: 57.08%;
  top: 46.61%;
  bottom: 52.01%;
}
.Pixso-paragraph-1_3056 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(177, 173, 173, 1);
  width: 5.26%;
  height: 1.38%;
  position: absolute;
  left: 40.73%;
  right: 54.01%;
  top: 51.94%;
  bottom: 46.68%;
}
.Pixso-paragraph-1_3056_personnelid {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(177, 173, 173, 1);
  width: 4.22%;
  height: 1.38%;
  position: absolute;
  left: 40.73%;
  right: 55.05%;
  top: 57.48%;
  bottom: 41.14%;
}
/* 查询按钮 - 与证书页中间对齐 */
.Pixso-vector-1_3057 {
  width: 3.33%;
  height: 1.46%;
  background-image: url(@/assets/images/Vector_1_3057.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  right: auto;
  top: 66.22%;
  bottom: 32.32%;
  transform: translateX(-50%);
}
/* 主导航背景蓝条辅助层 - 必须 position:absolute 与 query-nav-blue-bar 一致，避免高度偏移 */
.Pixso-vector-6_752 {
  width: 100%;
  height: 4.85%;
  background-image: url(@/assets/images/Vector_6_752.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 13.43%;
  bottom: 81.72%;
}
/* 主导航红色方块图标 - 与证书页 17_12 一致，保证显示且不被遮挡 */
.Pixso-vector-17_16 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_12.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
  z-index: 10;
}
/* 右侧搜索框 - 与证书页 33_210 一致 */
.Pixso-group-33_219 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1472px;
  top: 90px;
}
.Pixso-vector-33_220 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_220.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_221 {
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
.Pixso-vector-33_222 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_222.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 85.21%;
  right: 7.4%;
  top: 50%;
  transform: translateY(calc(-50% + 0.5px));
}
/* 概况信息 - 与证书页一致，七项主导航统一无 text-align 以对齐 */
.Pixso-paragraph-33_645 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + -595px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_646 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + -391px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_647 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + 17px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_648 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + -187px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_649 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + 221px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_650 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + 425px));
  white-space: pre;
  flex-grow: 0;
}
/* 查询系统板块背景条 - 与证书页 1_2499 一致 */
.Pixso-vector-33_651 {
  width: 204px;
  height: 4.85%;
  background-image: url(@/assets/images/Vector_33_651.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 13.43%;
  bottom: 81.72%;
  transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_652 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + 627px));
  white-space: pre;
  flex-grow: 0;
}
.query-tab-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
}
.query-tab-link:hover {
  opacity: 0.92;
}
/* 内部人员查询输入框 */
.personnel-input {
  position: absolute;
  left: 40.05%;
  width: 19.85%;
  height: 52px;
  z-index: 100;
}
.personnel-input-name { top: 45.29%; }
.personnel-input-idcard { top: 50.62%; }
.personnel-input-personnelid { top: 56.16%; }
.personnel-input :deep(.el-input__wrapper) {
  background-color: #fff !important;
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
  height: 100% !important;
}
.personnel-input :deep(.el-input__inner) {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  color: rgba(177, 173, 173, 1);
}
.personnel-query-btn {
  cursor: pointer;
  z-index: 100;
}
.personnel-query-btn:hover {
  opacity: 0.9;
}
.query-breadcrumb-link {
  color: #848484;
  text-decoration: none;
}
.query-breadcrumb-link:hover {
  opacity: 0.9;
}
.query-breadcrumb-link:active,
.query-breadcrumb-link:visited {
  text-decoration: underline;
}
.query-breadcrumb-current {
  color: inherit;
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
    height: 300px;
    background-image: url(@/assets/images/Vector_1_113.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    bottom: 65px;
    transform: translateX(calc(-50% + 0px));
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
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
