<template>
  <div class="blank-layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 空白布局，用于特殊页面（如登录页、全屏页面等）
</script>

<style scoped lang="scss">
.blank-layout {
  width: 100%;
  height: 100vh;
}
</style>
