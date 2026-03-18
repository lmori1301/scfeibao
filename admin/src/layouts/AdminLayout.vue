<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 菜单配置
const menuItems = [
  {
    id: 'workbench',
    label: '工作台',
    icon: 'Monitor',
    children: [
      { path: '/data-overview', icon: 'DataAnalysis', label: '数据概览' },
      { path: '/todo-list', icon: 'List', label: '待办事项' },
      { path: '/workbench-log', icon: 'Document', label: '操作日志' },
      { path: '/notifications', icon: 'Bell', label: '系统通知' },
      { path: '/quick-access', icon: 'Grid', label: '快捷入口' }
    ]
  },
  {
    id: 'content',
    label: '内容管理',
    icon: 'Files',
    children: [
      { path: '/banner', icon: 'Picture', label: '轮播图管理' },
      { path: '/news', icon: 'Document', label: '新闻管理' },
      { path: '/videos', icon: 'VideoCamera', label: '视频管理' },
      { path: '/appointment', icon: 'Postcard', label: '人事任免' },
      { path: '/policy', icon: 'Reading', label: '政策文件' },
      { path: '/leadership', icon: 'UserFilled', label: '领导信息' },
      { path: '/location', icon: 'Location', label: '地理位置' },
      { path: '/party', icon: 'Flag', label: '党建专栏' },
      { path: '/team-intro', icon: 'Promotion', label: '队伍介绍' },
      { path: '/rescue-cases', icon: 'FirstAidKit', label: '救援案例' },
      { path: '/team-style', icon: 'PictureFilled', label: '队伍风采' }
    ]
  },
  {
    id: 'query',
    label: '查询系统管理',
    icon: 'Search',
    children: [
      { path: '/certificates', icon: 'Document', label: '证书管理' },
      { path: '/personnel', icon: 'User', label: '内部管理' },
      { path: '/vehicles', icon: 'Van', label: '车辆管理' }
    ]
  },
  {
    id: 'user',
    label: '用户与权限管理',
    icon: 'UserFilled',
    children: [
      { path: '/admin-users', icon: 'Avatar', label: '管理员管理' },
      { path: '/user-management', icon: 'User', label: '人员管理' },
      { path: '/permissions', icon: 'Lock', label: '权限设置' }
    ]
  },
  {
    id: 'system',
    label: '系统设置',
    icon: 'Setting',
    children: [
      { path: '/site-config', icon: 'Setting', label: '网站配置' },
      { path: '/navigation', icon: 'Menu', label: '导航设置' },
      { path: '/operation-log', icon: 'Document', label: '操作日志' },
      { path: '/data-backup', icon: 'FolderOpened', label: '数据备份' },
      { path: '/friendly-links', icon: 'Link', label: '友情链接' }
    ]
  },
  {
    id: 'dashboard',
    label: '首页',
    icon: 'HomeFilled',
    path: '/dashboard',
    children: []
  }
]

// 当前激活的一级菜单
const activeTopMenu = ref('')

// 根据当前路由查找所属的一级菜单
const findTopMenuByPath = (path: string) => {
  for (const menu of menuItems) {
    if (menu.path === path) {
      return menu.id
    }
    if (menu.children && menu.children.length > 0) {
      const found = menu.children.find(child => child.path === path)
      if (found) {
        return menu.id
      }
    }
  }
  return menuItems[0]?.id || ''
}

// 初始化激活的一级菜单
activeTopMenu.value = findTopMenuByPath(route.path)

// 监听路由变化，更新激活的一级菜单
watch(() => route.path, (newPath) => {
  activeTopMenu.value = findTopMenuByPath(newPath)
})

// 当前激活的一级菜单对象
const currentTopMenu = computed(() => {
  return menuItems.find(menu => menu.id === activeTopMenu.value)
})

// 左侧子菜单列表
const sideMenuItems = computed(() => {
  return currentTopMenu.value?.children || []
})

// 是否显示左侧菜单
const showSidebar = computed(() => {
  return sideMenuItems.value.length > 0
})

