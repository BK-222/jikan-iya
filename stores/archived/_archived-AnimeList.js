import { defineStore } from 'pinia';
import { ref } from 'vue';
import animeSeriesData from '@/data/anime-series.json';

const useAnimeListStore = defineStore('animeList', () => {
  const mainstreamAnimes = ref([]);
  const iyashikeiAnimes = ref([]);
  const animeSeries = ref({animeSeriesData});
  // const animeSeries = ref({animeSeriesData});

  const getAnimeById = (id) => {
    const animeId =
    iyashikeiAnimes.value.find(anime => anime.id === id) || 
    mainstreamAnimes.value.find(anime => anime.id === id);
    return animeId;
  }

  // const getMainstreamAnimes = (ids) => {
  //   return mainstreamAnimes.value.filter(anime => ids.includes(anime.id));
  // }

  const getUniqueAnimes = () => {
    const uniqueTitles = {};
    return iyashikeiAnimes.value.filter(anime => {
      const mainTitle = anime.name.split(' ')[0];
      if (uniqueTitles[mainTitle]) {
        return false;
      }
      uniqueTitles[mainTitle] = true;
      return true;
    });
  }

  const getAnimeSeries = (id) => {
    return animeSeries.value[id] || [];
  };

  const setMainstreamAnimes = function(animeList) {
    mainstreamAnimes.value = animeList;
  }

  const setIyashikeiAnimes = function(animeList) {
    iyashikeiAnimes.value = animeList;
  }

  const setAnimeSeries = function(id, data) {
    animeSeries.value[id] = data;
  }

  return { mainstreamAnimes, iyashikeiAnimes,
    getAnimeById, getUniqueAnimes, getAnimeSeries,
    setMainstreamAnimes, setIyashikeiAnimes, setAnimeSeries
  }
});

export default useAnimeListStore;
