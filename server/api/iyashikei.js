const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAnimeData = defineEventHandler(async (event) => {
  let allAnime = [];
  let currentPage = 1;
  let hasMoreData = true;

  try {
    while (hasMoreData) {
      const response = await $fetch(`https://api.jikan.moe/v4/anime?genres=63&limit=25&page=${currentPage}`);

      if (response.data && response.data.length > 0) {
        allAnime = [...allAnime, ...response.data];
        currentPage++;
        await delay(800);
      } else {
        hasMoreData = false;
        // console.log('No more data available, stopping pagination');
      }
    }

    const idealResponse = allAnime.reduce((acc, anime) => {
      const mainTitle = anime.title
      .replace(/^(Zoku)\s*/, '') // removes prefixes
      .replace(/:.*/, '') // removes anything after and including the :
      .split(' ')[0]; //regex 

      if (anime.title.toLowerCase().includes("heya camp")) {
        return acc; // Skip this entry
      }

      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.mal_id,
          name: anime.title,
          image: anime.images.jpg.image_url,
          genre: anime.genres,
          type: anime.type,
          seasons: []
        }
      }
      acc[mainTitle].seasons.push(anime);
      return acc;
      
    }, {});

    return Object.values(idealResponse);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch Iyashikei anime. Please check server logs for more details.',
    });
  }
});

export default fetchAnimeData;