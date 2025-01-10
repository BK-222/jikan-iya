import useAnimeDataStore from '~/stores/anime-data';

const fetchAnimeData = defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAnimeDataStore();

  // console.log(`Middleware fetchAnimeData triggered for: ${to.fullPath}`);

  if (store.isLoaded) {
    console.log('Anime data already loaded, skipping fetch.');
    return;
  }

  try {
    const { data, error } = await useAsyncData('allAnimeData', () => {
      return $fetch('/api/fetch-anime-data');
    });

    if (data.value && store.allAnime.length === 0) {
      store.setAllAnime(data.value);
    } else {
      console.error('Invalid or empty anime data:', data.value);
    }
  } catch (err) {
    console.error('Unexpected error in fetchAnimeData middleware:', err);
    return navigateTo('/error');
  }

  // console.log('Middleware finished execution.');







  // if (store.isMiddlewareExecuted) { return } // checking the flag for the executed middleware
  
  // Fetch anime data only if the store is empty

  // const { data, error } = await useAsyncData('allAnimeData', async () => {
  //   if (store.allAnime.length === 0) {
  //     return await $fetch('/api/fetch-anime-data');
  //   } else if (error) {
  //     console.error('Error fetching anime data:', error);
  //     return navigateTo('/error');
  //   } else {
  //     return store.allAnime;
  //   }
  // });
  
  // if (data.value && store.allAnime.length === 0) {
  //   store.setAllAnime(data.value);
  // }
  console.log(`After fetch: isLoaded=${store.isLoaded}, allAnime.length=${store.allAnime.length}`);

  // store.setMiddlewareExecuted();
});

export default fetchAnimeData;