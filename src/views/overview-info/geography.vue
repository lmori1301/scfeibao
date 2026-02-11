<template>
    <div class="scroll-container-1_562">
        <div id="1_562" class="Pixso-frame-1_562">
            <div id="1_563" class="Pixso-vector-1_563"></div>
            <div id="1_564" class="Pixso-vector-1_564"></div>
            <div id="1_567" class="Pixso-vector-1_567"></div>
            <p id="1_570" class="Pixso-paragraph-1_570">{{ "四川飞豹救援" }}</p>
            <p id="1_571" class="Pixso-paragraph-1_571">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_580" class="Pixso-vector-1_580"></div>
            <div id="1_581" class="Pixso-vector-1_581"></div>
            <div id="1_582" class="Pixso-vector-1_582"></div>
            <div id="1_583" class="Pixso-vector-1_583"></div>
            <p id="1_584" class="Pixso-paragraph-1_584">{{ "OVERV" }}</p>
            <p id="1_585" class="Pixso-paragraph-1_585">{{ "概况信息" }}</p>
            <router-link to="/overview-info/geography" id="1_586" class="Pixso-paragraph-1_586">
                {{ "地理位置                          >" }}
            </router-link>
            <router-link to="/overview-info/organization" id="1_587" class="Pixso-paragraph-1_587">
                {{ "组织机构                          " }}
            </router-link>
            <div id="1_588" class="Pixso-vector-1_588"></div>
            <div id="1_589" class="Pixso-vector-1_589"></div>
            <div id="1_596" class="Pixso-vector-1_596"></div>
            <p id="1_597" class="Pixso-paragraph-1_597">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/overview-info" style="color: inherit; text-decoration: none;">概况信息</router-link> > 地理信息
            </p>
            <div id="1_598" class="Pixso-vector-1_598"></div>
            <div id="1_599" class="Pixso-vector-1_599"></div>
            <router-link to="/overview-info/leadership" id="1_600" class="Pixso-paragraph-1_600">
                {{ "领导信息                         " }}
            </router-link>
            <div id="1_601" class="Pixso-vector-1_601"></div>
            <p id="1_602" class="Pixso-paragraph-1_602">{{ currentUnit.name }}</p>
            <p id="1_603" class="Pixso-paragraph-1_603">{{ "     " }}</p>
            <p id="1_604" class="Pixso-paragraph-1_604">
                {{ currentUnit.address }}
            </p>
            <p id="1_605" class="Pixso-paragraph-1_605">{{ currentUnit.phone }}</p>
            <p id="1_606" class="Pixso-paragraph-1_606 unit-tab" :class="{ 'unit-tab-active': activeIndex === 0 }" role="button" tabindex="0" @click="switchUnit(0)" @keydown.enter="switchUnit(0)">{{ "总队指挥部" }}</p>
            <div id="1_607" class="Pixso-vector-1_607"></div>
            <p id="1_608" class="Pixso-paragraph-1_608 unit-tab" :class="{ 'unit-tab-active': activeIndex === 1 }" role="button" tabindex="0" @click="switchUnit(1)" @keydown.enter="switchUnit(1)">{{ "特勤大队" }}</p>
            <p id="1_609" class="Pixso-paragraph-1_609 unit-tab" :class="{ 'unit-tab-active': activeIndex === 2 }" role="button" tabindex="0" @click="switchUnit(2)" @keydown.enter="switchUnit(2)">
                {{ "训练与战勤保障大队" }}
            </p>
            <p id="1_610" class="Pixso-paragraph-1_610 unit-tab" :class="{ 'unit-tab-active': activeIndex === 3 }" role="button" tabindex="0" @click="switchUnit(3)" @keydown.enter="switchUnit(3)">
                {{ "应急通信与车辆勤务大队" }}
            </p>
            <p id="1_611" class="Pixso-paragraph-1_611 unit-tab" :class="{ 'unit-tab-active': activeIndex === 4 }" role="button" tabindex="0" @click="switchUnit(4)" @keydown.enter="switchUnit(4)">
                {{ "峨眉山直属大队" }}
            </p>
            <p id="1_612" class="Pixso-paragraph-1_612 unit-tab" :class="{ 'unit-tab-active': activeIndex === 5 }" role="button" tabindex="0" @click="switchUnit(5)" @keydown.enter="switchUnit(5)">{{ "搜救犬大队" }}</p>
            <div id="1_613" class="Pixso-vector-1_613"></div>
            <div id="17_32" class="Pixso-vector-17_32"></div>
            <div id="1_618" class="Pixso-vector-1_618"></div>
            <p id="1_619" class="Pixso-paragraph-1_619">{{ "概况信息" }}</p>
            <p id="1_620" class="Pixso-paragraph-1_620">{{ "队伍建设" }}</p>
            <p id="1_621" class="Pixso-paragraph-1_621">{{ "党建专栏" }}</p>
            <p id="1_622" class="Pixso-paragraph-1_622">{{ "信息公开" }}</p>
            <p id="1_623" class="Pixso-paragraph-1_623">{{ "动态要闻" }}</p>
            <p id="1_624" class="Pixso-paragraph-1_624">{{ "政策法规" }}</p>
            <p id="6_776" class="Pixso-paragraph-6_776">{{ "查询系统" }}</p>
            <div id="1_625" class="Pixso-vector-1_625"></div>
            <div id="33_309" class="Pixso-group-33_309">
                <div id="33_310" class="Pixso-vector-33_310"></div>
                <p id="33_311" class="Pixso-paragraph-33_311">
                    {{ "请输入您要搜索的内容" }}
                </p>
                <div id="33_312" class="Pixso-vector-33_312"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

