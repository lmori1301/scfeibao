/**
 * 动态要闻路由
 */
export default {
  path: '/dynamic-news',
  name: 'DynamicNews',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/dynamic-news',
  meta: {
    title: '动态要闻'
  },
  children: [
    {
      path: '',
      name: 'NewsList',
      component: () => import('@/views/dynamic-news/index.vue'),
      meta: {
        title: '新闻列表'
      }
    },
    {
      path: 'detail/:id',
      name: 'NewsDetail',
      component: () => import('@/views/dynamic-news/detail.vue'),
      meta: {
        title: '新闻详情'
      }
    }
  ]
}
