<template>
  <ArticleDetailPage
    :breadcrumbs="[
      { text: '党建专栏', to: '/party-building' },
      { text: '党员先锋', to: '/party-building/members' },
      { text: '党员详情' }
    ]"
    active-nav="/party-building"
    :title="detail?.name || ''"
    :meta-text="detail?.position || ''"
    :content="detail?.description || ''"
    :cover="detail?.avatar || ''"
    cover-mode="avatar"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPartyMemberDetail } from '@/api/party-building'
import ArticleDetailPage from '@/components/common/ArticleDetailPage.vue'

const route = useRoute()
const detail = ref<any>(null)
const loading = ref(false)

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await getPartyMemberDetail(Number(id))
    detail.value = res.data || null
  } catch (error) {
    console.error('获取党员先锋详情失败:', error)
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