// 当前选中的单位索引
const activeIndex = ref(0)

// 单位信息数据
interface UnitInfo {
  name: string
  address: string
  phone: string
}

const units: UnitInfo[] = [
  {
    name: '总队指挥部',
    address: '四川省成都市温江区四川飞豹应急救援指挥中心',
    phone: '028-87659119'
  },
  {
    name: '特勤大队',
    address: '四川省成都市武侯区特勤大队驻地',
    phone: '028-87659120'
  },
  {
    name: '训练与战勤保障大队',
    address: '四川省成都市双流区训练基地',
    phone: '028-87659121'
  },
  {
    name: '应急通信与车辆勤务大队',
    address: '四川省成都市龙泉驿区车辆勤务中心',
    phone: '028-87659122'
  },
  {
    name: '峨眉山直属大队',
    address: '四川省乐山市峨眉山市救援站',
    phone: '028-87659123'
  },
  {
    name: '搜救犬大队',
    address: '四川省成都市新都区搜救犬训练基地',
    phone: '028-87659124'
  }
]

// 当前选中的单位信息
const currentUnit = computed(() => units[activeIndex.value])

// 切换单位
const switchUnit = (index: number) => {
  activeIndex.value = index
}
</script>
<style>
/* 单位tab样式 */
.unit-tab {
    cursor: pointer;
    transition: all 0.3s ease;
}

.unit-tab:hover {
    opacity: 0.8;
}

.unit-tab-active {
    color: rgba(21, 112, 206, 1) !important;
    font-weight: bold;
    text-decoration: underline;
}

