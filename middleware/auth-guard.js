import useAuthStore from '~/stores/auth';

const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  if (!store.isAuthenticated) {
    return navigateTo(`/auth?redirect=${to.fullPath}`); // stores the information about the intended destination
  }
});

export default authMiddleware;
