console.log('fetch test');

// API Key
const keyAPI = '8c4b867188ee47a1d4e40854b27391ec';

// URL for fetching configuration
const configURL = `https://api.themoviedb.org/3/configuration?api_key=${keyAPI}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

let currentPageSet = 1; // Track the current set of pages being displayed

async function fetchConfig() {
  try {
    // Fetch API request to get configuration
    const response = await fetch(configURL, options);
    const data = await response.json();
    const baseImageURL = data.images.base_url;
    const imageSize = 'w500';
    const filmURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${keyAPI}`;
    const filmResponse = await fetch(filmURL, options);
    const filmData = await filmResponse.json();

    // Calculate pagination
    const itemsPerPage = 10; // Change this number to adjust the number of films per page
    const totalPages = Math.ceil(filmData.total_results / itemsPerPage);

    // Display films for the first page
    displayFilms(
      filmData.results.slice(0, itemsPerPage),
      baseImageURL,
      imageSize
    );

    // Generate pagination links
    generatePagination(totalPages);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function displayFilms(films, baseImageURL, imageSize) {
  const dataContainer = document.getElementById('dataContainer');
  let htmlString = '';

  films.forEach((film) => {
    const imageURL = `${baseImageURL}${imageSize}${
      film.poster_path || film.backdrop_path
    }`;

    htmlString += `
      <div class="film-item">
        <a href="#" class="film-link" data-filmId="${film.id}">
          <img src="${imageURL}" alt="${film.title}">
          <p>${film.title}</p>
        </a>
        <button class="toggle-button">Synopsis</button>
        <p class="synopsis" style="display: none;"> ${film.overview}</p>
      </div>
    `;
  });

  dataContainer.innerHTML = htmlString;

  // Call the function to attach button events
  attachButtonEvents();

  // Call the function to attach film link events
  attachFilmLinkEvents();
}

function attachButtonEvents() {
  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach((button) => {
    const synopsis = button.nextElementSibling;

    button.addEventListener('click', () => {
      if (synopsis.style.display === 'none') {
        synopsis.style.display = 'block';
        button.textContent = 'Reduce';
      } else {
        synopsis.style.display = 'none';
        button.textContent = 'Synopsis';
      }
    });
  });
}

function attachFilmLinkEvents() {
  const filmLinks = document.querySelectorAll('.film-link');

  filmLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const filmId = link.dataset.filmId;
      const filmDetailsURL = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${keyAPI}`;
      fetchFilmDetails(filmDetailsURL);
    });
  });
}

async function fetchFilmDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    openInNewTab(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(
      'An error occurred while fetching film details:',
      error.message
    );
  }
}

function openInNewTab(content) {
  const newWindow = window.open('', '_blank');
  newWindow.document.write('<pre>' + content + '</pre>');
}

function generatePagination(totalPages) {
  const paginationContainer = document.getElementById('paginationContainer');
  let paginationHTML = '';
  const itemsPerPage = 10; // Number of items per page
  const itemsPerPageSet = 29; // Number of pages per set

  // Calculate the current page set
  const currentPage = (currentPageSet - 1) * itemsPerPageSet + 1;

  // Calculate the start and end page numbers for the current set
  let endPage = currentPage + itemsPerPageSet - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  for (let i = currentPage; i <= endPage; i++) {
    paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  paginationContainer.innerHTML = paginationHTML;

  // Add a button to navigate to the next set of pages
  let paginationControls = document.getElementById('paginationControls');
  if (!paginationControls) {
    paginationControls = document.createElement('div');
    paginationControls.id = 'paginationControls';
    paginationContainer.parentNode.appendChild(paginationControls);
  }
  paginationControls.innerHTML = '';

  if (endPage < totalPages) {
    const nextSetPage = endPage + 1;
    paginationControls.innerHTML += `<button class="btn btn-primary" id="nextSetBtn" data-page="${nextSetPage}">Next 29</button>`;
    const nextSetBtn = document.getElementById('nextSetBtn');
    nextSetBtn.addEventListener('click', () => {
      currentPageSet++;
      generatePagination(totalPages);
    });
  }

  // Attach event handlers to pagination links
  const pageLinks = document.querySelectorAll('.page-link');
  pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pageNumber = parseInt(link.dataset.page);
      fetchFilmsForPage(pageNumber);
    });
  });
}

async function fetchFilmsForPage(pageNumber) {
  try {
    // Construct the URL for fetching trending movies for the specified page number
    const filmURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${keyAPI}&page=${pageNumber}`;

    // Send a GET request to the Movie Database API
    const response = await fetch(filmURL, options);

    // Parse the JSON data from the response body
    const data = await response.json();

    // Check if the 'results' property exists in the data object and if it's not empty
    if (data && data.results) {
      // Define the base image URL using a hardcoded value
      const baseImageURL = 'https://image.tmdb.org/t/p/';

      // Set the image size to 'w500'
      const imageSize = 'w500';

      // Display films for the specified page
      displayFilms(data.results, baseImageURL, imageSize);
    } else {
      // Log an error message if no movie data is found
      console.error('Results not found in the film data.');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error(
      'An error occurred while fetching films for page:',
      error.message
    );
  }
}
function generatePagination(totalPages) {
  const paginationContainer = document.getElementById('paginationContainer');
  let paginationHTML = '';
  const itemsPerPage = 10; // Number of items per page
  const itemsPerPageSet = 29; // Number of pages per set

  // Calculate the current page set
  const currentPage = (currentPageSet - 1) * itemsPerPageSet + 1;

  // Calculate the start and end page numbers for the current set
  let endPage = currentPage + itemsPerPageSet - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  for (let i = currentPage; i <= endPage; i++) {
    paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  paginationContainer.innerHTML = paginationHTML;

  // Add buttons for navigating to the previous and next sets of pages
  let paginationControls = document.getElementById('paginationControls');
  if (!paginationControls) {
    paginationControls = document.createElement('div');
    paginationControls.id = 'paginationControls';
    paginationContainer.parentNode.appendChild(paginationControls);
  }
  paginationControls.innerHTML = '';

  if (currentPageSet > 1) {
    const prevSetPage = Math.max((currentPageSet - 2) * itemsPerPageSet + 1, 1);
    console.log('Previous 29 button clicked. Previous set page:', prevSetPage);
    paginationControls.innerHTML += `<button class="btn btn-primary" id="prevSetBtn" data-page="${prevSetPage}">Previous 29</button>`;
    const prevSetBtn = document.getElementById('prevSetBtn');
    prevSetBtn.addEventListener('click', () => {
      currentPageSet--;
      generatePagination(totalPages);
    });
  }

  if (endPage < totalPages) {
    const nextSetPage = endPage + 1;
    paginationControls.innerHTML += `<button class="btn btn-primary" id="nextSetBtn" data-page="${nextSetPage}">Next 29</button>`;
    const nextSetBtn = document.getElementById('nextSetBtn');
    nextSetBtn.addEventListener('click', () => {
      currentPageSet++;
      generatePagination(totalPages);
    });
  }

  // Attach event handlers to pagination links
  const pageLinks = document.querySelectorAll('.page-link');
  pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pageNumber = parseInt(link.dataset.page);
      fetchFilmsForPage(pageNumber);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchConfig();
});
