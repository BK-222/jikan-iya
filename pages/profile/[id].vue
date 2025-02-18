<script setup>
import useProfileStore from '~/stores/profile';

definePageMeta({
  middleware: 'auth-guard',
});

const store = useProfileStore();

const completedAnime = computed(() => {
  return store.completedAnime;
});
const plannedAnime = computed(() => {
  return store.plannedAnime;
});

onMounted(() => {
  store.fetchProfile();
});

</script>

<template>
  <div>
    <h1>Profile Page</h1>
    <p>Welcome to your profile page, only accessible to authenticated users!</p>
    <h2 class="text-xl font-semibold mb-4">Planned Anime</h2>
    <ul class="flex gap-4 overflow-x-auto pb-4 px-2 md:flex-wrap md:overflow-visible">
      <AnimeItem v-for="anime in plannedAnime" :key="anime.id" :anime="anime" />
    </ul>
    <h2 class="text-xl font-semibold mb-4">Completed Anime</h2>
    <ul class="flex gap-4 overflow-x-auto pb-4 px-2 md:flex-wrap md:overflow-visible">
      <AnimeItem v-for="anime in completedAnime" :key="anime.id" :anime="anime" />
    </ul>
    <NuxtLink to="/mainstream">mainstream</NuxtLink>
    <br>
    <NuxtLink to="/iyashikei">iyashikei</NuxtLink>
  </div>
</template>