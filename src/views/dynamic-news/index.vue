<template>
  <div class="news-page">
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
      当前位置：首页 > 动态要闻
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 侧边栏分类 -->
      <div class="sidebar">
        <div class="category-title">新闻分类</div>
        <div class="category-list">
          <div
            v-for="cat in categories"
            :key="cat.value"
            class="category-item"
            :class="{ active: selectedCategory === cat.value }"
            @click="handleCategoryChange(cat.value)"
          >
            {{ cat.label }}
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 搜索框 -->
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="请输入搜索关键词"
            clearable
            @change="handleSearch"
          >
            <template #suffix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- 加载状态 -->
        <div v-loading="loading" class="news-list">
          <!-- 空状态 -->
          <el-empty v-if="list.length === 0 && !loading" description="暂无新闻" />

          <!-- 特色新闻（第一条） -->
          <div
            v-if="list.length > 0 && pagination.page === 1"
            class="featured-news"
            @click="goToDetail(list[0].id)"
          >
            <div class="featured-content">
              <h2 class="featured-title">{{ list[0].title }}</h2>
              <p class="featured-summary">{{ list[0].summary }}</p>
              <div class="featured-meta">
                <span class="meta-date">{{ formatDate(list[0].publishDate) }}</span>
                <span class="meta-views">{{ list[0].views }} 次浏览</span>
                <span class="meta-category">{{ list[0].category }}</span>
              </div>
            </div>
          </div>

          <!-- 新闻列表 -->
          <div class="regular-news">
            <div
              v-for="(item, index) in displayedList"
              :key="item.id"
              class="news-item"
              @click="goToDetail(item.id)"
            >
              <span class="news-index">{{ index + 1 }}</span>
              <div class="news-info">
                <h3 class="news-title">{{ item.title }}</h3>
                <div class="news-meta">
                  <span class="meta-date">{{ formatDate(item.publishDate) }}</span>
                  <span class="meta-views">{{ item.views }} 次浏览</span>
                </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { getMockNewsList } from '@/mock/news'
import type { NewsItem } from '@/types/news'

const router = useRouter()

// 响应式数据
const list = ref<NewsItem[]>([])
const loading = ref(false)
const searchKeyword = ref('')
const selectedCategory = ref('')

// 新闻分类
const categories = [
  { label: '全部新闻', value: '' },
  { label: '各地动态', value: '各地动态' },
  { label: '救援行动', value: '救援行动' },
  { label: '政策解读', value: '政策解读' },
  { label: '媒体播报', value: '媒体播报' }
]

// 分页信息
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 显示的列表（排除第一条特色新闻）
const displayedList = computed(() => {
  if (pagination.value.page === 1 && list.value.length > 0) {
    return list.value.slice(1)
  }
  return list.value
})

// 获取列表数据
const fetchList = async () => {
  loading.value = true
  try {
    // 使用Mock数据
    const res = getMockNewsList(
      pagination.value.page,
      pagination.value.pageSize,
      selectedCategory.value || undefined
    )
    
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
    console.error('获取新闻列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 分类改变
const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
  pagination.value.page = 1
  fetchList()
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
  router.push(`/dynamic-news/${id}`)
}

// 初始化
onMounted(() => {
  fetchList()
})
</script>

<style scoped lang="scss">
.news-page {
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
  width: 200px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .category-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }
  
  .category-item {
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    
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

.search-box {
  margin-bottom: 30px;
}

.news-list {
  min-height: 500px;
}

.featured-news {
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  border-radius: 8px;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .featured-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    
    &:hover {
      color: #1a73e8;
    }
  }
  
  .featured-summary {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .featured-meta {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #999;
    
    .meta-category {
      padding: 2px 8px;
      background-color: #1a73e8;
      color: #fff;
      border-radius: 4px;
    }
  }
}

.regular-news {
  .news-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: #f9f9f9;
      margin: 0 -15px;
      padding: 15px;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .news-index {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
  }
  
  .news-info {
    flex: 1;
  }
  
  .news-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    
    &:hover {
      color: #1a73e8;
    }
  }
  
  .news-meta {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #999;
  }
}

.pagination-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