// 点击顶部菜单
const handleTopMenuClick = (menu: any) => {
  activeTopMenu.value = menu.id

  // 如果有直接路径，跳转到该路径
  if (menu.path) {
    router.push(menu.path)
  } else if (menu.children && menu.children.length > 0) {
    // 否则跳转到第一个子菜单
    router.push(menu.children[0].path)
  }
}

// 当前页面标题
const currentPageTitle = computed(() => {
  if (currentTopMenu.value?.path === route.path) {
    return currentTopMenu.value.label
  }

  const currentChild = sideMenuItems.value.find(item => item.path === route.path)
  return currentChild?.label || ''
})

const handleLogout = () => {
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout-mixed">
    <!-- 顶部导航栏 -->
    <div class="top-header">
      <div class="header-logo">
        <span class="logo-text">四川飞豹后台管理系统</span>
      </div>
      <div class="top-menu">
        <div
          v-for="menu in menuItems"
          :key="menu.id"
          :class="['top-menu-item', { active: activeTopMenu === menu.id }]"
          @click="handleTopMenuClick(menu)"
        >
          <el-icon><component :is="menu.icon" /></el-icon>
          <span>{{ menu.label }}</span>
        </div>
      </div>
      <div class="header-right">
        <el-button text @click="handleLogout">
          <el-icon><Close /></el-icon>
          退出登录
        </el-button>
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="main-container">
      <!-- 左侧子菜单 -->
      <div v-if="showSidebar" class="sidebar">
        <el-menu
          :default-active="$route.path"
          router
          background-color="#ffffff"
          text-color="#606266"
          active-text-color="#409eff"
        >
          <el-menu-item
            v-for="item in sideMenuItems"
            :key="item.path"
            :index="item.path"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 内容区域 -->
      <div class="content-area" :class="{ 'full-width': !showSidebar }">
        <div class="content-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ currentTopMenu?.label }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPageTitle && currentPageTitle !== currentTopMenu?.label">
              {{ currentPageTitle }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout-mixed {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

// 顶部导航栏
.top-header {
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;

  .header-logo {
    flex-shrink: 0;
    margin-right: 40px;

    .logo-text {
      font-size: 18px;
      font-weight: 600;
      color: #1a73e8;
      letter-spacing: 1px;
    }
  }

  .top-menu {
    flex: 1;
    display: flex;
    gap: 8px;
    align-items: center;

    .top-menu-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      color: #606266;
      font-size: 14px;
      user-select: none;

      .el-icon {
        font-size: 16px;
      }

      &:hover {
        background: #f0f2f5;
        color: #409eff;
      }

      &.active {
        background: #409eff;
        color: #ffffff;

        &:hover {
          background: #66b1ff;
        }
      }
    }
  }

  .header-right {
    flex-shrink: 0;

    :deep(.el-button) {
      color: #606266;

      &:hover {
        color: #409eff;
      }
    }
  }
}

// 主体内容区域
.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

// 左侧子菜单
.sidebar {
  width: 220px;
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
  flex-shrink: 0;

  .el-menu {
    border: none;
    padding: 8px;

    :deep(.el-menu-item) {
      height: 48px;
      line-height: 48px;
      margin: 4px 0;
      border-radius: 6px;

      &:hover {
        background: #f0f2f5;
      }

      &.is-active {
        background: #e6f4ff;
        color: #409eff;
        font-weight: 500;
      }
    }
  }
}

// 内容区域
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s;

  &.full-width {
    width: 100%;
  }

  .content-header {
    height: 50px;
    background: #ffffff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    margin: 12px;
    margin-bottom: 0;
    border-radius: 6px;

    :deep(.el-breadcrumb) {
      font-size: 14px;
    }
  }

  .content-main {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    background: #f0f2f5;
  }
}

// 滚动条样式
.sidebar::-webkit-scrollbar,
.content-main::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-thumb,
.content-main::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;

  &:hover {
    background: #bfbfbf;
  }
}

.sidebar::-webkit-scrollbar-track,
.content-main::-webkit-scrollbar-track {
  background: transparent;
}
</style>

