/**
 * 信息公开路由
 */
export default {
  path: '/info-public',
  name: 'InfoPublic',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/info-public/personnel',
  meta: {
    title: '信息公开'
  },
  children: [
    {
      path: '',
      redirect: 'personnel'
    },
    {
      path: 'personnel',
      name: 'PersonnelInfo',
      component: () => import('@/views/info-public/personnel.vue'),
      meta: {
        title: '人事任免'
      }
    }
  ]
}
