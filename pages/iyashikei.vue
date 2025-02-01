<script setup>
import useAnimeDataStore from '~/stores/anime-data.js';

const store = useAnimeDataStore();

const iyashikeiAnime = computed(() => {
  return store.getIyashikeiAnime;
});
</script>

<template>
  <div class="flex flex-col items-center p-4 space-y-6">
  <p class="text-2xl font-bold text-center">Iyashikei anime.</p>
  <div class="flex flex-col min-h-screen p-4">
    <ul class="flex flex-col justify-center md:flex-row flex-wrap gap-4">
      <AnimeItem v-for="anime in iyashikeiAnime" :key="anime.id" :anime="anime" />
    </ul>
    <NuxtLink to="/" class="mt-8 self-center">
      <BaseButton>Back to main</BaseButton>
    </NuxtLink>
  </div>
  </div>
</template>