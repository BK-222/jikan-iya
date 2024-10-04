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


const { data, error, pending: isLoading } = useAsyncData('iyashikeiData', () => {
  if (store.iyashikeiAnimes.length === 0) {
    return $fetch('/api/iyashikei');
  } else {
    return Promise.resolve(store.iyashikeiAnimes);
  }
});
console.log('Data loaded:', data);
watch(data, (newValue) => {
  console.log('Data updated:', newValue);
});

if (data.value && store.iyashikeiAnimes.length === 0) {
  console.log('Setting Iyashikei Animes:', data.value);
  store.setIyashikeiAnimes(data.value);
}


const iyashikeiAnimes = computed(() => {
  console.log('Iyashikei Animes:', store.iyashikeiAnimes);
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