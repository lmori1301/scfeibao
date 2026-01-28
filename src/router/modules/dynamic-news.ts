/**
 * 动态要闻路由
 */
export default {
  path: '/dynamic-news',
  name: 'DynamicNews',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/dynamic-news/list',
  meta: {
    title: '动态要闻'
  },
  children: [
    {
      path: '',
      redirect: 'list'
    },
    {
      path: 'list',
      name: 'NewsList',
      component: () => import('@/views/dynamic-news/index.vue'),
      meta: {
        title: '新闻列表'
      }
    },
    {
      path: ':id',
      name: 'NewsDetail',
      component: () => import('@/views/dynamic-news/detail.vue'),
      meta: {
        title: '新闻详情'
      }
    }
  ]
}
