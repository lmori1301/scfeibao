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
    },
    {
      path: 'regulations',
      name: 'DepartmentRegulations',
      component: () => import('@/views/policy-regulations/regulations.vue'),
      meta: {
        title: '部门规章'
      }
    },
    {
      path: 'standards',
      name: 'IndustryStandards',
      component: () => import('@/views/policy-regulations/standards.vue'),
      meta: {
        title: '行业标准'
      }
    }
  ]
}
