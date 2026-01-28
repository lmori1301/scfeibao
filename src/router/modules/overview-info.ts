/**
 * 概况信息路由
 */
export default {
  path: '/overview-info',
  name: 'OverviewInfo',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/overview-info/leadership',
  meta: {
    title: '概况信息'
  },
  children: [
    {
      path: '',
      redirect: 'leadership'
    },
    {
      path: 'leadership',
      name: 'LeadershipInfo',
      component: () => import('@/views/overview-info/leadership.vue'),
      meta: {
        title: '领导信息'
      }
    },
    {
      path: 'organization',
      name: 'OrganizationInfo',
      component: () => import('@/views/overview-info/organization.vue'),
      meta: {
        title: '组织机构'
      }
    },
    {
      path: 'geography',
      name: 'GeographyInfo',
      component: () => import('@/views/overview-info/geography.vue'),
      meta: {
        title: '地理信息'
      }
    }
  ]
}
