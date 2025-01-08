<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth-guard',
});

const store = useAuthStore();
const router = useRouter();

console.log(
  `Navigating to secret: isLoaded=${store.isLoaded}, allAnime.length=${store.allAnime ? store.allAnime.length : 'undefined'}`
);
console.log('Store state in secret.vue:', store);

const isLoggedIn = computed(() => store.isLoggedIn);

const logout = function() {
  store.logout();
  router.replace('/');
}
</script>

<template>
  <div>
    <h1>Secret Page</h1>
    <p>Welcome to the secret page, only accessible to authenticated users!</p>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <!-- <li v-if="isLoggedIn"> -->
      <base-button @click="logout">Logout</base-button>
    <!-- </li> -->
  </div>
</template>