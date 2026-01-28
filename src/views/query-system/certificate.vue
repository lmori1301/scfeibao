<template>
  <div class="scroll-container">
    <div class="main-frame">
      <!-- 公共头部区域 -->
      <header class="header-area">
        <div class="header-bg"></div>
        <div class="header-logo"></div>
        <h1 class="org-name-cn">四川飞豹救援</h1>
        <p class="org-name-en">Sichuan Feibao Rescue</p>
      </header>

      <!-- 公共导航栏 -->
      <nav class="nav-area">
        <div class="nav-line"></div>
        <div class="nav-menu">
          <p class="nav-item">概况信息</p>
          <p class="nav-item">队伍建设</p>
          <p class="nav-item">党建专栏</p>
          <p class="nav-item">信息公开</p>
          <p class="nav-item">动态要闻</p>
          <p class="nav-item">政策法规</p>
          <div class="query-nav-bg"></div>
          <p class="nav-item query-nav">查询系统</p>
        </div>
      </nav>

      <!-- 公共搜索框 -->
      <div class="search-box">
        <div class="search-input-bg"></div>
        <input 
          type="text" 
          class="search-input"
          placeholder="请输入您要搜索的内容"
          v-model="searchKeyword"
          @keyup.enter="handleSearch"
        />
        <div class="search-icon" @click="handleSearch"></div>
      </div>

      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        {{ getBreadcrumbText }}
      </div>

      <!-- 动态切换区域 -->
      <main class="main-content">
        <!-- 证书查询表单 -->
        <div v-if="currentView === 'query'" class="certificate-query-view">
          <!-- 系统选择 -->
          <div class="system-selector">
            <div class="system-card" :class="{ 'active': currentSystem === 'certificate' }" 
                 @click="switchSystem('certificate')">
              <div class="system-card-bg"></div>
              <div class="system-icon"></div>
              <p class="system-name">证书管理系统</p>
            </div>
            <div class="system-card" @click="switchSystem('internal')">
              <div class="system-card-bg"></div>
              <div class="system-icon"></div>
              <p class="system-name">内部管理系统</p>
            </div>
            <div class="system-card" @click="switchSystem('vehicle')">
              <div class="system-card-bg"></div>
              <div class="system-icon"></div>
              <p class="system-name">车辆管理系统</p>
            </div>
          </div>

          <!-- 查询表单 -->
          <div class="query-card">
            <div class="query-title-bg"></div>
            <h2 class="query-title">证书查询系统</h2>
            <form class="query-form" @submit.prevent="handleQuery">
              <div class="form-group">
                <input type="text" v-model="queryParams.name" placeholder="姓名" class="form-input" />
              </div>
              <div class="form-group">
                <input type="text" v-model="queryParams.idNumber" placeholder="身份证号码" class="form-input" />
              </div>
              <div class="form-group">
                <input type="text" v-model="queryParams.certificateNo" placeholder="证书编号" class="form-input" />
              </div>
              <button type="submit" class="query-btn">
                查询
                <div class="btn-icon"></div>
              </button>
            </form>
          </div>
        </div>

        <!-- 证书列表页 -->
        <div v-else-if="currentView === 'list'" class="certificate-list-view">
          <div class="result-header">
            <h3>查询结果 共找到 {{ certificateList.length }} 条记录</h3>
            <button class="back-btn" @click="backToQuery">返回查询</button>
          </div>
          
          <div class="table-container">
            <table class="certificate-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>证书编号</th>
                  <th>证书类型</th>
                  <th>姓名</th>
                  <th>工作单位</th>
                  <th>发证日期</th>
                  <th>有效期至</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cert, index) in paginatedCertificates" :key="cert.id">
                  <td>{{ getSerialNumber(index) }}</td>
                  <td>{{ cert.certificateNo }}</td>
                  <td>{{ cert.certificateType }}</td>
                  <td>{{ cert.name }}</td>
                  <td>{{ cert.workUnit }}</td>
                  <td>{{ cert.issueDate }}</td>
                  <td>{{ cert.expiryDate }}</td>
                  <td>
                    <span class="status-badge" :class="{ 
                      'valid': cert.status === '有效', 
                      'expired': cert.status === '过期' 
                    }">
                      {{ cert.status }}
                    </span>
                  </td>
                  <td>
                    <button class="view-detail-btn" @click="viewDetail(cert)">
                      查看详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="pagination">
            <span class="total-count">共计 {{ certificateList.length }} 条</span>
            <div class="pagination-controls">
              <button :disabled="currentPage === 1" @click="prevPage">上一页</button>
              <span>第 {{ currentPage }} 页</span>
              <button :disabled="currentPage >= totalPages" @click="nextPage">下一页</button>
            </div>
          </div>
        </div>

        <!-- 证书详情页 -->
        <div v-else-if="currentView === 'detail'" class="certificate-detail-view">
          <div class="detail-header">
            <button class="back-btn" @click="backToList">返回列表</button>
            <h3>证书详情</h3>
          </div>
          
          <div class="detail-card">
            <!-- 证书照片区 -->
            <div class="certificate-photo">
              <div class="photo-placeholder">
                <img v-if="currentCertificate.photo" :src="currentCertificate.photo" alt="证书照片" />
                <div v-else class="default-photo">证书照片</div>
              </div>
              <h4 class="certificate-type">{{ currentCertificate.certificateType }}</h4>
            </div>
            
            <!-- 证书信息 -->
            <div class="certificate-info">
              <div class="info-column">
                <div class="info-row">
                  <span class="info-label">证书编号：</span>
                  <span class="info-value">{{ currentCertificate.certificateNo }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">姓&emsp;&emsp;名：</span>
                  <span class="info-value">{{ currentCertificate.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">身份证号：</span>
                  <span class="info-value">{{ currentCertificate.idNumber }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">联系电话：</span>
                  <span class="info-value">{{ currentCertificate.phone }}</span>
                </div>
              </div>
              
              <div class="info-column">
                <div class="info-row">
                  <span class="info-label">证书类型：</span>
                  <span class="info-value">{{ currentCertificate.certificateType }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">工作单位：</span>
                  <span class="info-value">{{ currentCertificate.workUnit }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">职&emsp;&emsp;务：</span>
                  <span class="info-value">{{ currentCertificate.position }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">所属部门：</span>
                  <span class="info-value">{{ currentCertificate.department }}</span>
                </div>
              </div>
              
              <div class="info-column">
                <div class="info-row">
                  <span class="info-label">发证日期：</span>
                  <span class="info-value">{{ currentCertificate.issueDate }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">有效期至：</span>
                  <span class="info-value">{{ currentCertificate.expiryDate }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">培训时长：</span>
                  <span class="info-value">{{ currentCertificate.trainingHours }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">当前状态：</span>
                  <span class="info-value status-badge" :class="{
                    'valid': currentCertificate.status === '有效',
                    'expired': currentCertificate.status === '过期'
                  }">
                    {{ currentCertificate.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 公共底部 -->
      <footer class="footer-area">
        <div class="footer-bg"></div>
        <div class="footer-content">
          <p>主办单位：四川飞豹救援</p>
          <p>承办单位：四川飞豹救援新闻宣传处</p>
          <p>蜀ICP备XXXXXXX号</p>
          <p>Copyright®2025 sc.feibao.com All rights reserved</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'

// 当前视图状态：query(查询页), list(列表页), detail(详情页)
const currentView = ref('query')
const currentSystem = ref('certificate')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 10

// 查询参数
const queryParams = reactive({
  name: '',
  idNumber: '',
  certificateNo: ''
})

// 模拟证书数据
const certificateList = ref([
  {
    id: 1,
    certificateNo: 'SC20251209001',
    certificateType: '应急指挥专家',
    name: '谢春明',
    workUnit: '四川飞豹救援',
    issueDate: '2023-03-15',
    expiryDate: '2028-03-14',
    status: '有效',
    idNumber: '11010219880520XXXX',
    phone: '13800138000',
    position: '总队长',
    department: '指挥中心',
    trainingHours: '80小时',
    photo: null
  },
  // ... 更多数据
])

const currentCertificate = ref(certificateList.value[0])

// 计算属性
const getBreadcrumbText = computed(() => {
  switch (currentView.value) {
    case 'list':
      return '当前位置：首页 > 查询系统 > 证书查询系统'
    case 'detail':
      return '当前位置：首页 > 查询系统 > 证书查询系统'
    default:
      return '当前位置：首页 > 查询系统'
  }
})

const totalPages = computed(() => Math.ceil(certificateList.value.length / pageSize))
const paginatedCertificates = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return certificateList.value.slice(start, end)
})

// 方法
const getSerialNumber = (index: number) => {
  return (currentPage.value - 1) * pageSize + index + 1
}

const switchSystem = (system: string) => {
  currentSystem.value = system
  // 这里可以添加不同系统的切换逻辑
}

const handleQuery = () => {
  // 这里可以添加实际的查询逻辑
  console.log('查询参数:', queryParams)
  currentView.value = 'list'
  currentPage.value = 1
}

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

const viewDetail = (cert: any) => {
  currentCertificate.value = cert
  currentView.value = 'detail'
}

const backToQuery = () => {
  currentView.value = 'query'
  // 清空查询参数
  Object.keys(queryParams).forEach(key => {
    queryParams[key as keyof typeof queryParams] = ''
  })
}

const backToList = () => {
  currentView.value = 'list'
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* 基础容器样式 */
.scroll-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}

.main-frame {
  min-width: 1920px;
  min-height: 100vh;
  position: relative;
  background-color: #fff;
}

/* 公共头部样式 */
.header-area {
  position: relative;
  height: 140px;
}

.header-bg {
  width: 100%;
  height: 140px;
  background-image: url(@/assets/images/Vector_1_2408.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.header-logo {
  width: 129px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_12.png);
  background-size: contain;
  position: absolute;
  left: 113px;
  top: 35px;
  z-index: 2;
}

.org-name-cn {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  color: #D92626;
  position: absolute;
  left: 282px;
  top: 58px;
  margin: 0;
  z-index: 2;
}

.org-name-en {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  color: #D92626;
  position: absolute;
  left: 286px;
  top: 120px;
  margin: 0;
  z-index: 2;
}

/* 导航栏样式 */
.nav-area {
  position: relative;
  height: 70px;
}

.nav-line {
  width: 100%;
  height: 70px;
  background-image: url(@/assets/images/Vector_1_2411.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}

.nav-menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  gap: 40px;
  z-index: 2;
}

.nav-item {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  color: #fff;
  margin: 0;
  cursor: pointer;
  position: relative;
}

.query-nav-bg {
  width: 204px;
  height: 70px;
  background-image: url(@/assets/images/Vector_1_2499.png);
  background-size: 100% 100%;
  position: absolute;
  right: 112px;
  top: 0;
}

.query-nav {
  position: absolute;
  right: 112px;
}

/* 搜索框样式 */
.search-box {
  position: absolute;
  right: 40px;
  top: 35px;
  width: 338px;
  height: 42px;
  z-index: 3;
}

.search-input-bg {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_211.png);
  background-size: 100% 100%;
  position: absolute;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0 40px 0 16px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #585353;
  outline: none;
}

.search-icon {
  width: 25px;
  height: 25px;
  background-image: url(@/assets/images/Group_33_213.png);
  background-size: contain;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

/* 面包屑样式 */
.breadcrumb {
  font-size: 20px;
  color: #848484;
  padding: 30px 0 30px 112px;
  margin: 0;
}

/* 主要内容区域 */
.main-content {
  padding: 0 112px;
  min-height: 600px;
}

/* 查询页面样式 */
.certificate-query-view {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 20px 0;
}

.system-selector {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.system-card {
  width: 273px;
  height: 85px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.system-card.active .system-card-bg {
  background-image: url(@/assets/images/Vector_1_2439.png) !important;
}

.system-card-bg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: absolute;
}

.system-card:nth-child(1) .system-card-bg {
  background-image: url(@/assets/images/Vector_1_2438.png);
}

.system-card:nth-child(2) .system-card-bg {
  background-image: url(@/assets/images/Vector_1_2437.png);
}

.system-card:nth-child(3) .system-card-bg {
  background-image: url(@/assets/images/Vector_1_2438.png);
}

.system-icon {
  width: 24px;
  height: 37px;
  background-size: contain;
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
}

.system-card:nth-child(1) .system-icon {
  background-image: url(@/assets/images/Vector_1_2444.png);
}

.system-card:nth-child(2) .system-icon {
  background-image: url(@/assets/images/Vector_1_2462.png);
}

.system-card:nth-child(3) .system-icon {
  background-image: url(@/assets/images/Vector_1_2445.png);
}

.system-name {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 2;
}

.system-card:nth-child(1) .system-name {
  color: #F9E600;
}

.system-card:nth-child(2) .system-name {
  color: #0083F5;
}

.system-card:nth-child(3) .system-name {
  color: #007FF3;
}

/* 查询卡片样式 */
.query-card {
  width: 902px;
  height: 566px;
  margin: 0 auto;
  position: relative;
}

.query-title-bg {
  width: 117px;
  height: 85px;
  background-image: url(@/assets/images/Vector_1_2476.png);
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

.query-title {
  font-size: 25px;
  font-family: "FZHei-B01S-Regular";
  color: #007FF3;
  text-align: center;
  margin-top: 30px;
  position: relative;
  z-index: 2;
}

.query-form {
  width: 100%;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.form-group {
  width: 381px;
  height: 60px;
  position: relative;
}

.form-group::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2481.png);
  background-size: 100% 100%;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0 20px;
  font-size: 20px;
  color: #333;
  outline: none;
}

.form-input::placeholder {
  color: #B1ADAD;
}

.query-btn {
  width: 381px;
  height: 58px;
  background-image: url(@/assets/images/Vector_1_2480.png);
  background-size: 100% 100%;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  cursor: pointer;
  position: relative;
  margin-top: 20px;
}

.btn-icon {
  position: absolute;
  width: 19px;
  height: 19px;
  background-image: url(@/assets/images/Boolean_operation_1_2494.png);
  background-size: contain;
  right: 140px;
  top: 50%;
  transform: translateY(-50%);
}

/* 列表页面样式 */
.certificate-list-view {
  padding: 30px 0;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.result-header h3 {
  font-size: 16px;
  color: #323232;
  margin: 0;
}

.back-btn {
  padding: 8px 24px;
  background: #007FF3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.table-container {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.certificate-table {
  width: 100%;
  border-collapse: collapse;
}

.certificate-table th {
  background: #f5f5f5;
  padding: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #1D2129;
  border-bottom: 1px solid #e8e8e8;
}

.certificate-table td {
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: #1D2129;
  border-bottom: 1px solid #e8e8e8;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.status-badge.valid {
  background: #52C41A;
  color: white;
}

.status-badge.expired {
  background: #F5222D;
  color: white;
}

.view-detail-btn {
  padding: 6px 16px;
  background: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #1D2129;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.view-detail-btn:hover {
  border-color: #007FF3;
  color: #007FF3;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 20px 0;
}

.total-count {
  color: #1D2129;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pagination-controls button {
  padding: 6px 16px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 详情页面样式 */
.certificate-detail-view {
  padding: 30px 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.detail-card {
  background: white;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  gap: 60px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.certificate-photo {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-placeholder {
  width: 300px;
  height: 400px;
  background: #f5f5f5;
  border: 1px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.default-photo {
  color: #999;
  font-size: 16px;
}

.certificate-type {
  font-size: 20px;
  color: #3578F8;
  margin: 0;
  text-align: center;
}

.certificate-info {
  flex: 1;
  display: flex;
  gap: 60px;
}

.info-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-row {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.info-label {
  flex: 0 0 100px;
  color: #9E9E9E;
  font-size: 16px;
}

.info-value {
  flex: 1;
  color: #464646;
  font-size: 16px;
}

/* 底部样式 */
.footer-area {
  position: relative;
  height: 280px;
  margin-top: 60px;
}

.footer-bg {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_2429.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}

.footer-content {
  position: relative;
  z-index: 2;
  padding-top: 40px;
  text-align: center;
  color: white;
}

.footer-content p {
  margin: 8px 0;
  font-size: 20px;
}
</style>