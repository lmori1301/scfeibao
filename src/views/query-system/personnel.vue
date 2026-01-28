<template>
  <div class="scroll-container">
    <div class="main-frame">
      <!-- 公共头部区域 -->
      <div class="header-vector"></div>
      <div class="header-bg"></div>
      <div class="logo-icon"></div>
      <p class="org-name-cn">四川飞豹救援</p>
      <p class="org-name-en">Sichuan Feibao Rescue</p>
      
      <!-- 公共导航栏 -->
      <div class="nav-line"></div>
      <p class="nav-item">概况信息</p>
      <p class="nav-item">队伍建设</p>
      <p class="nav-item">党建专栏</p>
      <p class="nav-item">信息公开</p>
      <p class="nav-item">动态要闻</p>
      <p class="nav-item">政策法规</p>
      <div class="query-nav-bg"></div>
      <p class="nav-item query-nav">查询系统</p>
      
      <!-- 公共搜索框 -->
      <div class="search-group">
        <div class="search-input-bg"></div>
        <p class="search-placeholder">请输入您要搜索的内容</p>
        <div class="search-icon"></div>
      </div>

      <!-- 位置面包屑 -->
      <p class="breadcrumb">
        {{ isShowResult ? "当前位置：首页 > 查询系统 > 内部人员查询结果" : "当前位置：首页 > 查询系统" }}
      </p>

      <!-- 动态切换区域：查询表单 / 结果展示 -->
      <div v-if="!isShowResult" class="query-form-area">
        <div class="query-title-bg"></div>
        <div class="query-title-text">
          <p><span>查询</span></p>
          <p><span>系统</span></p>
        </div>
        <div class="form-card-bg"></div>
        <p class="form-title">内部管理系统</p>
        
        <!-- 内部人员查询表单 -->
        <div class="form-item-bg name-bg"></div>
        <p class="form-label main-label">内部人员信息</p>
        <div class="form-item-bg id-bg"></div>
        <p class="form-label sub-label">姓名</p>
        <div class="form-item-bg card-bg"></div>
        <p class="form-label sub-label">身份证号码</p>
        <div class="form-item-bg btn-bg"></div>
        <div class="query-btn" @click="handleQuery">查询</div>
        
        <!-- 系统分类入口 -->
        <div class="system-card certificate-system">
          <div class="system-card-bg"></div>
          <p class="system-name">证书管理系统</p>
          <div class="system-icon"></div>
        </div>
        <div class="system-card internal-system">
          <div class="system-card-bg-top"></div>
          <div class="system-card-bg-bottom"></div>
          <p class="system-name active">内部管理系统</p>
          <div class="system-icon"></div>
        </div>
        <div class="system-card vehicle-system">
          <div class="system-card-bg"></div>
          <p class="system-name">车辆管理系统</p>
          <div class="system-icon"></div>
        </div>
      </div>

      <!-- 查询结果区域 -->
      <div v-else class="result-area">
        <div class="result-card-bg"></div>
        <div class="avatar-bg"></div>
        <p class="result-name">{{ personInfo.name }}</p>
        <p class="result-org">{{ personInfo.org }}</p>
        
        <!-- 人员信息展示 -->
        <div class="info-grid">
          <!-- 第一列 -->
          <p class="info-label">人员编号：</p>
          <p class="info-value">{{ personInfo.id }}</p>
          <p class="info-label">联系电话：</p>
          <p class="info-value">{{ personInfo.phone }}</p>
          <p class="info-label">职       务：</p>
          <p class="info-value">{{ personInfo.position }}</p>
          <p class="info-label">任务次数：</p>
          <p class="info-value">{{ personInfo.taskCount }}</p>
          
          <!-- 第二列 -->
          <p class="info-label second-col">培训时长：</p>
          <p class="info-value second-col">{{ personInfo.trainHours }}</p>
          <p class="info-label second-col">姓       名：</p>
          <p class="info-value second-col">{{ personInfo.name }}</p>
          <p class="info-label second-col">工作单位：</p>
          <p class="info-value second-col">{{ personInfo.org }}</p>
          <p class="info-label second-col">入职日期：</p>
          <p class="info-value second-col">{{ personInfo.joinDate }}</p>
          
          <!-- 第三列 -->
          <p class="info-label third-col">当前状态：</p>
          <p class="info-value third-col">{{ personInfo.status }}</p>
          <p class="info-label third-col">身份证号：</p>
          <p class="info-value third-col">{{ personInfo.idCard }}</p>
          <p class="info-label third-col">所属部门：</p>
          <p class="info-value third-col">{{ personInfo.department }}</p>
          <p class="info-label third-col">电子邮箱：</p>
          <p class="info-value third-col">{{ personInfo.email }}</p>
        </div>
        
        <!-- 返回按钮 -->
        <div class="back-btn" @click="isShowResult = false">返回查询</div>
      </div>

      <!-- 公共底部区域 -->
      <div class="footer-bg"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制显示查询表单还是结果页面
