import useAuthStore from '~/stores/auth';

const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  if (!store.isAuthenticated) {
    console.log('Redirecting to login...');
    return navigateTo('/auth');
  }
});

export default authMiddleware;
