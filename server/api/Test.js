const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAnimeData = defineEventHandler(async (event) => {
 

  const limit = 25; // Limit set by Jikan API
  let allAnime = [];
  let currentPage = 1;
  const totalTitles = 178; // Total known Iyashikei anime titles
  const totalPages = Math.ceil(totalTitles / limit); // Calculate how many pages to fetch

  try {
    // Loop to fetch all pages
    while (currentPage <= totalPages) {
      // Log the page number being fetched
      console.log(`Fetching page ${currentPage}`);

      const response = await $fetch(`https://api.jikan.moe/v4/anime?genres=63&limit=${limit}&page=${currentPage}`);
      
      // Log the response for debugging
      console.log(`Response for page ${currentPage}:`, response);

      if (response.data && response.data.length > 0) {
        // Append current page's anime data to the collection
        allAnime = [...allAnime, ...response.data];
      } else {
        // If no more data is returned, stop fetching
        console.log('No more data available, stopping pagination');
        break;
      }

      currentPage++; // Move to the next page
      await delay(1000);
    }

    // Log the total anime fetched
    console.log(`Total anime fetched: ${allAnime.length}`);

    // Reduce data to group anime as per your needs
    const idealResponse = allAnime.reduce((acc, anime) => {
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
    // Log the error to the server console
    console.error('Error fetching anime ', error);

    // Create a custom error message for the client
    throw createError({ statusCode: 500, message: 'Failed to fetch Iyashikei anime. Please check server logs for more details.' });
  }
});

export default fetchAnimeData;