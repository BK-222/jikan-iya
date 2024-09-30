<script setup>
import useAnimeStore from '@/stores/AnimeList.js';

const store = useAnimeStore();

// const animes = ref([]);
// const error = ref(null);
// const loading = ref(true);

// if (store.animes.length === 0) {
//   const { data, error: fetchError } = await useLazyAsyncData('data', () => {
//     return $fetch('/api/iyashikei');
//   });
//   store.setAnimes(animes.value);
// }







const { data: animes, error } = await useLazyAsyncData('data', () => {
  return $fetch('/api/iyashikei');
});


</script>

<template>
  <p class="text-2xl text-center font-bold">Iyashikei page.</p>
  <NuxtLink to="/mainstream">mainstream</NuxtLink>
  <div>
    <p>Iyashikei Anime</p>
    <div v-if="error">{{ error }}</div>
    <ul class="flex flex-row flex-wrap" v-else>
      <li v-for="anime in animes" :key="anime.id">
        <NuxtLink :to="`/anime/${anime.id}`">
          <NuxtImg class="h-70 w-60"v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
          <span v-else>No Image Available</span>
          <p>{{ anime.id }}: {{ anime.name }}</p>
          <p>{{ anime.type }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>


