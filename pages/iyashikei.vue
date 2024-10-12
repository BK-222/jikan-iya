<script setup>
import useAnimeDataStore from '@/stores/AnimeData.js';

const store = useAnimeDataStore();

// definePageMeta({
//   middleware: 'fetch-anime-data'
// });
// const isLoading = ref(true);

// const { data, error } = await useAsyncData('iyashikeiData', () => {
//   if (store.allAnime.length === 0) {
//     return $fetch('/api/iyashikei');
//   } else {
//     return store.allAnime;
//   }
// });

// if (data.value && store.allAnime.length === 0) {
//   store.setAllAnime(data.value);
// }

// watch(pending, (newPending) => {
//   isLoading.value = newPending; // Update loading state
// });

// watch(asyncError, (newError) => {
//   error.value = newError; // Handle errors
// });

const iyashikeiAnime = computed(() => {
  return store.getIyashikeiAnime();
});
</script>

<template :key="data.length">
  <p class="text-2xl text-center font-bold">Iyashikei page.</p>
  <NuxtLink to="/mainstream">mainstream</NuxtLink>
  <div>
    <p>Iyashikei Anime</p>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="isLoading">Please wait data is fetching...</div>
    <ul class="flex flex-row flex-wrap" v-else>
      <AnimeItem v-for="anime in iyashikeiAnime" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <NuxtLink to="/">
      <BaseButton class="self-center">Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>