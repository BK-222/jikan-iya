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

const addToCompleted = async function() {
  if (!animeDetails.value) return;
  try {
    await profileStore.addCompletedAnime(animeDetails.value);
  } catch (err) {
    error.value = err.message || 'Failed to add to completed:';
  }
}

const addToPlanned = async function() {
  if (!animeDetails.value) return;
  try {
    await profileStore.addPlannedAnime(animeDetails.value);
  } catch (err) {
    error.value = err.message || 'Failed to add to planned';
  }
}

const removeFromCompleted = async function() {
  try {
    await profileStore.removeCompletedAnime(animeDetails.value);
  } catch (err) {
    error.value = 'Failed to remove anime';
  }
}

const removeFromPlanned = async function() {
  try {
    await profileStore.removePlannedAnime(animeDetails.value);
  } catch (err) {
    error.value = 'Failed to remove anime';
  }
}

const goBack = () => { router.back() }

</script>

<template>
  <div>
    <p class="text-2xl text-center font-bold">Anime Detail Page</p>
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
      <div v-if="isLoggedIn">
        <BaseButton @click="isInCompleted ? removeFromCompleted() : addToCompleted()">
          {{ isInCompleted ? 'Remove from Completed' : 'Add to Completed' }}
        </BaseButton>
        <BaseButton class="bg-yellow-500 hover:bg-yellow-600" @click="isInPlanned ? removeFromPlanned() : addToPlanned()">
          {{ isInPlanned ? 'Remove from Planned' : 'Add to Planned' }}
        </BaseButton>
      </div>

      
      <h3>Related Anime:</h3>
      <ul class="flex gap-x-2">
        <li v-for="relatedAnime in animeSeries" :key="relatedAnime.id">
          <router-link :to="`/anime/${relatedAnime.id}`">
            <div class="flex flex-col w-28">
              <NuxtImg :src="relatedAnime.image" :alt="relatedAnime.name" class="w-20 h-24 self-center" />
              <span class="text-center">{{ relatedAnime.name }}</span>
            </div>
          </router-link>
        </li>
      </ul>


      <BaseButton @click="goBack()" class="self-center">Back to Anime List</BaseButton>
    </div>
  </div>
</template>