const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZjY2QwMTIwZDk0MDhlMGI0NWU0ZTIzZGY4NDIyZiIsInN1YiI6IjY2Mjc1NjU3MjU4ODIzMDE3ZDkzYWUyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zML1TcSHnqMrf5F2yVrQyOsLmCmsbjncCBqk_36Fn9g',
  },
};

export async function getFavorites(page) {
  let urlFavoritesMovie = '';
  let urlFavoritesSerie = '';

  try {
    const responses = await Promise.all([
      fetch(urlFavoritesMovie, OPTIONS),
      fetch(urlFavoritesSerie, OPTIONS),
    ]);

    if (responses.every((response) => !response.ok || response.status !== 200)) {
      console.log('Impossible to get all favorites!');
      return;
    }

    let output = responses.map((response) => {
      let data = response.json();
      return [...data.results];
    });
    console.log(output);

    return output;
  } catch (error) {
    throw error;
  }
}
