<template>
    <div ref="scrollContainerRef" class="scroll-container-1_2899">
        <div id="1_2899" ref="frameRef" class="Pixso-frame-1_2899">
            <div id="1_2900" class="Pixso-vector-1_2900"></div>
            <div id="1_2901" class="Pixso-vector-1_2901"></div>
            <div id="1_2904" class="Pixso-vector-1_2904"></div>
            <p id="1_2907" class="Pixso-paragraph-1_2907">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_2908" class="Pixso-paragraph-1_2908">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <p id="1_2920" class="Pixso-paragraph-1_2920">
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/certificate" class="query-breadcrumb-link">证书查询系统</router-link> > <router-link :to="certificateListBreadcrumbTo" class="query-breadcrumb-link">证书列表</router-link> > <span class="query-breadcrumb-current">证书详情</span>
            </p>
            <div id="1_2921" class="Pixso-vector-1_2921"></div>
            <div id="1_2922" class="Pixso-text-1_2922">{{ "&nbsp;" }}</div>
            <div id="1_2923" class="Pixso-vector-1_2923"></div>
            <div id="1_2938" class="Pixso-vector-1_2938"></div>
            <p id="1_2945" class="Pixso-paragraph-1_2945">
                {{ displayCertificateTitle }}
            </p>
            <div
                id="1_2946"
                class="Pixso-vector-1_2946"
                :class="{ 'Pixso-vector-1_2946--live-photo': !!certificatePhotoSrc }"
            ></div>
            <img
                v-if="certificatePhotoSrc"
                class="certificate-detail-photo"
                :src="certificatePhotoSrc"
                alt="证书照片"
            />
            <p id="1_2947" class="Pixso-paragraph-1_2947">{{ "证书编号：" }}</p>
            <p id="1_2948" class="Pixso-paragraph-1_2948">
                {{ certificateData?.certificateNo || '—' }}
            </p>
            <p id="1_2949" class="Pixso-paragraph-1_2949">{{ "联系电话：" }}</p>
            <p id="1_2950" class="Pixso-paragraph-1_2950">
                {{ certificateData?.phone || '—' }}
            </p>
            <p id="1_2951" class="Pixso-paragraph-1_2951">职　　务：</p>
            <p id="1_2952" class="Pixso-paragraph-1_2952">{{ certificateData?.position || '—' }}</p>
            <p id="1_2953" class="Pixso-paragraph-1_2953">{{ "有效期至：" }}</p>
            <p id="1_2954" class="Pixso-paragraph-1_2954">{{ certificateData?.expiryDate || '—' }}</p>
            <p id="1_2957" class="Pixso-paragraph-1_2957">姓　　名：</p>
            <p id="1_2958" class="Pixso-paragraph-1_2958">{{ certificateData?.name || '—' }}</p>
            <p id="1_2959" class="Pixso-paragraph-1_2959">{{ "工作单位：" }}</p>
            <p id="1_2960" class="Pixso-paragraph-1_2960">
                {{ certificateData?.workUnit || '—' }}
            </p>
            <p id="1_2961" class="Pixso-paragraph-1_2961">{{ "证书类型：" }}</p>
            <p id="1_2962" class="Pixso-paragraph-1_2962">
                {{ certificateData?.certificateType || '—' }}
            </p>
            <p id="1_2963" class="Pixso-paragraph-1_2963">{{ "所属部门：" }}</p>
            <p id="1_2964" class="Pixso-paragraph-1_2964">{{ certificateData?.department || '—' }}</p>
            <p id="1_2965" class="Pixso-paragraph-1_2965">{{ "发证日期：" }}</p>
            <p id="1_2966" class="Pixso-paragraph-1_2966">{{ certificateData?.issueDate || '—' }}</p>
            <p id="1_2967" class="Pixso-paragraph-1_2967">当前状态：{{ certificateData?.statusLabel || '—' }}</p>
            <p id="1_2968" class="Pixso-paragraph-1_2968">{{ "身份证号：" }}</p>
            <p id="1_2969" class="Pixso-paragraph-1_2969">
                {{ certificateData?.idCard || '—' }}
            </p>
            <div id="1_2970" class="Pixso-vector-1_2970"></div>
            <div id="33_246" class="Pixso-group-33_246" @click.stop>
            <div id="33_247" class="Pixso-vector-33_247"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_249"
                class="Pixso-vector-33_249"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <router-link id="33_793" to="/overview-info" class="Pixso-paragraph-33_793 main-nav-link" active-class="" exact-active-class="">概况信息</router-link>
            <router-link id="33_794" to="/team-building" class="Pixso-paragraph-33_794 main-nav-link" active-class="" exact-active-class="">队伍建设</router-link>
            <router-link id="33_796" to="/party-building" class="Pixso-paragraph-33_796 main-nav-link" active-class="" exact-active-class="">党建专栏</router-link>
            <router-link id="33_795" to="/info-public" class="Pixso-paragraph-33_795 main-nav-link" active-class="" exact-active-class="">信息公开</router-link>
            <router-link id="33_797" to="/dynamic-news" class="Pixso-paragraph-33_797 main-nav-link" active-class="" exact-active-class="">动态要闻</router-link>
            <router-link id="33_798" to="/policy-regulations" class="Pixso-paragraph-33_798 main-nav-link" active-class="" exact-active-class="">政策法规</router-link>
            <router-link id="33_800" to="/query-system" class="Pixso-paragraph-33_800 main-nav-link" active-class="" exact-active-class="">查询系统</router-link>

          <!-- 底部信息（与证书查询首页一致：拉高底图并把文案压在蓝色条内） -->
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
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { queryCertificate } from '@/api/query'
import { ElMessage } from 'element-plus'
import { getWebsiteConfig } from '@/api/config'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const { scrollContainerRef, frameRef } = usePixsoScale(1920, 1444)
const router = useRouter()
const route = useRoute()

