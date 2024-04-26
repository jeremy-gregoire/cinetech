const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmZjY2QwMTIwZDk0MDhlMGI0NWU0ZTIzZGY4NDIyZiIsInN1YiI6IjY2Mjc1NjU3MjU4ODIzMDE3ZDkzYWUyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zML1TcSHnqMrf5F2yVrQyOsLmCmsbjncCBqk_36Fn9g';

const FAVORITES = [];

fetch('https://api.themoviedb.org/3/movie/popular', {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    FAVORITES.push(movies[0]);
    FAVORITES.push(movies[3]);
    FAVORITES.push(movies[7]);
    FAVORITES.push(movies[15]);
    FAVORITES.push(movies[19]);

    movies.forEach((movie) => {
      const movieItem = document.createElement('div');
      document.body.appendChild(movieItem);

      const p = document.createElement('p');
      p.style.color = FAVORITES.includes(movie) ? 'green' : 'red';
      p.innerText = `Titre : ${movie.title}`;
      movieItem.appendChild(p);

      const button = document.createElement('button');
      button.innerText = FAVORITES.includes(movie) ? 'Enlever des favoris' : 'Ajouter aux favoris';
      movieItem.appendChild(button);
    });
  })
  .catch((error) => console.error(error));
