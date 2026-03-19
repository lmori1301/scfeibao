<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-logo">
        <img src="@/assets/images/logo.png" alt="四川飞豹救援" />
        <span class="logo-text">四川飞豹救援</span>
      </div>
      <nav class="header-nav" :class="{ 'nav-open': menuOpen }">
        <router-link to="/" :class="{ active: isActive('/') }" @click="closeMenu">首页</router-link>
        <router-link to="/overview-info" :class="{ active: isActive('/overview-info') }" @click="closeMenu">概况信息</router-link>
        <router-link to="/party-building" :class="{ active: isActive('/party-building') }" @click="closeMenu">党建专栏</router-link>
        <router-link to="/dynamic-news" :class="{ active: isActive('/dynamic-news') }" @click="closeMenu">动态要闻</router-link>
        <router-link to="/team-building" :class="{ active: isActive('/team-building') }" @click="closeMenu">队伍建设</router-link>
        <router-link to="/info-public" :class="{ active: isActive('/info-public') }" @click="closeMenu">信息公开</router-link>
        <router-link to="/policy-regulations" :class="{ active: isActive('/policy-regulations') }" @click="closeMenu">政策法规</router-link>
        <router-link to="/query-system" :class="{ active: isActive('/query-system') }" @click="closeMenu">查询系统</router-link>
      </nav>
      <button class="hamburger" :class="{ 'is-active': menuOpen }" @click="toggleMenu" aria-label="菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const menuOpen = ref(false)

const isActive = (path: string) => {
  return computed(() => {
    if (path === '/') {
      return route.path === '/'
    }
    return route.path.startsWith(path)
  }).value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1000;
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
    white-space: nowrap;

    &:hover {
      color: #1a73e8;
    }

    &.active {
      background-color: #1a73e8;
      color: #ffffff;
    }
  }
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #303133;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &.is-active {
    span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
}

@media (max-width: 1024px) {
  .header-nav {
    gap: 16px;

    a {
      font-size: 14px;
      padding: 6px 10px;
    }
  }
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .header-nav {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #fff;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 8px 0;

    &.nav-open {
      display: flex;
    }

    a {
      width: 100%;
      padding: 14px 20px;
      border-radius: 0;
      font-size: 15px;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background-color: #e8f0fe;
        color: #1a73e8;
      }
    }
  }
}
</style>
