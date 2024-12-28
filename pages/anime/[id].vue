<script setup>
import { useRoute, useRouter } from 'vue-router';
import useAnimeDataStore from '@/stores/AnimeData';

const route = useRoute();
const router = useRouter();
const store = useAnimeDataStore();
const animeId = ref(route.params.id);

const animeDetails = computed(() => store.getAnimeById(animeId.value));
const animeSeries = computed(() => store.getAnimeSeries(animeId.value));

// watch(() => route.params.id, (newId) => {
//   animeId.value = newId;
// });

watchEffect(() => {
  console.log('Anime ID:', animeId.value);
  console.log('Anime Details:', animeDetails.value);
  console.log('All Anime:', store.allAnime);
});

// const { data: animeSeriesDetails, error: seriesError, pending: seriesPending } = await useAsyncData(`relatedAnimeData-${animeId}`, async () => {
//   if (animeSeries.value && animeSeries.value.length > 0) {
//     return animeSeries.value;
//   } else {
//     const relatedAnime = await $fetch(`/api/anime/related/${animeId.value}`);
//     listStore.setAnimeSeries(animeId.value, relatedAnime);
//     return relatedAnime;
//   }
// });

const goBack = () => { router.back() }

</script>

<template>
  <p class="text-2xl text-center font-bold">Anime Detail Page</p>
  <div>
    <div v-if="!store.isLoaded">Loading anime details...</div>
    <div v-else-if="!animeDetails">Anime not found</div>
    <div v-else class="flex flex-col items-center">
      <img class="h-70 w-60" :src="animeDetails.image" alt="Anime Image" />
      <h2>{{ animeDetails.name }}</h2>
      <p>Genres: {{ animeDetails?.genres?.join(', ') || 'No genres available'}}</p>
      <ul>
        <li v-for="season in animeDetails.seasons" :key="season.mal_id">
          Season: {{ season.name }}
        </li>
      </ul>

      
      <h3>Related Anime:</h3>
      <ul class="flex gap-x-2">
        <li v-for="relatedAnime in animeSeries" :key="relatedAnime.id">
          <router-link :to="`/anime/${relatedAnime.id}`">
            <img :src="relatedAnime.image" :alt="relatedAnime.name" class="w-20 h-24" />
            <span>{{ relatedAnime.name }}</span>
          </router-link>
        </li>
      </ul>


      <BaseButton @click="goBack()" class="self-center">Back to Anime List</BaseButton>
    </div>
  </div>
</template>