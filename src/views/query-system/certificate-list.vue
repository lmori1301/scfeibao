<template>
  <div class="certificate-list-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon"></div>
          <div class="logo-text">
            <h1>四川飞豹救援</h1>
            <p>Sichuan Feibao Rescue</p>
          </div>
        </div>
        <div class="search-box">
          <input
            v-model="searchKey"
            @keyup.enter="doSearch"
            placeholder="请输入您要搜索的内容"
            class="search-input"
          />
          <div class="search-icon" @click="doSearch"></div>
        </div>
      </div>
      <div class="nav-bar">
        <router-link to="/overview-info" class="nav-link">概况信息</router-link>
        <router-link to="/team-building" class="nav-link">队伍建设</router-link>
        <router-link to="/party-building" class="nav-link">党建专栏</router-link>
        <router-link to="/info-public" class="nav-link">信息公开</router-link>
        <router-link to="/dynamic-news" class="nav-link">动态要闻</router-link>
        <router-link to="/policy-regulations" class="nav-link">政策法规</router-link>
        <router-link to="/query-system" class="nav-link nav-link-active">查询系统</router-link>
      </div>
    </div>

    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      当前位置：
      <router-link to="/" class="breadcrumb-link">首页</router-link> >
      <router-link to="/query-system/certificate" class="breadcrumb-link">证书查询系统</router-link> >
      <span class="breadcrumb-current">证书列表</span>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="result-info">
        查询结果   共找到 {{ totalCertificates }} 条记录
      </div>

      <!-- 证书列表表格 -->
      <el-table
        :data="paginatedCertificates"
        style="width: 100%"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: 'bold' }"
        stripe
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="certificateNumber" label="证书编号" width="150" align="center" />
        <el-table-column prop="certificateType" label="证书类型" width="150" align="center" />
        <el-table-column prop="name" label="姓名" width="100" align="center" />
        <el-table-column prop="workUnit" label="工作单位" width="150" align="center" />
        <el-table-column prop="issueDate" label="发证日期" width="120" align="center" />
        <el-table-column prop="validUntil" label="有效期至" width="120" align="center" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '有效' ? 'success' : 'danger'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              @click="goToDetail(row.certificateNumber)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-wrapper">
        <Pagination
          :total="totalCertificates"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-size-options="[10, 20, 30]"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 页脚 -->
    <div class="page-footer">
      <p>主办单位：四川飞豹救援</p>
      <p>承办单位：四川飞豹救援新闻宣传处</p>
      <p>蜀ICP备XXXXXXX号</p>
      <p>Copyright®2025 sc.feibao.com All rights reserved</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()
const route = useRoute()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 证书数据接口
interface Certificate {
  id: number
  serialNumber: number
  certificateNumber: string
  certificateType: string
  name: string
  workUnit: string
  issueDate: string
  validUntil: string
  status: string
}

