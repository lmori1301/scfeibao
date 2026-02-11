<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-logo">
        <img src="@/assets/images/logo.png" alt="四川飞豹救援" />
        <span class="logo-text">四川飞豹救援</span>
      </div>
      <nav class="header-nav">
        <router-link to="/" :class="{ active: isActive('/') }">首页</router-link>
        <router-link to="/overview-info" :class="{ active: isActive('/overview-info') }">概况信息</router-link>
        <router-link to="/party-building" :class="{ active: isActive('/party-building') }">党建专栏</router-link>
        <router-link to="/dynamic-news" :class="{ active: isActive('/dynamic-news') }">动态要闻</router-link>
        <router-link to="/team-building" :class="{ active: isActive('/team-building') }">队伍建设</router-link>
        <router-link to="/info-public" :class="{ active: isActive('/info-public') }">信息公开</router-link>
        <router-link to="/policy-regulations" :class="{ active: isActive('/policy-regulations') }">政策法规</router-link>
        <router-link to="/query-system" :class="{ active: isActive('/query-system') }">查询系统</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = (path: string) => {
  return computed(() => {
    if (path === '/') {
      return route.path === '/'
    }
    return route.path.startsWith(path)
  }).value
}
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
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      color: #1a73e8;
    }

    &.active {
      background-color: #1a73e8;
      color: #ffffff;
    }
  }
}
</style>
