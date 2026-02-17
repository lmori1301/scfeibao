<template>
  <div class="query-system-index-page query-system-index-scroll scroll-container-1_2406">
      <div id="1_2406" class="query-system-index-frame Pixso-frame-1_2406">
          <div id="1_2407" class="Pixso-vector-1_2407"></div>
          <div id="1_2408" class="Pixso-vector-1_2408"></div>
          <div id="1_2411" class="Pixso-vector-1_2411"></div>
          <router-link to="/" id="17_12" class="Pixso-vector-17_12" style="cursor: pointer;"></router-link>
          <div id="1_2416" class="Pixso-vector-1_2416"></div>
          <p id="1_2419" class="Pixso-paragraph-1_2419">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_2420" class="Pixso-paragraph-1_2420">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <div id="1_2429" class="Pixso-vector-1_2429"></div>
          <p id="1_2436" class="Pixso-paragraph-1_2436">
              当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <span class="query-breadcrumb-current">证书查询系统</span>
          </p>
          <div id="1_2446" class="Pixso-vector-1_2446"></div>
          <router-link to="/query-system/vehicle" class="Pixso-group-17_15 query-tab-link" id="tab-vehicle">
              <div id="1_2438" class="Pixso-vector-1_2438"></div>
              <p id="1_2442" class="Pixso-paragraph-1_2442">
                  {{ "车辆管理系统" }}
              </p>
              <div id="1_2445" class="Pixso-vector-1_2445"></div>
              <div id="1_2449" class="Pixso-vector-1_2449"></div>
          </router-link>
          <router-link to="/query-system/personnel" class="Pixso-group-17_14 query-tab-link" id="tab-personnel">
              <div id="1_2437" class="Pixso-vector-1_2437"></div>
              <p id="1_2443" class="Pixso-paragraph-1_2443">
                  {{ "内部管理系统" }}
              </p>
              <div id="1_2462" class="Pixso-vector-1_2462"></div>
              <div id="1_2463" class="Pixso-vector-1_2463"></div>
              <div id="1_2469" class="Pixso-vector-1_2469"></div>
          </router-link>
          <router-link to="/query-system/certificate" class="Pixso-group-17_13 query-tab-link query-tab-active" id="tab-certificate">
              <div id="1_2439" class="Pixso-vector-1_2439"></div>
              <div id="1_2440" class="Pixso-vector-1_2440"></div>
              <p id="1_2441" class="Pixso-paragraph-1_2441">
                  {{ "证书管理系统" }}
              </p>
              <div id="1_2444" class="Pixso-vector-1_2444"></div>
              <div id="1_2471" class="Pixso-vector-1_2471"></div>
          </router-link>
          <router-link to="/query-system" class="Pixso-vector-1_2476 query-tab-link" id="query-system-entry"></router-link>
          <router-link to="/query-system" class="Pixso-text-1_2477 query-tab-link" id="query-system-text">
              <p id="1_2477_0" class="Pixso-paragraph-1_2477_0">
                  <span id="1_2477_0_1" class="Pixso-span-1_2477_0_1">{{
                      "查询"
                  }}</span>
              </p>
              <p id="1_2477_1" class="Pixso-paragraph-1_2477_1">
                  <span id="1_2477_1_1" class="Pixso-span-1_2477_1_1">{{
                      "系统"
                  }}</span>
              </p>
          </router-link>
          <div id="1_2478" class="Pixso-vector-1_2478"></div>
          <p id="1_2479" class="Pixso-paragraph-1_2479">
              {{ "证书管理系统" }}
          </p>
          <div id="1_2480" class="Pixso-vector-1_2480"></div>
          <el-input v-model="formData.name" placeholder="姓名" class="cert-input cert-input-name" clearable />
          <p id="1_2484" class="Pixso-paragraph-1_2484">{{ "姓名" }}</p>
          <el-input v-model="formData.idCard" placeholder="身份证号码" class="cert-input cert-input-idcard" clearable />
          <p id="1_2485" class="Pixso-paragraph-1_2485">{{ "身份证号码" }}</p>
          <el-input v-model="formData.certificateNo" placeholder="证书编号" class="cert-input cert-input-certno" clearable />
          <p id="1_2486" class="Pixso-paragraph-1_2486">{{ "证书编号" }}</p>
          <!-- 查询按钮（与车辆/内部管理系统一致，置于表单下方居中） -->
          <div
            id="cert-form-query-btn"
            class="Pixso-vector-1_3057 cert-query-btn"
            role="button"
            tabindex="0"
            @click="handleQuery"
            @keydown.enter="handleQuery"
          ></div>
          <router-link id="1_2487" to="/overview-info" class="Pixso-paragraph-1_2487 main-nav-link">概况信息</router-link>
          <router-link id="1_2488" to="/team-building" class="Pixso-paragraph-1_2488 main-nav-link">队伍建设</router-link>
          <router-link id="1_2490" to="/party-building" class="Pixso-paragraph-1_2490 main-nav-link">党建专栏</router-link>
          <router-link id="1_2489" to="/info-public" class="Pixso-paragraph-1_2489 main-nav-link">信息公开</router-link>
          <router-link id="1_2491" to="/dynamic-news" class="Pixso-paragraph-1_2491 main-nav-link">动态要闻</router-link>
          <router-link id="1_2492" to="/policy-regulations" class="Pixso-paragraph-1_2492 main-nav-link">政策法规</router-link>
          <div id="1_2497" class="Pixso-vector-1_2497"></div>
          <div id="1_2498" class="Pixso-vector-1_2498"></div>
          <div id="1_2499" class="Pixso-vector-1_2499 nav-underline-hide"></div>
          <router-link id="1_2500" to="/query-system" class="Pixso-paragraph-1_2500 main-nav-link">查询系统</router-link>
          <div id="33_210" class="Pixso-group-33_210" @click.stop>
            <div id="33_211" class="Pixso-vector-33_211"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_213"
                class="Pixso-vector-33_213"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { CertificateQueryParams } from '@/types/query'
