<script setup>
import useAuthStore from '@/stores/auth';

const store = useAuthStore();
const router = useRouter();

const logout = function() {
  store.logout();
  router.replace('/login');
}
</script>

<template>
  <div>
    <h1>Secret Page</h1>
    <p>Welcome to the secret page, only accessible to authenticated users!</p>
    <base-button @click="logout">Logout</base-button>
  </div>
</template>