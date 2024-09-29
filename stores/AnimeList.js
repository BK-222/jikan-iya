import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeListStore = defineStore('animeList', () => {
  const animes = ref([]);

  const getAnimeById = (value) =>{
    return animes.value.find(anime => anime.id === value);
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
  };

  const setAnimes = function(animeList) {
    animes.value = animeList;
  }

  return { animes, getAnimeById, getUniqueAnimes, setAnimes };
});

export default useAnimeListStore;
