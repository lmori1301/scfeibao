<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const newsData = ref({ today: 5, pending: 3, offline: 2, trend: '+12%' })
const certData = ref({ valid: 150, expiring: 8, expired: 5 })
const vehicleData = ref({ normal: 45, maintenance: 3, scrapped: 2 })
const personnelData = ref({ active: 120, vacation: 5, training: 8 })

const refreshData = () => {
  // 模拟数据刷新
}

const goToModule = (path: string) => {
  router.push(path)
}

onMounted(() => {
  // 5分钟定时刷新
  setInterval(refreshData, 300000)
})
</script>

<template>
  <div class="data-overview">
    <div class="header">
      <h2>数据概览</h2>
      <el-button @click="refreshData"><el-icon><Refresh /></el-icon>刷新</el-button>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="data-card" @click="goToModule('/news')">
          <div class="card-header">
            <el-icon color="#409eff" :size="32"><Document /></el-icon>
            <span>新闻数据</span>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <span class="label">今日发布</span>
              <span class="value">{{ newsData.today }}</span>
            </div>
            <div class="stat-item warning">
              <span class="label">待审核</span>
              <span class="value">{{ newsData.pending }}</span>
            </div>
            <div class="stat-item">
              <span class="label">已下架</span>
              <span class="value">{{ newsData.offline }}</span>
            </div>
            <div class="trend">同比 {{ newsData.trend }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="data-card" @click="goToModule('/certificates')">
          <div class="card-header">
            <el-icon color="#67c23a" :size="32"><Postcard /></el-icon>
            <span>证书数据</span>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <span class="label">有效证书</span>
              <span class="value">{{ certData.valid }}</span>
            </div>
            <div class="stat-item danger">
              <span class="label">即将到期</span>
              <span class="value">{{ certData.expiring }}</span>
            </div>
            <div class="stat-item">
              <span class="label">已失效</span>
              <span class="value">{{ certData.expired }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="data-card" @click="goToModule('/vehicles')">
          <div class="card-header">
            <el-icon color="#e6a23c" :size="32"><Van /></el-icon>
            <span>车辆数据</span>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <span class="label">正常</span>
              <span class="value">{{ vehicleData.normal }}</span>
            </div>
            <div class="stat-item warning">
              <span class="label">维修中</span>
              <span class="value">{{ vehicleData.maintenance }}</span>
            </div>
            <div class="stat-item">
              <span class="label">已报废</span>
              <span class="value">{{ vehicleData.scrapped }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="data-card" @click="goToModule('/personnel')">
          <div class="card-header">
            <el-icon color="#f56c6c" :size="32"><User /></el-icon>
            <span>人员数据</span>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <span class="label">在职</span>
              <span class="value">{{ personnelData.active }}</span>
            </div>
            <div class="stat-item">
              <span class="label">休假</span>
              <span class="value">{{ personnelData.vacation }}</span>
            </div>
            <div class="stat-item">
              <span class="label">培训</span>
              <span class="value">{{ personnelData.training }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.data-overview {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 { margin: 0; font-size: 20px; font-weight: 500; }
  }

  .data-card {
    cursor: pointer;
    transition: transform 0.2s;
    &:hover { transform: translateY(-4px); }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
      span { font-size: 16px; font-weight: 500; }
    }

    .card-content {
      .stat-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .label { color: #909399; font-size: 14px; }
        .value { font-size: 20px; font-weight: 600; color: #303133; }
        &.warning .value { color: #e6a23c; }
        &.danger .value { color: #f56c6c; }
      }
      .trend {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #f0f0f0;
        color: #67c23a;
        font-size: 12px;
      }
    }
  }
}
</style>
