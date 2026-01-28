import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * API 响应数据结构
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

/**
 * HTTP 请求配置
 */
interface RequestConfig extends AxiosRequestConfig {
  showMessage?: boolean // 是否显示错误提示
}

/**
 * 创建 Axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 在这里可以添加 token 等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error: AxiosError) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 根据实际后端响应格式调整
    if (data.code === 200 || response.status === 200) {
      return data.data
    } else {
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  (error: AxiosError) => {
    let message = '请求失败'

    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请登录'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败: ${error.response.status}`
      }
    } else if (error.request) {
      message = '网络错误，请检查网络连接'
    } else {
      message = error.message || '请求失败'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * 封装请求方法
 */
export const http = {
  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.delete(url, config)
  },

  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.patch(url, data, config)
  }
}

export default service
