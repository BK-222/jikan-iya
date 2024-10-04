<script setup>
import useAnimeListStore from '@/stores/AnimeList';

const store = useAnimeListStore();

const mainstreamAnimeIds = [34798, 4081, 457, 17549];

// if this function is being used without await, it has to return Promise.resolve()
const { data, error, pending: isLoading } = await useAsyncData('mainstreamData', () => {
  if (store.mainstreamAnimes.length === 0) {
    return $fetch('/api/mainstream'); // Call the API endpoint
  } else {
    console.log('Returning cached data...'); // <--- NEW LOG STATEMENT
    return Promise.resolve(store.mainstreamAnimes);
  }
});

if (data.value && store.mainstreamAnimes.length === 0) {
  store.setMainstreamAnimes(data.value);
}

// const mainstreamAnimes = computed(() => {
//   return store.getMainstreamAnimes(mainstreamAnimeIds);
// });

// const mainstreamAnimes = computed(() => {
//   return store.mainstreamAnimes;
// });

</script>

<template>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="isLoading">Please wait data is fetching...</div>
    <ul v-else class="flex flex-row justify-center space-x-2">
      <AnimeItem v-for="anime in store.mainstreamAnimes" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <NuxtLink to="/">
      <BaseButton class="self-center">Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>