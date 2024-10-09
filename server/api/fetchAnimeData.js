const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAllAnimeData = defineEventHandler(async () => {
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
      }
    }

    const idealResponse = allAnime.map(anime => ({
      id: anime.mal_id,
      name: anime.title,
      image: anime.images.jpg.image_url,
      genre: anime.genres.map(genre => genre.name),
      type: anime.type
    }));

    return idealResponse;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch anime. Please check the server logs for more details.',
    });
  }
});

export default fetchAllAnimeData;