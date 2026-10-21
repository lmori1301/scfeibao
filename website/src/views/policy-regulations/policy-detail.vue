<template>
  <ArticleDetailPage
    :breadcrumbs="[
      { text: '政策法规', to: '/policy-regulations' },
      { text: '政策文件', to: '/policy-regulations/laws' },
      { text: '政策详情' }
    ]"
    active-nav="/policy-regulations"
    :title="detail?.title || ''"
    :meta-text="metaText"
    :content="detail?.content || ''"
    :loading="loading"
    :attachment-url="attachmentUrl"
    :attachment-name="detail?.attachmentName || ''"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import http from '@/utils/http'
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
  const d = detail.value
  if (!d) return ''
  return `文号：${d.docNumber || '暂无'}     发布部门：${d.department || '暂无'}     发布日期：${formatDate(d.publishDate) || '暂无'}     生效日期：${formatDate(d.effectiveDate) || '暂无'}`
})

// 有附件时才展示下载入口，走后端下载接口以正确携带中文文件名
const attachmentUrl = computed(() => {
  if (detail.value?.attachment && route.params.id) {
    return `/api/policies/${route.params.id}/download`
  }
  return ''
})

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await http.get(`/policies/${id}`)
    detail.value = res.data || null
  } catch (error) {
    console.error('获取政策详情失败:', error)
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
