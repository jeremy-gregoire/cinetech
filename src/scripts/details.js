import { getCast, getInfos, getReviews, getSimilars } from '../../assets/scripts/main.js';

// Gets the id and type parameters of the URL
const params = new URLSearchParams(window.location.search); // on localise le paramètre id dans l'url
const id = params.get('id'); // on définit id --> on le récupère tel quel dans l'URL
const type = params.get('type');

const dateFormat = Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
});

const dateTimeFormat = Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
});

const moneyNumberFormat = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'USD',
});

// ----------------------------------------------------------
// ce sont les éléments récupérer dans le HTML
const container = document.getElementById('container');
const bandeau = document.getElementById('bandeau');
const affiche = document.getElementById('poster');
const info = document.getElementById('small_info');
const language = document.getElementById('language_info');
language.classList.add('d-flex');
const pitch = document.getElementById('pitch');
const statistic = document.getElementById('statistic');
statistic.classList.add('text-center');
const companies = document.getElementById('companies');
const cast = document.getElementById('cast');
const suggestions = document.getElementById('suggestion');
const details = document.getElementById('details');
const rate = document.getElementById('rate');

// Gets all informations of the content
getInfos(id, type).then((infos) => {
  bandeau.classList.add('fullscreen-img', 'filter');
  bandeau.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${infos.backdrop_path})`;
  bandeau.style.backgroundRepeat = 'no-repeat';
  bandeau.style.backgroundSize = 'cover';

  const poster = document.createElement('img');
  poster.src = `https://image.tmdb.org/t/p/w300${infos.poster_path}`; //pour récupérer l'image correspondant au film
  poster.classList.add('rounded', 'shadow-lg', 'border', 'border-light');
  affiche.appendChild(poster);

  const title = document.createElement('h1');
  title.innerText = infos.title || infos.name;
  info.appendChild(title);

  const release_date = document.createElement('p');
  release_date.innerText = `Date de sortie : ${
    infos.release_date || infos.first_air_date !== ''
      ? dateFormat.format(new Date(infos.release_date || infos.first_air_date))
      : 'Non spécifié'
  }`;
  info.appendChild(release_date);

  const runtime = document.createElement('p');
  runtime.innerText = `Durée ${type === 'movie' ? 'du film' : 'de la série'} au totale : ${
    infos.runtime
      ? `${infos.runtime}m`
      : infos.episode_run_time.length > 0
      ? `${infos.episode_run_time.reduce(
          (accumulatorValue, currentValue) => accumulatorValue + currentValue
        )}m`
      : 'Non spécifié'
  }`;
  info.appendChild(runtime);

  const genreNames = [];
  infos.genres.forEach(function (genreItem) {
    genreNames.push(genreItem.name);
  });

  const genreParagraph = document.createElement('p');
  genreParagraph.innerText = 'Genre: ' + genreNames.join(', ');
  info.appendChild(genreParagraph);

  const original_language = document.createElement('p');
  original_language.innerText = 'Langue original : ' + infos.original_language;
  original_language.classList.add('pe-2');
  language.appendChild(original_language);

  const origin_country = document.createElement('p');
  origin_country.innerText = "Pays d'origine : " + infos.origin_country;
  origin_country.classList.add('px-2');
  language.appendChild(origin_country);

  const overview = document.createElement('p');
  overview.innerText =
    infos.overview !== ''
      ? infos.overview
      : `Il n'y a pas de description pour ${type === 'movie' ? 'ce film' : 'cette série'} !`;
  pitch.appendChild(overview);

  const stats = document.createElement('p');
  stats.innerHTML = `
    <div class="d-flex justify-content-center">
      <p class="px-4">Popularité : ${infos.popularity}</p>
      <p class="px-4">Nombre de votes : ${infos.vote_average}</p>
      <p class="px-4">Moyenne des votes : ${infos.vote_count}</p>
    </div>
  `;
  stats.classList.add('text-center', 'px-3');
  statistic.appendChild(stats);

  const budget = document.createElement('p');
  budget.innerHTML = `
    <div class="d-flex justify-content-center">
      <p class="px-4">Budget ${type === 'movie' ? 'du film' : 'de la série'} : ${
    infos.budget ? moneyNumberFormat.format(+infos.budget) : 'Non spécifié'
  }</p>
      <p class="px-4">Revenue ${type === 'movie' ? 'du film' : 'de la série'} : ${
    infos.budget ? moneyNumberFormat.format(+infos.budget) : 'Non spécifié'
  }</p>
    </div>
  `;
  statistic.appendChild(budget);

  const product_companies = [];
  infos.production_companies.forEach(function (producompaniesItem) {
    product_companies.push(producompaniesItem.name);
  });
  const production_companies = document.createElement('p');
  production_companies.innerText = 'Producteur : ' + product_companies.join(', ');
  production_companies.classList.add('px-2');
  language.appendChild(production_companies);
});

