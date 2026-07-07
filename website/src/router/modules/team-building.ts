/**
 * 队伍建设路由
 */
export default {
  path: '/team-building',
  name: 'TeamBuilding',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/team-building/about',
  meta: {
    title: '队伍建设'
  },
  children: [
    {
      path: '',
      redirect: 'about'
    },
    {
      path: 'about',
      name: 'TeamAbout',
      component: () => import('@/views/team-building/about.vue'),
      meta: {
        title: '关于队伍'
      }
    },
    {
      path: 'cases',
      name: 'RescueCases',
      component: () => import('@/views/team-building/cases.vue'),
      meta: {
        title: '救援案例'
      }
    },
    {
      path: 'cases/:id',
      name: 'RescueCaseDetail',
      component: () => import('@/views/team-building/case-detail.vue'),
      meta: {
        title: '案例详情'
      }
    },
    {
      path: 'showcase',
      name: 'TeamShowcase',
      component: () => import('@/views/team-building/showcase.vue'),
      meta: {
        title: '队伍风采'
      }
    },
    {
      path: 'showcase/:id',
      name: 'TeamShowcaseDetail',
      component: () => import('@/views/team-building/showcase-detail.vue'),
      meta: {
        title: '队伍风采详情'
      }
    }
  ]
}
