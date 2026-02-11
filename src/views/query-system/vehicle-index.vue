<template>
  <div class="query-system-index-page query-system-index-scroll scroll-container-1_3145">
      <div id="1_3145" class="query-system-index-frame Pixso-frame-1_3145">
          <div id="1_3146" class="Pixso-vector-1_3146"></div>
          <div id="1_3147" class="Pixso-vector-1_3147"></div>
          <div id="1_3230" class="Pixso-vector-1_3230"></div>
          <div id="1_3231" class="Pixso-vector-1_3231"></div>
          <div id="1_3150" class="Pixso-vector-1_3150"></div>
          <p id="1_3153" class="Pixso-paragraph-1_3153">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_3154" class="Pixso-paragraph-1_3154">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <div id="1_3162" class="Pixso-vector-1_3162"></div>
          <p id="1_3169" class="Pixso-paragraph-1_3169">
              当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <span class="query-breadcrumb-current">车辆查询系统</span>
          </p>
          <router-link to="/query-system/vehicle" class="Pixso-group-17_20 query-tab-link query-tab-active">
              <div id="1_3172" class="Pixso-vector-1_3172"></div>
              <div id="1_3173" class="Pixso-vector-1_3173"></div>
              <p id="1_3175" class="Pixso-paragraph-1_3175">
                  {{ "车辆管理系统" }}
              </p>
              <div id="1_3179" class="Pixso-vector-1_3179"></div>
          </router-link>
          <div id="1_3180" class="Pixso-vector-1_3180"></div>
          <div id="1_3183" class="Pixso-vector-1_3183"></div>
          <router-link to="/query-system/personnel" class="Pixso-group-17_22 query-tab-link">
              <div id="1_3171" class="Pixso-vector-1_3171"></div>
              <p id="1_3176" class="Pixso-paragraph-1_3176">
                  {{ "内部管理系统" }}
              </p>
              <div id="17_21" class="Pixso-vector-17_21"></div>
          </router-link>
          <router-link to="/query-system/certificate" class="Pixso-group-17_23 query-tab-link">
              <div id="1_3170" class="Pixso-vector-1_3170"></div>
              <p id="1_3174" class="Pixso-paragraph-1_3174">
                  {{ "证书管理系统" }}
              </p>
              <div id="1_3178" class="Pixso-vector-1_3178"></div>
              <div id="1_3204" class="Pixso-vector-1_3204"></div>
          </router-link>
        <div id="1_3209" class="Pixso-vector-1_3209"></div>
        <div id="1_3210" class="Pixso-text-1_3210">
              <p id="1_3210_0" class="Pixso-paragraph-1_3210_0">
                  <span id="1_3210_0_1" class="Pixso-span-1_3210_0_1">{{
                      "查询"
                  }}</span>
              </p>
              <p id="1_3210_1" class="Pixso-paragraph-1_3210_1">
                  <span id="1_3210_1_1" class="Pixso-span-1_3210_1_1">{{
                      "系统"
                  }}</span>
          </p>
        </div>
        <div id="1_3211" class="Pixso-vector-1_3211"></div>
          <p id="1_3212" class="Pixso-paragraph-1_3212">
              {{ "车辆管理系统" }}
          </p>
          <div id="1_3213" class="Pixso-vector-1_3213"></div>
          <!-- 移除重复的背景框，表单控件已覆盖这些位置 -->
          <!-- <div id="1_3214" class="Pixso-vector-1_3214"></div> -->
          <!-- <div id="1_3215" class="Pixso-vector-1_3215"></div> -->
          <!-- <div id="1_3216" class="Pixso-vector-1_3216"></div> -->
          <!-- 车辆类型下拉选择框 -->
          <el-select
            v-model="formData.vehicleType"
            placeholder="车辆类型"
            class="vehicle-type-select"
            clearable
          >
            <el-option
              v-for="type in vehicleTypes"
              :key="type"
              :label="type"
              :value="type"
            />
          </el-select>
          <p id="1_3217" class="Pixso-paragraph-1_3217">{{ "车辆类型" }}</p>
          <!-- 车牌号输入框 -->
          <el-input
            v-model="formData.plateNumber"
            placeholder="车牌号"
            class="plate-number-input"
            clearable
          />
          <p id="1_3218" class="Pixso-paragraph-1_3218">{{ "车牌号" }}</p>
          <!-- 车辆编号输入框 -->
          <el-input
            v-model="formData.vehicleNumber"
            placeholder="车辆编号"
            class="vehicle-number-input"
            clearable
          />
          <p id="1_3219" class="Pixso-paragraph-1_3219">{{ "车辆编号" }}</p>
          <!-- 移除重复的下拉箭头图标，Element Plus 组件已有自己的箭头 -->
          <!-- <div id="1_3220" class="Pixso-vector-1_3220"></div> -->
          <!-- 查询按钮（与内部管理系统一致，使用 Vector_1_3057 按钮图） -->
          <div
            id="1_3220_btn"
            class="Pixso-vector-1_3057 query-button-vehicle"
            role="button"
            tabindex="0"
            @click="handleQuery"
            @keydown.enter="handleQuery"
          ></div>
          <div id="33_228" class="Pixso-group-33_228">
              <div id="33_229" class="Pixso-vector-33_229"></div>
              <p id="33_230" class="Pixso-paragraph-33_230">
                  {{ "请输入您要搜索的内容" }}
              </p>
              <div id="33_231" class="Pixso-vector-33_231"></div>
          </div>
          <router-link id="33_754" to="/overview-info" class="Pixso-paragraph-33_754 main-nav-link">概况信息</router-link>
          <router-link id="33_755" to="/team-building" class="Pixso-paragraph-33_755 main-nav-link">队伍建设</router-link>
          <router-link id="33_757" to="/party-building" class="Pixso-paragraph-33_757 main-nav-link">党建专栏</router-link>
          <router-link id="33_756" to="/info-public" class="Pixso-paragraph-33_756 main-nav-link">信息公开</router-link>
          <router-link id="33_758" to="/dynamic-news" class="Pixso-paragraph-33_758 main-nav-link">动态要闻</router-link>
          <router-link id="33_759" to="/policy-regulations" class="Pixso-paragraph-33_759 main-nav-link">政策法规</router-link>
          <router-link id="33_761" to="/query-system" class="Pixso-paragraph-33_761 main-nav-link">查询系统</router-link>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { VehicleQueryParams } from '@/types/query'
