<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// const router = useRouter();

// const store = useAnimeListStore();
const animeId = ref(route.params.id);

const { data: animeDetails, error, pending } = await useAsyncData(`animeDetailsData-${animeId}`, () => {
  return $fetch(`/api/anime/${animeId.value}`)
});

console.log('Fetched anime details:', animeDetails);

</script>

<template>
  <p class="text-2xl text-center font-bold">Anime Detail Page</p>
  <div>
    <div v-if="error">{{ error.message }}</div>
    <div v-else-if="pending">Please wait data is fetching...</div>
    <div v-else class="flex flex-col items-center">
      <img :src="animeDetails.image" alt="Anime Image" />
      <h2>{{ animeDetails.name }}</h2>
      <p>Genres: {{ animeDetails?.genres?.join(', ') || 'No genres available'}}</p>
      <ul>
        <li v-for="season in animeDetails.seasons" :key="season.mal_id">
          Season: {{ season.name }}
        </li>
      </ul>
      <NuxtLink to="/mainstream">
        <BaseButton class="self-center">Back to Anime List</BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>