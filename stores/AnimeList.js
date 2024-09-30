import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeListStore = defineStore('animeList', () => {
  const mainstreamAnimes = ref([]);
  const iyashikeiAnimes = ref([]);

  const getAnimeById = (id) => {
    return animes.value.find(anime => anime.id === id);
  }

  const getMainstreamAnimes = (ids) => {
    return mainstreamAnimes.value.filter(anime => ids.includes(anime.id));
  };

  const getUniqueAnimes = () => {
    const uniqueTitles = {};
    return animes.value.filter(anime => {
      const mainTitle = anime.name.split(' ')[0];
      if (uniqueTitles[mainTitle]) {
        return false;
      }
      uniqueTitles[mainTitle] = true;
      return true;
    });
  };

  const setMainstreamAnimes = (animeList) => {
    mainstreamAnimes.value = animeList;
  };

  const setAnimes = function(animeList) {
    animes.value = animeList;
  }

  return { mainstreamAnimes, iyashikeiAnimes, getAnimeById, getMainstreamAnimes, getUniqueAnimes, setMainstreamAnimes, setAnimes };
});

export default useAnimeListStore;
