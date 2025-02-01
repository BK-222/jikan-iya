import useAuthStore from '~/stores/auth';

const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    // return navigateTo(`/auth?redirect=${to.fullPath}`); // stores the information about the intended destination
    return navigateTo('/auth');
  }
});

export default authMiddleware;