// 模拟证书数据
const certificates = ref<Certificate[]>([
  {
    id: 1,
    serialNumber: 1,
    certificateNumber: 'SC20251209001',
    certificateType: '应急指挥专家',
    name: '张伟',
    workUnit: '四川飞豹救援',
    issueDate: '2023-03-15',
    validUntil: '2028-03-14',
    status: '有效'
  },
  {
    id: 2,
    serialNumber: 2,
    certificateNumber: 'SC20251209002',
    certificateType: '绳索救援技术员',
    name: '李明',
    workUnit: '四川飞豹救援',
    issueDate: '2023-04-20',
    validUntil: '2026-04-19',
    status: '有效'
  },
  {
    id: 3,
    serialNumber: 3,
    certificateNumber: 'SC20251209003',
    certificateType: '潜水救援教练',
    name: '王强',
    workUnit: '四川飞豹救援',
    issueDate: '2022-11-05',
    validUntil: '2025-11-04',
    status: '有效'
  },
  {
    id: 4,
    serialNumber: 4,
    certificateNumber: 'SC20251209004',
    certificateType: '城市搜救技术员',
    name: '刘洋',
    workUnit: '四川飞豹救援',
    issueDate: '2023-05-10',
    validUntil: '2028-05-09',
    status: '有效'
  },
  {
    id: 5,
    serialNumber: 5,
    certificateNumber: 'SC20251209005',
    certificateType: '山地救援教练',
    name: '陈杰',
    workUnit: '四川飞豹救援',
    issueDate: '2023-02-15',
    validUntil: '2026-02-14',
    status: '有效'
  },
  {
    id: 6,
    serialNumber: 6,
    certificateNumber: 'SC20251209006',
    certificateType: '急救医疗专家',
    name: '赵敏',
    workUnit: '四川飞豹救援',
    issueDate: '2022-12-10',
    validUntil: '2025-12-09',
    status: '有效'
  },
  {
    id: 7,
    serialNumber: 7,
    certificateNumber: 'SC20251209007',
    certificateType: '高级急救师',
    name: '孙丽',
    workUnit: '四川飞豹救援',
    issueDate: '2021-10-20',
    validUntil: '2024-10-19',
    status: '有效'
  },
  {
    id: 8,
    serialNumber: 8,
    certificateNumber: 'SC20251209008',
    certificateType: '水域救援技术员',
    name: '周涛',
    workUnit: '四川飞豹救援',
    issueDate: '2023-01-15',
    validUntil: '2026-01-14',
    status: '过期'
  },
  {
    id: 9,
    serialNumber: 9,
    certificateNumber: 'SC20251209009',
    certificateType: '无人机操作师',
    name: '吴鹏',
    workUnit: '四川飞豹救援',
    issueDate: '2022-09-20',
    validUntil: '2025-09-19',
    status: '过期'
  },
  {
    id: 10,
    serialNumber: 10,
    certificateNumber: 'SC20251209010',
    certificateType: '装备管理工程师',
    name: '郑浩',
    workUnit: '四川飞豹救援',
    issueDate: '2023-06-05',
    validUntil: '2028-06-04',
    status: '过期'
  }
])

// 获取查询参数
const queryName = computed(() => (route.query.name as string) || '')
const queryIdCard = computed(() => (route.query.idCard as string) || '')
const queryCertificateNo = computed(() => (route.query.certificateNo as string) || '')

// 根据查询参数过滤证书
const filteredCertificates = computed(() => {
  let result = certificates.value

  // 按姓名过滤
  if (queryName.value) {
    result = result.filter(cert => cert.name.includes(queryName.value))
  }

  // 按证书编号过滤
  if (queryCertificateNo.value) {
    result = result.filter(cert => cert.certificateNumber.includes(queryCertificateNo.value))
  }

  return result
})

// 计算总数（使用过滤后的数据）
const totalCertificates = computed(() => filteredCertificates.value.length)

// 计算当前页显示的证书（使用过滤后的数据）
const paginatedCertificates = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredCertificates.value.slice(start, end)
})

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到详情页
function goToDetail(certificateNo: string) {
  router.push(`/query-system/certificate/detail/${certificateNo}`)
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

  const target = searchModules.find(m =>
    m.name.includes(key) || key.includes(m.name)
  )

  if (target) {
    router.push({
      path: target.path,
      query: { keyword: key }
    })
  } else {
    router.push({
      path: '/search-result',
      query: { keyword: key }
    })
  }
}
</script>

<style scoped lang="scss">
.certificate-list-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

// 页面头部
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.logo-text h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.logo-text p {
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>') no-repeat center;
  background-size: contain;
}

.nav-bar {
  max-width: 1200px;
  margin: 15px auto 0;
  padding: 0 20px;
  display: flex;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;

  &:hover {
    border-bottom-color: white;
  }

  &.nav-link-active {
    border-bottom-color: white;
    font-weight: bold;
  }
}

// 面包屑
.breadcrumb {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  font-size: 14px;
  color: #666;
}

.breadcrumb-link {
  color: #409eff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.breadcrumb-current {
  color: #333;
  font-weight: 500;
}

// 主内容区
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto 30px;
  padding: 0 20px;
  width: 100%;
}

.result-info {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

// 页脚
.page-footer {
  background: #2c3e50;
  color: white;
  padding: 30px 20px;
  text-align: center;

  p {
    margin: 8px 0;
    font-size: 14px;
    opacity: 0.8;
  }
}
</style>
