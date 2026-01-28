/**
 * 党建专栏路由
 */
export default {
  path: '/party-building',
  name: 'PartyBuilding',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/party-building/party-work',
  meta: {
    title: '党建专栏'
  },
  children: [
    {
      path: '',
      redirect: 'party-work'
    },
    {
      path: 'party-work',
      name: 'PartyWork',
      component: () => import('@/views/party-building/party-work.vue'),
      meta: {
        title: '党建工作'
      }
    },
    {
      path: 'party-work/:id',
      name: 'PartyWorkDetail',
      component: () => import('@/views/party-building/party-work-detail.vue'),
      meta: {
        title: '党建工作详情'
      }
    },
    {
      path: 'team-work',
      name: 'TeamWork',
      component: () => import('@/views/party-building/team-work.vue'),
      meta: {
        title: '团建工作'
      }
    },
    {
      path: 'members',
      name: 'PartyMembers',
      component: () => import('@/views/party-building/members.vue'),
      meta: {
        title: '党员先锋'
      }
    },
    {
      path: 'study',
      name: 'PartyStudy',
      component: () => import('@/views/party-building/study.vue'),
      meta: {
        title: '党员学"习"'
      }
    }
  ]
}
