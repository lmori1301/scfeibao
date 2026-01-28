<template>
  <div class="team-work-page">
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
      当前位置：首页 > 党建专栏 > 团建工作
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-title">PBCOL</div>
        <div class="sidebar-subtitle">党建专栏</div>
        <div class="sidebar-menu">
          <div class="menu-item" @click="goToPage('/party-building/party-work')">党建工作</div>
          <div class="menu-item active">团建工作 ></div>
          <div class="menu-item" @click="goToPage('/party-building/members')">党员先锋</div>
          <div class="menu-item" @click="goToPage('/party-building/study')">党员学"习"</div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 统计信息 -->
        <div class="total-info">
          共计 {{ pagination.total }} 条
        </div>

        <!-- 搜索框 -->
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="请输入您要搜索的内容"
            clearable
            @change="handleSearch"
          >
            <template #suffix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- 加载状态 -->
        <div v-loading="loading" class="work-list">
          <!-- 空状态 -->
          <el-empty v-if="list.length === 0 && !loading" description="暂无数据" />

          <!-- 团建工作列表 -->
          <div
            v-for="item in list"
            :key="item.id"
            class="work-item"
            @click="goToDetail(item.id)"
          >
            <div class="work-date">
              <div class="date-year">{{ formatDate(item.publishDate, 'YYYY-MM') }}</div>
              <div class="date-day">{{ formatDate(item.publishDate, 'DD') }}</div>
            </div>
            <div class="work-content">
              <h3 class="work-title">{{ item.title }}</h3>
              <p class="work-summary">{{ item.summary }}</p>
              <div class="work-meta">
                <span class="work-author">{{ item.author }}</span>
                <el-tag type="info" size="small">我是党员·我在岗位</el-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="pagination.total > 0" class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { getMockTeamWorkList } from '@/mock/party'
import type { TeamWorkItem } from '@/types/party'

const router = useRouter()

// 响应式数据
const list = ref<TeamWorkItem[]>([])
const loading = ref(false)
const searchKeyword = ref('')

// 分页信息
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取列表数据
const fetchList = async () => {
  loading.value = true
  try {
    const res = getMockTeamWorkList(pagination.value.page, pagination.value.pageSize)
    
    // 如果有搜索关键词，进行客户端过滤
    let filteredList = res.data.list
    if (searchKeyword.value) {
      filteredList = filteredList.filter(item =>
        item.title.includes(searchKeyword.value) ||
        item.summary.includes(searchKeyword.value)
      )
    }
    
    list.value = filteredList
    pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取团建工作列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  pagination.value.page = 1
  fetchList()
}

// 页码改变
const handlePageChange = (page: number) => {
  pagination.value.page = page
  fetchList()
}

// 每页条数改变
const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.page = 1
  fetchList()
}

// 跳转到详情页
const goToDetail = (id: number) => {
  router.push(`/party-building/team-work/${id}`)
}

// 跳转到其他页面
const goToPage = (path: string) => {
  router.push(path)
}

// 初始化
onMounted(() => {
  fetchList()
})
</script>

<style scoped lang="scss">
.team-work-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
  color: #fff;
  
  .header-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
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
  max-width: 1200px;
  margin: 20px auto 0;
  padding: 0 20px;
  font-size: 14px;
  color: #666;
}

.content-wrapper {
  max-width: 1200px;
  margin: 20px auto 40px;
  padding: 0 20px;
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  background: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .sidebar-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a73e8;
    margin-bottom: 8px;
  }
  
  .sidebar-subtitle {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .menu-item {
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: #f0f0f0;
    }
    
    &.active {
      background-color: #1a73e8;
      color: #fff;
    }
  }
}

.main-content {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.total-info {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.search-box {
  margin-bottom: 30px;
}

.work-list {
  min-height: 400px;
}

.work-item {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f9f9f9;
    margin: 0 -20px;
    padding: 20px;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

.work-date {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #673ab7 0%, #512da8 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  
  .date-year {
    font-size: 12px;
    opacity: 0.9;
  }
  
  .date-day {
    font-size: 28px;
    font-weight: 700;
  }
}

.work-content {
  flex: 1;
}

.work-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  
  &:hover {
    color: #673ab7;
  }
}

.work-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.work-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #999;
  align-items: center;
  
  .work-author {
    &::before {
      content: '作者：';
    }
  }
}

.pagination-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
