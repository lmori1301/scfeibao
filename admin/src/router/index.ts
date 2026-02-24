import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue')
        },
        {
          path: 'data-overview',
          name: 'DataOverview',
          component: () => import('@/views/workbench/DataOverview.vue')
        },
        {
          path: 'todo-list',
          name: 'TodoList',
          component: () => import('@/views/workbench/TodoList.vue')
        },
        {
          path: 'workbench-log',
          name: 'WorkbenchLog',
          component: () => import('@/views/workbench/WorkbenchLog.vue')
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: () => import('@/views/workbench/Notifications.vue')
        },
        {
          path: 'quick-access',
          name: 'QuickAccess',
          component: () => import('@/views/workbench/QuickAccess.vue')
        },
        {
          path: 'certificates',
          name: 'Certificates',
          component: () => import('@/views/Certificates.vue')
        },
        {
          path: 'personnel',
          name: 'Personnel',
          component: () => import('@/views/Personnel.vue')
        },
        {
          path: 'vehicles',
          name: 'Vehicles',
          component: () => import('@/views/Vehicles.vue')
        },
        {
          path: 'news',
          name: 'News',
          component: () => import('@/views/News.vue')
        },
        {
          path: 'banner',
          name: 'Banner',
          component: () => import('@/views/Banner.vue')
        },
        {
          path: 'appointment',
          name: 'Appointment',
          component: () => import('@/views/Appointment.vue')
        },
        {
          path: 'policy',
          name: 'Policy',
          component: () => import('@/views/Policy.vue')
        },
        {
          path: 'leadership',
          name: 'Leadership',
          component: () => import('@/views/Leadership.vue')
        },
        {
          path: 'location',
          name: 'Location',
          component: () => import('@/views/Location.vue')
        },
        {
          path: 'party',
          name: 'Party',
          component: () => import('@/views/Party.vue')
        },
        {
          path: 'team-intro',
          name: 'TeamIntro',
          component: () => import('@/views/TeamIntro.vue')
        },
        {
          path: 'rescue-cases',
          name: 'RescueCases',
          component: () => import('@/views/RescueCases.vue')
        },
        {
          path: 'team-style',
          name: 'TeamStyle',
          component: () => import('@/views/TeamStyle.vue')
        },
        {
          path: 'videos',
          name: 'Videos',
          component: () => import('@/views/Videos.vue')
        },
        {
          path: 'party-members',
          name: 'PartyMembers',
          component: () => import('@/views/PartyMembers.vue')
        },
        {
          path: 'party-works',
          name: 'PartyWorks',
          component: () => import('@/views/PartyWorks.vue')
        },
        {
          path: 'admin-users',
          name: 'AdminUsers',
          component: () => import('@/views/AdminUsers.vue')
        },
        {
          path: 'user-management',
          name: 'UserManagement',
          component: () => import('@/views/UserManagement.vue')
        },
        {
          path: 'permissions',
          name: 'Permissions',
          component: () => import('@/views/Permissions.vue')
        },
        {
          path: 'site-config',
          name: 'SiteConfig',
          component: () => import('@/views/SiteConfig.vue')
        },
        {
          path: 'navigation',
          name: 'Navigation',
          component: () => import('@/views/Navigation.vue')
        },
        {
          path: 'operation-log',
          name: 'OperationLog',
          component: () => import('@/views/OperationLog.vue')
        },
        {
          path: 'data-backup',
          name: 'DataBackup',
          component: () => import('@/views/DataBackup.vue')
        },
        {
          path: 'friendly-links',
          name: 'FriendlyLinks',
          component: () => import('@/views/FriendlyLinks.vue')
        }
      ]
    }
  ]
})

export default router
