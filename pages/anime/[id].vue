<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// const router = useRouter();

const animeId = ref(route.params.id);

const { data: animeDetails, error } = await useAsyncData('data', () => {
  return $fetch(`/api/anime/${animeId.value}`)
});

console.log('Fetched anime details:', animeDetails);

</script>

<template>
  <p class="text-2xl text-center font-bold">Anime Detail Page</p>
  <div class="flex flex-col items-center h-screen">
    <div v-if="error">{{ error.message }}</div>
    <div v-else>
      <img :src="animeDetails.image" alt="Anime Image" />
      <h2>{{ animeDetails.name }}</h2>
      <p>Genres: {{ animeDetails?.genres?.join(', ') || 'No genres available'}}</p>
      <ul>
        <li v-for="season in animeDetails.seasons" :key="season.mal_id">
          Season: {{ season.name }}
        </li>
      </ul>
      <NuxtLink to="/">
        <BaseButton class="btn">Back to Anime List</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>