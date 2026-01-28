<template>
  <div class="scroll-container">
    <div class="Pixso-frame">
      <!-- 公共头部区域：logo、标题 -->
      <div class="Pixso-vector-1_3146"></div>
      <div class="Pixso-vector-1_3147"></div>
      <div class="Pixso-vector-1_3150"></div>
      <p class="Pixso-paragraph-1_3153">{{ "四川飞豹救援" }}</p>
      <p class="Pixso-paragraph-1_3154">{{ "Sichuan Feibao Rescue" }}</p>

      <!-- 公共顶部导航栏 -->
      <div class="Pixso-vector-1_3230"></div>
      <div class="Pixso-vector-1_3231"></div>
      <div class="Pixso-vector-1_3232"></div>
      <p class="Pixso-paragraph-33_754">{{ "概况信息" }}</p>
      <p class="Pixso-paragraph-33_755">{{ "队伍建设" }}</p>
      <p class="Pixso-paragraph-33_756">{{ "信息公开" }}</p>
      <p class="Pixso-paragraph-33_757">{{ "党建专栏" }}</p>
      <p class="Pixso-paragraph-33_758">{{ "动态要闻" }}</p>
      <p class="Pixso-paragraph-33_759">{{ "政策法规" }}</p>
      <div class="Pixso-vector-33_760"></div>
      <p class="Pixso-paragraph-33_761">{{ "查询系统" }}</p>

      <!-- 公共右上角搜索框 -->
      <div class="Pixso-group-33_228">
        <div class="Pixso-vector-33_229"></div>
        <p class="Pixso-paragraph-33_230">{{ "请输入您要搜索的内容" }}</p>
        <div class="Pixso-vector-33_231"></div>
      </div>

      <!-- 面包屑：根据显示状态切换文本 -->
      <p class="Pixso-paragraph-1_3169">
        {{ isShowResult ? "当前位置：首页 > 查询系统 > 应急车辆查询结果" : "当前位置：首页 > 查询系统" }}
      </p>

      <!-- 查询区域：未查询时显示 -->
      <div v-if="!isShowResult" class="query-section">
        <div id="1_3209" class="Pixso-vector-1_3209"></div>
        <div id="1_3210" class="Pixso-text-1_3210">
          <p id="1_3210_0" class="Pixso-paragraph-3210_0">
            <span id="1_3210_0_1" class="Pixso-span-1_3210_0_1">{{ "查询" }}</span>
          </p>
          <p id="1_3210_1" class="Pixso-paragraph-3210_1">
            <span id="1_3210_1_1" class="Pixso-span-1_3210_1_1">{{ "系统" }}</span>
          </p>
        </div>
        <div id="1_3211" class="Pixso-vector-1_3211"></div>
        <p id="1_3212" class="Pixso-paragraph-1_3212">{{ "车辆管理系统" }}</p>
        
        <!-- 查询输入项 -->
        <div class="Pixso-vector-1_3214"></div>
        <p class="Pixso-paragraph-1_3217">{{ "车辆类型" }}</p>
        <div class="Pixso-vector-1_3215"></div>
        <p class="Pixso-paragraph-1_3218">{{ "车牌号" }}</p>
        <div class="Pixso-vector-1_3216"></div>
        <p class="Pixso-paragraph-1_3219">{{ "车辆编号" }}</p>
        
        <!-- 查询按钮 -->
        <div class="Pixso-vector-1_3220"></div>
        <p class="Pixso-paragraph-1_3221" @click="handleQuery">{{ "查询" }}</p>
        <div class="Pixso-vector-1_3222"></div>
      </div>

      <!-- 结果区域：查询后显示 -->
      <div v-else class="result-section">
        <div class="Pixso-vector-1_3268"></div>
        <div class="Pixso-vector-1_3293"></div>
        
        <!-- 车辆详情信息 -->
        <p class="Pixso-paragraph-1_3270">{{ "车属单位：" }}</p>
        <p class="Pixso-paragraph-1_3271">{{ vehicleInfo.company }}</p>
        <p class="Pixso-paragraph-1_3280">{{ "车辆类型：" }}</p>
        <p class="Pixso-paragraph-1_3281">{{ vehicleInfo.type }}</p>
        <p class="Pixso-paragraph-1_3286">{{ "车架号码：" }}</p>
        <p class="Pixso-paragraph-1_3287">{{ vehicleInfo.frameNo }}</p>
        <p class="Pixso-paragraph-1_3288">{{ "装备日期：" }}</p>
        <p class="Pixso-paragraph-1_3289">{{ vehicleInfo.equipDate }}</p>
        <p class="Pixso-paragraph-1_3278">{{ "有效期限：" }}</p>
        <p class="Pixso-paragraph-1_3279">{{ vehicleInfo.validDate }}</p>
        <p class="Pixso-paragraph-1_3272">{{ "厂牌型号：" }}</p>
        <p class="Pixso-paragraph-1_3273">{{ vehicleInfo.model }}</p>
        <p class="Pixso-paragraph-1_3274">{{ "车体颜色：" }}</p>
        <p class="Pixso-paragraph-1_3275">{{ vehicleInfo.color }}</p>
        <p class="Pixso-paragraph-1_3276">{{ "发证日期：" }}</p>
        <p class="Pixso-paragraph-1_3277">{{ vehicleInfo.issueDate }}</p>
        <p class="Pixso-paragraph-1_3284">{{ "车辆编号：" }}</p>
        <p class="Pixso-paragraph-1_3285">{{ vehicleInfo.code }}</p>
        <p class="Pixso-paragraph-1_3282">{{ "发动机号：" }}</p>
        <p class="Pixso-paragraph-1_3283">{{ vehicleInfo.engineNo }}</p>
        <p class="Pixso-paragraph-1_3291">{{ "车辆号牌：" }}</p>
        <p class="Pixso-paragraph-1_3292">{{ vehicleInfo.plateNo }}</p>
        <p class="Pixso-paragraph-1_3290">{{ "当前状态：" }}</p>
        <div class="Pixso-vector-1_3296"></div>

        <!-- 返回查询按钮 -->
        <div class="back-btn" @click="handleBack">
          <span>返回查询</span>
        </div>
      </div>

      <!-- 公共底部区域 -->
      <div class="Pixso-vector-1_3162"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 控制查询/结果区域显示状态
