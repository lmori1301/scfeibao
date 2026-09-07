import { createRouter, createWebHistory } from 'vue-router'
import { adminChildRoutes, canAccessAdminRoute, firstAccessibleAdminPath } from './admin-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/user-management',
      redirect: '/admin-users',
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/dashboard',
      children: [
        ...adminChildRoutes,
        {
          path: 'profile-security',
          name: 'ProfileSecurity',
          component: () => import('@/views/ProfileSecurity.vue'),
          meta: {
            title: '个人中心',
            ignorePermission: true,
          },
        },
      ]
    }
  ]
})

function readSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}') as Record<string, unknown>
  } catch {
    return {}
  }
}

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const user = readSessionUser() as {
    role?: string
    permissions?: string[]
    mustChangePassword?: boolean
  }

  if (to.path === '/login') {
    if (token) {
      const fallback = firstAccessibleAdminPath(user)
      return fallback
    }
    return true
  }

  if (!token) {
    return '/login'
  }

  if (user.mustChangePassword && to.path !== '/profile-security') {
    return '/profile-security'
  }

  if (to.meta?.ignorePermission) {
    return true
  }

  if (!canAccessAdminRoute(to.name, user)) {
    const fallback = firstAccessibleAdminPath(user)
    if (fallback !== to.path) return fallback
    return false
  }

  return true
})

export default router
