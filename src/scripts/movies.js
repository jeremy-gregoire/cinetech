import { getPopularMoviesByPage } from '../../assets/scripts/main.js';

const moviesContainer = document.querySelector('#moviesContainer');
const btnPrevious = document.querySelector('#btnPrevious');
const pageIndicator = document.querySelector('#pageIndicator');
const btnNext = document.querySelector('#btnNext');

let totalPages = 0;
let currentPage = 1;

function updateListing() {
  moviesContainer.replaceChildren();

  getPopularMoviesByPage(currentPage).then((data) => {
    totalPages = data.total_pages;
    pageIndicator.innerText = `${currentPage} / ${totalPages}`;

    data.results.forEach((movie) => {
      // Make this item clickable
      const a = document.createElement('a');
      a.href = `details.html?id=${movie.id}&type=movie`;
      moviesContainer.appendChild(a);

      // Image
      const img = document.createElement('img');
      img.classList.add('rounded-1', 'border', 'border-light', 'border-1', 'shadow-sm');
      img.src = `https://image.tmdb.org/t/p/w154${movie.poster_path}`;
      img.alt = `Jaquette du film ${movie.title}`;
      a.appendChild(img);
    });
  });
}

updateListing();

btnPrevious.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateListing();
  }
});

btnNext.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateListing();
  }
});
