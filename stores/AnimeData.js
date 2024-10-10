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

  const getAllAnime = () => {
    return allAnime.value;
  }

    const getIyashikeiAnime = () => {
 
    return Object.values(allAnime.value.reduce((acc, anime) => {
      console.log(allAnime.value);
      const mainTitle = anime.name //i re-assign the title to name when I first fetch the data within index.vue
        .replace(/^(Zoku)\s*/, '')
        .replace(/:.*/, '') 
        .split(' ')[0];
      if (anime.name.toLowerCase().includes("heya camp")) {
        return acc; 
      }
      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.mal_id,
          name: anime.title,
          image: anime.image,
          genre: anime.genres,
          type: anime.type,
          seasons: []
        };
      }
      acc[mainTitle].seasons.push(anime);
      return acc;
    }, {}));
  };


  // const getIyashikeiAnime = () => {
  //   console.log("All Anime Data:", allAnime.value);
  //   return Object.values(allAnime.value.reduce((acc, anime) => {
  //     console.log("Processing Anime:", anime);
  //     if (!anime.title) return acc;
  //     const mainTitle = anime.title
  //       .replace(/^(Zoku)\s*/, '')
  //       .replace(/:.*/, '') 
  //       .split(' ')[0];
  //     if (anime.title.toLowerCase().includes("heya camp")) {
  //       return acc; 
  //     }
  //     if (!acc[mainTitle]) {
  //       acc[mainTitle] = {
  //         id: anime.mal_id,
  //         name: anime.title,
  //         image: anime.images.jpg.image_url,
  //         genre: anime.genres,
  //         type: anime.type,
  //         seasons: []
  //       };
  //     }
  //     acc[mainTitle].seasons.push(anime);
  //     return acc;
  //   }, {}));
  // };

  const setAllAnime = function(animeList) {
    allAnime.value = animeList;
    isLoaded.value = true;
  }

  return { allAnime, getAllAnime, getMainstreamAnime, getIyashikeiAnime, setAllAnime };
});

export default useAnimeDataStore;
