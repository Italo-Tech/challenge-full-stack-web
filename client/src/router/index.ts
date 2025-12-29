import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/students',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    // {
    //   path: '/students',
    //   name: 'students',
    //   component: () => import('@/views/StudentsView.vue'),
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/courses',
    //   name: 'courses',
    //   component: () => import('@/views/CoursesView.vue'),
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/classes',
    //   name: 'classes',
    //   component: () => import('@/views/ClassesView.vue'),
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/enrollments',
    //   name: 'enrollments',
    //   component: () => import('@/views/EnrollmentsView.vue'),
    //   meta: { requiresAuth: true },
    // },
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/students')
  } else {
    next()
  }
})

export default router
