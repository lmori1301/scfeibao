/**
 * 首页路由
 */
export default {
  path: '/',
  name: 'Home',
  redirect: '/Frame12',
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/Frame12.vue')
    }
  ]
}
