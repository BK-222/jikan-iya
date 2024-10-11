export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAnimeDataStore();
  
  // Fetch anime data only if the store is empty
  if (store.allAnime.length === 0) {
    const { data } = await useAsyncData('allAnimeData', () => $fetch('/api/fetchAnimeData'));
    if (data.value) {
      store.setAllAnime(data.value);
    }
  }
});