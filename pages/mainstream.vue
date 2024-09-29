<script setup>
// import useAnimeListStore from '@/stores/AnimeList';

// const store = useAnimeListStore();

// const mainstreamAnimeIds = [34798, 4081, 457, 17549];

// if (store.animes.length === 0) {
  const { data: animes, error } = await useLazyAsyncData('data', () => {
    return $fetch('/api/mainstream');
  });

    // store.setAnimes(animes.value);

// }

// const mainstreamAnimes = computed(() => {
//   return store.animes.filter(anime => mainstreamAnimeIds.includes(anime.id));
// });
</script>

<template>
  <p class="text-2xl text-center font-bold">Mainstream Anime</p>
  <NuxtLink to="/iyashikei">Iyashikei</NuxtLink>
  <div>
    <div v-if="error">{{ error }}</div>
    <ul class="flex flex-row">
      <li v-for="anime in animes" :key="anime.id">
        <NuxtLink :to="`/anime/${anime.id}`">
          <NuxtImg class="h-70 w-60" v-if="anime.image" :src="anime.image" alt="anime image" loading="lazy" />
          <span v-else>No Image Available</span>
          <p>{{ anime.id }}: {{ anime.name }}</p>
          <p>{{ anime.type }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>