import { defineStore } from 'pinia';
import { ref } from 'vue';
import animeSeriesData from '@/data/anime-series.json';

const useAnimeDataStore = defineStore('animeData', () => {
  const allAnime = ref([]);
  const isLoaded = ref(false);

  const getMainstreamAnime = (mainstreamAnimeIds) => {
    return allAnime.value.filter(anime => mainstreamAnimeIds.includes(anime.id))
    .sort((a, b) => mainstreamAnimeIds.indexOf(a.id) - mainstreamAnimeIds.indexOf(b.id));
  }

  const setAllAnime = function(animeList) {
    allAnime.value = animeList;
    isLoaded.value = true;
  }

  return { allAnime, getMainstreamAnime, setAllAnime };
});

export default useAnimeDataStore;
