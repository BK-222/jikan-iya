const fetchAnimeData = defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://api.jikan.moe/v4/anime?genres=63&limit=25');
    console.log(response);

    const idealResponse = response.data.reduce((acc, anime) => {
      const mainTitle = anime.title.split(' ')[0]; // Grouping by first word in the title (customize as needed)
      
      if (!acc[mainTitle]) {
        acc[mainTitle] = {
          id: anime.mal_id,
          name: anime.title,
          image: anime.images.jpg.image_url,
          genre: anime.genres,
          seasons: [] // Create a list to store all seasons, OVAs, or movies
        };
      }
    
      acc[mainTitle].seasons.push(anime); // Push the anime (season, OVA, movie) to the correct group
      return acc;
    }, {});
    
    // Return grouped anime series in array form
    return Object.values(idealResponse); 
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Failed to fetch Iyashikei anime.' });
  }
});

export default fetchAnimeData;