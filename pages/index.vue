<script setup>
// import { ref, computed } from 'vue';
// import useAnimeListStore from '@/stores/AnimeList';

// const store = useAnimeListStore();


// if (animes.value) {
//   store.setAnimes(animes.value);
// }
</script>
<template>
  <p class="text-2xl text-center font-bold">Main page.</p>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
</template>