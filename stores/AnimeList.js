import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeListStore = defineStore('animeList', () => {
  const animes = ref([]);

  const getAnimeById = (id) => {
    return animes.value.find(anime => anime.id === id);
  }

  const getMainstreamAnimes = (ids) => {
    return animes.value.filter(anime => ids.includes(anime.id));
  }

  const getIyashikeiAnimes = () => {
    return animes.value;
  }

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
  }

  const setAnimes = function(animeList) {
    animes.value = animeList;
  }

  return { animes,
    getAnimeById, getMainstreamAnimes, getIyashikeiAnimes, getUniqueAnimes,
    setAnimes
  }
});

export default useAnimeListStore;
