<template>
  <div class="default-layout">
    <AppHeader />
    <div class="layout-main">
      <Breadcrumb v-if="showBreadcrumb" />
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'

const route = useRoute()

// 判断是否显示面包屑（首页不显示）
const showBreadcrumb = computed(() => {
  return route.path !== '/'
})
</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.layout-content {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .layout-main {
    padding: 12px;
  }

  .layout-content {
    margin-top: 12px;
  }
}
</style>
