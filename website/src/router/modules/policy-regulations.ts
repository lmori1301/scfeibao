/**
 * 政策法规路由
 */
export default {
  path: '/policy-regulations',
  name: 'PolicyRegulations',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/policy-regulations/laws',
  meta: {
    title: '政策法规'
  },
  children: [
    {
      path: '',
      redirect: 'laws'
    },
    {
      path: 'laws',
      name: 'LawsRegulations',
      component: () => import('@/views/policy-regulations/laws.vue'),
      meta: {
        title: '法律法规'
      }
    }
  ]
}
