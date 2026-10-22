/**
 * HTTP请求封装
 * 基于Axios的HTTP客户端
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 🔴 不要在这里附加 localStorage 的 token：
    // 门户与后台同源（www.scfb.org.cn），共享同一个 localStorage['token'] 键。
    // 前台一旦带上后台 token，后端 @Public 人员接口的「可选登录」会识别为后台身份，
    // 导致已拒绝/待审核人员对前台可见、且返回审核状态字段（2026-10-22 线上事故）。
    // 前台无任何登录功能，所有请求一律按匿名访客口径发送。
    return config
  },
  (error: AxiosError) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    // 根据后端返回的数据结构进行调整
    if (res.code && res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }

    return res
  },
  (error) => {
    console.error('响应错误:', error)

    // 🌟 修改3：单独处理超时错误，给出更精准的提示
    if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络或稍后重试')
      return Promise.reject(new Error('请求超时'))
    }

    // 处理不同的HTTP状态码
    if (error.response) {
      switch (error.response.status) {
        case 400:
          ElMessage.error('请求参数错误')
          break
        case 401:
          ElMessage.error('未授权，请登录')
          // 前端展示系统不需要登录功能，注释掉跳转逻辑
          // localStorage.removeItem('token')
          // window.location.href = '/login'
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }

    return Promise.reject(error)
  }
)

export default http
