<script setup>
import useProfileStore from '~/stores/profile';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth-guard',
});

const store = useProfileStore();
const router = useRouter();

// console.log(
//   `Navigating to secret: isLoaded=${store.isLoaded}, allAnime.length=${store.allAnime ? store.allAnime.length : 'undefined'}`
// );

const completedAnime = computed(() => {
  return store.getCompletedAnime;
});
const plannedAnime = computed(() => {
  return store.getPlannedAnime;
});

onMounted(() => {
  store.fetchProfile();
});

</script>

<template>
  <div>
    <h1>Profile Page</h1>
    <p>Welcome to your profile page, only accessible to authenticated users!</p>
    <h2>Completed Anime</h2>
    <ul>
      <li v-for="anime in completedAnime" :key="anime.id">
        {{ anime.name }}
      </li>
    </ul>
    <h2>Planned Anime</h2>
    <ul>
      <li v-for="anime in plannedAnime" :key="anime.id">
        {{ anime.name }}
      </li>
    </ul>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
  </div>
</template>