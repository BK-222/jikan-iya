<script setup>
import { ref, computed } from 'vue';
import useAnimeDataStore from '@/stores/AnimeData';

const store = useAnimeDataStore();

const { data, error } = await useAsyncData('allAnimeData', async () => {
  if (store.allAnime.length === 0) {
    const response = await $fetch('/api/fetchAnimeData');
    return response;
  } else {
    return store.allAnime;
  }
});

// Safely update the store after data is resolved
if (data.value && store.allAnime.length === 0) {
  store.setAllAnime(data.value);
}


// if (animes.value) {
//   store.setAnimes(animes.value);
// }
</script>
<template>
  <p class="text-2xl text-center font-bold">Main page.</p>
  <p class="text-4xl text-center font-bold">This is the main page.</p>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
</template>