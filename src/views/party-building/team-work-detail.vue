<template>
  <div class="team-work-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" v-loading="loading" class="loading-container"></div>

    <!-- 内容区域 -->
    <div v-else-if="detail" class="detail-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-background"></div>
        <div class="header-content">
          <h1 class="site-title">四川飞豹救援</h1>
          <h2 class="site-subtitle">Sichuan Feibao Rescue</h2>
        </div>
      </div>

      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/party-building' }">党建专栏</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/party-building/team-work' }">团建工作</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 文章内容 -->
      <div class="article-wrapper">
        <!-- 文章头部信息 -->
        <div class="article-header">
          <el-tag type="success" size="large">我是党员·我在岗位</el-tag>
          <h1 class="article-title">{{ detail.title }}</h1>
          <div class="article-meta">
            <span class="meta-author">作者：{{ detail.author }}</span>
            <span class="meta-date">发布时间：{{ formatDate(detail.publishDate) }}</span>
          </div>
        </div>

        <!-- 分割线 -->
        <el-divider />

        <!-- 文章正文 -->
        <div class="article-content">
          <div v-html="detail.content"></div>
        </div>

        <!-- 返回按钮 -->
        <div class="back-button">
          <el-button @click="goBack" type="primary" size="large">
            <el-icon><Back /></el-icon>
            返回列表
          </el-button>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="error-container">
      <el-result
        icon="error"
        title="文章不存在"
        sub-title="抱歉，您访问的文章不存在或已被删除"
      >
        <template #extra>
          <el-button type="primary" @click="goBack">返回列表</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { getMockTeamWorkDetail } from '@/mock/party'
import type { TeamWorkItem } from '@/types/party'

const route = useRoute()
const router = useRouter()

// 响应式数据
const detail = ref<TeamWorkItem | null>(null)
const loading = ref(false)

// 获取详情数据
const fetchDetail = async () => {
  const id = route.params.id as string
  
  if (!id) {
    router.push('/party-building/team-work')
    return
  }

  loading.value = true
  try {
    const res = getMockTeamWorkDetail(id)
    
    if (res.code === 200 && res.data) {
      detail.value = res.data
    } else {
      detail.value = null
    }
  } catch (error) {
    console.error('获取团建工作详情失败:', error)
    detail.value = null
  } finally {
    loading.value = false
  }
}

// 返回列表
const goBack = () => {
  router.push('/party-building/team-work')
}

// 初始化
onMounted(() => {
  fetchDetail()
})
</script>

<style scoped lang="scss">
.team-work-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.loading-container {
  min-height: 400px;
}

.page-header {
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, #673ab7 0%, #512da8 100%);
  color: #fff;
  
  .header-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 20px;
    text-align: center;
  }
  
  .site-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .site-subtitle {
    font-size: 18px;
    font-weight: 400;
    opacity: 0.9;
  }
}

.breadcrumb {
  max-width: 900px;
  margin: 20px auto 0;
  padding: 0 20px;
}

.article-wrapper {
  max-width: 900px;
  margin: 20px auto 40px;
  background: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-header {
  text-align: center;
  margin-bottom: 30px;
  
  .article-title {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    line-height: 1.4;
    margin: 20px 0;
  }
  
  .article-meta {
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 14px;
    color: #999;
  }
}

.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  
  :deep(p) {
    margin-bottom: 16px;
    text-indent: 2em;
  }
  
  :deep(h2) {
    font-size: 22px;
    font-weight: 600;
    margin: 30px 0 20px;
    color: #673ab7;
  }
  
  :deep(h3) {
    font-size: 18px;
    font-weight: 600;
    margin: 24px 0 16px;
    color: #333;
  }
}

.back-button {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  text-align: center;
}

.error-container {
  max-width: 900px;
  margin: 100px auto;
  padding: 0 20px;
}
</style>
