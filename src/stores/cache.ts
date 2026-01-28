/**
 * 缓存状态管理
 */
import { defineStore } from 'pinia'

export const useCacheStore = defineStore('cache', {
  state: () => ({
    // 缓存数据
    caches: {} as Record<string, { data: any; timestamp: number; expiry: number }>
  }),

  getters: {
    // 获取缓存
    getCache: (state) => {
      return (key: string) => {
        const cache = state.caches[key]
        if (!cache) return null

        // 检查是否过期
        if (Date.now() > cache.timestamp + cache.expiry) {
          delete state.caches[key]
          return null
        }

        return cache.data
      }
    }
  },

  actions: {
    // 设置缓存
    setCache(key: string, data: any, expiry: number = 5 * 60 * 1000) {
      this.caches[key] = {
        data,
        timestamp: Date.now(),
        expiry
      }
    },

    // 清除缓存
    clearCache(key?: string) {
      if (key) {
        delete this.caches[key]
      } else {
        this.caches = {}
      }
    },

    // 清除过期缓存
    clearExpiredCache() {
      const now = Date.now()
      Object.keys(this.caches).forEach(key => {
        const cache = this.caches[key]
        if (now > cache.timestamp + cache.expiry) {
          delete this.caches[key]
        }
      })
    }
  }
})
