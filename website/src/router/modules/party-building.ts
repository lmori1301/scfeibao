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
      path: 'team-work/:id',
      name: 'TeamWorkDetail',
      component: () => import('@/views/party-building/team-work-detail.vue'),
      meta: {
        title: '团建工作详情'
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
      path: 'members/:id',
      name: 'PartyMembersDetail',
      component: () => import('@/views/party-building/member-detail.vue'),
      meta: {
        title: '党员先锋详情'
      }
    },
    {
      path: 'study',
      name: 'PartyStudy',
      component: () => import('@/views/party-building/study.vue'),
      meta: {
        title: '党员学"习"'
      }
    },
    {
      path: 'study/:id',
      name: 'PartyStudyDetail',
      component: () => import('@/views/party-building/study-detail.vue'),
      meta: {
        title: '党员学"习"详情'
      }
    }
  ]
}
