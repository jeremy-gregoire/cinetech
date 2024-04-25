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

    // URL de la liste des films populaires
    const filmURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${keyAPI}`;

    // Requête Fetch API pour récupérer les films populaires
    const filmResponse = await fetch(filmURL, options);

    // Convertir la réponse en JSON
    const filmData = await filmResponse.json();

    // Sélectionner l'élément où vous souhaitez afficher les données
    const dataContainer = document.getElementById('dataContainer');

    // Créer une structure HTML pour afficher les données
    let htmlString = '';

    // Parcourir les résultats et les ajouter à la structure HTML
    filmData.results.forEach((film) => {
      // Chemin complet de l'image de la série
      const imageURL = `${baseImageURL}${imageSize}${
        film.poster_path || film.backdrop_path
      }`;
      const filmDetailsURL = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${keyAPI}`;

      htmlString += `
        <div class="film-item">
          <a href="#" class="film-link" data-filmId="${film.id}">
            <img src="${imageURL}" alt="${film.title}">
            <p><strong>Titre:</strong> ${film.title}</p>
          </a>
          <button class="toggle-button">Synopsis</button>
          <p class="synopsis" style="display: none;"><strong>Synopsis:</strong> ${film.overview}</p>
        </div>
      `;
    });
    filmData.results.forEach((film) => {
      console.log(film);
      // code pour générer la structure HTML
    });
    // Ajouter la structure HTML à l'élément dataContainer
    dataContainer.innerHTML = htmlString;

    // Call the function to attach button events
    attachButtonEvents();

    // Call the function to attach film link events
    attachfilmLinkEvents();

    console.log(filmData.results);
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

function attachfilmLinkEvents() {
  const filmLinks = document.querySelectorAll('.film-link');

  filmLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const filmId = link.dataset.filmId;
      const filmDetailsURL = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${keyAPI}`;
      fetchfilmDetails(filmDetailsURL);
    });
  });
}

async function fetchfilmDetails(url) {
  try {
    const response = await fetch(url);
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
