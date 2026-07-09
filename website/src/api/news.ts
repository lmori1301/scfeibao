import http from '@/utils/http'

// 新闻列表接口
export const getNewsList = (params) => {
  return http.get('/home/news', { params, timeout: 600000 })
}

// 新闻详情接口
export const getNewsDetail = (id) => {
  return http.get(`/dynamic-news/detail/${id}`, { timeout: 600000 })
}
