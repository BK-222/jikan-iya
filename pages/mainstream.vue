<script setup>
import useAnimeListStore from '@/stores/AnimeList';
// import { useLazyAsyncData } from '#app';

const store = useAnimeListStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

//  const { data: animes, error } = await useLazyAsyncData('data', () => {
//     return $fetch('/api/mainstream');
//   });

const animes = ref([]);
const error = ref(null);

  if (store.animes.length === 0) {
    const { data, error: fetchedError } = await useAsyncData('data', () => {
    return $fetch('/api/mainstream');
  });
    animes.value = data.value;
    error.value = fetchedError;
    animes.value ? store.setAnimes(animes.value): animes.value = store.animes;
  }


const mainstreamAnimes = computed(() => {
  return store.animes.filter(anime => mainstreamAnimeIds.includes(anime.id));
});
</script>

<template>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
  <div>
    <div v-if="error">{{ error }}</div>
    <ul class="flex flex-row justify-center space-x-2">
      <li v-for="anime in mainstreamAnimes" :key="anime.id">
        <NuxtLink :to="`/anime/${anime.id}`">
          <NuxtImg class="h-80 w-60" v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
          <span v-else>No Image Available</span>
          <p>{{ anime.id }}: {{ anime.name }}</p>
          <p>{{ anime.type }}</p>
        </NuxtLink>
        
      </li>
    </ul>
    <NuxtLink to="/iyashikei">
        <BaseButton class="self-center">Back to Anime List</BaseButton>
      </NuxtLink>
  </div>
</template>