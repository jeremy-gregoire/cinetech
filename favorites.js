const TOKEN = '';

const FAVORITES = [];

function updateMovieListing() {}

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
