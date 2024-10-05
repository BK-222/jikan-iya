const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAnimeData = defineEventHandler(async (event) => {
  
  const mainstreamAnimeIds = [34798, 4081, 457, 17549];

  try {
    // const promises = mainstreamAnimeIds.map(id =>
    //   $fetch(`https://api.jikan.moe/v4/anime/${id}`)
    // );
    // const responses = await Promise.all(promises);

   
    const responses = [];
    for (const id of mainstreamAnimeIds) {
      
      const response = await $fetch(`https://api.jikan.moe/v4/anime/${id}`);
      responses.push(response);
      await delay(450); // Delay of 400ms to stay within the rate limit
    }

    const idealResponse = responses.map( ({ data }) => ({
      id: data.mal_id,
      name: data.title,
      image: data.images.jpg.image_url,
      genre: data.genres,
      related: data.related
    }));console.log(idealResponse);
    
    return idealResponse;

  } catch(error) {
    console.error('Error fetching anime ', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch Mainstream anime.' });
  }
});

export default fetchAnimeData;