const isShowResult = ref(false);

// 车辆详情数据（模拟，可替换为接口返回数据）
const vehicleInfo = ref({
  company: "四川飞豹救援",
  type: "应急救援指挥车",
  frameNo: "L6T9444GZ2212",
  equipDate: "2023-06-05",
  validDate: "2025-02-15",
  model: "哈佛牌/CC6490WM28",
  color: "白色",
  issueDate: "2024-02-15",
  code: "SC20251209001",
  engineNo: "BGCA039822",
  plateNo: "川A·12345"
});

// 处理查询按钮点击
const handleQuery = () => {
  // 这里可添加真实查询逻辑（如调用接口）
  // 模拟查询延迟，增强交互体验
  setTimeout(() => {
    isShowResult.value = true;
  }, 300);
};

// 处理返回查询按钮点击
const handleBack = () => {
  isShowResult.value = false;
};
</script>

<style scoped>
/* 公共容器样式 */
.scroll-container {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.Pixso-frame {
  width: 1920px;
  height: 1444px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}

/* 公共头部样式 */
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

/* 公共顶部导航样式 */
.Pixso-vector-1_3230 {
  width: 100%;
  height: 4.84%;
  background-image: url(@/assets/images/Vector_1_3230.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 13.23%;
  bottom: 81.93%;
}
.Pixso-vector-1_3231 {
  width: 7.81%;
  height: 4.84%;
  background-image: url(@/assets/images/Vector_1_3231.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 86.3%;
  top: 13.23%;
  bottom: 81.93%;
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
.Pixso-paragraph-33_754, .Pixso-paragraph-33_755, .Pixso-paragraph-33_756,
.Pixso-paragraph-33_757, .Pixso-paragraph-33_758, .Pixso-paragraph-33_759 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 14.82%;
  bottom: 83.45%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-33_754 { transform: translateX(calc(-50% + -595px)); text-align: center; }
.Pixso-paragraph-33_755 { transform: translateX(calc(-50% + -391px)); }
.Pixso-paragraph-33_756 { transform: translateX(calc(-50% + 17px)); }
.Pixso-paragraph-33_757 { transform: translateX(calc(-50% + -187px)); }
.Pixso-paragraph-33_758 { transform: translateX(calc(-50% + 221px)); }
.Pixso-paragraph-33_759 { transform: translateX(calc(-50% + 425px)); }
.Pixso-vector-33_760 {
  width: 204px;
  height: 4.84%;
  background-image: url(@/assets/images/Vector_33_760.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 13.23%;
  bottom: 81.93%;
  transform: translateX(calc(-50% + 627px));
}
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
  top: 14.82%;
  bottom: 83.45%;
  transform: translateX(calc(-50% + 627px));
  white-space: pre;
  flex-grow: 0;
}

/* 公共右上角搜索框 */
.Pixso-group-33_228 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1442px;
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

/* 面包屑样式 */
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
  right: 72.45%;
  top: 20.43%;
  bottom: 78.19%;
  white-space: pre;
  flex-grow: 0;
}

/* 查询区域样式 */
.query-section {
  position: relative;
  width: 100%;
  height: auto;
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
.Pixso-paragraph-3210_0, .Pixso-paragraph-3210_1 {
  line-height: 25px;
  position: relative;
  flex-shrink: 0;
}
.Pixso-span-1_3210_0_1, .Pixso-span-1_3210_1_1 {
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
  top: 39.34%;
  bottom: 58.93%;
  transform: translateX(calc(-50% + -21.5px));
}
.Pixso-vector-1_3214, .Pixso-vector-1_3215, .Pixso-vector-1_3216 {
  width: 19.85%;
  height: 4.16%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
}
.Pixso-vector-1_3214 {
  background-image: url(@/assets/images/Vector_1_3214.png);
  top: 45.29%;
  bottom: 50.55%;
}
.Pixso-vector-1_3215 {
  background-image: url(@/assets/images/Vector_1_3215.png);
  top: 50.62%;
  bottom: 45.22%;
}
.Pixso-vector-1_3216 {
  background-image: url(@/assets/images/Vector_1_3216.png);
  top: 56.16%;
  bottom: 39.68%;
}
.Pixso-paragraph-1_3217, .Pixso-paragraph-1_3218, .Pixso-paragraph-1_3219 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(177, 173, 173, 1);
  width: auto;
  height: 1.38%;
  position: absolute;
  left: 40.73%;
  right: 55.05%;
}
.Pixso-paragraph-1_3217 {
  top: 46.61%;
  bottom: 52.01%;
}
.Pixso-paragraph-1_3218 {
  width: 3.23%;
  top: 51.94%;
  bottom: 46.68%;
  right: 56.04%;
}
.Pixso-paragraph-1_3219 {
  top: 57.48%;
  bottom: 41.14%;
}
.Pixso-vector-1_3220 {
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
}
.Pixso-paragraph-1_3221 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 2.19%;
  height: 1.38%;
  position: absolute;
  left: 49.53%;
  right: 48.28%;
  top: 65.93%;
  bottom: 32.69%;
  cursor: pointer;
}
.Pixso-vector-1_3222 {
  width: 1.1%;
  height: 1.45%;
  background-image: url(@/assets/images/Group_1_3222.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.33%;
  right: 50.57%;
  top: 65.93%;
  bottom: 32.62%;
}

/* 结果区域样式 */
.result-section {
  position: relative;
  width: 100%;
  height: auto;
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
.Pixso-vector-1_3293 {
  width: 39.79%;
  height: 25.66%;
  background-image: url(@/assets/images/Vector_1_3293.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 7.71%;
  right: 52.5%;
  top: 37.78%;
  bottom: 36.56%;
}
.Pixso-paragraph-1_3270, .Pixso-paragraph-1_3280, .Pixso-paragraph-1_3286,
.Pixso-paragraph-1_3288, .Pixso-paragraph-1_3278, .Pixso-paragraph-1_3272,
.Pixso-paragraph-1_3274, .Pixso-paragraph-1_3276, .Pixso-paragraph-1_3284,
.Pixso-paragraph-1_3282, .Pixso-paragraph-1_3291, .Pixso-paragraph-1_3290 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(158, 158, 158, 1);
  width: 5.31%;
  height: 1.51%;
  position: absolute;
}
/* 左侧信息标签定位 */
.Pixso-paragraph-1_3270 { left: 51.41%; right: 43.28%; top: 32.2%; bottom: 66.29%; }
.Pixso-paragraph-1_3280 { left: 51.41%; right: 43.28%; top: 38.69%; bottom: 59.8%; }
.Pixso-paragraph-1_3286 { left: 51.41%; right: 43.28%; top: 51.51%; bottom: 46.98%; }
.Pixso-paragraph-1_3288 { left: 51.41%; right: 43.28%; top: 57.92%; bottom: 40.57%; }
.Pixso-paragraph-1_3278 { left: 51.41%; right: 43.28%; top: 64.1%; bottom: 34.39%; }
.Pixso-paragraph-1_3272 { left: 51.41%; right: 43.28%; top: 45.02%; bottom: 53.47%; }
.Pixso-paragraph-1_3274 { left: 74.38%; right: 20.31%; top: 51.51%; bottom: 46.98%; }
.Pixso-paragraph-1_3276 { left: 74.38%; right: 20.31%; top: 57.92%; bottom: 40.57%; }
.Pixso-paragraph-1_3284 { left: 74.38%; right: 20.31%; top: 32.2%; bottom: 66.29%; }
.Pixso-paragraph-1_3282 { left: 74.38%; right: 20.31%; top: 45.02%; bottom: 53.47%; }
.Pixso-paragraph-1_3291 { left: 74.38%; right: 20.31%; top: 38.69%; bottom: 59.8%; }
.Pixso-paragraph-1_3290 { left: 74.38%; right: 20.31%; top: 64.18%; bottom: 34.31%; }

/* 右侧信息值定位 */
.Pixso-paragraph-1_3271, .Pixso-paragraph-1_3281, .Pixso-paragraph-1_3287,
.Pixso-paragraph-1_3289, .Pixso-paragraph-1_3279, .Pixso-paragraph-1_3273,
.Pixso-paragraph-1_3275, .Pixso-paragraph-1_3277, .Pixso-paragraph-1_3285,
.Pixso-paragraph-1_3283, .Pixso-paragraph-1_3292 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(70, 70, 70, 1);
  height: 1.51%;
  position: absolute;
}
.Pixso-paragraph-1_3271 { width: 6.36%; left: 56.61%; right: 37.03%; top: 32.2%; bottom: 66.29%; }
.Pixso-paragraph-1_3281 { width: 7.39%; left: 56.98%; right: 35.63%; top: 38.69%; bottom: 59.8%; }
.Pixso-paragraph-1_3287 { width: 7.97%; left: 56.61%; right: 35.42%; top: 51.51%; bottom: 46.98%; }
.Pixso-paragraph-1_3289 { width: 5.99%; left: 56.61%; right: 37.4%; top: 57.92%; bottom: 40.57%; }
.Pixso-paragraph-1_3279 { width: 5.98%; left: 56.88%; right: 37.14%; top: 64.1%; bottom: 34.39%; }
.Pixso-paragraph-1_3273 { width: 10.37%; left: 56.61%; right: 33.02%; top: 45.02%; bottom: 53.47%; }
.Pixso-paragraph-1_3275 { width: 2.19%; left: 79.58%; right: 18.23%; top: 51.51%; bottom: 46.98%; }
.Pixso-paragraph-1_3277 { width: 5.99%; left: 79.58%; right: 14.43%; top: 57.92%; bottom: 40.57%; }
.Pixso-paragraph-1_3285 { width: 7.91%; left: 79.95%; right: 12.14%; top: 32.2%; bottom: 66.29%; }
.Pixso-paragraph-1_3283 { width: 6.56%; left: 79.95%; right: 13.49%; top: 45.02%; bottom: 53.47%; }
.Pixso-paragraph-1_3292 { width: 5.78%; left: 79.58%; right: 14.64%; top: 38.69%; bottom: 59.8%; }

.Pixso-vector-1_3296 {
  width: 2.39%;
  height: 1.73%;
  background-image: url(@/assets/images/Vector_1_3296.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 79.64%;
  right: 17.97%;
  top: 64.18%;
  bottom: 34.09%;
}

/* 返回查询按钮 */
.back-btn {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  color: #fff;
  background-color: #007ff3;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
}

/* 公共底部样式 */
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
</style>