import { queryCertificate } from '@/api/query'

const router = useRouter()

const formData = ref({ name: '', idCard: '', certificateNo: '' })
const loading = ref(false)

const tips = '请核对查询条件，或联系管理员确认证书是否已备案。'

async function handleQuery() {
  if (loading.value) return

  const certificateNo = formData.value.certificateNo.trim()
  const name = formData.value.name.trim()
  const idCard = formData.value.idCard.trim().replace(/\s/g, '')

  // 至少需要填写一项
  if (!certificateNo && !name && !idCard) {
    ElMessage.warning('请至少填写一项查询条件')
    return
  }

  // 优先使用证书编号查询
  if (!certificateNo) {
    ElMessage.warning('请输入证书编号进行查询')
    return
  }

  loading.value = true
  try {
    const res = await queryCertificate(certificateNo)

    if (res.code === 200 && res.data) {
      // 查询成功，跳转到详情页
      router.push({ path: `/query-system/certificate/detail/${res.data.certificateNumber}` })
    } else {
      ElMessage.warning({ message: `未找到匹配的证书信息。${tips}`, duration: 6000, showClose: true })
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      ElMessage.warning({ message: `未找到匹配的证书信息。${tips}`, duration: 6000, showClose: true })
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

</script>
<style>
.scroll-container-1_2406 {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.Pixso-frame-1_2406 {
  width: 1920px;
  height: 1444px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_2407 {
  width: 100%;
  height: 99.72%;
  background-image: url(@/assets/images/Vector_1_2407.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0.28%;
}
.Pixso-vector-1_2408 {
  width: 100%;
  height: 13.43%;
  background-image: url(@/assets/images/Vector_1_2408.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 86.57%;
}
.Pixso-vector-1_2411 {
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
.Pixso-vector-17_12 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_12.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
}
.Pixso-vector-1_2416 {
  width: 6.72%;
  height: 8.93%;
  background-image: url(@/assets/images/Vector_1_2416.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 2.29%;
  bottom: 88.78%;
}
.Pixso-paragraph-1_2419 {
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
.Pixso-paragraph-1_2420 {
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
.Pixso-paragraph-1_2436 {
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
.Pixso-vector-1_2446 {
  width: 0.59%;
  height: 0.1%;
  background-image: url(@/assets/images/Boolean_operation_1_2446.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.32%;
  right: 38.09%;
  top: 30.72%;
  bottom: 69.18%;
}
.Pixso-group-17_15 {
  width: 273px;
  height: 85px;
  position: absolute;
  left: 1137px;
  top: 395px;
}
.Pixso-vector-1_2438 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2438.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_2442 {
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
.Pixso-vector-1_2445 {
  width: 13.75%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_2445.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 9.99%;
  right: 76.26%;
  top: 28.55%;
  bottom: 27.28%;
}
.Pixso-vector-1_2449 {
  width: 7.69%;
  height: 20.56%;
  background-image: url(@/assets/images/Boolean_operation_1_2449.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 13.08%;
  right: 79.23%;
  top: 40.51%;
  bottom: 38.93%;
}
.Pixso-group-17_14 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 881px;
  top: 395px;
}
.Pixso-vector-1_2437 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2437.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_2443 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 131, 245, 1);
  width: 59.37%;
  height: 29.41%;
  position: absolute;
  left: 29.69%;
  right: 10.94%;
  top: 34.12%;
  bottom: 36.47%;
}
.Pixso-vector-1_2462 {
  width: 14.67%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_2462.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10.26%;
  right: 75.07%;
  top: 28.55%;
  bottom: 27.28%;
}
.Pixso-vector-1_2463 {
  width: 10.49%;
  height: 15.9%;
  background-image: url(@/assets/images/Boolean_operation_1_2463.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 12.5%;
  right: 77.01%;
  top: 38.63%;
  bottom: 45.47%;
}
.Pixso-vector-1_2469 {
  width: 5.1%;
  height: 14.26%;
  background-image: url(@/assets/images/Boolean_operation_1_2469.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 15.19%;
  right: 79.71%;
  top: 47.4%;
  bottom: 38.34%;
}
.Pixso-group-17_13 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 625px;
  top: 395px;
}
.Pixso-vector-1_2439 {
  width: 100%;
  height: 56.47%;
  background-image: url(@/assets/images/Vector_1_2439.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 43.53%;
}
.Pixso-vector-1_2440 {
  width: 100%;
  height: 43.53%;
  background-image: url(@/assets/images/Vector_1_2440.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 56.47%;
  bottom: 0%;
}
.Pixso-paragraph-1_2441 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(249, 230, 0, 1);
  width: 59.37%;
  height: 29.42%;
  position: absolute;
  left: 30.08%;
  right: 10.55%;
  top: 35.29%;
  bottom: 35.29%;
}
.Pixso-vector-1_2444 {
  width: 14.67%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_2444.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.46%;
}
.Pixso-vector-1_2471 {
  width: 8.76%;
  height: 21.42%;
  background-image: url(@/assets/images/Boolean_operation_1_2471.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 13.8%;
  right: 77.44%;
  top: 39.21%;
  bottom: 39.37%;
}
.Pixso-vector-1_2476 {
  width: 6.09%;
  height: 5.89%;
  background-image: url(@/assets/images/Vector_1_2476.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.46%;
  right: 67.45%;
  top: 27.35%;
  bottom: 66.76%;
}
.Pixso-text-1_2477 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: Regular;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: 2.76%;
  height: 3.47%;
  position: absolute;
  left: 28.13%;
  right: 69.11%;
  top: 28.46%;
  bottom: 68.07%;
}
.Pixso-paragraph-1_2477_0 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2477_0_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_2477_1 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_2477_1_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-vector-1_2478 {
  width: 46.98%;
  height: 39.27%;
  background-image: url(@/assets/images/Vector_1_2478.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.56%;
  right: 26.46%;
  top: 35.11%;
  bottom: 25.62%;
}
.Pixso-paragraph-1_2479 {
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
.Pixso-vector-1_2480 {
  width: 19.85%;
  height: 4.02%;
  background-image: url(@/assets/images/Vector_1_2480.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 64.68%;
  bottom: 31.3%;
}
.Pixso-vector-1_2481 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_2481.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 45.29%;
  bottom: 50.55%;
}
.Pixso-vector-1_2482 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_2482.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 50.62%;
  bottom: 45.22%;
}
.Pixso-vector-1_2483 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_2483.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 56.16%;
  bottom: 39.68%;
}
.Pixso-paragraph-1_2484 {
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
.Pixso-paragraph-1_2485 {
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
.Pixso-paragraph-1_2486 {
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
.Pixso-paragraph-1_2487 {
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
  top: 15.03%;
  bottom: 83.24%;
  transform: translateX(calc(-50% + -595px));
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_2488 {
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
.Pixso-paragraph-1_2489 {
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
.Pixso-paragraph-1_2490 {
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
.Pixso-paragraph-1_2491 {
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
.Pixso-paragraph-1_2492 {
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
.Pixso-paragraph-1_2493 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 2.19%;
  height: 1.38%;
  position: absolute;
  left: 49.48%;
  right: 48.33%;
  top: 65.93%;
  bottom: 32.69%;
}
.Pixso-vector-1_2494 {
  width: 0.54%;
  height: 0.73%;
  background-image: url(@/assets/images/Boolean_operation_1_2494.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.51%;
  right: 50.95%;
  top: 66.22%;
  bottom: 33.05%;
}
.Pixso-vector-1_2497 {
  width: 0.16%;
  height: 0.22%;
  background-image: url(@/assets/images/Vector_1_2497.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.94%;
  right: 50.9%;
  top: 66.8%;
  bottom: 32.98%;
}
.Pixso-vector-1_2498 {
  width: 0.15%;
  height: 0.2%;
  background-image: url(@/assets/images/Vector_1_2498.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 49%;
  right: 50.85%;
  top: 66.89%;
  bottom: 32.91%;
}
.Pixso-vector-1_2499 {
  width: 204px;
  height: 4.85%;
  background-image: url(@/assets/images/Vector_1_2499.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 13.43%;
  bottom: 81.72%;
  transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-1_2500 {
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
.Pixso-group-33_210 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1472px;
  top: 90px;
}
.Pixso-vector-33_211 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_211.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_212 {
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
.Pixso-vector-33_213 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_213.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 85.21%;
  right: 7.4%;
  top: 50%;
  transform: translateY(calc(-50% + 0.5px));
}
/* 查询系统子选项卡：可点击切换 */
.query-tab-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
}
.query-tab-link:hover {
  opacity: 0.92;
}
/* 证书查询输入框（与车辆页一致布局） */
.cert-input {
  position: absolute;
  left: 40.05%;
  width: 19.85%;
  height: 52px;
  z-index: 100;
}
.cert-input-name { top: 45.29%; }
.cert-input-idcard { top: 50.62%; }
.cert-input-certno { top: 56.16%; }
.cert-input :deep(.el-input__wrapper) {
  background-color: #fff !important;
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
  height: 100% !important;
}
.cert-input :deep(.el-input__inner) {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  color: rgba(177, 173, 173, 1);
}
/* 查询按钮（与车辆/内部管理系统一致） */
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
.cert-query-btn {
  cursor: pointer;
  z-index: 100;
}
.cert-query-btn:hover {
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
</style>
