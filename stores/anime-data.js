import { defineStore } from 'pinia';
import { ref } from 'vue';
import animeSeriesData from '@/data/anime-series.json';

const useAnimeDataStore = defineStore('animeData', () => {
  const allAnime = ref([]);
  const isLoaded = ref(false);
  const isFetching = ref(false);
  const isInitialized = ref(false);

  const iyashikeiAnime = computed(() => {
    return Object.values(allAnime.value.reduce((acc, anime) => {
      const mainTitle = anime.name // re-assign the title to name when I first fetch the data within index.vue
        .replace(/^(Zoku)\s*/, '')
        .replace(/:.*/, '') 
        .split(' ')[0];
      if (anime.name.toLowerCase().includes("heya camp")) {
        return acc; 
      }
      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.id,
          name: anime.name,
          image: anime.image,
          genre: anime.genre,
          type: anime.type,
          seasons: []
        }
      }
      acc[mainTitle].seasons.push(anime);
      return acc;
    }, {}));
  });

  function getMainstreamAnime(mainstreamAnimeIds) {
    return allAnime.value.filter(anime => mainstreamAnimeIds.includes(anime.id))
    .sort((a, b) => mainstreamAnimeIds.indexOf(a.id) - mainstreamAnimeIds.indexOf(b.id));
  }

  function getAnimeSeries(id) {
    const seriesKey = Object.keys(animeSeriesData).find((key) =>
      animeSeriesData[key].includes(parseInt(id))
    );
    const relatedIds = animeSeriesData[seriesKey] || [];
    // Map related IDs to `allAnime`
    return relatedIds
    .map((relatedId) => getAnimeById(relatedId))
    .filter((anime) => anime); // Filter out nulls if some IDs are missing
  }

  function getAnimeById(id) {
    const animeId = allAnime.value.find(anime => anime.id === parseInt(id));
    return animeId;
  }

  function setAllAnime(animeList) {
    if (allAnime.value.length > 0) {
      return;
    }
    allAnime.value = animeList;
    isLoaded.value = true;
  }

  function setMiddlewareExecuted() {
    isInitialized.value = true;
  }

  return { allAnime, isLoaded, isFetching, isInitialized, iyashikeiAnime, getMainstreamAnime, getAnimeSeries,
    getAnimeById, setAllAnime, setMiddlewareExecuted }
});

export default useAnimeDataStore;
