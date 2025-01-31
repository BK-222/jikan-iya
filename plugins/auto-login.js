import useAuthStore from '~/stores/auth';

export default defineNuxtPlugin( async() => {
  const authStore = useAuthStore();
  if (process.client && !auth.isAuthenticated) {
    await authStore.tryLogin();
  }
});
