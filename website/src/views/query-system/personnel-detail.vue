<template>
    <div ref="scrollContainerRef" class="scroll-container-1_3073" v-loading="detailLoading">
        <div id="1_3073" ref="frameRef" class="Pixso-frame-1_3073">
            <div id="1_3074" class="Pixso-vector-1_3074"></div>
            <div id="1_3075" class="Pixso-vector-1_3075"></div>
            <div id="1_3078" class="Pixso-vector-1_3078"></div>
            <p id="1_3081" class="Pixso-paragraph-1_3081">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_3082" class="Pixso-paragraph-1_3082">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <p id="1_3091" class="Pixso-paragraph-1_3091">
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/personnel" class="query-breadcrumb-link">内部查询系统</router-link> > <span class="query-breadcrumb-current">人员详情</span>
            </p>
            <div id="1_3092" class="Pixso-vector-1_3092"></div>
            <p id="1_3094" class="Pixso-paragraph-1_3094">
                {{ display?.teamLine ?? '—' }}
            </p>
            <p id="1_3095" class="Pixso-paragraph-1_3095">{{ display?.name ?? '—' }}</p>
            <div id="1_3096" class="Pixso-vector-1_3096"></div>
            <p id="1_3097" class="Pixso-paragraph-1_3097">{{ "人员编号：" }}</p>
            <p id="1_3098" class="Pixso-paragraph-1_3098">{{ "联系电话：" }}</p>
            <p id="1_3099" class="Pixso-paragraph-1_3099">
                {{ "职       务：" }}
            </p>
            <p id="1_3100" class="Pixso-paragraph-1_3100">{{ "任务次数：" }}</p>
            <p id="1_3101" class="Pixso-paragraph-1_3101">{{ "培训时长：" }}</p>
            <p id="1_3102" class="Pixso-paragraph-1_3102">{{ "当前状态：" }}</p>
            <p id="1_3103" class="Pixso-paragraph-1_3103">
                {{ "姓       名：" }}
            </p>
            <p id="1_3104" class="Pixso-paragraph-1_3104">{{ "工作单位：" }}</p>
            <p id="1_3105" class="Pixso-paragraph-1_3105">{{ "入职日期：" }}</p>
            <p id="1_3106" class="Pixso-paragraph-1_3106">{{ "身份证号：" }}</p>
            <p id="1_3107" class="Pixso-paragraph-1_3107">{{ "所属部门：" }}</p>
            <p id="1_3108" class="Pixso-paragraph-1_3108">{{ "电子邮箱：" }}</p>
            <p id="1_3109" class="Pixso-paragraph-1_3109">{{ display?.personnelCode ?? '—' }}</p>
            <p id="1_3110" class="Pixso-paragraph-1_3110">
                {{ display?.phone ?? '—' }}
            </p>
            <p id="1_3111" class="Pixso-paragraph-1_3111">{{ display?.position ?? '—' }}</p>
            <p id="1_3112" class="Pixso-paragraph-1_3112">{{ display ? `${display.taskCount}次` : '—' }}</p>
            <p id="1_3113" class="Pixso-paragraph-1_3113">{{ display ? `${display.trainingHours}小时` : '—' }}</p>
            <p v-if="display" class="personnel-detail-status-value">{{ display.statusLabel }}</p>
            <p id="1_3114" class="Pixso-paragraph-1_3114">{{ display?.name ?? '—' }}</p>
            <p id="1_3115" class="Pixso-paragraph-1_3115">
                {{ display?.workUnit ?? '—' }}
            </p>
            <p id="1_3116" class="Pixso-paragraph-1_3116">{{ display?.joinDate ?? '—' }}</p>
            <p id="1_3117" class="Pixso-paragraph-1_3117">
                {{ display?.idCard ?? '—' }}
            </p>
            <p id="1_3118" class="Pixso-paragraph-1_3118">{{ display?.dept ?? '—' }}</p>
            <p id="1_3119" class="Pixso-paragraph-1_3119">
                {{ display?.email ?? '—' }}
            </p>
            <div id="1_3120" class="Pixso-vector-1_3120"></div>
            <div id="1_3132" class="Pixso-vector-1_3132"></div>
            <router-link to="/" id="17_25" class="Pixso-vector-17_25" style="cursor: pointer;"></router-link>
            <div id="33_255" class="Pixso-group-33_255" @click.stop>
            <div id="33_256" class="Pixso-vector-33_256"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_258"
                class="Pixso-vector-33_258"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <router-link id="33_777" to="/overview-info" class="Pixso-paragraph-33_777 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <router-link id="33_778" to="/team-building" class="Pixso-paragraph-33_778 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <router-link id="33_780" to="/party-building" class="Pixso-paragraph-33_780 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <router-link id="33_779" to="/info-public" class="Pixso-paragraph-33_779 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="33_781" to="/dynamic-news" class="Pixso-paragraph-33_781 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="33_782" to="/policy-regulations" class="Pixso-paragraph-33_782 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <router-link id="33_784" to="/query-system" class="Pixso-paragraph-33_784 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>

          <!-- 底部信息（与查询系统首页一致） -->
          <div id="1_113" class="Pixso-vector-1_113 query-footer-bg" :style="queryFooterBgStyle"></div>
          <div id="32_8" class="Pixso-group-32_8 query-footer-info" :style="queryFooterInfoStyle">
              <p id="1_118" class="Pixso-paragraph-1_118 query-footer-line query-footer-line-1" :style="queryFooterLineStyles.line1">
                  {{ websiteConfig.host_unit }}
              </p>
              <p id="1_119" class="Pixso-paragraph-1_119 query-footer-line query-footer-line-2" :style="queryFooterLineStyles.line2">
                  {{ websiteConfig.organizer_unit }}
              </p>
              <p id="1_120" class="Pixso-paragraph-1_120 query-footer-line query-footer-line-3" :style="queryFooterLineStyles.line3">
                  {{ websiteConfig.icp_number }}
              </p>
              <p id="1_121" class="Pixso-paragraph-1_121 query-footer-line query-footer-line-4" :style="queryFooterLineStyles.line4">
                  {{ websiteConfig.copyright }}
              </p>
                                      </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getWebsiteConfig } from '@/api/config'
