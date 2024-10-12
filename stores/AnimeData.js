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

  const getIyashikeiAnime = () => {
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
        };
      }
      acc[mainTitle].seasons.push(anime);
      return acc;
      }, {}));
    };

    const setAllAnime = function(animeList) {
      allAnime.value = animeList;
      isLoaded.value = true;
    }

  return { allAnime, getMainstreamAnime, getIyashikeiAnime, setAllAnime };
});

export default useAnimeDataStore;