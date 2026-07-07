import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 你的后端接口前缀
  timeout: 600000, // 核心修改：从 300000(5分钟) → 600000(10分钟)
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器（保持原有逻辑）
service.interceptors.request.use(
  (config) => {
    // 如需要token，这里添加
    // config.headers.Authorization = localStorage.getItem('token') || '';
    return config;
  },
  (error) => {
    ElMessage.error('请求发送失败：' + error.message);
    return Promise.reject(error);
  }
);

// 响应拦截器（优化错误提示）
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 兼容后端自定义状态码
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败');
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    // 重点：区分超时错误和其他500错误
    if (error.code === 'ECONNABORTED') {
      ElMessage.error('接口请求超时，请刷新页面重试');
    } else {
      ElMessage.error('服务器错误：' + (error.response?.data?.message || error.message));
    }
    return Promise.reject(error);
  }
);

export default service;