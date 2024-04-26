import { getPopularMovies, getCarouselSelections, getPopularSeries } from './jeremy-script.js';

// Elements of the home page
const moviesCardContainer = document.querySelector('#moviesCardContainer');
const btnSlidesContainer = document.querySelector('#btnSlidesContainer');
const slidesContainer = document.querySelector('#slidesContainer');
const seriesCardContainer = document.querySelector('#seriesCardContainer');

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

// Gets carousel information and creates a clickable item to go on the detail of that item
getCarouselSelections().then((selections) => {
  selections.forEach((selection, i) => {
    // Button under the title
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', '#carouselCaptions');
    button.setAttribute('data-bs-slide-to', i);
    button.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    button.setAttribute('aria-label', `Movie Slide ${i + 1}`);
    btnSlidesContainer.appendChild(button);

    // Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    slidesContainer.appendChild(carouselItem);

    // Only the first element can be active
    if (i === 0) {
      button.classList.add('active');
      carouselItem.classList.add('active');
    }

    // Make this item clickable
    const a = document.createElement('a');
    a.href = `details.html?id=${selection.id}&type=${selection.release_date ? 'movie' : 'tv'}`;
    carouselItem.appendChild(a);

    // Image
    const itemImage = document.createElement('img');
    itemImage.classList.add('d-block', 'w-100');
    itemImage.src = `https://image.tmdb.org/t/p/original${selection.backdrop_path}`;
    itemImage.alt = `Image du film ${selection.title}`;
    a.appendChild(itemImage);

    // Container for information
    const itemInfosContainer = document.createElement('div');
    itemInfosContainer.classList.add('carousel-caption', 'd-none', 'd-md-block');
    a.appendChild(itemInfosContainer);

    // Title
    const itemTitle = document.createElement('h5');
    itemTitle.innerText = selection.title || selection.name;
    itemInfosContainer.appendChild(itemTitle);
  });
});

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
