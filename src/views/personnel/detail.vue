<template>
  <div class="personnel-detail">
    <div v-if="loading" class="loading">
      <el-icon class="is-loading"><Loading /></el-icon>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <el-icon><WarningFilled /></el-icon>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="personnel" class="detail-card">
      <!-- 头部照片 -->
      <div class="header">
        <div class="avatar">
          <img v-if="personnel.photoUrl" :src="personnel.photoUrl" alt="照片" />
          <el-icon v-else class="default-avatar"><User /></el-icon>
        </div>
        <h1 class="name">{{ personnel.name }}</h1>
        <p class="position">{{ personnel.position || '队员' }}</p>
      </div>

      <!-- 基本信息 -->
      <div class="info-section">
        <h2 class="section-title">基本信息</h2>
        <div class="info-list">
          <div class="info-item">
            <span class="label">性别</span>
            <span class="value">{{ personnel.gender || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">出生日期</span>
            <span class="value">{{ formatDate(personnel.birthDate) }}</span>
          </div>
          <div class="info-item">
            <span class="label">联系电话</span>
            <span class="value">{{ personnel.phone || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">所属队伍</span>
            <span class="value">{{ personnel.team || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">入队日期</span>
            <span class="value">{{ formatDate(personnel.joinDate) }}</span>
          </div>
        </div>
      </div>

      <!-- 专业技能 -->
      <div v-if="personnel.skills" class="info-section">
        <h2 class="section-title">专业技能</h2>
        <div class="skills-content">
          {{ personnel.skills }}
        </div>
      </div>

      <!-- 备注 -->
      <div v-if="personnel.remark" class="info-section">
        <h2 class="section-title">备注</h2>
        <div class="remark-content">
          {{ personnel.remark }}
        </div>
      </div>

      <!-- 底部标识 -->
      <div class="footer">
        <p>四川飞豹救援</p>
        <p class="timestamp">更新时间：{{ formatDate(personnel.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Loading, WarningFilled, User } from '@element-plus/icons-vue'
import axios from 'axios'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const personnel = ref<any>(null)

const formatDate = (date: any) => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN')
}

const fetchPersonnelDetail = async () => {
  try {
    loading.value = true
    error.value = ''

    const id = route.params.id
    const response = await axios.get(`/api/personnel/${id}`)

    if (response.data) {
      personnel.value = response.data
    } else {
      error.value = '未找到人员信息'
    }
  } catch (err: any) {
    console.error('获取人员信息失败:', err)
    error.value = err.response?.data?.message || '获取人员信息失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPersonnelDetail()
})
</script>

<style scoped lang="scss">
.personnel-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading,
.error {
  text-align: center;
  color: #ffffff;
  font-size: 16px;

  .el-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    margin-top: 12px;
  }
}

.detail-card {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px 30px;
  text-align: center;
  color: #ffffff;

  .avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .default-avatar {
      font-size: 60px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .name {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 8px;
  }

  .position {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
  }
}

.info-section {
  padding: 24px 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #667eea;
  }
}

.info-list {
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
      font-size: 14px;
    }

    .value {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.skills-content,
.remark-content {
  color: #666;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
}

.footer {
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  color: #999;
  font-size: 12px;

  p {
    margin: 4px 0;
  }

  .timestamp {
    color: #bbb;
  }
}

// 移动端适配
@media (max-width: 768px) {
  .personnel-detail {
    padding: 10px;
  }

  .detail-card {
    border-radius: 16px;
  }

  .header {
    padding: 30px 15px 25px;

    .avatar {
      width: 100px;
      height: 100px;
    }

    .name {
      font-size: 24px;
    }

    .position {
      font-size: 14px;
    }
  }

  .info-section {
    padding: 20px 15px;

    .section-title {
      font-size: 16px;
    }
  }
}
</style>
