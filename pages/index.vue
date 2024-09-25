<script setup>
import { ref, computed } from 'vue';

const { data: animes, error } = await useAsyncData('data', () => {
  return $fetch('/api/UseAnimeService');
});
</script>
<template>
  <p class="text-2xl text-center font-bold">Main page.</p>
  <div>
    <p>Iyashikei Anime</p>
    <div v-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="anime in animes" :key="anime.id">
        <NuxtImg :src="anime.image" alt="anime image" loading="lazy" />
        {{ anime.id }}: {{ anime.name }}
      </li>
    </ul>
  </div>
</template>