const fetchAnimeDetails = defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;
    const response = await $fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    
    const idealResponse = {
      id: response.data.mal_id,
      name: response.data.title,
      image: response.data.images.jpg.image_url,
      genres: response.data.genres.map(genre => genre.name),
      episodes: response.data.episodes,
      duration: response.data.duration
    }
    return idealResponse;
  } catch (error) {
      throw createError({ statusCode: 500, message: 'Failed to fetch anime details.' });
  }
});

export default fetchAnimeDetails;