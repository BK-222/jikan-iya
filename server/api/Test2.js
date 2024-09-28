const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchMultiplePages = async () => {
  let allAnime = [];
  let currentPage = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    const response = await $fetch(`https://api.jikan.moe/v4/anime?genres=63&limit=25&page=${currentPage}`);
    
    if (response.data.length > 0) {
      allAnime = [...allAnime, ...response.data]; 
      currentPage++;
    } else {
      hasMoreData = false; 
    }
    await delay(1000); 
  }
  
  return allAnime; 
};

const fetchAnimeData = defineEventHandler(async (event) => {
  try {
    const allAnime = await fetchMultiplePages();

    const idealResponse = allAnime.reduce((acc, anime) => {
      const mainTitle = anime.title.split(' ')[0];

      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.mal_id,
          name: anime.title,
          image: anime.images.jpg.image_url,
          genre: anime.genres,
          seasons: []
        };
      }

      acc[mainTitle].seasons.push(anime);
      return acc;
    }, {});

    return Object.values(idealResponse);

  } catch (error) {
    console.error('Error fetching anime:', error);

    throw createError({ 
      statusCode: 500, 
      message: 'Failed to fetch Iyashikei anime. Please check server logs for more details.' 
    });
  }
});

export default fetchAnimeData;