const API_KEY = '';
const OPTIONS = {
  method: 'GET',
  headers: { accept: 'application/json', Authorization: 'Bearer ' + API_KEY },
};

export async function getCarouselSelections() {
  let urlMovies = 'https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1';
  let urlSeries = 'https://api.themoviedb.org/3/tv/on_the_air?language=fr-FR&page=1';

  try {
    let responses = await Promise.all([fetch(urlMovies, OPTIONS), fetch(urlSeries, OPTIONS)]);

    if (responses.every((response) => !response.ok && response.status !== 200)) {
      console.error('Impossible to get the movies and series!');
      return;
    }

    let moviesData = await responses[0].json();
    let seriesData = await responses[1].json();

    let globalSelections = [...moviesData.results, ...seriesData.results];
    globalSelections.sort(
      (a, b) =>
        new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date)
    );

    return globalSelections.slice(0, 10);
  } catch (error) {
    throw error;
  }
}
