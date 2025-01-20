<script setup>
import useAnimeDataStore from '~/stores/anime-data';

const store = useAnimeDataStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

const mainstreamAnime = computed(() => {
  return store.getMainstreamAnime(mainstreamAnimeIds);
});

</script>

<template>
  <div>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
  <div v-if="!store.allAnime.length"> <!-- Check if anime data is loaded -->
    Loading mainstream anime...
  </div>
  <ul v-else class="flex flex-row justify-center space-x-2">
    <AnimeItem v-for="anime in mainstreamAnime" :key="anime.id" :anime="anime"></AnimeItem>
  </ul>
  <NuxtLink class="flex justify-center" to="/">
    <BaseButton class="self-center">Back to main</BaseButton>
  </NuxtLink>
  </div>
</template>