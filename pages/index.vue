<script setup>
// import useAnimeDataStore from '~/stores/anime-data';

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
  <div class="flex flex-col items-center p-4 space-y-4 md:space-y-6">
    <p class="text-2xl text-center font-bold">Main page.</p>
    <p class="text-3xl text-center font-bold">This is the main page.</p>
    <div class="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
      <NuxtLink to="/mainstream">mainstream</NuxtLink>
      <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
      <NuxtLink to="/auth">auth</NuxtLink>
      <NuxtLink to="/profile">profile</NuxtLink>
    </div>
  </div>
</template>