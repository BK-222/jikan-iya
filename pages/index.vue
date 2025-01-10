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
  <p class="text-2xl text-center font-bold">Main page.</p>
  <p class="text-4xl text-center font-bold">This is the main page.</p>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
    <br>
    <NuxtLink to="/auth">auth</NuxtLink>
    
</template>