import { getPersonnelDetail } from '@/api/query'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1444)
const router = useRouter()
const route = useRoute()

const personnel = ref<Record<string, unknown> | null>(null)
const detailLoading = ref(false)

function formatYmd(v: string | Date | null | undefined): string {
  if (v == null || v === '') return '—'
  const s = typeof v === 'string' ? v : (v as Date).toISOString?.() || String(v)
  return s.includes('T') ? s.slice(0, 10) : s.slice(0, 10)
}

const display = computed(() => {
  const d = personnel.value
  if (!d) return null
  return {
    teamLine: String(d.team || d.workUnit || '—'),
    name: String(d.name || '—'),
    personnelCode: String(d.personnelCode || '—'),
    phone: String(d.phone || '—'),
    position: String(d.position || '—'),
    taskCount: Number(d.taskCount ?? 0),
    trainingHours: Number(d.trainingHours ?? 0),
    statusLabel: Number(d.status) === 1 ? '在职' : '离职',
    workUnit: String(d.workUnit || '—'),
    joinDate: formatYmd(d.joinDate as string | Date | undefined),
    idCard: String(d.idCard || '—'),
    dept: String(d.team || '—'),
    email: String(d.email || '—'),
  }
})

async function loadPersonnel() {
  const raw = route.params.id
  const id = Number(Array.isArray(raw) ? raw[0] : raw)
  if (!Number.isFinite(id)) {
    ElMessage.error('无效的人员编号')
    router.back()
    return
  }
  detailLoading.value = true
  personnel.value = null
  try {
    const res = await getPersonnelDetail(id)
    if (res.code === 200 && res.data) {
      personnel.value = res.data as Record<string, unknown>
    } else {
      ElMessage.warning('未找到该人员信息')
      router.back()
    }
  } catch {
    router.back()
  } finally {
    detailLoading.value = false
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

const queryFooterBgStyle = {
  top: 'auto',
  bottom: '0',
  height: '340px',
  zIndex: '1'
}

const queryFooterInfoStyle = {
  top: 'auto',
  bottom: '85px',
  zIndex: '2'
}

const queryFooterLineStyles = {
  line1: { left: '50%', top: '0%', transform: 'translateX(calc(-50% + 0.5px))' },
  line2: { left: '50%', top: '29.41%', transform: 'translateX(calc(-50% + 0.5px))' },
  line3: { left: '50%', top: '58.82%', transform: 'translateX(calc(-50% + 0.5px))' },
  line4: { left: '50%', top: '88.24%', transform: 'translateX(calc(-50% + 0.5px))' }
}

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

watch(
  () => route.params.id,
  () => {
    loadPersonnel()
  },
  { immediate: true }
)

onMounted(() => {
  fetchWebsiteConfig()
})

</script>
<style>
.scroll-container-1_3073 {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}
.Pixso-frame-1_3073 {
    width: 1920px;
    height: 1444px;
    overflow: visible;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_3074 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_3074.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_3075 {
    width: 100%;
    height: 13.63%;
    background-image: url(@/assets/images/Vector_1_3075.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 86.37%;
}
.Pixso-vector-1_3078 {
    width: 6.72%;
    height: 9.06%;
    background-image: url(@/assets/images/Vector_1_3078.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.32%;
    bottom: 88.62%;
}
.Pixso-paragraph-1_3081 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.72%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 4.08%;
    bottom: 92.2%;
}
.Pixso-paragraph-1_3082 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.69%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 8.43%;
    bottom: 89.88%;
}
.Pixso-paragraph-1_3091 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 74.48%;
    top: 20.73%;
    bottom: 77.86%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_3092 {
    width: 88.48%;
    height: 47.05%;
    background-image: url(@/assets/images/Vector_1_3092.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.63%;
    right: 5.89%;
    top: 27%;
    bottom: 18.95%;
}
.Pixso-paragraph-1_3094 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(53, 120, 248, 1);
    width: 7.4%;
    height: 1.41%;
    position: absolute;
    left: 15.26%;
    right: 77.34%;
    top: 64.76%;
    bottom: 33.83%;
}
.Pixso-paragraph-1_3095 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 3.96%;
    height: 1.75%;
    position: absolute;
    left: 16.98%;
    right: 79.06%;
    top: 61.26%;
    bottom: 36.99%;
}
.Pixso-vector-1_3096 {
    width: 13%;
    height: 23%;
    background-image: url(@/assets/images/Vector_1_3096.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 11.97%;
    right: 75.03%;
    top: 34.76%;
    bottom: 42.24%;
}
.Pixso-paragraph-1_3097 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 32.24%;
    right: 62.45%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3098 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 32.24%;
    right: 62.45%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3099 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    white-space: pre-wrap;
    width: 5.26%;
    height: 1.4%;
    position: absolute;
    left: 32.24%;
    right: 62.5%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-paragraph-1_3100 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 32.24%;
    right: 62.45%;
    top: 59.73%;
    bottom: 38.87%;
}
.Pixso-paragraph-1_3101 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 51.98%;
    right: 42.71%;
    top: 59.73%;
    bottom: 38.87%;
}
.Pixso-paragraph-1_3102 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 71.3%;
    right: 23.39%;
    top: 59.73%;
    bottom: 38.87%;
}
.Pixso-paragraph-1_3103 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    white-space: pre-wrap;
    width: 5.26%;
    height: 1.4%;
    position: absolute;
    left: 51.88%;
    right: 42.86%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3104 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 51.88%;
    right: 42.81%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3105 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 51.88%;
    right: 42.81%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-paragraph-1_3106 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 71.3%;
    right: 23.39%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3107 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 71.3%;
    right: 23.39%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3108 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.4%;
    position: absolute;
    left: 71.3%;
    right: 23.39%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-paragraph-1_3109 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.52%;
    height: 1.4%;
    position: absolute;
    left: 37.45%;
    right: 57.03%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3110 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 6.51%;
    height: 1.4%;
    position: absolute;
    left: 37.45%;
    right: 56.04%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3111 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 3.23%;
    height: 1.4%;
    position: absolute;
    left: 37.45%;
    right: 59.32%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-paragraph-1_3112 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 2.91%;
    height: 1.4%;
    position: absolute;
    left: 37.45%;
    right: 59.64%;
    top: 59.73%;
    bottom: 38.87%;
}
.Pixso-paragraph-1_3113 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 3.96%;
    height: 1.4%;
    position: absolute;
    left: 57.45%;
    right: 38.59%;
    top: 59.73%;
    bottom: 38.87%;
}
.Pixso-paragraph-1_3114 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 3.23%;
    height: 1.4%;
    position: absolute;
    left: 57.45%;
    right: 39.32%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3115 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 7.39%;
    height: 1.4%;
    position: absolute;
    left: 57.45%;
    right: 35.16%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3116 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.99%;
    height: 1.4%;
    position: absolute;
    left: 57.45%;
    right: 36.56%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-paragraph-1_3117 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 10.99%;
    height: 1.4%;
    position: absolute;
    left: 76.51%;
    right: 12.5%;
    top: 34.75%;
    bottom: 63.85%;
}
.Pixso-paragraph-1_3118 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 4.27%;
    height: 1.4%;
    position: absolute;
    left: 76.51%;
    right: 19.22%;
    top: 42.41%;
    bottom: 56.19%;
}
.Pixso-paragraph-1_3119 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 10.42%;
    height: 1.4%;
    position: absolute;
    left: 76.51%;
    right: 13.07%;
    top: 50.07%;
    bottom: 48.53%;
}
.Pixso-vector-1_3120 {
    width: 2.8%;
    height: 2.1%;
    background-image: url(@/assets/images/Vector_1_3120.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 76.56%;
    right: 20.64%;
    top: 59.66%;
    bottom: 38.24%;
}
.Pixso-vector-1_3132 {
    width: 100%;
    height: 4.92%;
    background-image: url(@/assets/images/Vector_1_3132.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 13.7%;
    bottom: 81.38%;
}
.Pixso-vector-17_25 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_25.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 195px;
}
.Pixso-group-33_255 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1412px;
    top: 77px;
}
.Pixso-vector-33_256 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_256.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_257 {
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
.Pixso-vector-33_258 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_258.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-paragraph-33_777 {
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
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + -595px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_778 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + -391px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_779 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_780 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_781 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_782 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-33_783 {
    width: 204px;
    height: 4.92%;
    background-image: url(@/assets/images/Vector_33_783.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 13.63%;
    bottom: 81.45%;
    transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_784 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 15.25%;
    bottom: 82.99%;
    transform: translateX(calc(-50% + 627px));
    white-space: pre;
    flex-grow: 0;
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

.query-footer-bg {
  height: 340px;
  top: auto;
  z-index: 1;
}

.query-footer-info {
  top: auto;
  bottom: 85px;
  z-index: 2;
}

.query-footer-line {
  left: 50%;
  transform: translateX(calc(-50% + 0.5px));
}

.query-footer-line-1 {
  top: 0%;
}
.query-footer-line-2 {
  top: 29.41%;
}
.query-footer-line-3 {
  top: 58.82%;
}
.query-footer-line-4 {
  top: 88.24%;
}

/* 「当前状态」取值（与 Pixso 第四列任务/培训行对齐） */
.personnel-detail-status-value {
  position: absolute;
  left: 76.51%;
  right: 13.07%;
  top: 59.73%;
  bottom: 38.87%;
  font-size: 20px;
  font-family: "FZHei-B01S-Regular", sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: rgba(70, 70, 70, 1);
  margin: 0;
  white-space: nowrap;
}

/* 人员详情字段值：单行不换行，不使用省略号 */
.Pixso-frame-1_3073 .Pixso-paragraph-1_3109,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3110,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3111,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3112,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3113,
.Pixso-frame-1_3073 .personnel-detail-status-value,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3114,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3115,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3116,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3117,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3118,
.Pixso-frame-1_3073 .Pixso-paragraph-1_3119 {
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  width: auto !important;
  height: auto !important;
}
</style>
