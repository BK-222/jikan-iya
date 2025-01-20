<script setup>
import { useRoute, useRouter } from 'vue-router';
import useAnimeListStore from '@/stores/AnimeList';

const route = useRoute();
const router = useRouter();
const store = useAnimeListStore();
const animeId = ref(route.params.id);

const { data: animeDetails, error, pending } = await useAsyncData(`animeDetailsData-${animeId}`, () => {
  return $fetch(`/api/anime/${animeId.value}`)
});

const animeSeries = computed(() => store.getAnimeSeries(animeId.value));

const { data: animeSeriesDetails, error: seriesError, pending: seriesPending } = await useAsyncData(`relatedAnimeData-${animeId}`, async () => {
  if (animeSeries.value && animeSeries.value.length > 0) {
    return animeSeries.value;
  } else {
    const relatedAnime = await $fetch(`/api/anime/related/${animeId.value}`);
    store.setAnimeSeries(animeId.value, relatedAnime);
    return relatedAnime;
  }
});

const goBack = () => { router.back() }

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

      
      <h3>Related Anime:</h3>
      <div v-if="seriesError">{{ seriesError.message }}</div>
      <div v-else-if="relatedPending">Loading related anime...</div>
      <ul class="flex gap-x-2" v-else>
        <li v-for="relatedAnime in animeSeriesDetails" :key="relatedAnime.id">
          <router-link :to="`/anime/${relatedAnime.id}`">
            <img :src="relatedAnime.image" :alt="relatedAnime.name" class="w-16 h-16" />
            <span>{{ relatedAnime.name }}</span>
          </router-link>
        </li>
      </ul>


      <BaseButton @click="goBack()" class="self-center">Back to Anime List</BaseButton>
    </div>
  </div>
</template>