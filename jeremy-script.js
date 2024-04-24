const API_KEY = '';
const OPTIONS = {
  method: 'GET',
  headers: { accept: 'application/json', Authorization: 'Bearer ' + API_KEY },
};

export async function getPopularMovies() {
  let url = `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1`;

  try {
    let response = await fetch(url, OPTIONS);

    if (!response.ok && response.status !== 200) {
      console.error('Impossible to get the movies!');
      return;
    }

    let data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
