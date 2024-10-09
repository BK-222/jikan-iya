import animeSeries from '@/data/anime-series.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchRelatedAnime = defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    const seriesKey = Object.keys(animeSeries).find(key => 
      animeSeries[key].includes(parseInt(id))
    );
    
    const relatedIds = animeSeries[seriesKey] || [];
    const responses = [];

    for (const relatedId of relatedIds) {
      const response = await $fetch(`https://api.jikan.moe/v4/anime/${relatedId}`);
      responses.push({
        id: response.data.mal_id,
        name: response.data.title,
        image: response.data.images.jpg.image_url,
      });
      await delay(850); // Delay to stay within rate limits
    }
    
    return responses;
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Failed to fetch related anime.' });
  }
});

export default fetchRelatedAnime;