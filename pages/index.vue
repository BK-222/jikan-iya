<script setup>
import useAuthStore from '~/stores/auth';

const authStore = useAuthStore();

const authReady = ref(false);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

// onMounted(() => {
//   authReady.value = true;
// });
const isLoading = ref(true);
onMounted(() => {
  if (!authStore.isAuthenticated) {
    authStore.tryLogin().then(() => {
      isLoading.value = false;
    });
  } else {
    isLoading.value = false;
  }
});

</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 relative">
    <div v-if="isLoading" class="animate-spin w-8 h-8 border-2 rounded-full border-gray-100 border-t-transparent"></div>
    <div v-else class="flex gap-4 mb-4 md:flex-col md:absolute md:top-6 md:left-4 md:mb-0 md:gap-2 md:w-32">
      <NuxtLink to="/mainstream">
        <BaseButton class="w-full !py-1 font-medium border border-teal-600">mainstream</BaseButton>
      </NuxtLink>
      <NuxtLink to="/iyashikei">
        <BaseButton class="w-full !py-1 font-medium border border-teal-600">iyashikei</BaseButton>
      </NuxtLink>
      <NuxtLink v-if="!isLoggedIn" to="/auth">
        <BaseButton class="w-full !py-1 font-medium border border-teal-600">authenticate</BaseButton>
      </NuxtLink>
      <NuxtLink v-else :to="`/profile/${authStore.userId}`">
        <BaseButton class="w-full !py-1 font-medium border border-teal-600">profile</BaseButton>
      </NuxtLink>
    </div>

    <div class="text-center flex-1">
      <p class="text-3xl font-bold">Main page.</p>
      <p class="text-lg font-semibold text-gray-700">This is the main page.</p>
    </div>

  <!-- <div class="flex">
    <div class="w-64 bg-gray-100 min-h-screen p-6">
      <nav class="space-y-4">
        <NuxtLink to="/mainstream" class="block px-4 py-2 hover:bg-gray-200 rounded">
          Mainstream
        </NuxtLink>
        <NuxtLink to="/iyashikei" class="block px-4 py-2 hover:bg-gray-200 rounded">
          Iyashikei
        </NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/auth" class="block px-4 py-2 hover:bg-gray-200 rounded">
          Authenticate
        </NuxtLink>
        <NuxtLink v-else :to="`/profile/${authStore.userId}`" class="block px-4 py-2 hover:bg-gray-200 rounded">
          Profile
        </NuxtLink>
      </nav>
    </div>
  </div> -->
  </div>

</template>