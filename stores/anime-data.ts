// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import animeSeriesData from '@/data/anime-series.json'

// interface Anime {
//   id: number
//   name: string
//   image: string
// }

// const useAnimeDataStore = defineStore('animeData', () => {
//   const allAnime = ref<Anime[]>([])
//   const isLoaded = ref(false)
//   const isFetching = ref(false)
//   const isInitialized = ref(false)

//   const iyashikeiAnime = computed(() => {
//     return Object.values(allAnime.value.reduce((acc: { [key: string]: any }, anime: Anime) => {
//       const mainTitle = anime.name // re-assign the title to name when I first fetch the data within index.vue
//         .replace(/^(Zoku)\s*/, '')
//         .replace(/:.*/, '') 
//         .split(' ')[0]
//       if (anime.name.toLowerCase().includes("heya camp")) {
//         return acc 
//       }
//       if (!acc[mainTitle]) {
//         acc[mainTitle] = {
//           id: anime.id,
//           name: anime.name,
//           image: anime.image,
//           genre: anime.genre,
//           type: anime.type,
//           seasons: [] as Anime[]
//         }
//       }
//       acc[mainTitle].seasons.push(anime)
//       return acc
//     }, {}))
//   })

//   function getMainstreamAnime(mainstreamAnimeIds: number[]): Anime[] {
//     return allAnime.value.filter(anime => mainstreamAnimeIds.includes(anime.id))
//     .sort((a, b) => mainstreamAnimeIds.indexOf(a.id) - mainstreamAnimeIds.indexOf(b.id))
//   }

//   function getAnimeSeries(id: string): Anime[] {
//     const seriesKey = Object.keys(animeSeriesData).find((key) =>
//       animeSeriesData[key].includes(parseInt(id))
//     )
//     const relatedIds = animeSeriesData[seriesKey] || []
//     // Map related IDs to `allAnime`
//     return relatedIds
//     .map((relatedId) => getAnimeById(relatedId))
//     .filter((anime) => anime) // Filter out nulls if some IDs are missing
//   }

//   function getAnimeById(id: string): Anime | undefined {
//     const animeId = allAnime.value.find(anime => anime.id === parseInt(id))
//     return animeId
//   }

//   function setAllAnime(animeList: Anime[]) {
//     if (allAnime.value.length > 0) {
//       return
//     }
//     allAnime.value = animeList
//     isLoaded.value = true
//   }

//   function setMiddlewareExecuted() {
//     isInitialized.value = true
//   }

//   return { allAnime, isLoaded, isFetching, isInitialized, iyashikeiAnime, getMainstreamAnime, getAnimeSeries,
//     getAnimeById, setAllAnime, setMiddlewareExecuted }
// })

// export default useAnimeDataStore




import { defineStore } from 'pinia'
import { ref } from 'vue'

import animeSeriesData from '@/data/anime-series.json'

export interface Anime { // exported for the plugin
  id: number
  name: string
  image: string
  genres: string[]
  type: string
}

interface AnimeSeriesData {  // for .json file
  [key: string]: number[]
}

const typedAnimeSeriesData: AnimeSeriesData = animeSeriesData
const mainstreamAnimeIds = [34798, 4081, 457, 17549]

const useAnimeDataStore = defineStore('animeData', () => {
  const allAnime = ref<Anime[]>([])
  const isLoaded = ref(false)
  const isFetching = ref(false)
  const isInitialized = ref(false)

  const iyashikeiAnime = computed(() => {
    return Object.values(allAnime.value.reduce((acc: {
      [key: string]: {
        id: number
        name: string
        image: string
        genres: string[]
        type: string
        seasons: Anime[]
      }
    }, anime: Anime) => {
      const mainTitle = anime.name // re-assign the title to name when I first fetch the data within index.vue
        .replace(/^(Zoku)\s*/, '')
        .replace(/:.*/, '') 
        .split(' ')[0]
      if (anime.name.toLowerCase().includes("heya camp")) {
        return acc 
      }
      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.id,
          name: anime.name,
          image: anime.image,
          genres: anime.genres,
          type: anime.type,
          seasons: []
        }
      }
      acc[mainTitle].seasons.push(anime)
      return acc
    }, {}))
  })

  const mainstreamAnime = computed(() => {
    return allAnime.value.filter(anime => mainstreamAnimeIds.includes(anime.id))
    .sort((a, b) => mainstreamAnimeIds.indexOf(a.id) - mainstreamAnimeIds.indexOf(b.id))
  })

  function getAnimeSeries(id: string): Anime[] { // route.params.id are strings
    const seriesKey = Object.keys(typedAnimeSeriesData).find((key: string) =>
      typedAnimeSeriesData[key].includes(parseInt(id))
    )
    // const relatedIds = animeSeriesData[seriesKey] || []
    const relatedIds = seriesKey ? typedAnimeSeriesData[seriesKey] : []
    // Map related IDs to `allAnime`
    return relatedIds
    .map((relatedId: number) => getAnimeById(relatedId.toString()))
    //.filter((anime) => anime) // Filter out nulls if some IDs are missing
    // .filter((anime): anime is Anime => anime !== undefined)
    .filter((anime) => anime) as Anime[]
  }

  function getAnimeById(id: string): Anime | undefined {
    return allAnime.value.find(anime => anime.id === parseInt(id))
  }

  function setAllAnime(animeList: Anime[]) {
    if (allAnime.value.length > 0) {
      return
    }
    allAnime.value = animeList
    isLoaded.value = true
  }

  function setMiddlewareExecuted() {
    isInitialized.value = true
  }

  return { allAnime, isLoaded, isFetching, isInitialized, iyashikeiAnime, mainstreamAnime, getAnimeSeries,
    getAnimeById, setAllAnime, setMiddlewareExecuted }
})

export type AnimeDataStore = ReturnType<typeof useAnimeDataStore>
export default useAnimeDataStore
