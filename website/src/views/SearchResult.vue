<template>
  <div class="search-result-page">
    <div class="search-header">
      <h2>搜索结果</h2>
      <div class="search-condition">
        搜索关键词：<span class="keyword">{{ keyword }}</span>
      </div>
    </div>

    <div class="result-content">
      <div v-if="loading" class="empty-keyword">
        <p>加载中...</p>
      </div>

      <div v-else-if="keyword && resultList.length > 0" class="result-list">
        <div
          class="result-item"
          v-for="(item, index) in resultList"
          :key="index"
          @click="navigateToDetail(item.link)"
        >
          <h3 class="result-title">{{ item.title }}</h3>
          <p class="result-desc">{{ item.description }}</p>
          <span class="result-date">{{ item.date }}</span>
        </div>
      </div>

      <div v-else-if="keyword && resultList.length === 0" class="no-result">
        <p>未找到与"{{ keyword }}"相关的内容</p>
      </div>

      <div v-else class="empty-keyword">
        <p>请输入搜索关键词</p>
      </div>
    </div>

    <div class="back-home">
      <button @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchSite, type SearchResultItem } from '@/api/search'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const resultList = ref<SearchResultItem[]>([])
const loading = ref(false)

// 执行搜索
const performSearch = async (searchKeyword: string) => {
  if (!searchKeyword) {
    resultList.value = []
    return
  }
  loading.value = true
  try {
    const res = await searchSite({ keyword: searchKeyword, limit: 50 })
    resultList.value = res.data?.list || []
  } catch (error) {
    console.error('搜索失败:', error)
    resultList.value = []
  } finally {
    loading.value = false
  }
}

const syncSearch = () => {
  keyword.value = route.query.keyword as string || ''
  if (keyword.value) {
    performSearch(keyword.value)
  } else {
    resultList.value = []
  }
}

onMounted(syncSearch)
watch(() => route.query.keyword, syncSearch)

const navigateToDetail = (link: string) => {
  router.push(link)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.search-result-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.search-header {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.search-condition {
  font-size: 16px;
  color: #666;
}

.keyword {
  color: #005cbe;
  font-weight: bold;
  font-size: 18px;
}

.result-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  border-color: #005cbe;
  box-shadow: 0 4px 12px rgba(0, 92, 190, 0.1);
  transform: translateY(-2px);
}

.result-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.result-item:hover .result-title {
  color: #005cbe;
}

.result-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.result-date {
  font-size: 12px;
  color: #999;
}

.no-result,
.empty-keyword {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.back-home {
  margin-top: 30px;
  text-align: center;
}

.back-home button {
  padding: 12px 40px;
  background-color: #005cbe;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-home button:hover {
  background-color: #004a99;
}
</style>