.scroll-container-1_562 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_562 {
    width: 1920px;
    height: 1584px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_563 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_563.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_564 {
    width: 100%;
    height: 12.25%;
    background-image: url(@/assets/images/Vector_1_564.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 87.75%;
}
.Pixso-vector-1_567 {
    width: 6.72%;
    height: 8.15%;
    background-image: url(@/assets/images/Vector_1_567.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.08%;
    bottom: 89.77%;
}
.Pixso-paragraph-1_570 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.35%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.66%;
    bottom: 92.99%;
}
.Pixso-paragraph-1_571 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.51%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 7.58%;
    bottom: 90.91%;
}
.Pixso-vector-1_580 {
    width: 18.38%;
    height: 10.29%;
    background-image: url(@/assets/images/Vector_1_580.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 18.5%;
    bottom: 71.21%;
}
.Pixso-vector-1_581 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_581.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 43.5%;
    bottom: 49.24%;
}
.Pixso-vector-1_582 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_582.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 36.17%;
    bottom: 56.57%;
}
.Pixso-vector-1_583 {
    width: 18.38%;
    height: 29.86%;
    background-image: url(@/assets/images/Vector_1_583.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 50.88%;
    bottom: 19.26%;
}
.Pixso-paragraph-1_584 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 14.27%;
    height: 4.74%;
    position: absolute;
    left: 10%;
    right: 75.73%;
    top: 21.4%;
    bottom: 73.86%;
    opacity: 0.5;
}
.Pixso-paragraph-1_585 {
    font-size: 50px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 11.15%;
    right: 78.59%;
    top: 21.02%;
    bottom: 75.82%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_586 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 8.7%;
    right: 79.01%;
    top: 46.4%;
    bottom: 52.34%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_587 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 4.22%;
    height: 1.26%;
    position: absolute;
    left: 8.7%;
    right: 87.08%;
    top: 39.14%;
    bottom: 59.6%;
}
.Pixso-vector-1_588 {
    width: 0.05%;
    height: 1.45%;
    background-image: url(@/assets/images/Vector_1_588.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.05%;
    right: 91.9%;
    top: 46.37%;
    bottom: 52.18%;
}
.Pixso-vector-1_589 {
    width: 100%;
    height: 17.68%;
    background-image: url(@/assets/images/Vector_1_589.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 82.32%;
    bottom: 0%;
}
.Pixso-vector-1_596 {
    width: 68.44%;
    height: 58.27%;
    background-image: url(@/assets/images/Vector_1_596.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.78%;
    right: 5.78%;
    top: 22.47%;
    bottom: 19.26%;
}
.Pixso-paragraph-1_597 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 26.3%;
    right: 56.09%;
    top: 19.26%;
    bottom: 79.48%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_598 {
    width: 64.79%;
    height: 48.3%;
    background-image: url(@/assets/images/Vector_1_598.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 27.29%;
    right: 7.92%;
    top: 29.73%;
    bottom: 21.97%;
}
.Pixso-vector-1_599 {
    width: 18.38%;
    height: 7.26%;
    background-image: url(@/assets/images/Vector_1_599.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 28.85%;
    bottom: 63.89%;
}
.Pixso-paragraph-1_600 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 4.27%;
    height: 1.26%;
    position: absolute;
    left: 8.7%;
    right: 87.03%;
    top: 31.82%;
    bottom: 66.92%;
}
.Pixso-vector-1_601 {
    width: 31.67%;
    height: 9.66%;
    background-image: url(@/assets/images/Vector_1_601.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.33%;
    right: 40%;
    top: 66.67%;
    bottom: 23.67%;
}
.Pixso-paragraph-1_602 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(10, 10, 10, 1);
    width: 7.91%;
    height: 1.58%;
    position: absolute;
    left: 29.64%;
    right: 62.45%;
    top: 68.24%;
    bottom: 30.18%;
}
.Pixso-paragraph-1_603 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(10, 10, 10, 1);
    white-space: pre-wrap;
    width: 0.11%;
    height: 1.58%;
    position: absolute;
    left: 35.78%;
    right: 64.11%;
    top: 25.19%;
    bottom: 73.23%;
}
.Pixso-paragraph-1_604 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(59, 59, 59, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 29.64%;
    right: 48.8%;
    top: 71.02%;
    bottom: 27.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_605 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(59, 59, 59, 1);
    width: 7.18%;
    height: 1.27%;
    position: absolute;
    left: 29.64%;
    right: 63.18%;
    top: 73.48%;
    bottom: 25.25%;
}
.Pixso-paragraph-1_606 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(21, 112, 206, 1);
    width: 6.51%;
    height: 1.57%;
    position: absolute;
    left: 28.07%;
    right: 65.42%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-vector-1_607 {
    width: 6.2%;
    height: 0.38%;
    background-image: url(@/assets/images/Vector_1_607.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.23%;
    right: 65.57%;
    top: 27.78%;
    bottom: 71.84%;
}
.Pixso-paragraph-1_608 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 5.26%;
    height: 1.57%;
    position: absolute;
    left: 65.94%;
    right: 28.8%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-paragraph-1_609 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 36.41%;
    right: 52.03%;
    top: 25.32%;
    bottom: 73.11%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_610 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 49.9%;
    right: 35.99%;
    top: 25.32%;
    bottom: 73.11%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_611 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 9.12%;
    height: 1.57%;
    position: absolute;
    left: 73.02%;
    right: 17.86%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-paragraph-1_612 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(105, 105, 105, 1);
    width: 6.51%;
    height: 1.57%;
    position: absolute;
    left: 83.96%;
    right: 9.53%;
    top: 25.32%;
    bottom: 73.11%;
}
.Pixso-vector-1_613 {
    width: 100%;
    height: 4.42%;
    background-image: url(@/assets/images/Vector_1_613.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 12.25%;
    bottom: 83.33%;
}
.Pixso-vector-17_32 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_32.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_618 {
    width: 204px;
    height: 4.42%;
    background-image: url(@/assets/images/Vector_1_618.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 12.25%;
    bottom: 83.33%;
    transform: translateX(calc(-50% + -596px));
}
.Pixso-paragraph-1_619 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -596px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_620 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -392px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_621 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_622 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_623 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_624 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-6_776 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 13.7%;
    bottom: 84.72%;
    transform: translateX(calc(-50% + 631px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_625 {
    width: 2.14%;
    height: 2.65%;
    background-image: url(@/assets/images/Boolean_operation_1_625.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.33%;
    right: 89.53%;
    top: 21.15%;
    bottom: 76.2%;
}
.Pixso-group-33_309 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1470px;
    top: 90px;
}
.Pixso-vector-33_310 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_310.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_311 {
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
.Pixso-vector-33_312 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_312.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
</style>
