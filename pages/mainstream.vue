<script setup>
import useAnimeListStore from '@/stores/AnimeList';

const store = useAnimeListStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

// if this function is being used without await, it has to return Promise.resolve()
const { data, error, pending } = useAsyncData('mainstreamData', () => {
  if (store.mainstreamAnimes.length === 0) {
    return $fetch('/api/mainstream'); //stored in data.value
  } else {
    // return Promise.resolve(store.mainstreamAnimes); //stored in data.value
    return Promise.resolve(store.mainstreamAnimes);
  }
});

if (data.value && store.mainstreamAnimes.length === 0) {
  store.setMainstreamAnimes(data.value);
}

// const mainstreamAnimes = computed(() => {
//   return store.getMainstreamAnimes(mainstreamAnimeIds);
// });

const mainstreamAnimes = computed(() => {
  return store.mainstreamAnimes;
});

// const animes = ref([]);
// const error = ref(null);
// const loading = ref(true);

// const mainstreamAnimes = computed(() => {
//   return store.animes.filter(anime => mainstreamAnimeIds.includes(anime.id));
// });

//   const { data, error: fetchedError } = useAsyncData('data', () => {
//    if (store.animes.length === 0) {
//    return $fetch('/api/mainstream');
// }
//   animes.value = data.value;
//   error.value = fetchedError;
//   animes.value ? store.setAnimes(animes.value): animes.value = store.animes;
// });
</script>

<template>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="pending">Please wait data is fetching...</div>
    <ul v-else class="flex flex-row justify-center space-x-2">
      <li v-for="anime in mainstreamAnimes" :key="anime.id">
        <NuxtLink :to="`/anime/${anime.id}`">
          <NuxtImg class="h-80 w-60" v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
          <span v-else>No Image Available</span>
          <p>{{ anime.id }}: {{ anime.name }}</p>
          <p>{{ anime.type }}</p>
        </NuxtLink>
        
      </li>
    </ul>
    <NuxtLink to="/">
        <BaseButton class="self-center">Back to Anime List</BaseButton>
      </NuxtLink>
  </div>
</template>