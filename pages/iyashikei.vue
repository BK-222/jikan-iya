<script setup>
import useAnimeListStore from '@/stores/AnimeList.js';

const store = useAnimeListStore();
// const isLoading = ref(true);

const { data, error } = await useAsyncData('iyashikeiData', () => {
  if (store.iyashikeiAnimes.length === 0) {
    return $fetch('/api/iyashikei');
  } else {
    return store.iyashikeiAnimes;
  }
});

if (data.value && store.iyashikeiAnimes.length === 0) {
  store.setIyashikeiAnimes(data.value);
}

// const { data, error } = await useAsyncData('iyashikeiData', async () => {
//   let fetchedData;
//   fetchedData = await $fetch('/api/iyashikei');
//   if (store.iyashikeiAnimes.length === 0) {
//     store.setIyashikeiAnimes(fetchedData);
//   } else {
//     fetchedData = store.iyashikeiAnimes;
//   }
//   return fetchedData;
// });

const iyashikeiAnimes = computed(() => {
  return store.iyashikeiAnimes;
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
      <AnimeItem v-for="anime in store.iyashikeiAnimes" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <NuxtLink to="/">
      <BaseButton class="self-center">Back to main</BaseButton>
    </NuxtLink>
  </div>
</template>