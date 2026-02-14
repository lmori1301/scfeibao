<template>
    <div class="scroll-container-1_3243">
        <div id="1_3243" class="Pixso-frame-1_3243">
            <div id="1_3244" class="Pixso-vector-1_3244"></div>
            <div id="1_3245" class="Pixso-vector-1_3245"></div>
            <div id="1_3248" class="Pixso-vector-1_3248"></div>
            <p id="1_3251" class="Pixso-paragraph-1_3251">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_3252" class="Pixso-paragraph-1_3252">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_3255" class="Pixso-vector-1_3255"></div>
            <div id="1_3260" class="Pixso-vector-1_3260"></div>
            <p id="1_3267" class="Pixso-paragraph-1_3267">
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/vehicle" class="query-breadcrumb-link">车辆查询系统</router-link> > <span class="query-breadcrumb-current">应急车辆详情</span>
            </p>
            <div id="1_3268" class="Pixso-vector-1_3268"></div>
            <p id="1_3270" class="Pixso-paragraph-1_3270">{{ "车属单位：" }}</p>
            <p id="1_3271" class="Pixso-paragraph-1_3271">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_3272" class="Pixso-paragraph-1_3272">{{ "厂牌型号：" }}</p>
            <p id="1_3273" class="Pixso-paragraph-1_3273">
                {{ "哈佛牌/CC6490WM28" }}
            </p>
            <p id="1_3274" class="Pixso-paragraph-1_3274">{{ "车体颜色：" }}</p>
            <p id="1_3275" class="Pixso-paragraph-1_3275">{{ "白色" }}</p>
            <p id="1_3276" class="Pixso-paragraph-1_3276">{{ "发证日期：" }}</p>
            <p id="1_3277" class="Pixso-paragraph-1_3277">{{ "2024-02-15" }}</p>
            <p id="1_3278" class="Pixso-paragraph-1_3278">{{ "有效期限：" }}</p>
            <p id="1_3279" class="Pixso-paragraph-1_3279">{{ "2025-02-15" }}</p>
            <p id="1_3280" class="Pixso-paragraph-1_3280">{{ "车辆类型：" }}</p>
            <p id="1_3281" class="Pixso-paragraph-1_3281">
                {{ "应急救援指挥车" }}
            </p>
            <p id="1_3282" class="Pixso-paragraph-1_3282">{{ "发动机号：" }}</p>
            <p id="1_3283" class="Pixso-paragraph-1_3283">{{ "BGCA039822" }}</p>
            <p id="1_3284" class="Pixso-paragraph-1_3284">{{ "车辆编号：" }}</p>
            <p id="1_3285" class="Pixso-paragraph-1_3285">
                {{ "SC20251209001" }}
            </p>
            <p id="1_3286" class="Pixso-paragraph-1_3286">{{ "车架号码：" }}</p>
            <p id="1_3287" class="Pixso-paragraph-1_3287">
                {{ "L6T9444GZ2212" }}
            </p>
            <p id="1_3288" class="Pixso-paragraph-1_3288">{{ "装备日期：" }}</p>
            <p id="1_3289" class="Pixso-paragraph-1_3289">{{ "2023-06-05" }}</p>
            <p id="1_3290" class="Pixso-paragraph-1_3290">{{ "当前状态：" }}</p>
            <p id="1_3291" class="Pixso-paragraph-1_3291">{{ "车辆号牌：" }}</p>
            <p id="1_3292" class="Pixso-paragraph-1_3292">{{ "川A·12345" }}</p>
            <div id="1_3293" class="Pixso-vector-1_3293"></div>
            <div id="1_3296" class="Pixso-vector-1_3296"></div>
            <div id="1_3301" class="Pixso-vector-1_3301"></div>
            <div id="17_24" class="Pixso-vector-17_24"></div>
            <div id="33_264" class="Pixso-group-33_264" @click.stop>
            <div id="33_265" class="Pixso-vector-33_265"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_267"
                class="Pixso-vector-33_267"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <router-link id="33_769" to="/overview-info" class="Pixso-paragraph-33_769 main-nav-link">概况信息</router-link>
            <router-link id="33_770" to="/team-building" class="Pixso-paragraph-33_770 main-nav-link">队伍建设</router-link>
            <router-link id="33_772" to="/party-building" class="Pixso-paragraph-33_772 main-nav-link">党建专栏</router-link>
            <router-link id="33_771" to="/info-public" class="Pixso-paragraph-33_771 main-nav-link">信息公开</router-link>
            <router-link id="33_773" to="/dynamic-news" class="Pixso-paragraph-33_773 main-nav-link">动态要闻</router-link>
            <router-link id="33_774" to="/policy-regulations" class="Pixso-paragraph-33_774 main-nav-link">政策法规</router-link>
            <router-link id="33_776" to="/query-system" class="Pixso-paragraph-33_776 main-nav-link">查询系统</router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 从路由参数获取车辆id
const vehicleId = ref(route.params.id as string)

