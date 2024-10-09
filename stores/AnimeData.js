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
    return allAnime.value.reduce((acc, anime) => {
      const mainTitle = anime.title
        .replace(/^(Zoku)\s*/, '')
        .replace(/:.*/, '') 
        .split(' ')[0];
      if (anime.title.toLowerCase().includes("heya camp")) {
        return acc; 
      }
      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.mal_id,
          name: anime.title,
          image: anime.images.jpg.image_url,
          genre: anime.genres,
          type: anime.type,
          seasons: []
        };
      }
      acc[mainTitle].seasons.push(anime);
      return acc;
    }, {});
  };

  const setAllAnime = function(animeList) {
    allAnime.value = animeList;
    isLoaded.value = true;
  }

  return { allAnime, getMainstreamAnime, getIyashikeiAnime, setAllAnime };
});

export default useAnimeDataStore;
