const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZjY2QwMTIwZDk0MDhlMGI0NWU0ZTIzZGY4NDIyZiIsInN1YiI6IjY2Mjc1NjU3MjU4ODIzMDE3ZDkzYWUyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zML1TcSHnqMrf5F2yVrQyOsLmCmsbjncCBqk_36Fn9g';
const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function getMoviesAndSeriesAutocompletion() {
  let urlMovies = ' https://api.themoviedb.org/3/movie/popular?language=fr-FR';
  let urlSeries = ' https://api.themoviedb.org/3/tv/popular?language=fr-FR';

  try {
    let responses = await Promise.all([fetch(urlMovies, OPTIONS), fetch(urlSeries, OPTIONS)]);

    if (responses.every((response) => !response.ok && response.status !== 200)) {
      console.error('Impossible to get movies and series!');
      return;
    }

    let moviesData = await responses[0].json();
    let seriesData = await responses[1].json();

    return [...moviesData.results, ...seriesData.results];
  } catch (error) {
    throw error;
  }
}

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

export async function getPopularSeries() {
  let url = `https://api.themoviedb.org/3/tv/popular?language=fr-FR&page=1`;

  try {
    let response = await fetch(url, OPTIONS);

    if (!response.ok && response.status !== 200) {
      console.error('Impossible to get the series!');
      return;
    }

    let data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
