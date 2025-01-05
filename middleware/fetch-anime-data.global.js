import useAnimeDataStore from '~/stores/anime-data';

const fetchAnimeData = defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAnimeDataStore();

  // if (store.isMiddlewareExecuted) { return } // checking the flag for the executed middleware
  
  // Fetch anime data only if the store is empty
  const { data, error } = await useAsyncData('allAnimeData', () => {
    if (store.allAnime.length === 0) {
      return $fetch('/api/fetchAnimeData');
    } else if (error) {
      console.error('Error fetching anime data:', error);
      return navigateTo('/error');
    } else {
      return store.allAnime;
    }
  });
  
  if (data.value && store.allAnime.length === 0) {
    store.setAllAnime(data.value);
  }

  // store.setMiddlewareExecuted();
});

export default fetchAnimeData;