import { getMoviesAndSeriesAutocompletion } from './header-scripts.js';

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
