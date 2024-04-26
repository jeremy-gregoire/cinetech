const API_KEY = "";
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function getMoviesAndSeriesAutocompletion() {
  let urlMovies = " https://api.themoviedb.org/3/movie/popular?language=fr-FR";
  let urlSeries = " https://api.themoviedb.org/3/tv/popular?language=fr-FR";

  try {
    let responses = await Promise.all([fetch(urlMovies, OPTIONS), fetch(urlSeries, OPTIONS)]);

    if (responses.every((response) => !response.ok && response.status !== 200)) {
      console.error("Impossible to get movies and series!");
      return;
    }

    let moviesData = await responses[0].json();
    let seriesData = await responses[1].json();

    return [...moviesData.results, ...seriesData.results];
  } catch (error) {
    throw error;
  }
}
