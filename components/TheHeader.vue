<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => {
  return store.isAuthenticated;
});

const logout = function() {
  store.logout();
  router.replace('/');
}
</script>

<template>
  <header class="flex justify-between items-center p-3 bg-gray-400 text-white">
    <div class="text-lg font-bold">Anime App</div>
    <div v-if="isLoggedIn">
      <BaseButton @click="logout">Logout</BaseButton>
    </div>
  </header>
</template>