import { queryVehicleMock } from '@/data/mock-vehicle'
import { logVehicleQuery } from '@/utils/query-log'

const router = useRouter()

// 车辆类型选项列表（系统预设标准类型，与校验、结果提示一致）
const vehicleTypes = [
  '应急救援指挥车',
  '救援运输车',
  '地震救援车',
  '抗洪抢险车',
  '应急炊事车',
  '应急宿营车',
  '通信指挥车',
  '应急救援装备车',
  '应急照明车',
  '医疗救援车',
  '移动方舱医疗车',
  '内勤车'
]

// 表单数据
const formData = ref({
  vehicleType: '',
  plateNumber: '',
  vehicleNumber: ''
})

const loading = ref(false)

const tips = '请核对查询条件，或联系管理员确认车辆是否已备案，也可查看历史查询记录。'

/** 使用模拟台账查询（前置校验 + 精确查询 + 查询不存在 均在 mock 内完成） */
async function handleQuery() {
  if (loading.value) return

  const vehicle_type = formData.value.vehicleType.trim()
  const vehicle_code = formData.value.vehicleNumber.trim()
  const license_plate = formData.value.plateNumber.trim()

  const filledCount = [vehicle_type, vehicle_code, license_plate].filter(v => v).length
  if (filledCount < 2) {
    ElMessage.warning('请至少输入二个查询条件（车辆类型/编号/号牌）')
    return
  }

  loading.value = true
  const params: VehicleQueryParams = {}
  if (vehicle_type) params.vehicleType = vehicle_type
  if (vehicle_code) params.vehicleNumber = vehicle_code
  if (license_plate) params.plateNumber = license_plate

  try {
    const res = queryVehicleMock(vehicle_type || undefined, vehicle_code || undefined, license_plate || undefined)

    if (res.status === 'error') {
      logVehicleQuery({ conditions: params, result: 'error', errorMessage: res.msg })
      ElMessage.warning(res.msg)
      return
    }

    if (res.status === 'not_found') {
      logVehicleQuery({ conditions: params, result: 'not_found', resultCount: 0 })
      ElMessage.warning({ message: `${res.msg}。${tips}`, duration: 6000, showClose: true })
      return
    }

    const list = res.data
    logVehicleQuery({ conditions: params, result: 'found', resultCount: list.length })

    if (list.length === 1) {
      router.push({ path: `/query-system/vehicle/detail/${list[0].id}` })
      return
    }
    ElMessage.success(`共查询到 ${list.length} 条车辆，已进入第一条详情。`)
    router.push({ path: `/query-system/vehicle/detail/${list[0].id}` })
  } finally {
    loading.value = false
  }
}
</script>
<style>
.scroll-container-1_3145 {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.Pixso-frame-1_3145 {
  width: 1920px;
  height: 1444px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_3146 {
  width: 100%;
  height: 99.72%;
  background-image: url(@/assets/images/Vector_1_3146.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0.28%;
}
.Pixso-vector-1_3147 {
  width: 100%;
  height: 13.43%;
  background-image: url(@/assets/images/Vector_1_3147.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 86.57%;
}
.Pixso-vector-1_3150 {
  width: 6.72%;
  height: 8.93%;
  background-image: url(@/assets/images/Vector_1_3150.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 2.29%;
  bottom: 88.78%;
}
.Pixso-paragraph-1_3153 {
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
.Pixso-paragraph-1_3154 {
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
.Pixso-vector-1_3162 {
  width: 100%;
  height: 19.39%;
  background-image: url(@/assets/images/Vector_1_3162.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 80.61%;
  bottom: 0%;
}
.Pixso-paragraph-1_3169 {
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
.Pixso-group-17_20 {
  width: 275px;
  height: 85px;
  position: absolute;
  left: 1137px;
  top: 395px;
}
.Pixso-vector-1_3172 {
  width: 100%;
  height: 56.47%;
  background-image: url(@/assets/images/Vector_1_3172.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 43.53%;
}
.Pixso-vector-1_3173 {
  width: 100%;
  height: 43.53%;
  background-image: url(@/assets/images/Vector_1_3173.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 56.47%;
  bottom: 0%;
}
.Pixso-paragraph-1_3175 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(253, 244, 60, 1);
  width: 55.27%;
  height: 29.42%;
  position: absolute;
  left: 28%;
  right: 16.73%;
  top: 35.29%;
  bottom: 35.29%;
}
.Pixso-vector-1_3179 {
  width: 13.66%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_3179.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 9.91%;
  right: 76.43%;
  top: 28.55%;
  bottom: 27.28%;
}
.Pixso-vector-1_3180 {
  width: 0.59%;
  height: 0.1%;
  background-image: url(@/assets/images/Boolean_operation_1_3180.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.32%;
  right: 38.09%;
  top: 30.72%;
  bottom: 69.18%;
}
.Pixso-vector-1_3183 {
  width: 1.09%;
  height: 1.21%;
  background-image: url(@/assets/images/Boolean_operation_1_3183.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.08%;
  right: 37.83%;
  top: 29.74%;
  bottom: 69.05%;
}
.Pixso-group-17_22 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 881px;
  top: 395px;
}
.Pixso-vector-1_3171 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_3171.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_3176 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(0, 131, 245, 1);
  width: 59.37%;
  height: 29.41%;
  position: absolute;
  left: 30.08%;
  right: 10.55%;
  top: 32.94%;
  bottom: 37.65%;
}
.Pixso-vector-17_21 {
  width: 37.546875px;
  height: 37.547393798828125px;
  background-image: url(@/assets/images/Group_17_21.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 27.265625px;
  top: 23.2646484375px;
}
.Pixso-group-17_23 {
  width: 256px;
  height: 85px;
  position: absolute;
  left: 625px;
  top: 395px;
}
.Pixso-vector-1_3170 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_3170.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-1_3174 {
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
.Pixso-vector-1_3178 {
  width: 14.67%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_3178.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.46%;
}
.Pixso-vector-1_3204 {
  width: 8.76%;
  height: 21.42%;
  background-image: url(@/assets/images/Boolean_operation_1_3204.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 13.8%;
  right: 77.44%;
  top: 39.21%;
  bottom: 39.37%;
}
.Pixso-vector-1_3209 {
  width: 6.09%;
  height: 5.89%;
  background-image: url(@/assets/images/Vector_1_3209.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.46%;
  right: 67.45%;
  top: 27.35%;
  bottom: 66.76%;
}
.Pixso-text-1_3210 {
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
.Pixso-paragraph-1_3210_0 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_3210_0_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-paragraph-1_3210_1 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_3210_1_1 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  position: relative;
  flex-shrink: 0;
}
.Pixso-vector-1_3211 {
  width: 46.98%;
  height: 39.27%;
  background-image: url(@/assets/images/Vector_1_3211.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.56%;
  right: 26.46%;
  top: 35.11%;
  bottom: 25.62%;
}
/* 表单标题 - 与证书/内部页中间对齐 */
.Pixso-paragraph-1_3212 {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(0, 127, 243, 1);
  width: 159px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 39.54%;
  bottom: 58.73%;
  transform: translateX(-50%);
}
.Pixso-vector-1_3213 {
  width: 19.85%;
  height: 4.02%;
  background-image: url(@/assets/images/Vector_1_3213.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 64.68%;
  bottom: 31.3%;
}
/* 移除重复的背景框样式，表单控件已覆盖这些位置 */
/* .Pixso-vector-1_3214 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3214.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 45.29%;
  bottom: 50.55%;
} */
/* .Pixso-vector-1_3215 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3215.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 50.62%;
  bottom: 45.22%;
} */
/* .Pixso-vector-1_3216 {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3216.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  top: 56.16%;
  bottom: 39.68%;
} */
/* 隐藏静态标签，因为输入框已有 placeholder */
/* 1. 调整「车辆类型」标签的字体大小（核心：命中截图里的Pixso-paragraph-1_3217类） */
.Pixso-paragraph-1_3217 {
  font-size: 16px !important; /* 改成你想要的尺寸，比如14/16px，默认太大就调小 */
  font-weight: normal !important; /* 可选：取消加粗，和车牌号标签一致 */
  color: #333 !important; /* 可选：调整标签颜色，和其他标签统一 */
}
.Pixso-paragraph-1_3218 {
  display: none;
}
.Pixso-paragraph-1_3219 {
  display: none;
}
/* 移除重复的下拉箭头图标样式，Element Plus 组件已有自己的箭头 */
/* .Pixso-vector-1_3220 {
  width: 0.65%;
  height: 0.48%;
  background-image: url(@/assets/images/Vector_1_3220.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 58.52%;
  right: 40.83%;
  top: 47.16%;
  bottom: 52.36%;
} */
/* 查询按钮 - 与内部管理系统一致（Vector_1_3057） */
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
.query-button-vehicle {
  cursor: pointer;
  z-index: 100;
}
.query-button-vehicle:hover {
  opacity: 0.9;
}
/* 主导航蓝条 - 与证书页 1_2411 位置高度相同 */
.Pixso-vector-1_3230 {
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
/* 主导航红色方块图标 - 与证书页 17_12 位置高度相同 */
.Pixso-vector-1_3231 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_12.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
}
.Pixso-vector-1_3232 {
  width: 2.14%;
  height: 2.91%;
  background-image: url(@/assets/images/Vector_1_3232.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.75%;
  right: 89.11%;
  top: 14.2%;
  bottom: 82.89%;
}
/* 右侧搜索框 - 与证书页 33_210 一致 */
.Pixso-group-33_228 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1432px;
  top: 90px;
}
.Pixso-vector-33_229 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_229.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_230 {
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
.Pixso-vector-33_231 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_231.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 85.21%;
  right: 7.4%;
  top: 50%;
  transform: translateY(calc(-50% + 0.5px));
}
/* 概况信息 - 与证书页一致，七项主导航统一无 text-align 以对齐 */
.Pixso-paragraph-33_754 {
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
.Pixso-paragraph-33_755 {
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
.Pixso-paragraph-33_756 {
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
.Pixso-paragraph-33_757 {
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
/* 动态要闻 - 与其余 6 项主导航高度一致 */
.Pixso-paragraph-33_758 {
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
.Pixso-paragraph-33_759 {
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
.Pixso-vector-33_760 {
  width: 204px;
  height: 4.85%;
  background-image: url(@/assets/images/Vector_33_760.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 13.43%;
  bottom: 81.72%;
  transform: translateX(calc(-50% + 627px));
}
/* 查询系统 - 与其余 6 项主导航高度一致 */
.Pixso-paragraph-33_761 {
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
/* 1. 调整「车辆类型」标签的字体大小（核心：命中截图里的Pixso-paragraph-1_3217类） */
.Pixso-paragraph-1_3217 {
  font-size: 16px !important; /* 改成你想要的尺寸，比如14/16px，默认太大就调小 */
  font-weight: normal !important; /* 可选：取消加粗，和车牌号标签一致 */
  color: #333 !important; /* 可选：调整标签颜色，和其他标签统一 */
}

/* 2. 调整车辆类型下拉框整体样式（字体+高度双修复） */
.vehicle-type-select {
  position: absolute;
  left: 40.05%;
  top: 45.29%;
  width: 19.85%;
  height: 40px !important; /* 下拉框高度：和车牌号输入框匹配，按需调整 */
  z-index: 100;
  --el-select-height: 40px !important;
}

/* 强制覆盖 Element Plus 根元素样式 */
.vehicle-type-select :deep(.el-select) {
  height: 100% !important;
  width: 100% !important;
  min-height: 40px !important;
}

/* 3. 下拉框内部容器样式（字体+高度） */
.vehicle-type-select :deep(.el-select__wrapper) {
  background-color: #fff !important;
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
  height: 40px !important;
  min-height: 40px !important;
  line-height: 40px !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
}

/* 选中内容容器（占满高度） */
.vehicle-type-select :deep(.el-select__selection) {
  height: 100% !important;
  min-height: 40px !important;
  display: flex !important;
  align-items: center !important;
  padding: 0 !important;
}

/* 4. 核心：下拉框内文字（占位符/选中项）字体大小调整 */
.vehicle-type-select :deep(.el-select__placeholder),
.vehicle-type-select :deep(.el-select__selected-item) {
  font-size: 14px !important; /* 关键：调小字体，比如14px，按需修改 */
  line-height: 40px !important;
  color: rgba(177, 173, 173, 1) !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
}

/* 下拉箭头（垂直居中） */
.vehicle-type-select :deep(.el-select__suffix) {
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

/* 5. 下拉选项字体大小（和输入框内文字一致） */
.vehicle-type-select :deep(.el-select-dropdown__item) {
  font-size: 14px !important; /* 和下拉框内文字匹配 */
  line-height: 36px !important;
  height: 36px !important;
}

/* 移除 hover/focus 多余阴影（保持和输入框一致） */
.vehicle-type-select :deep(.el-select__wrapper:hover) {
  box-shadow: none !important;
}
.vehicle-type-select :deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}

/* 全局强制设置车辆类型下拉框高度（优先级最高） */
.vehicle-type-select.el-select {
  height: 40px !important;
  min-height: 40px !important;
}
.vehicle-type-select .el-select__wrapper {
  height: 40px !important;
  min-height: 40px !important;
  line-height: 40px !important;
  align-items: center !important;
}
.vehicle-type-select .el-select__selection {
  height: 40px !important;
  min-height: 40px !important;
  line-height: 40px !important;
}
.vehicle-type-select .el-select__selected-item,
.vehicle-type-select .el-select__placeholder {
  line-height: 40px !important;
  font-size: 14px !important;
}
/* 下拉菜单样式 */
.vehicle-type-select :deep(.el-select-dropdown) {
  z-index: 10000;
}
/* 6. 车牌号输入框样式（参考，确保和下拉框字体/高度一致） */
.plate-number-input {
  position: absolute;
  left: 40.05%;
  top: 50.62%;
  width: 19.85%;
  height: 40px;
  z-index: 100;
}
.plate-number-input :deep(.el-input__wrapper) {
  background-color: #fff !important;
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
  height: 100% !important;
}
.plate-number-input :deep(.el-input__wrapper:hover) {
  box-shadow: none !important;
}
.plate-number-input :deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}
.plate-number-input :deep(.el-input__inner),
.vehicle-number-input :deep(.el-input__inner) {
  font-size: 14px !important; /* 和车辆类型下拉框文字一致 */
  height: 40px !important; /* 和车辆类型下拉框高度一致 */
  line-height: 40px !important;
  font-family: "Alibaba PuHuiTi-Regular";
  color: rgba(177, 173, 173, 1);
  padding-left: 0;
}
.plate-number-input :deep(.el-input__inner::placeholder),
.vehicle-number-input :deep(.el-input__inner::placeholder) {
  color: rgba(177, 173, 173, 1);
}
/* 车辆编号输入框样式（标准尺寸） */
.vehicle-number-input {
  position: absolute;
  left: 40.05%;
  top: 56.16%;
  width: 19.85%;
  height: 40px;
  z-index: 100;
}
.vehicle-number-input :deep(.el-input__wrapper) {
  background-color: #fff !important;
  box-shadow: none !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  padding: 0 12px !important;
  height: 100% !important;
}
.vehicle-number-input :deep(.el-input__wrapper:hover) {
  box-shadow: none !important;
}
.vehicle-number-input :deep(.el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
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
</style>
