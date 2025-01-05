<script setup>
import useAuthStore from '~/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => store.isLoggedIn);

const logout = function() {
  store.logout();
  router.replace('/login');
}
</script>

<template>
  <div>
    <h1>Secret Page</h1>
    <p>Welcome to the secret page, only accessible to authenticated users!</p>
    <!-- <li v-if="isLoggedIn"> -->
      <base-button @click="logout">Logout</base-button>
    <!-- </li> -->
  </div>
</template>