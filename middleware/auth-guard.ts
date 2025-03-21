import useAuthStore from '~/stores/auth'
import type { RouteLocationNormalized } from 'vue-router'

const authMiddleware = defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    // return navigateTo(`/auth?redirect=${to.fullPath}`) // stores the information about the intended destination
    return navigateTo('/auth')
  }

  if (to.params.id !== authStore.userId) {  // profiles are private for now, for publically accessable profilees and their lists adjustments to be made in profile store and profile API endpoints with dynamic userIds
    return navigateTo('/')
  }
})

export default authMiddleware