function decodeCertRouteParam(p: unknown): string {
  const raw = Array.isArray(p) ? p[0] : p
  if (raw == null || raw === '') return ''
  const s = String(raw)
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

// 从路由参数获取证书编号（支持 encodeURIComponent 后的编号）
const certificateNo = ref(decodeCertRouteParam(route.params.certificateNo))

// 证书详情数据
const certificateData = ref<any>(null)

function formatYmd(v: string | Date | null | undefined): string {
  if (v == null || v === '') return '—'
  const s = typeof v === 'string' ? v : (v as Date).toISOString?.() || String(v)
  return s.slice(0, 10)
}

function firstPhotoUrl(photoUrl: string | null | undefined): string {
  if (!photoUrl) return ''
  const t = photoUrl.trim()
  if (!t) return ''
  try {
    const parsed = JSON.parse(t) as unknown
    if (Array.isArray(parsed) && parsed[0]) return String(parsed[0])
  } catch {
    /* 单 URL 或非 JSON */
  }
  return t
}

const certificatePhotoSrc = computed(() =>
  firstPhotoUrl(certificateData.value?.photoUrl as string | undefined)
)

const certificateListBreadcrumbTo = computed(() => ({
  path: '/query-system/certificate/list',
  query: {
    ...(route.query.name ? { name: String(route.query.name) } : {}),
    ...(route.query.idCard ? { idCard: String(route.query.idCard) } : {}),
    ...(route.query.certificateNo ? { certificateNo: String(route.query.certificateNo) } : {}),
  },
}))

const displayCertificateTitle = computed(() => {
  const d = certificateData.value
  if (!d) return '—'
  return (d.certificateName as string) || d.certificateType || '—'
})

// 获取证书详情
async function fetchCertificateDetail() {
  const no = certificateNo.value?.trim()
  if (!no) {
    ElMessage.error('缺少证书编号')
    router.back()
    return
  }
  try {
    const res = await queryCertificate(no)
    if (res.code === 200 && res.data) {
      const d = res.data as Record<string, unknown>
      certificateData.value = {
        certificateNo: d.certificateNumber,
        certificateName: d.certificateName,
        certificateType: d.certificateType,
        name: d.holderName,
        idCard: d.holderIdCard,
        issueDate: formatYmd(d.issueDate as string | Date),
        expiryDate: formatYmd(d.expiryDate as string | Date),
        phone: d.phone ?? '',
        position: d.position ?? '',
        workUnit: d.issuingAuthority,
        department: d.department ?? '',
        photoUrl: d.photoUrl,
        remark: d.remark ?? '',
        statusLabel: d.status === 1 ? '有效' : '失效'
      }
    } else {
      ElMessage.error('获取证书详情失败')
      router.back()
    }
  } catch {
    ElMessage.error('获取证书详情失败')
    router.back()
  }
}

watch(
  () => route.params.certificateNo,
  (p) => {
    const next = decodeCertRouteParam(p)
    if (!next || next === certificateNo.value) return
    certificateNo.value = next
    fetchCertificateDetail()
  }
)

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
  fetchCertificateDetail()
  fetchWebsiteConfig()
})
</script>
<style>
.scroll-container-1_2899 {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}
.Pixso-frame-1_2899 {
    width: 1920px;
    height: 1444px;
    overflow: visible;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_2900 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_2900.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_2901 {
    width: 100%;
    height: 14.96%;
    background-image: url(@/assets/images/Vector_1_2901.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 85.04%;
}
.Pixso-vector-1_2904 {
    width: 6.72%;
    height: 9.95%;
    background-image: url(@/assets/images/Vector_1_2904.png);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.54%;
    bottom: 87.51%;
}
.Pixso-paragraph-1_2907 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 4.09%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 4.47%;
    bottom: 91.44%;
}
.Pixso-paragraph-1_2908 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.85%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 9.25%;
    bottom: 88.9%;
}
.Pixso-paragraph-1_2920 {
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
    top: 22.74%;
    bottom: 75.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_2921 {
    width: 89.63%;
    height: 49.11%;
    background-image: url(@/assets/images/Vector_1_2921.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.16%;
    right: 5.21%;
    top: 26.6%;
    bottom: 24.29%;
}
.Pixso-text-1_2922 {
    font-size: 18px;
    font-family: "Roboto-Regular";
    font-weight: Regular;
    line-height: 21px;
    color: rgba(0, 0, 0, 1);
    width: 0.11%;
    height: 1.31%;
    position: absolute;
    left: 55.36%;
    right: 44.53%;
    top: 71.09%;
    bottom: 27.6%;
}
.Pixso-vector-1_2923 {
    width: 100%;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_1_2923.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 14.96%;
    bottom: 79.65%;
}
.Pixso-paragraph-1_2945 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(53, 120, 248, 1);
    width: 33.38%;
    height: 1.54%;
    position: absolute;
    left: 10.63%;
    right: 55.99%;
    top: 69.7%;
    bottom: 28.76%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
}
.Pixso-vector-1_2946 {
    width: 33.38%;
    height: 34.31%;
    background-image: url(@/assets/images/Vector_1_2946.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.63%;
    right: 55.99%;
    top: 32.92%;
    bottom: 32.77%;
}
/* 有后台上传照片时去掉占位证书底图，避免透明 PNG 透出模板文字 */
.Pixso-vector-1_2946.Pixso-vector-1_2946--live-photo {
    background-image: none;
    background-color: #ffffff;
}
.certificate-detail-photo {
    position: absolute;
    left: 10.63%;
    right: 55.99%;
    top: 32.92%;
    bottom: 32.77%;
    width: 33.38%;
    height: 34.31%;
    object-fit: contain;
    z-index: 3;
    background-color: #ffffff;
    pointer-events: none;
}
.Pixso-paragraph-1_2947 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 50.16%;
    right: 44.53%;
    top: 32.85%;
    bottom: 65.61%;
}
.Pixso-paragraph-1_2948 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 12%;
    height: 1.54%;
    position: absolute;
    left: 55.36%;
    right: 32.64%;
    top: 32.85%;
    bottom: 65.61%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
}
.Pixso-paragraph-1_2949 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 50.16%;
    right: 44.53%;
    top: 45.95%;
    bottom: 52.51%;
}
.Pixso-paragraph-1_2950 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 6.51%;
    height: 1.54%;
    position: absolute;
    left: 55.36%;
    right: 38.13%;
    top: 45.95%;
    bottom: 52.51%;
}
.Pixso-paragraph-1_2951 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    white-space: pre-wrap;
    width: 5.26%;
    height: 1.54%;
    position: absolute;
    left: 73.13%;
    right: 21.61%;
    top: 52.58%;
    bottom: 45.88%;
}
.Pixso-paragraph-1_2952 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 3.23%;
    height: 1.54%;
    position: absolute;
    left: 78.33%;
    right: 18.44%;
    top: 52.58%;
    bottom: 45.88%;
}
.Pixso-paragraph-1_2953 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 73.13%;
    right: 21.56%;
    top: 59.14%;
    bottom: 39.32%;
}
.Pixso-paragraph-1_2954 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.99%;
    height: 1.54%;
    position: absolute;
    left: 78.33%;
    right: 15.68%;
    top: 59.14%;
    bottom: 39.32%;
}
.Pixso-paragraph-1_2957 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    white-space: pre-wrap;
    width: 5.26%;
    height: 1.54%;
    position: absolute;
    left: 50.16%;
    right: 44.58%;
    top: 39.48%;
    bottom: 58.98%;
}
.Pixso-paragraph-1_2958 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 3.23%;
    height: 1.54%;
    position: absolute;
    left: 55.73%;
    right: 41.04%;
    top: 39.48%;
    bottom: 58.98%;
}
.Pixso-paragraph-1_2959 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 73.13%;
    right: 21.56%;
    top: 45.95%;
    bottom: 52.51%;
}
.Pixso-paragraph-1_2960 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 7.39%;
    height: 1.54%;
    position: absolute;
    left: 78.7%;
    right: 13.91%;
    top: 45.95%;
    bottom: 52.51%;
}
.Pixso-paragraph-1_2961 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 73.13%;
    right: 21.56%;
    top: 32.85%;
    bottom: 65.61%;
}
.Pixso-paragraph-1_2962 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 6.35%;
    height: 1.54%;
    position: absolute;
    left: 78.7%;
    right: 14.95%;
    top: 32.85%;
    bottom: 65.61%;
}
.Pixso-paragraph-1_2963 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 50.16%;
    right: 44.53%;
    top: 52.58%;
    bottom: 45.88%;
}
.Pixso-paragraph-1_2964 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 4.28%;
    height: 1.54%;
    position: absolute;
    left: 55.36%;
    right: 40.36%;
    top: 52.58%;
    bottom: 45.88%;
}
.Pixso-paragraph-1_2965 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 50.16%;
    right: 44.53%;
    top: 59.14%;
    bottom: 39.32%;
}
.Pixso-paragraph-1_2966 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.99%;
    height: 1.54%;
    position: absolute;
    left: 55.36%;
    right: 38.65%;
    top: 59.14%;
    bottom: 39.32%;
}
.Pixso-paragraph-1_2967 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 10%;
    height: 1.54%;
    position: absolute;
    left: 49.95%;
    right: 40.05%;
    top: 65.54%;
    bottom: 32.92%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
}
.Pixso-paragraph-1_2968 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.54%;
    position: absolute;
    left: 73.13%;
    right: 21.56%;
    top: 39.48%;
    bottom: 58.98%;
}
.Pixso-paragraph-1_2969 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 10.99%;
    height: 1.54%;
    position: absolute;
    left: 78.33%;
    right: 10.68%;
    top: 39.48%;
    bottom: 58.98%;
}
.Pixso-vector-1_2970 {
    width: 2.8%;
    height: 2.1%;
    background-image: url(@/assets/images/Vector_1_2970.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 55.21%;
    right: 41.99%;
    top: 65.2%;
    bottom: 32.7%;
}
.Pixso-group-33_246 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1431.9990234375px;
    top: 90px;
}
.Pixso-vector-33_247 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_247.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_248 {
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
.Pixso-vector-33_249 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_249.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-paragraph-33_793 {
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
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -595px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_794 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -391px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_795 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_796 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_797 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_798 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-33_799 {
    width: 204px;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_33_799.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 14.96%;
    bottom: 79.65%;
    transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_800 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
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
    background-image: url(@/assets/images/Vector_1_113.webp);
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

/* 证书详情字段值：单行不换行，不使用省略号 */
.Pixso-frame-1_2899 .Pixso-paragraph-1_2948,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2950,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2952,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2954,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2958,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2960,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2962,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2964,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2966,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2969 {
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  width: auto !important;
  height: auto !important;
}

/* 证书详情字段标签：禁止被窄定位框挤成竖排 */
.Pixso-frame-1_2899 .Pixso-paragraph-1_2947,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2949,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2951,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2953,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2957,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2959,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2961,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2963,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2965,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2967,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2968 {
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  width: auto !important;
  height: auto !important;
}

.Pixso-frame-1_2899 .Pixso-paragraph-1_2951,
.Pixso-frame-1_2899 .Pixso-paragraph-1_2957 {
  width: 5em !important;
  text-align: left !important;
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
</style>
