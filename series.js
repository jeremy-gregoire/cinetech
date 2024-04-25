console.log('fetch test');

// Clé API
const keyAPI = '8c4b867188ee47a1d4e40854b27391ec';

// URL de base pour récupérer la configuration
const configURL = `https://api.themoviedb.org/3/configuration?api_key=${keyAPI}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

async function fetchConfig() {
  try {
    // Requête Fetch API pour obtenir la configuration
    const response = await fetch(configURL, options);

    // Convertir la réponse en JSON
    const data = await response.json();

    // Chemin d'accès de base pour les images
    const baseImageURL = data.images.base_url;

    // Taille de l'image que vous souhaitez afficher (par exemple, 'w500')
    const imageSize = 'w500';

    // URL de la liste des séries populaires
    const seriesURL = `https://api.themoviedb.org/3/tv/popular?api_key=${keyAPI}`;

    // Requête Fetch API pour récupérer les séries populaires
    const seriesResponse = await fetch(seriesURL, options);

    // Convertir la réponse en JSON
    const seriesData = await seriesResponse.json();

    // Sélectionner l'élément où vous souhaitez afficher les données
    const dataContainer = document.getElementById('dataContainer');

    // Créer une structure HTML pour afficher les données
    let htmlString = '';

    // Parcourir les résultats et les ajouter à la structure HTML
    seriesData.results.forEach((series) => {
      // Chemin complet de l'image de la série
      const imageURL = `${baseImageURL}${imageSize}${series.poster_path}`;
      const seriesDetailsURL = `https://api.themoviedb.org/3/tv/${series.id}?api_key=${keyAPI}`;

      htmlString += `
        <div class="series-item">
          <a href="#" class="series-link" data-series-id="${series.id}">
            <img src="${imageURL}" alt="${series.name}">
            <p><strong>Titre:</strong> ${series.name}</p>
          </a>
          <button class="toggle-button">Synopsis</button>
          <p class="synopsis" style="display: none;"><strong>Synopsis:</strong> ${series.overview}</p>
        </div>
      `;
    });
    // Ajouter la structure HTML à l'élément dataContainer
    dataContainer.innerHTML = htmlString;

    // Call the function to attach button events
    attachButtonEvents();

    // Call the function to attach series link events
    attachSeriesLinkEvents();

    console.log(seriesData.results);
  } catch (error) {
    // Gérer les erreurs
    console.error('Une erreur est survenue :', error.message);
  }
}

function attachButtonEvents() {
  const toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach((button) => {
    const synopsis = button.nextElementSibling; // Sélectionne le synopsis suivant le bouton

    button.addEventListener('click', () => {
      if (synopsis.style.display === 'none') {
        synopsis.style.display = 'block';
        button.textContent = 'Réduire';
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
      'Une erreur est survenue lors de la récupération des détails de la série :',
      error.message
    );
  }
}

function openInNewTab(content) {
  const newWindow = window.open('', '_blank');
  newWindow.document.write('<pre>' + content + '</pre>');
}

document.addEventListener('DOMContentLoaded', () => {
  fetchConfig();
});
