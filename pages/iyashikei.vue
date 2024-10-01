<script setup>
import useAnimeListStore from '@/stores/AnimeList.js';

const store = useAnimeListStore();

// const animes = ref([]);
// const error = ref(null);
// const loading = ref(true);

// if (store.animes.length === 0) {
//   const { data, error: fetchError } = await useLazyAsyncData('data', () => {
//     return $fetch('/api/iyashikei');
//   });
//   store.setAnimes(animes.value);
// }

const { data, error, pending } = useAsyncData('iyashikeiData', () => {
  if (store.animes.length === 0) {
    return $fetch('/api/iyashikei');
  } else {
    return Promise.resolve(store.animes);
  }
});

if (data.value && store.animes.length === 0) {
  store.setAnimes(data.value);
}

const iyashikeiAnimes = computed(() => {
  return store.getIyashikeiAnimes();
});

</script>

<template>
  <p class="text-2xl text-center font-bold">Iyashikei page.</p>
  <NuxtLink to="/mainstream">mainstream</NuxtLink>
  <div>
    <p>Iyashikei Anime</p>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="pending">Please wait data is fetching...</div>
    <ul class="flex flex-row flex-wrap" v-else>
      <li v-for="anime in iyashikeiAnimes" :key="anime.id">
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


