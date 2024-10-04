import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeListStore = defineStore('animeList', () => {
  const mainstreamAnimes = ref([]);
  const iyashikeiAnimes = ref([]);

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

  const setMainstreamAnimes = function(animeList) {
    console.log('Setting mainstream animes:', animeList);
    mainstreamAnimes.value = animeList;
    console.log('Updated mainstream animes:', mainstreamAnimes.value);
  }

  const setIyashikeiAnimes = function(animeList) {
    iyashikeiAnimes.value = animeList;
  }

  return { mainstreamAnimes, iyashikeiAnimes,
    getAnimeById, getUniqueAnimes,
    setMainstreamAnimes, setIyashikeiAnimes
  }
});

export default useAnimeListStore;
