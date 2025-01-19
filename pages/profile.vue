<script setup>
import useProfileStore from '~/stores/profile';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth-guard',
});

const store = useProfileStore();
const router = useRouter();

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
    <h2>Planned Anime</h2>
    <ul class="flex flex-row justify-center space-x-2">
      <AnimeItem v-for="anime in plannedAnime" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <h2>Completed Anime</h2>
    <ul class="flex flex-row justify-center space-x-2">
      <AnimeItem v-for="anime in completedAnime" :key="anime.id" :anime="anime"></AnimeItem>
    </ul>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
  </div>
</template>