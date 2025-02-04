<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const authReady = ref(false);

const isLoggedIn = computed(() => {
  return store.isAuthenticated;
});

const logout = function() {
  store.logout();
  router.replace('/');
}

onMounted(() => {
  authReady.value = true;
});
</script>

<template>
  <header class="flex justify-between items-center p-3 bg-gray-400 text-white">
    <NuxtLink to="/" class="text-lg font-bold">Anime App</NuxtLink>
    <div v-if="authReady">
      <div v-if="isLoggedIn">
        <BaseButton @click="logout">Logout</BaseButton>
      </div>
      <div v-else>
        <NuxtLink to="/auth">
          <BaseButton>Login / Signup</BaseButton>
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <p class="spinner-border animate-spin inline-block w-8 h-8 border-2 rounded-full border-gray-100 border-t-transparent"></p>
    </div>
  </header>
</template>