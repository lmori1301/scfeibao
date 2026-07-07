/**
 * 应用全局状态
 */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 应用标题
    title: import.meta.env.VITE_APP_TITLE || '四川飞豹救援',
    // 加载状态
    loading: false,
    // 侧边栏状态
    sidebarCollapsed: false,
    // 设备类型
    device: 'desktop' as 'desktop' | 'mobile' | 'tablet',
    // 主题
    theme: 'light' as 'light' | 'dark'
  }),

  getters: {
    // 是否正在加载
    isLoading: (state) => state.loading,
    // 是否为移动设备
    isMobile: (state) => state.device === 'mobile',
    // 是否为桌面设备
    isDesktop: (state) => state.device === 'desktop'
  },

  actions: {
    // 设置加载状态
    setLoading(value: boolean) {
      this.loading = value
    },

    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    // 设置设备类型
    setDevice(device: 'desktop' | 'mobile' | 'tablet') {
      this.device = device
    },

    // 设置主题
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    }
  }
})
