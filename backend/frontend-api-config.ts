// 后端 API 配置文件
// 将此文件放在前端项目的 src/config/ 目录下

export const API_CONFIG = {
  // 后端 API 基础地址
  BASE_URL: 'http://localhost:3000/api',

  // 超时时间（毫秒）
  TIMEOUT: 10000,

  // API 端点
  ENDPOINTS: {
    // 认证相关
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
    },

    // 新闻相关
    NEWS: {
      LIST: '/news',
      DETAIL: (id: number) => `/news/${id}`,
      CREATE: '/news',
      UPDATE: (id: number) => `/news/${id}`,
      DELETE: (id: number) => `/news/${id}`,
    },

    // 证书查询
    CERTIFICATE: {
      LIST: '/certificates',
      SEARCH: '/certificates/search',
      DETAIL: (id: number) => `/certificates/${id}`,
      CREATE: '/certificates',
      UPDATE: (id: number) => `/certificates/${id}`,
      DELETE: (id: number) => `/certificates/${id}`,
    },

    // 人员查询
    PERSONNEL: {
      LIST: '/personnel',
      SEARCH: '/personnel/search',
      DETAIL: (id: number) => `/personnel/${id}`,
      CREATE: '/personnel',
      UPDATE: (id: number) => `/personnel/${id}`,
      DELETE: (id: number) => `/personnel/${id}`,
    },

    // 车辆查询
    VEHICLE: {
      LIST: '/vehicles',
      SEARCH: '/vehicles/search',
      DETAIL: (id: number) => `/vehicles/${id}`,
      CREATE: '/vehicles',
      UPDATE: (id: number) => `/vehicles/${id}`,
      DELETE: (id: number) => `/vehicles/${id}`,
    },
  },
}

// HTTP 请求拦截器配置示例
export const setupAxiosInterceptors = (axiosInstance: any) => {
  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: any) => {
      // 从 localStorage 获取 token
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: any) => {
      // 统一处理响应数据
      return response.data
    },
    (error: any) => {
      // 统一处理错误
      if (error.response?.status === 401) {
        // 未授权，清除 token 并跳转到登录页
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}