const isShowResult = ref(false)

// 模拟人员数据（实际项目中可从接口获取）
const personInfo = ref({
  name: '谢春明',
  org: '四川飞豹救援队',
  id: 'FB5100001',
  phone: '13800138000',
  position: '总队长',
  taskCount: '156次',
  trainHours: '876小时',
  status: '在职',
  joinDate: '2023-06-05',
  idCard: '11010219880520XXXX',
  department: '指挥中心',
  email: 'xiechunming@qq.com'
})

// 处理查询按钮点击事件
const handleQuery = () => {
  // 实际项目中可添加表单验证、接口请求逻辑
  // 这里直接切换到结果页面
  isShowResult.value = true
}
</script>

<style scoped>
/* 基础容器样式 */
.scroll-container {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.main-frame {
  width: 1920px;
  height: 1440px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: #fff;
}

/* 公共头部样式 */
.header-vector {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2976.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.header-bg {
  width: 100%;
  height: 13.47%;
  background-image: url(@/assets/images/Vector_1_2977.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: -0.28%;
  bottom: 86.81%;
  z-index: 2;
}
.logo-icon {
  width: 6.72%;
  height: 8.96%;
  background-image: url(@/assets/images/Vector_1_2980.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 2.01%;
  bottom: 89.03%;
  z-index: 3;
}
.org-name-cn {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: #D92626;
  width: 16.66%;
  height: 3.68%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 3.75%;
  bottom: 92.57%;
  z-index: 3;
  margin: 0;
}
.org-name-en {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: #D92626;
  width: 16.3%;
  height: 1.66%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 8.06%;
  bottom: 90.28%;
  z-index: 3;
  margin: 0;
}

/* 公共导航栏样式 */
.nav-line {
  width: 100%;
  height: 4.87%;
  background-image: url(@/assets/images/Vector_6_752.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0.05%;
  right: -0.05%;
  top: 13.19%;
  bottom: 81.94%;
  z-index: 2;
}
.nav-item {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 14.79%;
  bottom: 83.47%;
  z-index: 3;
  margin: 0;
}
.nav-item:nth-of-type(1) { transform: translateX(calc(-50% + -595px)); }
.nav-item:nth-of-type(2) { transform: translateX(calc(-50% + -391px)); }
.nav-item:nth-of-type(3) { transform: translateX(calc(-50% + -187px)); }
.nav-item:nth-of-type(4) { transform: translateX(calc(-50% + 17px)); }
.nav-item:nth-of-type(5) { transform: translateX(calc(-50% + 221px)); }
.nav-item:nth-of-type(6) { transform: translateX(calc(-50% + 425px)); }
.query-nav-bg {
  width: 204px;
  height: 4.87%;
  background-image: url(@/assets/images/Vector_33_651.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 13.19%;
  bottom: 81.94%;
  transform: translateX(calc(-50% + 627px));
  z-index: 2;
}
.query-nav {
  transform: translateX(calc(-50% + 627px)) !important;
}

/* 公共搜索框样式 */
.search-group {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1412px;
  top: 90px;
  z-index: 3;
}
.search-input-bg {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_220.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.search-placeholder {
  font-size: 16px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: #585353;
  width: 68.05%;
  height: 20px;
  position: absolute;
  left: 4.73%;
  right: 27.22%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  margin: 0;
}
.search-icon {
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
  z-index: 2;
}

/* 面包屑样式 */
.breadcrumb {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: #848484;
  position: absolute;
  left: 5.83%;
  top: 20.21%;
  z-index: 3;
  margin: 0;
}

/* 查询表单区域样式 */
.query-form-area {
  position: relative;
  z-index: 3;
}
.query-title-bg {
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
  z-index: 1;
}
.query-title-text {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: #fff;
  width: 2.76%;
  height: 3.48%;
  position: absolute;
  left: 28.13%;
  right: 69.11%;
  top: 28.26%;
  bottom: 68.26%;
  z-index: 2;
  margin: 0;
}
.form-card-bg {
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
  z-index: 1;
}
.form-title {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: #007FF3;
  width: 7.92%;
  height: 1.73%;
  position: absolute;
  left: 46.04%;
  right: 46.04%;
  top: 39.38%;
  bottom: 58.89%;
  z-index: 2;
  margin: 0;
}
.form-item-bg {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 40.05%;
  right: 40.1%;
  z-index: 1;
}
.name-bg {
  width: 19.85%;
  height: 4.17%;
  background-image: url(@/assets/images/Vector_1_3051.png);
  top: 45.14%;
  bottom: 50.69%;
}
.id-bg {
  width: 19.85%;
  height: 4.16%;
  background-image: url(@/assets/images/Vector_1_3052.png);
  top: 50.49%;
  bottom: 45.35%;
}
.card-bg {
  width: 19.85%;
  height: 4.17%;
  background-image: url(@/assets/images/Vector_1_3053.png);
  top: 56.04%;
  bottom: 39.79%;
}
.btn-bg {
  width: 19.85%;
  height: 4.03%;
  background-image: url(@/assets/images/Vector_1_3050.png);
  top: 64.58%;
  bottom: 31.39%;
}
.form-label {
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  position: absolute;
  left: 40.73%;
  z-index: 2;
  margin: 0;
}
.main-label {
  font-size: 20px;
  color: #5E5E5E;
  width: 6.3%;
  height: 1.39%;
  top: 46.46%;
  bottom: 52.15%;
}
.sub-label {
  font-size: 20px;
  color: #B1ADAD;
  height: 1.38%;
}
.sub-label:nth-of-type(2) {
  width: 2.19%;
  top: 51.81%;
  bottom: 46.81%;
}
.sub-label:nth-of-type(3) {
  width: 5.26%;
  top: 57.36%;
  bottom: 41.25%;
}
.query-btn {
  width: 3.33%;
  height: 1.46%;
  background-image: url(@/assets/images/Vector_1_3057.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.28%;
  right: 48.39%;
  top: 65.9%;
  bottom: 32.64%;
  z-index: 2;
  cursor: pointer;
  color: #fff;
  text-align: center;
  line-height: 21px;
  font-size: 16px;
}

/* 系统分类卡片样式 */
.system-card {
  position: absolute;
  top: 391px;
  z-index: 2;
}
.certificate-system {
  width: 256px;
  height: 85px;
  left: 625px;
}
.internal-system {
  width: 256px;
  height: 85px;
  left: 881px;
}
.vehicle-system {
  width: 273px;
  height: 85px;
  left: 1137px;
}
.system-card-bg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.certificate-system .system-card-bg {
  background-image: url(@/assets/images/Vector_1_3001.png);
}
.vehicle-system .system-card-bg {
  background-image: url(@/assets/images/Vector_1_3002.png);
}
.system-card-bg-top {
  width: 100%;
  height: 56.47%;
  background-image: url(@/assets/images/Vector_1_3003.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 43.53%;
  z-index: 1;
}
.system-card-bg-bottom {
  width: 100%;
  height: 43.53%;
  background-image: url(@/assets/images/Vector_1_3004.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 56.47%;
  bottom: 0;
  z-index: 1;
}
.system-name {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 25px;
  position: absolute;
  z-index: 2;
  margin: 0;
}
.certificate-system .system-name,
.vehicle-system .system-name {
  color: #007FF3;
  width: 59.37%;
  height: 29.42%;
  left: 30.08%;
  right: 10.55%;
  top: 35.29%;
  bottom: 35.29%;
}
.internal-system .system-name {
  color: #FBF647;
  width: 59.37%;
  height: 29.41%;
  left: 30.08%;
  right: 10.55%;
  top: 32.94%;
  bottom: 37.65%;
}
.system-icon {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 2;
}
.certificate-system .system-icon {
  width: 14.67%;
  height: 44.18%;
  background-image: url(@/assets/images/Vector_1_3038.png);
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.45%;
}
.internal-system .system-icon {
  width: 14.67%;
  height: 44.18%;
  background-image: url(@/assets/images/Vector_1_3027.png);
  left: 10.65%;
  right: 74.68%;
  top: 27.37%;
  bottom: 28.45%;
}
.vehicle-system .system-icon {
  width: 13.75%;
  height: 44.17%;
  background-image: url(@/assets/images/Vector_1_3011.png);
  left: 9.99%;
  right: 76.26%;
  top: 28.55%;
  bottom: 27.28%;
}

/* 查询结果区域样式 */
.result-area {
  position: relative;
  z-index: 3;
}
.result-card-bg {
  width: 88.48%;
  height: 54.05%;
  background-image: url(@/assets/images/Vector_1_3092.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.63%;
  right: 5.89%;
  top: 24.24%;
  bottom: 21.71%;
  z-index: 1;
}
.avatar-bg {
  width: 18.07%;
  height: 31.77%;
  background-image: url(@/assets/images/Vector_1_3096.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 9.95%;
  right: 71.98%;
  top: 31.76%;
  bottom: 36.47%;
  z-index: 2;
}
.result-name {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 25px;
  color: #333;
  width: 3.96%;
  height: 1.75%;
  position: absolute;
  left: 16.98%;
  right: 79.06%;
  top: 65.92%;
  bottom: 32.33%;
  z-index: 3;
  margin: 0;
}
.result-org {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: #3578F8;
  width: 7.4%;
  height: 1.41%;
  position: absolute;
  left: 15.26%;
  right: 77.34%;
  top: 69.43%;
  bottom: 29.16%;
  z-index: 3;
  margin: 0;
}
.info-grid {
  position: absolute;
  left: 32.24%;
  top: 35.49%;
  width: 60%;
  height: 30%;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.info-label {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: #9E9E9E;
  margin: 15px 0;
}
.info-value {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: #464646;
  margin: 15px 0 15px 10px;
}
.second-col {
  grid-column: 2;
  margin-left: 0;
}
.third-col {
  grid-column: 3;
  margin-left: 0;
}
.back-btn {
  width: 2.4%;
  height: 1.61%;
  background-image: url(@/assets/images/Vector_1_3120.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 76.56%;
  right: 21.04%;
  top: 58.4%;
  bottom: 39.99%;
  z-index: 3;
  cursor: pointer;
  color: #fff;
  text-align: center;
  line-height: 23px;
  font-size: 16px;
}

/* 公共底部样式 */
.footer-bg {
  width: 100%;
  height: 19.44%;
  background-image: url(@/assets/images/Vector_1_2993.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 80.56%;
  bottom: 0;
  z-index: 2;
}
</style>