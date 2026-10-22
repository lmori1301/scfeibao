<template>
  <ArticleDetailPage
    :breadcrumbs="[
      { text: '队伍建设', to: '/team-building' },
      { text: '救援案例', to: '/team-building/cases' },
      { text: '案例详情' }
    ]"
    active-nav="/team-building"
    :title="detail?.title || ''"
    :meta-text="metaText"
    :content="contentHtml"
    :cover="detail?.coverImage || ''"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getRescueCaseDetail } from '@/api/team-building'
import type { RescueCase } from '@/types/team'
import ArticleDetailPage from '@/components/common/ArticleDetailPage.vue'

const route = useRoute()
const detail = ref<RescueCase | null>(null)
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
  const parts: string[] = []
  if (detail.value?.location) parts.push(`地点：${detail.value.location}`)
  const rescueDate = formatDate(detail.value?.rescueDate || detail.value?.createdAt)
  if (rescueDate) parts.push(`救援时间：${rescueDate}`)
  return parts.join('　　　')
})

// 后台案例内容已升级为富文本编辑器（HTML）；历史纯文本数据（亮点：/总结：等单独成行）
// 仍按 \n → <br> 兼容渲染。检测到 HTML 标签则原样透传，避免在 <p> 之间插入多余 <br>。
const contentHtml = computed(() => {
  const raw = detail.value?.content || ''
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw
  return raw.replace(/\r?\n/g, '<br>')
})

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await getRescueCaseDetail(Number(id))
    detail.value = res.data || null
  } catch (error) {
    console.error('获取救援案例详情失败:', error)
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