getCast(id, type).then((actors) => {
  actors.forEach((actor) => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-3', 'w-25');

    const actorPicture = document.createElement('img');
    actorPicture.src =
      actor.profile_path !== null
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : `${window.location.origin}/assets/img/user-astronaut-solid.svg`;
    actorPicture.classList.add('card-img-top');

    const actorName = document.createElement('p');
    actorName.innerText = actor.name;
    actorName.classList.add('text-center');

    card.appendChild(actorPicture);
    card.appendChild(actorName);

    cast.appendChild(card);
  });
});

// Gets a n random elements of an array
function getRandomElements(arr, n) {
  if (n > arr.length) {
    n = arr.length;
    // throw new Error('n must be less or equal to the length of the array !');
  }

  // Creates a copy the original array
  const shuffledArr = [...arr];

  // Mixed the array by using the Fisher-Yates algorithm
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  // Returns n first elements of the mixed array
  return shuffledArr.slice(0, n);
}

// Gets similar content (for exemple: similar movie) of that content and creates cards them.
getSimilars(id, type).then((similars) => {
  const randomSimilars = getRandomElements(similars, 9);

  randomSimilars.forEach((similar) => {
    const a = document.createElement('a');
    a.href = `details.html?id=${similar.id}&type=${type}`;
    a.classList.add('card', 'm-3', 'w-25');

    const card = document.createElement('div');
    const poster = document.createElement('img');
    poster.src =
      similar.backdrop_path !== null
        ? `https://image.tmdb.org/t/p/w200${similar.backdrop_path}`
        : `${window.location.origin}/assets/img/user-astronaut-solid.svg`;
    poster.classList.add('card-img-top');
    card.appendChild(poster);

    const nameSimilar = similar.title || similar.name;
    const nameSimilarPath = document.createElement('p');
    nameSimilarPath.textContent = nameSimilar;
    nameSimilarPath.classList.add('text-center');
    card.appendChild(nameSimilarPath);

    a.appendChild(card);
    suggestions.appendChild(a);
  });
});

// Gets the reviews of that content (shows a message if the content doesn't have reviews)
getReviews(id, type).then((reviews) => {
  if (reviews.length > 0) {
    const commit = [];
    reviews.forEach((review) => {
      commit.push(review);
    });

    commit.forEach((review) => {
      const card = document.createElement('div');
      card.classList.add('card', 'm-4');

      const userName = review.author_details.username;
      const userNameParagraph = document.createElement('p');
      userNameParagraph.textContent = userName;
      userNameParagraph.classList.add('text-center', 'p-3', 'bg-warning-subtle', 'rounded', 'fs-4');

      const commentParagraph = document.createElement('p');
      commentParagraph.textContent = review.content;
      commentParagraph.classList.add('mx-3');

      const dateOfCreation = document.createElement('p');
      dateOfCreation.textContent = dateTimeFormat.format(new Date(review.created_at));
      dateOfCreation.classList.add('text-center');

      card.appendChild(userNameParagraph);
      card.appendChild(commentParagraph);
      card.appendChild(dateOfCreation);
      rate.appendChild(card);
    });
  } else {
    const p = document.createElement('p');
    p.classList.add('text-center', 'fs-4', 'fw-bold');
    p.innerText = "Il n'y a pas de commentaire pour ce film !";
    rate.appendChild(p);
  }
});

// Adds and deletes reviews for the user
const letCommitGet = document.getElementById('letCommitGet');
const boutonPost = document.getElementById('btnPost');
const textGet = document.getElementById('commentary');
const nameUserGet = document.getElementById('user');

// Checks if reviews already exist in the localStorage
let commentaires = JSON.parse(localStorage.getItem('commentaires')) || [];

boutonPost.addEventListener('click', function () {
  const text = textGet.value;
  commentaires.push(text);
  localStorage.setItem('commentaires', JSON.stringify(commentaires));

  const pseudo = user.value;

  const card = document.createElement('div');
  card.classList.add('card', 'm-4');

  const nameUser = document.createElement('p');
  nameUser.innerHTML = pseudo;
  nameUser.classList.add('text-center', 'mb-3', 'p-3', 'bg-warning-subtle', 'rounded');
  card.appendChild(nameUser);

  const postCommit = document.createElement('div');
  postCommit.innerHTML = text;
  postCommit.classList.add('text-center', 'mb-3', 'm-auto');
  card.appendChild(postCommit);

  const btnDelCommit = document.createElement('button');
  btnDelCommit.innerHTML = 'supprimer commentaire';
  btnDelCommit.classList.add('btn', 'btn-primary', 'w-25', 'mb-3', 'm-auto');
  card.appendChild(btnDelCommit);

  letCommitGet.appendChild(card);

  btnDelCommit.addEventListener('click', function () {
    localStorage.removeItem('commentaires');
    card.remove();
  });
});
