const TOKEN = '';

const moviesContainer = document.querySelector('#moviesContainer');

const FAVORITES = JSON.parse(window.localStorage.getItem('favorites')) || [];
console.log(FAVORITES);

function updateMovieListing(movies) {
  moviesContainer.replaceChildren();

  movies.forEach((movie) => {
    const isFavorite = FAVORITES.filter((favorite) => movie.id === favorite.id).length > 0;
    console.log(isFavorite);

    const movieItem = document.createElement('div');
    moviesContainer.appendChild(movieItem);

    const p = document.createElement('p');
    p.style.color = isFavorite ? 'green' : 'red';
    p.innerText = `Titre : ${movie.title}`;
    movieItem.appendChild(p);

    const button = document.createElement('button');
    button.innerText = isFavorite ? 'Enlever des favoris' : 'Ajouter aux favoris';
    movieItem.appendChild(button);

    button.addEventListener('click', () => {
      if (isFavorite) {
        FAVORITES.splice(FAVORITES.indexOf(movie), 1);
      } else {
        FAVORITES.push(movie);
      }

      window.localStorage.setItem('favorites', JSON.stringify(FAVORITES));
      updateMovieListing(movies);
    });
  });
}

fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR', {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    updateMovieListing(data.results);
  })
  .catch((error) => console.error(error));
