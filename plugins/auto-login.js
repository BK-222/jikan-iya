import useAuthStore from '~/stores/auth';

export default defineNuxtPlugin( async() => {
  const authStore = useAuthStore();
  if (import.meta.client && !auth.isAuthenticated) {
    await authStore.tryLogin();
  }
});
