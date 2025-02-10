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
    <div class="flex gap-4 mb-4 md:flex-col md:absolute md:top-6 md:left-4 md:mb-0 md:gap-2 md:w-32">

      <NuxtLink to="/mainstream"><BaseButton class="w-full px-2 py-1 rounded-none bg-gray-400">mainstream</BaseButton></NuxtLink>
      <NuxtLink to="/iyashikei"><BaseButton class="w-full px-2 py-1 rounded-none bg-gray-400">iyashikei</BaseButton></NuxtLink>
      <NuxtLink v-if="!isLoggedIn" to="/auth"><BaseButton class="w-full px-2 py-1 rounded-none">authenticate</BaseButton></NuxtLink>
      <NuxtLink v-else :to="`/profile/${authStore.userId}`"><BaseButton class="w-full rounded-none">profile</BaseButton></NuxtLink>
    </div>

    <div class="text-center flex-1">
      <p class="text-3xl font-bold">Main page.</p>
      <p class="text-lg font-semibold text-gray-700">This is the main page.</p>
    </div>
  </div>
</template>