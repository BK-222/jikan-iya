import useAnimeDataStore from '~/stores/anime-data';

export default defineNuxtPlugin(async () => {
  const store = useAnimeDataStore();

  if (store.isLoaded) {
    console.log('Anime data already loaded, skipping fetch.');
    return;
  }

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
    console.error('Unexpected error in fetchAnimeData middleware:', err);
  }
});
