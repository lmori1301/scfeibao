/**
 * API 请求组合式函数
 */
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/utils/http'

/**
 * 通用 API 请求 Hook
 */
export function useApi<T = any>() {
  const loading = ref(false)
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)

  /**
   * 执行请求
   */
  const execute = async (apiFn: () => Promise<T>, showErrorMessage = true) => {
    loading.value = true
    error.value = null

    try {
      const result = await apiFn()
      data.value = result
      return result
    } catch (err) {
      error.value = err as Error
      if (showErrorMessage) {
        ElMessage.error((err as Error).message || '请求失败')
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * 重置状态
   */
  const reset = () => {
    loading.value = false
    data.value = null
    error.value = null
  }

  return {
    loading,
    data,
    error,
    execute,
    reset
  }
}

/**
 * 列表数据 Hook
 */
export function useListApi<T = any>(apiFn: () => Promise<ApiResponse<T[]>>) {
  const { loading, data, error, execute, reset } = useApi<T[]>()

  /**
   * 刷新列表
   */
  const refresh = async () => {
    return execute(() => apiFn())
  }

  return {
    loading,
    data,
    error,
    refresh,
    reset
  }
}
