let currentPageSet = 1; // Track the current set of pages being displayed

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

async function fetchConfig() {
  try {
    // Fetch API request to get configuration
    const response = await fetch(configURL, options);
    const data = await response.json();
    const baseImageURL = data.images.base_url;
    const imageSize = 'w500';
    const seriesURL = `https://api.themoviedb.org/3/tv/popular?api_key=${keyAPI}`;
    const seriesResponse = await fetch(seriesURL, options);
    const seriesData = await seriesResponse.json();

    // Calculate pagination
    const itemsPerPage = 10; // Change this number to adjust the number of series per page
    const totalPages = Math.ceil(seriesData.total_results / itemsPerPage);

    // Display series for the first page
    displaySeries(
      seriesData.results.slice(0, itemsPerPage),
      baseImageURL,
      imageSize
    );

    // Generate pagination links
    generatePagination(totalPages);

    console.log(seriesData.results);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

function displaySeries(series, baseImageURL, imageSize) {
  const dataContainer = document.getElementById('dataContainer');
  let htmlString = '';

  series.forEach((seriesItem) => {
    const imageURL = seriesItem.poster_path
      ? `${baseImageURL}${imageSize}${seriesItem.poster_path}`
      : 'https://via.placeholder.com/150'; // Use a placeholder image if no poster path is available

    htmlString += `
      <div class="series-item">
        <a href="#" class="series-link" data-series-id="${seriesItem.id}">
          <img src="${imageURL}" alt="${seriesItem.name}">
          <p>${seriesItem.name}</p>
        </a>
        <button class="toggle-button">Synopsis</button>
        <p class="synopsis" style="display: none;">${seriesItem.overview}</p>
      </div>
    `;
  });

  dataContainer.innerHTML = htmlString;

  // Call the function to attach button events
  attachButtonEvents();

  // Call the function to attach series link events
  attachSeriesLinkEvents();
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

function attachSeriesLinkEvents() {
  const seriesLinks = document.querySelectorAll('.series-link');

  seriesLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const seriesId = link.dataset.seriesId;
      const seriesDetailsURL = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${keyAPI}`;
      fetchSeriesDetails(seriesDetailsURL);
    });
  });
}

async function fetchSeriesDetails(url) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    openInNewTab(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(
      'An error occurred while fetching series details:',
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
      fetchSeriesForPage(pageNumber);
    });
  });
}

async function fetchSeriesForPage(pageNumber) {
  try {
    const seriesURL = `https://api.themoviedb.org/3/tv/popular?api_key=${keyAPI}&page=${pageNumber}`;
    const response = await fetch(seriesURL, options);
    const data = await response.json();

    // Check if the 'results' property exists in the data object
    if (data && data.results) {
      const baseImageURL = 'https://image.tmdb.org/t/p/'; // Hardcoded base image URL
      const imageSize = 'w500';

      // Update current page set
      currentPageSet = Math.ceil(pageNumber / 29);

      // Display series for the specified page
      displaySeries(data.results, baseImageURL, imageSize);
    } else {
      console.error('Results not found in the series data.');
    }
  } catch (error) {
    console.error(
      'An error occurred while fetching series for page:',
      error.message
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchConfig();
});
