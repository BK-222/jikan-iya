import useAnimeDataStore from '@/stores/AnimeData';

const fetchAnimeData = defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAnimeDataStore();
  
  // Fetch anime data only if the store is empty
  const { data, error } = await useAsyncData('allAnimeData', () => {
    if (store.allAnime.length === 0) {
      return $fetch('/api/fetchAnimeData');
    } else {
      return store.allAnime;
    }
  });
  
  if (data.value && store.allAnime.length === 0) {
    store.setAllAnime(data.value);
  }
});

export default fetchAnimeData;