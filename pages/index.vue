<script setup>
import useAnimeDataStore from '~/stores/anime-data';

// const store = useAnimeDataStore();


// const { data, error } = await useAsyncData('allAnimeData', async () => {
//   if (store.allAnime.length === 0) {
//     const response = await $fetch('/api/fetch-anime-data');
//     return response;
//   } else {
//     return store.allAnime;
//   }
// });

// if (data.value && store.allAnime.length === 0) {
//   store.setAllAnime(data.value);
// }

</script>
<template>
  <div>
    <p class="text-2xl text-center font-bold">Main page.</p>
    <p class="text-4xl text-center font-bold">This is the main page.</p>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
    <br>
    <NuxtLink to="/auth">auth</NuxtLink>
    <br>
    <NuxtLink to="/profile">profile</NuxtLink>
  </div>
</template>
<!-- <template>
  <header class="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-400 text-white">
    <NuxtLink to="/" class="text-xl font-bold mb-4 md:mb-0">Anime App</NuxtLink>
    <nav class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <NuxtLink to="/mainstream" class="hover:text-gray-200">Mainstream</NuxtLink>
      <NuxtLink to="/iyashikei" class="hover:text-gray-200">Iyashikei</NuxtLink>
      <div v-if="isLoggedIn">
        <BaseButton @click="logout">Logout</BaseButton>
      </div>
      <div v-else>
        <NuxtLink to="/auth" class="hover:text-gray-200">Login/Signup</NuxtLink>
      </div>
    </nav>
  </header>
</template> -->