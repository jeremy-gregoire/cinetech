import { getPopularSeries } from './jeremy-script.js';

// Elements of the home page
const seriesCardContainer = document.querySelector('#seriesCardContainer');

// Gets a section of popular series
getPopularSeries().then((popularSeries) => {
  popularSeries.forEach((popularSerie) => {
    // Make this item clickable
    const a = document.createElement('a');
    a.href = `details.html?id=${popularSerie.id}&id=tv`;
    seriesCardContainer.appendChild(a);

    // Image
    const img = document.createElement('img');
    img.classList.add('rounded-1', 'border', 'border-light', 'border-1', 'shadow-sm');
    img.src = `https://image.tmdb.org/t/p/w154${popularSerie.poster_path}`;
    img.alt = `Jaquette du film ${popularSerie.title}`;
    a.appendChild(img);
  });
});
