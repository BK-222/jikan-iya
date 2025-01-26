const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, retries = 3, delayMs = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await $fetch(url);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error if all retries fail
      console.log(`Retrying fetch (${i + 1}/${retries})...`);
      await delay(delayMs);
    }
  }
};

const fetchAllAnimeData = defineEventHandler(async () => {
  let allAnime = [];
  let currentPage = 1;
  let hasMoreData = true;

  try {
    while (hasMoreData) {
      console.log(`Fetching page ${currentPage}...`);
      const response = await fetchWithRetry(`https://api.jikan.moe/v4/anime?genres=63&limit=25&page=${currentPage}`);

      if (response.data && response.data.length > 0) {
        allAnime = [...allAnime, ...response.data];
        currentPage++;
        await delay(750);
      } else {
        hasMoreData = false;
      }
    }

    const idealResponse = allAnime.map(anime => ({
      id: anime.mal_id,
      name: anime.title,
      image: anime.images.jpg.image_url,
      genres: anime.genres.map(genre => genre.name),
      type: anime.type
    }));

    console.log('Successfully fetched anime data:', idealResponse.length, 'items');
    return idealResponse;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch anime. Please check the server logs for more details.',
    });
  }
});

export default fetchAllAnimeData;