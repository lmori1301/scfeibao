<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-logo">
        <img src="@/assets/images/logo.png" alt="四川飞豹救援" />
        <span class="logo-text">四川飞豹救援</span>
      </div>
      <nav class="header-nav">
        <a href="#home">首页</a>
        <a href="#overview-info">概况信息</a>
        <a href="#party-building">党建专栏</a>
        <a href="#dynamic-news">动态要闻</a>
        <a href="#team-building">队伍建设</a>
        <a href="#info-public">信息公开</a>
        <a href="#policy-regulations">政策法规</a>
        <a href="#query-system">查询系统</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 简单头部导航
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 70px;
}

.header-logo {
  flex-shrink: 0;
  margin-right: auto;
  display: flex;
  align-items: center;

  img {
    width: 45px;
    height: 45px;
    margin-right: 12px;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 600;
    color: #1a73e8;
  }
}

.header-nav {
  display: flex;
  gap: 30px;
  align-items: center;

  a {
    text-decoration: none;
    color: #606266;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: #1a73e8;
    }
  }
}
</style>
