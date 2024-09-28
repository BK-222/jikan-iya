import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAnimeListStore = defineStore('animeList', () => {
  const animes = ref([]);
  const setAnimes = function(animeList) {
    animes.value = animeList;
  }
  const getAnimeById = function(value) {
    return animes.value.find(anime => anime.id === value);
  }

  return { animes, setAnimes, getAnimeById };
});

export default useAnimeListStore;
