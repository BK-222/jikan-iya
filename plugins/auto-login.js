import useAuthStore from '~/stores/auth';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore(); 
  authStore.tryLogin();
});
