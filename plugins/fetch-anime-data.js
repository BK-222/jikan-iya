import useAnimeDataStore from '~/stores/anime-data';
import useAuthStore from '~/stores/auth';

export default defineNuxtPlugin(async () => {
   //if (import.meta.server) return;  //ensures the plugin runs only on the client side, otherwise SSR issues
  //if (import.meta.env.SSR) return;
  const store = useAnimeDataStore();
  const authStore = useAuthStore();

  //  Wait for auth to resolve
   await authStore.tryLogin();
  

  if (store.isLoaded || store.isFetching) {
    console.log('Anime data already loaded of fetching, skipping fetch.');
    return;
  }

  store.isFetching = true;

  try {
    const { data, error } = await useAsyncData('allAnimeData', () => {
      return $fetch('/api/fetch-anime-data');
    });

    if (error.value) {
      console.error('Error fetching anime data:', error.value);
      return;
    }

    if (data.value && store.allAnime.length === 0) {
      store.setAllAnime(data.value);
    } else {
      console.error('Invalid or empty anime data:', data.value);
    }
  } catch (error) {
    console.error('Unexpected error in fetchAnimeData middleware:', error);
  } finally {
    store.isFetching = false;
  }
});