<script setup>
import useAuthStore from '~/stores/auth';

const authStore = useAuthStore();

const authReady = ref(false);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

onMounted(() => {
  authReady.value = true;
});

</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 relative">
    <div class="flex gap-4 mb-4 md:flex-col md:absolute md:top-4 md:left-4 md:mb-0">
      <NuxtLink to="/mainstream">mainstream</NuxtLink>
      <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
      <NuxtLink v-if="!isLoggedIn" to="/auth">authenticate</NuxtLink>
      <NuxtLink v-else :to="`/profile/${authStore.userId}`">profile</NuxtLink>
    </div>

    <div class="text-center flex-1">
      <p class="text-3xl font-bold">Main page.</p>
      <p class="text-lg font-semibold text-gray-700">This is the main page.</p>
    </div>
  </div>
</template>