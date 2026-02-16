<template>
    <div class="scroll-container-1_2899">
        <div id="1_2899" class="Pixso-frame-1_2899">
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
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/certificate" class="query-breadcrumb-link">证书查询系统</router-link> > <router-link to="/query-system/certificate/list" class="query-breadcrumb-link">证书列表</router-link> > <span class="query-breadcrumb-current">证书详情</span>
            </p>
            <div id="1_2921" class="Pixso-vector-1_2921"></div>
            <div id="1_2922" class="Pixso-text-1_2922">{{ "&nbsp;" }}</div>
            <div id="1_2923" class="Pixso-vector-1_2923"></div>
            <div id="1_2938" class="Pixso-vector-1_2938"></div>
            <p id="1_2945" class="Pixso-paragraph-1_2945">
                {{ certificateData?.certificateType || '应急指挥专家' }}
            </p>
            <div id="1_2946" class="Pixso-vector-1_2946"></div>
            <p id="1_2947" class="Pixso-paragraph-1_2947">{{ "证书编号：" }}</p>
            <p id="1_2948" class="Pixso-paragraph-1_2948">
                {{ certificateData?.certificateNo || 'SC2021209001' }}
            </p>
            <p id="1_2949" class="Pixso-paragraph-1_2949">{{ "联系电话：" }}</p>
            <p id="1_2950" class="Pixso-paragraph-1_2950">
                {{ certificateData?.phone || '13800138000' }}
            </p>
            <p id="1_2951" class="Pixso-paragraph-1_2951">
                {{ "职       务：" }}
            </p>
            <p id="1_2952" class="Pixso-paragraph-1_2952">{{ certificateData?.position || '总队长' }}</p>
            <p id="1_2953" class="Pixso-paragraph-1_2953">{{ "有效期至：" }}</p>
            <p id="1_2954" class="Pixso-paragraph-1_2954">{{ certificateData?.expiryDate || '2028-06-04' }}</p>
            <p id="1_2957" class="Pixso-paragraph-1_2957">
                {{ "姓       名：" }}
            </p>
            <p id="1_2958" class="Pixso-paragraph-1_2958">{{ certificateData?.name || '谢春明' }}</p>
            <p id="1_2959" class="Pixso-paragraph-1_2959">{{ "工作单位：" }}</p>
            <p id="1_2960" class="Pixso-paragraph-1_2960">
                {{ certificateData?.workUnit || '四川飞豹救援队' }}
            </p>
            <p id="1_2961" class="Pixso-paragraph-1_2961">{{ "证书类型：" }}</p>
            <p id="1_2962" class="Pixso-paragraph-1_2962">
                {{ certificateData?.certificateType || '应急指挥专家' }}
            </p>
            <p id="1_2963" class="Pixso-paragraph-1_2963">{{ "所属部门：" }}</p>
            <p id="1_2964" class="Pixso-paragraph-1_2964">{{ certificateData?.department || '指挥中心' }}</p>
            <p id="1_2965" class="Pixso-paragraph-1_2965">{{ "发证日期：" }}</p>
            <p id="1_2966" class="Pixso-paragraph-1_2966">{{ certificateData?.issueDate || '2023-06-05' }}</p>
            <p id="1_2967" class="Pixso-paragraph-1_2967">{{ "当前状态：" }}</p>
            <p id="1_2968" class="Pixso-paragraph-1_2968">{{ "身份证号：" }}</p>
            <p id="1_2969" class="Pixso-paragraph-1_2969">
                {{ certificateData?.idCard || '11010219880520XXXX' }}
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
            <router-link id="33_793" to="/overview-info" class="Pixso-paragraph-33_793 main-nav-link">概况信息</router-link>
            <router-link id="33_794" to="/team-building" class="Pixso-paragraph-33_794 main-nav-link">队伍建设</router-link>
            <router-link id="33_796" to="/party-building" class="Pixso-paragraph-33_796 main-nav-link">党建专栏</router-link>
            <router-link id="33_795" to="/info-public" class="Pixso-paragraph-33_795 main-nav-link">信息公开</router-link>
            <router-link id="33_797" to="/dynamic-news" class="Pixso-paragraph-33_797 main-nav-link">动态要闻</router-link>
            <router-link id="33_798" to="/policy-regulations" class="Pixso-paragraph-33_798 main-nav-link">政策法规</router-link>
            <router-link id="33_800" to="/query-system" class="Pixso-paragraph-33_800 main-nav-link">查询系统</router-link>

            <!-- 底部信息 -->
            <div id="1_113_cert_detail" class="Pixso-vector-1_113"></div>
            <div id="32_8_cert_detail" class="Pixso-group-32_8">
                <p id="1_118_cert_detail" class="Pixso-paragraph-1_118">
                    {{ "主办单位：四川飞豹救援" }}
                </p>
                <p id="1_119_cert_detail" class="Pixso-paragraph-1_119">
                    {{ "承办单位：四川飞豹救援新闻宣传处" }}
                </p>
                <p id="1_120_cert_detail" class="Pixso-paragraph-1_120">
                    {{ "蜀ICP备XXXXXXX号" }}
                </p>
                <p id="1_121_cert_detail" class="Pixso-paragraph-1_121">
                    {{ "Copyright®2025 sc.feibao.com All rights reserved" }}
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { queryCertificateMock } from '@/data/mock-certificate'

const router = useRouter()
const route = useRoute()

// 从路由参数获取证书编号
const certificateNo = ref(route.params.certificateNo as string)

// 获取证书详情数据
const certificateData = computed(() => {
  const result = queryCertificateMock(certificateNo.value)

  if (result.status === 'success' && result.data && result.data.length > 0) {
    return result.data[0]
  }
  return null
})

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
.scroll-container-1_2899 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_2899 {
    width: 1920px;
    height: 1297px;
    overflow: hidden;
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
    background-size: 100% 100%;
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
    line-height: 20px;
    color: rgba(53, 120, 248, 1);
    width: 6.36%;
    height: 1.54%;
    position: absolute;
    left: 24.11%;
    right: 69.53%;
    top: 69.7%;
    bottom: 28.76%;
}
.Pixso-vector-1_2946 {
    width: 33.38%;
    height: 34.31%;
    background-image: url(@/assets/images/Vector_1_2946.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.63%;
    right: 55.99%;
    top: 32.92%;
    bottom: 32.77%;
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
    overflow: hidden;
    text-overflow: ellipsis;
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
    overflow: hidden;
    text-overflow: ellipsis;
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
    height: 22%;
    background-image: url(@/assets/images/Vector_1_113.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 78%;
    transform: translateX(calc(-50% + 0px));
}

.Pixso-group-32_8 {
    width: 600px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1056px;
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
