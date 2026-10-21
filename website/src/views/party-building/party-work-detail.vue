<template>
  <ArticleDetailPage
    :breadcrumbs="[
      { text: '党建专栏', to: '/party-building' },
      { text: '党建工作', to: '/party-building/party-work' },
      { text: '党建工作详情' }
    ]"
    active-nav="/party-building"
    :title="detail?.title || ''"
    :meta-text="metaText"
    :content="detail?.content || ''"
    :cover="detail?.coverImage || ''"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPartyWorkDetail } from '@/api/party-building'
import ArticleDetailPage from '@/components/common/ArticleDetailPage.vue'

const route = useRoute()
const detail = ref<any>(null)
const loading = ref(false)

// 本地时区格式化，避免 toISOString() 的 UTC 偏移导致日期少一天
const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const metaText = computed(() => {
  const dateText = formatDate(detail.value?.publishDate || detail.value?.createdAt)
  return `来源：${detail.value?.author || '四川飞豹救援'}　　　发布时间：${dateText || '暂无'}`
})

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await getPartyWorkDetail(Number(id))
    detail.value = res.data || null
  } catch (error) {
    console.error('获取党建工作详情失败:', error)
    detail.value = null
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, (newId, oldId) => {
  if (newId && newId !== oldId) {
    fetchDetail()
  }
})

fetchDetail()
</script>
