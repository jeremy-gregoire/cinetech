import { getMoviesAndSeriesAutocompletion } from '../../assets/scripts/main.js';

console.log('origin:', window.location.origin);
console.log('pathname:', window.location.pathname);

let pathnameFolders = window.location.pathname.substring(
  0,
  window.location.pathname.lastIndexOf('/') + 1
);

console.log('pathnameFolders:', pathnameFolders);

// création de la barre de navigation
const nav = document.createElement('nav');
nav.innerHTML = `
    <div class="d-flex">
        <a class="nav-item m-2 ms-5 hover-style" href="${window.location.origin}/index.html">ACCUEIL</a>
        <a class="nav-item m-2 hover-style" href="#">FILMS</a>
        <a class="nav-item m-2 hover-style" href="#">SERIES</a>
    </div>
    <div class="m-2 me-5">
        <div class="input-group">
          <input type="text" id="searchBar" list="autoCompletionList" placeholder="Rechercher" />
          <button type="button" id="btnSearch">O</button>
          <datalist id="autoCompletionList"></datalist>
        </div>
    </div>
`;
//stylisation rapide
nav.classList.add(
  'navbar',
  'bg-color',
  'sticky-top',
  'justify-content-between',
  'align-item-center'
);
document.body.appendChild(nav);

// Insérer la barre de navigation juste avant le premier élément du corps de la page
const firstElement = document.body.firstChild;
document.body.insertBefore(nav, firstElement);

const searchBar = document.querySelector('#searchBar');
const btnSearch = document.querySelector('#btnSearch');
const autoCompletionList = document.querySelector('#autoCompletionList');

// Redirect to the details page with two parameters: id and type
const goToDetails = () => {
  let options = document.querySelectorAll('option[request-info]');
  let selected = null;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (searchBar.value === option.value) {
      selected = option;
      break;
    }
  }

  if (selected) {
    let valueParams = selected.getAttribute('request-info').split(':');
    window.location.href = `${window.location.origin}/details.html?id=${valueParams[1]}&type=${valueParams[0]}`;
  } else {
    console.error('Your search is empty or not found!');
    return;
  }
};

// By default the search is empty
searchBar.value = '';

// Go to the details, when the enter key is pressed
searchBar.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') {
    return;
  }

  goToDetails();
});

// Go to the details, when the button is pressed
btnSearch.addEventListener('click', () => {
  goToDetails();
});

// Generates auto complition items
getMoviesAndSeriesAutocompletion().then((data) => {
  data.forEach((content) => {
    let type = content.release_date ? 'movie' : 'tv';

    const option = document.createElement('option');
    option.setAttribute('request-info', `${type}:${content.id}`);
    option.value = content.title || content.name;
    autoCompletionList.appendChild(option);
  });
});