// 这里应该根据id从mock数据获取车辆信息
// 目前页面使用的是硬编码数据，暂时保持不变

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
.scroll-container-1_3243 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_3243 {
    width: 1920px;
    height: 1326px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_3244 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_3244.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_3245 {
    width: 100%;
    height: 14.63%;
    background-image: url(@/assets/images/Vector_1_3245.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 85.37%;
}
.Pixso-vector-1_3248 {
    width: 6.72%;
    height: 9.73%;
    background-image: url(@/assets/images/Vector_1_3248.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.49%;
    bottom: 87.78%;
}
.Pixso-paragraph-1_3251 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 4%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 4.37%;
    bottom: 91.63%;
}
.Pixso-paragraph-1_3252 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.81%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 9.05%;
    bottom: 89.14%;
}
.Pixso-vector-1_3255 {
    width: 0.7%;
    height: 1.01%;
    background-image: url(@/assets/images/Boolean_operation_1_3255.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 89.71%;
    right: 9.59%;
    top: 8.18%;
    bottom: 90.81%;
}
.Pixso-vector-1_3260 {
    width: 100%;
    height: 21.12%;
    background-image: url(@/assets/images/Vector_1_3260.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 78.88%;
    bottom: 0%;
}
.Pixso-paragraph-1_3267 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 72.45%;
    top: 22.25%;
    bottom: 76.24%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_3268 {
    width: 88.48%;
    height: 50.68%;
    background-image: url(@/assets/images/Vector_1_3268.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.63%;
    right: 5.89%;
    top: 26.02%;
    bottom: 23.3%;
}
.Pixso-paragraph-1_3270 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 32.2%;
    bottom: 66.29%;
}
.Pixso-paragraph-1_3271 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 6.36%;
    height: 1.51%;
    position: absolute;
    left: 56.61%;
    right: 37.03%;
    top: 32.2%;
    bottom: 66.29%;
}
.Pixso-paragraph-1_3272 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 45.02%;
    bottom: 53.47%;
}
.Pixso-paragraph-1_3273 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 10.37%;
    height: 1.51%;
    position: absolute;
    left: 56.61%;
    right: 33.02%;
    top: 45.02%;
    bottom: 53.47%;
}
.Pixso-paragraph-1_3274 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 51.51%;
    bottom: 46.98%;
}
.Pixso-paragraph-1_3275 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 2.19%;
    height: 1.51%;
    position: absolute;
    left: 79.58%;
    right: 18.23%;
    top: 51.51%;
    bottom: 46.98%;
}
.Pixso-paragraph-1_3276 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 57.92%;
    bottom: 40.57%;
}
.Pixso-paragraph-1_3277 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.99%;
    height: 1.51%;
    position: absolute;
    left: 79.58%;
    right: 14.43%;
    top: 57.92%;
    bottom: 40.57%;
}
.Pixso-paragraph-1_3278 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 64.1%;
    bottom: 34.39%;
}
.Pixso-paragraph-1_3279 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.98%;
    height: 1.51%;
    position: absolute;
    left: 56.88%;
    right: 37.14%;
    top: 64.1%;
    bottom: 34.39%;
}
.Pixso-paragraph-1_3280 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 38.69%;
    bottom: 59.8%;
}
.Pixso-paragraph-1_3281 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 7.39%;
    height: 1.51%;
    position: absolute;
    left: 56.98%;
    right: 35.63%;
    top: 38.69%;
    bottom: 59.8%;
}
.Pixso-paragraph-1_3282 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 45.02%;
    bottom: 53.47%;
}
.Pixso-paragraph-1_3283 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 6.56%;
    height: 1.51%;
    position: absolute;
    left: 79.95%;
    right: 13.49%;
    top: 45.02%;
    bottom: 53.47%;
}
.Pixso-paragraph-1_3284 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 32.2%;
    bottom: 66.29%;
}
.Pixso-paragraph-1_3285 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 7.91%;
    height: 1.51%;
    position: absolute;
    left: 79.95%;
    right: 12.14%;
    top: 32.2%;
    bottom: 66.29%;
}
.Pixso-paragraph-1_3286 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 51.51%;
    bottom: 46.98%;
}
.Pixso-paragraph-1_3287 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 7.97%;
    height: 1.51%;
    position: absolute;
    left: 56.61%;
    right: 35.42%;
    top: 51.51%;
    bottom: 46.98%;
}
.Pixso-paragraph-1_3288 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 51.41%;
    right: 43.28%;
    top: 57.92%;
    bottom: 40.57%;
}
.Pixso-paragraph-1_3289 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.99%;
    height: 1.51%;
    position: absolute;
    left: 56.61%;
    right: 37.4%;
    top: 57.92%;
    bottom: 40.57%;
}
.Pixso-paragraph-1_3290 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 64.18%;
    bottom: 34.31%;
}
.Pixso-paragraph-1_3291 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(158, 158, 158, 1);
    width: 5.31%;
    height: 1.51%;
    position: absolute;
    left: 74.38%;
    right: 20.31%;
    top: 38.69%;
    bottom: 59.8%;
}
.Pixso-paragraph-1_3292 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: 5.78%;
    height: 1.51%;
    position: absolute;
    left: 79.58%;
    right: 14.64%;
    top: 38.69%;
    bottom: 59.8%;
}
.Pixso-vector-1_3293 {
    width: 35%;
    height: 22%;
    background-image: url(@/assets/images/Vector_1_3293.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.71%;
    right: 57.29%;
    top: 39%;
    bottom: 39%;
}
.Pixso-vector-1_3296 {
    width: 2.8%;
    height: 2.1%;
    background-image: url(@/assets/images/Vector_1_3296.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 79.64%;
    right: 17.56%;
    top: 64%;
    bottom: 33.9%;
}
.Pixso-vector-1_3301 {
    width: 100%;
    height: 5.28%;
    background-image: url(@/assets/images/Vector_1_3301.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 14.86%;
    bottom: 79.86%;
}
.Pixso-vector-17_24 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_24.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 197px;
}
.Pixso-group-33_264 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1442px;
    top: 90px;
}
.Pixso-vector-33_265 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_265.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_266 {
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
.Pixso-vector-33_267 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_267.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-paragraph-33_769 {
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
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + -595px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_770 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + -391px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_771 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_772 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_773 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_774 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-33_775 {
    width: 204px;
    height: 5.28%;
    background-image: url(@/assets/images/Vector_33_775.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 14.86%;
    bottom: 79.86%;
    transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_776 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.59%;
    bottom: 81.52%;
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
</style>
