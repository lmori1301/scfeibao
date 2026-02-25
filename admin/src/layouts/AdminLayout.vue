<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Fold, Expand, Close } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const isCollapsed = ref(false)
const sidebarWidth = computed(() => isCollapsed.value ? '64px' : '220px')

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const menuItems = [
  {
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
    label: '查询系统管理',
    icon: 'Search',
    children: [
      { path: '/certificates', icon: 'Document', label: '证书管理' },
      { path: '/personnel', icon: 'User', label: '内部管理' },
      { path: '/vehicles', icon: 'Van', label: '车辆管理' }
    ]
  },
  {
    label: '用户与权限管理',
    icon: 'UserFilled',
    children: [
      { path: '/admin-users', icon: 'Avatar', label: '管理员管理' },
      { path: '/user-management', icon: 'User', label: '人员管理' },
      { path: '/permissions', icon: 'Lock', label: '权限设置' }
    ]
  },
  {
    label: '系统设置',
    icon: 'Setting',
    children: [
      { path: '/site-config', icon: 'Setting', label: '网站配置' },
      { path: '/navigation', icon: 'Menu', label: '导航设置' },
      { path: '/operation-log', icon: 'Document', label: '操作日志' },
      { path: '/data-backup', icon: 'FolderOpened', label: '数据备份' },
      { path: '/friendly-links', icon: 'Link', label: '友情链接' }
    ]
  }
]

const currentMenu = computed(() => {
  for (const group of menuItems) {
    if (group.children) {
      const item = group.children.find(m => m.path === route.path)
      if (item) return item.label
    }
  }
  return ''
})

const handleLogout = () => {
  router.push('/login')
}
</script>

<template>
  <div class="admin-layout">
    <el-container>
      <el-aside :width="sidebarWidth">
        <div class="logo">
          <span v-if="!isCollapsed" class="logo-text">四川飞豹后台管理系统</span>
          <span v-else class="logo-text-short">飞豹</span>
        </div>
        <el-menu
          :default-active="$route.path"
          :collapse="isCollapsed"
          router
          background-color="#2c3e50"
          text-color="#bfcbd9"
          active-text-color="#409eff"
        >
          <el-sub-menu v-for="(group, index) in menuItems" :key="index" :index="String(index)">
            <template #title>
              <el-icon><component :is="group.icon" /></el-icon>
              <span>{{ group.label }}</span>
            </template>
            <el-menu-item v-for="item in group.children" :key="item.path" :index="item.path">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <el-button text @click="toggleCollapse" class="collapse-btn">
              <el-icon><Fold v-if="!isCollapsed" /><Expand v-else /></el-icon>
            </el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentMenu">{{ currentMenu }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-button text @click="handleLogout">
              <el-icon><Close /></el-icon>
              退出登录
            </el-button>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  width: 100%;
  height: 100vh;
}

.el-container {
  height: 100%;
}

.el-aside {
  background: #2c3e50;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.08);
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2d3d;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  .logo-text {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .logo-text-short {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
}

.el-menu {
  border: none;
  background: #2c3e50;

  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;
    margin: 4px 8px;
    border-radius: 4px;

    &:hover {
      background: rgba(64, 158, 255, 0.1);
    }

    &.is-active {
      background: rgba(64, 158, 255, 0.15);
      color: #409eff;
    }
  }
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
      font-size: 20px;
      color: #606266;

      &:hover {
        color: #409eff;
      }
    }

    :deep(.el-breadcrumb) {
      font-size: 14px;
    }
  }

  .header-right {
    :deep(.el-button) {
      color: #606266;

      &:hover {
        color: #409eff;
      }
    }
  }
}

.el-main {
  background: #f0f2f5;
  padding: 20px;
}

@media (max-width: 768px) {
  .el-aside {
    width: 64px !important;
  }

  .logo-text {
    display: none;
  }

  .logo-text-short {
    display: block;
  }
}
</style>
