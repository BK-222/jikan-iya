<script setup>
import useAnimeDataStore from '@/stores/AnimeData';

const store = useAnimeDataStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

const mainstreamAnime = computed(() => {
  return store.getMainstreamAnime(mainstreamAnimeIds);
});

</script>

<template>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>

  <div v-if="!store.allAnime.length"> <!-- Check if anime data is loaded -->
    Loading mainstream anime...
  </div>

  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="isLoading">Please wait data is fetching...</div>
    <ul v-else class="flex flex-row justify-center space-x-2">
      <AnimeItem v-for="anime in mainstreamAnime" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <NuxtLink to="/">
      <BaseButton class="self-center">Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>