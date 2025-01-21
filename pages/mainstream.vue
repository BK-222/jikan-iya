<script setup>
import useAnimeDataStore from '~/stores/anime-data';

const store = useAnimeDataStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

const mainstreamAnime = computed(() => {
  return store.getMainstreamAnime(mainstreamAnimeIds);
});
</script>

<template>
  <div class="flex flex-col items-center p-4 space-y-6">
    <p class="text-2xl text-center font-bold">Mainstream Anime</p>
    <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
    <div v-if="!store.allAnime.length"> <!-- Check if anime data is loaded -->
      Loading mainstream anime...
    </div>
    <ul v-else class="flex flex-wrap justify-center gap-4">
      <AnimeItem v-for="anime in mainstreamAnime" :key="anime.id" :anime="anime" />
    </ul>
    <NuxtLink class="self-center" to="/">
      <BaseButton>Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>