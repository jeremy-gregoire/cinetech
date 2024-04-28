const TheMovieDBAPI = {
  token: '',
  baseURL: 'https://api.themoviedb.org',
  version: '3',
};

const Application = {
  apiURL: `${TheMovieDBAPI.baseURL}/${TheMovieDBAPI.version}`,
  language: 'fr-FR',
};

export async function getMoviesAndSeriesAutocompletion() {
  let urlMovies = `${Application.apiURL}/movie/popular?language=${Application.language}`;
  let urlSeries = `${Application.apiURL}/tv/popular?language=${Application.language}`;

  try {
    const OPTIONS = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    };
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
  let url = `${Application.apiURL}/movie/popular?language=${Application.language}&page=1`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

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
  let urlMovies = `${Application.apiURL}/movie/now_playing?language=${Application.language}&page=1`;
  let urlSeries = `${Application.apiURL}/tv/on_the_air?language=${Application.language}&page=1`;

  try {
    const OPTIONS = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    };
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
  let url = `${Application.apiURL}/tv/popular?language=${Application.language}&page=1`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

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

export async function getInfos(id, type) {
  let url = `${Application.apiURL}/${type}/${id}?language=${Application.language}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getCast(id, type) {
  let url = `${Application.apiURL}/${type}/${id}/credits?language=${Application.language}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

    const data = await response.json();
    return data.cast;
  } catch (error) {
    throw error;
  }
}

export async function getSimilars(id, type) {
  let url = `${Application.apiURL}/${type}/${id}/similar?language=${Application.language}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function getReviews(id, type) {
  let url = `${Application.apiURL}/${type}/${id}/reviews`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TheMovieDBAPI.token}`,
      },
    });

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
