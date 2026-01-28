/**
 * 本地存储工具
 */
import { StorageKeys } from './constants'

/**
 * localStorage 操作
 */
export const storage = {
  /**
   * 设置存储
   */
  set<T = any>(key: string, value: T): void {
    try {
      const data = JSON.stringify(value)
      localStorage.setItem(key, data)
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  /**
   * 获取存储
   */
  get<T = any>(key: string): T | null {
    try {
      const data = localStorage.getItem(key)
      if (data) {
        return JSON.parse(data) as T
      }
      return null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  /**
   * 删除存储
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  },

  /**
   * 清空所有存储
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

/**
 * sessionStorage 操作
 */
export const sessionStorage = {
  set<T = any>(key: string, value: T): void {
    try {
      const data = JSON.stringify(value)
      window.sessionStorage.setItem(key, data)
    } catch (error) {
      console.error('SessionStorage set error:', error)
    }
  },

  get<T = any>(key: string): T | null {
    try {
      const data = window.sessionStorage.getItem(key)
      if (data) {
        return JSON.parse(data) as T
      }
      return null
    } catch (error) {
      console.error('SessionStorage get error:', error)
      return null
    }
  },

  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.error('SessionStorage remove error:', error)
    }
  },

  clear(): void {
    try {
      window.sessionStorage.clear()
    } catch (error) {
      console.error('SessionStorage clear error:', error)
    }
  }
}

/**
 * Token 操作
 */
export const tokenStorage = {
  setToken(token: string): void {
    storage.set(StorageKeys.TOKEN, token)
  },

  getToken(): string | null {
    return storage.get<string>(StorageKeys.TOKEN)
  },

  removeToken(): void {
    storage.remove(StorageKeys.TOKEN)
  }
}
