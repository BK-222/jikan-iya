<script setup>
import { useRoute, useRouter } from 'vue-router';
import useAnimeDataStore from '~/stores/anime-data';
import useAuthenticationStore from '~/stores/auth';
import useProfileStore from '~/stores/profile';

const route = useRoute();
const router = useRouter();
const store = useAnimeDataStore();
const authStore = useAuthenticationStore();
const profileStore = useProfileStore();

const animeId = ref(route.params.id);
const error = ref(null);

const isLoggedIn = computed(() => {
  return authStore.isAuthenticated;
});

const animeDetails = computed(() => {
  return store.getAnimeById(animeId.value)
});

const animeSeries = computed(() => { 
  return store.getAnimeSeries(animeId.value)
});

const isInCompleted = computed(() => {
  return profileStore.getCompletedAnime.some(anime => String(anime.id) === animeId.value); //converts number to a string
});

const isInPlanned = computed(() => {
  return profileStore.getPlannedAnime.some(anime => String(anime.id) === animeId.value);
});

const updateAnimeList = async (method, errorMessage) => {
  if (!animeDetails.value) return;
  try {
    await method(animeDetails.value);
  } catch (err) {
    error.value = err.message || errorMessage;
  }
}

const addToCompleted = function() {
  updateAnimeList(profileStore.addCompletedAnime, 'Failed to add to completed');
}
const addToPlanned = function() {
  updateAnimeList(profileStore.addPlannedAnime, 'Failed to add to planned');
}
const removeFromCompleted = function() {
  updateAnimeList(profileStore.removeCompletedAnime, 'Failed to remove anime');
}
const removeFromPlanned = function() {
  updateAnimeList(profileStore.removePlannedAnime, 'Failed to remove anime');
}

// const addToCompleted = async function() {
//   if (!animeDetails.value) return;
//   try {
//     await profileStore.addCompletedAnime(animeDetails.value);
//   } catch (err) {
//     error.value = err.message || 'Failed to add to completed:';
//   }
// }


const goBack = () => { router.back() }

</script>

<template>
  <div>
    <p class="text-2xl text-center font-bold">Anime Detail Page</p>
    <div v-if="!store.isLoaded">Loading anime details...</div>
    <div v-else-if="!animeDetails">Anime not found</div>
    <div v-else class="flex flex-col items-center">
      <img class="h-70 w-60 rounded-sm" :src="animeDetails.image" alt="Anime Image" />
      <p class="font-medium">{{ animeDetails.name }}</p>
      <p class="text-sm text-gray-600">Genres: {{ animeDetails?.genres?.join(', ') || 'No genres available'}}</p>
      <ul>
        <li v-for="season in animeDetails.seasons" :key="season.mal_id">
          Season: {{ season.name }}
        </li>
      </ul>
      <div v-if="isLoggedIn">
        <BaseButton @click="isInCompleted ? removeFromCompleted() : addToCompleted()">
          {{ isInCompleted ? 'Remove from Completed' : 'Add to Completed' }}
        </BaseButton>
        <BaseButton class="bg-yellow-500 hover:bg-yellow-600" @click="isInPlanned ? removeFromPlanned() : addToPlanned()">
          {{ isInPlanned ? 'Remove from Planned' : 'Add to Planned' }}
        </BaseButton>
      </div>

      <h3>Related Anime:</h3>
      <ul class="flex gap-x-2 overflow-x-auto w-full md:justify-center">
        <li v-for="relatedAnime in animeSeries" :key="relatedAnime.id">
          <router-link :to="`/anime/${relatedAnime.id}`">
            <div class="flex flex-col w-28 p-4" :title="relatedAnime.name">
              <NuxtImg :src="relatedAnime.image" :alt="relatedAnime.name" class="w-20 h-24 self-center rounded-sm" />
              <span class="text-center truncate">{{ relatedAnime.name }}</span>
            </div>
          </router-link>
        </li>
      </ul>

      <BaseButton @click="goBack()" class="self-center">Go back</BaseButton>
    </div>
  </div>
</template>