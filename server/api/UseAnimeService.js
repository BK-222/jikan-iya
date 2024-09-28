const fetchAnimeData = defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://api.jikan.moe/v4/anime?genres=63&limit=20');
    
    const idealResponse = response.data.map(anime => ({
      id: anime.mal_id,
      name: anime.title,
      image: anime.images.jpg.image_url,
      genre: anime.genres,
      related: []
    }));
    return idealResponse;
  } catch(error) {
      throw createError({ statusCode: 500, message: 'Failed to fetch Iyashikei anime.' });
  }
});

export default fetchAnimeData;