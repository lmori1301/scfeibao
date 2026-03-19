import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 🔥 调试：打印实际发送的请求数据
    if (config.url?.includes('/news') && config.method === 'post') {
      console.log('🔥 实际发送的请求数据:', config.data)
      console.log('🔥 请求数据类型:', typeof config.data)
      if (config.data?.publishedAt) {
        console.log('🔥 publishedAt 值:', config.data.publishedAt)
        console.log('🔥 publishedAt 类型:', typeof config.data.publishedAt)
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    ElMessage.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default http
