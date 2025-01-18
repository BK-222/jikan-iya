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
    <NuxtLink to="/" class="text-lg font-bold">Anime App</NuxtLink>
    <div v-if="isLoggedIn">
      <BaseButton @click="logout">Logout</BaseButton>
    </div>
    <div v-else>
      <NuxtLink to="/auth">Login/Signup</NuxtLink>
    </div>
  </header>
</template>