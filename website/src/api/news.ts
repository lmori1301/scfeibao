import request from '@/utils/request';

// 新闻列表接口
export const getNewsList = (params) => {
  return request({
    url: '/home/news',
    method: 'get',
    params,
    timeout: 600000 // 覆盖全局，确保列表接口也有足够超时时间
  });
};

// 新闻详情接口（核心修改）
export const getNewsDetail = (id) => {
  return request({
    url: `/dynamic-news/detail/${id}`,
    method: 'get',
    timeout: 600000, // 单独设置10分钟超时
    // 可选：添加防抖，避免重复请求
    cancelToken: new axios.CancelToken((cancel) => {
      window.cancelNewsDetailRequest = cancel;
    })
  });
};