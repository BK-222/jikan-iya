<script setup>
import useAnimeDataStore from '~/stores/archived/_archived-AnimeData.js';

const store = useAnimeDataStore();

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
    <NuxtLink class="flex justify-center" to="/">
      <BaseButton class="self-center">Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>