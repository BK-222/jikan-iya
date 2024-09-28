<script setup>
// import { ref, computed } from 'vue';
// import useAnimeListStore from '@/stores/AnimeList';

// const store = useAnimeListStore();

const { data: animes, error } = await useAsyncData('data', () => {
  return $fetch('/api/Test3');
});



// if (animes.value) {
//   store.setAnimes(animes.value);
// }
</script>
<template>
  <p class="text-2xl text-center font-bold">Main page.</p>
  <div>
    <p>Iyashikei Anime</p>
    <div v-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="anime in animes" :key="anime.id">
        <NuxtLink :to="`/anime/${anime.id}`">
          <NuxtImg :src="anime.image" alt="anime image" loading="lazy" />
          {{ anime.id }}: {{ anime.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>