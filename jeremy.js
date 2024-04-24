import { getPopularMovies } from './jeremy-script.js';

// Elements of the home page
const moviesCardContainer = document.querySelector('#moviesCardContainer');

// Gets a section of popular movies
getPopularMovies().then((popularMovies) => {
  popularMovies.forEach((popularMovie) => {
    // Make the item clickable
    const a = document.createElement('a');
    a.href = `details.html?id=${popularMovie.id}&type=movie`;
    moviesCardContainer.appendChild(a);

    // Image
    const img = document.createElement('img');
    img.classList.add('rounded-1', 'border', 'border-light', 'border-1', 'shadow-sm');
    img.src = `https://image.tmdb.org/t/p/w154${popularMovie.poster_path}`;
    img.alt = `Jaquette du film ${popularMovie.title}`;
    a.appendChild(img);
  });
});
