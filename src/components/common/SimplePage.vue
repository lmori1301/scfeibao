<template>
  <div class="simple-page">
    <h1>{{ title }}</h1>
    <p>页面开发中...</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped lang="scss">
.simple-page {
  padding: 40px 20px;
  max-width: 1440px;
  margin: 0 auto;

  h1 {
    font-size: 28px;
    color: #303133;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: #606266;
  }
}
</style>
