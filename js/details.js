const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";

const options = {
  method: "GET", // méthode GET --> recupérer sur le serveur
  headers: {
    accept: "application/json", // dire que je prend du JSON
    Authorization: "Bearer " + keyAPI, // permet de d'authentifier notre demande
  },
};

// ici je récupère l'id dans l'URL
const params = new URLSearchParams(window.location.search); // on localise le paramètre id dans l'url
const id = params.get("id"); // on définit id --> on le récupère tel quel dans l'URL
console.log(`L'ID dans l'URL est :`, id); // cet id permet de mettre à jour en fonction de l'ID présent dans l'URL

// ----------------------------------------------------------
const container = document.getElementById("container");
const bandeau = document.getElementById("bandeau");
const affiche = document.getElementById("poster");
const info = document.getElementById("small_info");
info.classList.add();
const language = document.getElementById("language_info");
language.classList.add("d-flex");
const pitch = document.getElementById("pitch");
const statistic = document.getElementById("statistic");
statistic.classList.add("text-center");
const companies = document.getElementById("companies");
const cast = document.getElementById("cast");
const suggestions = document.getElementById("suggestion");
const details = document.getElementById("details");
const rate = document.getElementById("rate");

//----------------------------------------------------------------------------------------------------------
async function fetchPicture() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${keyAPI}`);
  const data = await response.json();
  console.log("les images du film sont :", data);

  bandeau.classList.add("fullscreen-img", "filter");
  bandeau.style.backgroundImage =
    "url(https://image.tmdb.org/t/p/w500" + data.backdrops[0].file_path + ")";
  bandeau.style.backgroundRepeat = "no-repeat";
  bandeau.style.backgroundSize = "cover";
}
fetchPicture();

// cette fonction permet de récupérer toutes les informations du films et des les imprimer dans la console
async function fetchData() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${keyAPI}` //toString change l'apparence dans de l'impression dans la console
  );
  const data = await response.json();
  //console.log(data); --> permet de print les données dans la console
  //console.log("les infos du films id :" + id + " sont : " + JSON.stringify(data)); --> proposé par J.
  console.log(`Les infos du film ${id} sont : `, data); // --> permet de farie apparaitre les infos dans la même ligne comme A. m'a montré

  //crée les éléments dans la page web
  const poster = document.createElement("img");
  poster.src = "https://image.tmdb.org/t/p/w300" + data.poster_path; //pour récupérer l'image correspondant au film
  poster.classList.add("rounded", "shadow-lg", "border", "border-light");
  affiche.appendChild(poster);

  const title = document.createElement("h1");
  title.innerText = data.title;
  info.appendChild(title);

  const release_date = document.createElement("p");
  release_date.innerText = "Réalisé le : " + data.release_date;
  info.appendChild(release_date);

  const runtime = document.createElement("p");
  runtime.innerText = "Durée : " + data.runtime;
  info.appendChild(runtime);

  // Créer un tableau pour stocker les noms des genres
  const genreNames = [];
  // Boucle à travers chaque élément du tableau genres
  data.genres.forEach(function (genreItem) {
    // Ajouter le nom du genre actuel au tableau
    genreNames.push(genreItem.name);
  });
  // Créer un paragraphe pour afficher les noms des genres
  const genreParagraph = document.createElement("p");
  // Définir le texte du paragraphe en joignant les noms des genres avec des virgules
  genreParagraph.innerText = "Genre: " + genreNames.join(", ");
  // Ajouter le paragraphe à l'élément parent (info dans votre cas)
  info.appendChild(genreParagraph);

  const original_language = document.createElement("p");
  original_language.innerText = "Langue original : " + data.original_language;
  original_language.classList.add();
  language.appendChild(original_language);

  const origin_country = document.createElement("p");
  origin_country.innerText = "Pays d'origine : " + data.origin_country;
  origin_country.classList.add();
  language.appendChild(origin_country);

  // Créer un tableau pour stocker les noms des genres
  const product_country = [];
  // Boucle à travers chaque élément du tableau genres
  data.production_countries.forEach(function (producountryItem) {
    // Ajouter le nom du genre actuel au tableau
    product_country.push(producountryItem.name);
  });
  // Créer un paragraphe pour afficher les noms des genres
  const production_country = document.createElement("p");
  // Définir le texte du paragraphe en joignant les noms des genres avec des virgules
  production_country.innerText = "Pays de production: " + product_country.join(", ");
  // Ajouter le paragraphe à l'élément parent (info dans votre cas)
  language.appendChild(production_country);

  const overview = document.createElement("p");
  overview.innerText = data.overview;
  pitch.appendChild(overview);

  const stats = document.createElement("p");
  stats.innerHTML = `
  <div class="d-flex justify-content-center">
    <p class="px-4">Popularité : ${data.popularity}</p> 
    <p class="px-4">Nombre de votes : ${data.vote_average}</p>
    <p class="px-4">Moyenne des votes : ${data.vote_count}</p>
  </div>
  `;
  stats.classList.add("text-center", "px-3");
  statistic.appendChild(stats);

  const budget = document.createElement("p");
  budget.innerHTML = `
  <div class="d-flex justify-content-center">
    <p class="px-4">Budget du film : ${+data.budget}</p>
    <p class="px-4">Revenue du film : ${+data.budget}</p>
  </div>
  `;
  statistic.appendChild(budget);

  const product_companies = [];
  data.production_companies.forEach(function (producompaniesItem) {
    product_companies.push(producompaniesItem.name);
  });
  const production_companies = document.createElement("p");
  production_companies.innerText = "Producteur : " + product_companies.join(", ");
  language.appendChild(production_companies);

  //   const logoComp = [];
  //   console.log(logoComp);
  //   data.production_companies.forEach(function (producompaniesItem) {
  //     logoComp.push(producompaniesItem.logo_path);
  //   });
  //   const companiesLogo = document.createElement("img");
  //   companiesLogo.src = "https://image.tmdb.org/t/p/w300" + data.logo_path;
  //   companiesLogo.classList.add("rounded", "shadow-lg", "border", "border-light");
  //   companies.appendChild(companiesLogo);
}
fetchData();

async function fetchCast() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${keyAPI}`
  ); //il manquait le s a credit pour que le lien marche
  const data = await response.json();
  console.log("le cast du film " + id + " est : ", data); // --> permet de farie apparaitre les infos dans la même ligne comme A. m'a montré

  //crée les éléments dans la page web
  const picAc = [];
  data.cast.forEach(function (imgAc) {
    picAc.push(imgAc.profile_path);
  });

  // Itérer sur chaque chemin d'accès à l'image dans le tableau picAc
  picAc.forEach(function (imagePath, index) {
    // Créer un élément div pour représenter une carte
    const card = document.createElement("div");
    card.classList.add("card", "m-3", "w-25"); // Ajouter la classe "card" pour la mise en forme

    // Créer un élément img pour afficher l'image
    const actorPicture = document.createElement("img");
    actorPicture.src = "https://image.tmdb.org/t/p/w200" + imagePath; // Utiliser le chemin d'accès à l'image actuelle
    actorPicture.classList.add("card-img-top"); // Ajouter la classe "card-img-top" pour la mise en forme de l'image

    // Ajouter l'image à la carte
    card.appendChild(actorPicture);

    // Récupérer le nom de l'acteur correspondant à l'index actuel dans data.cast
    const actorName = data.cast[index].name;

    // Créer un élément p pour afficher le nom de l'acteur
    const actorNameParagraph = document.createElement("p");
    actorNameParagraph.textContent = actorName;
    actorNameParagraph.classList.add("text-center");

    // Ajouter le nom de l'acteur à la carte
    card.appendChild(actorNameParagraph);

    // Ajouter la carte à l'élément avec l'ID "cast" (ou un autre conteneur de votre choix)
    cast.appendChild(card);
  });
}
fetchCast();

async function fetchMovieSimilar() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${keyAPI}`
  );
  const data = await response.json();
  console.log("Les films similaires de " + id + " sont : ", data);

  // Crée un tableau d'indices aléatoires pour sélectionner 10 éléments max
  const randomIndices = [];
  while (randomIndices.length < 9 && randomIndices.length < data.results.length) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  //crée les cards dans lesquelles les films vont apparaitre
  randomIndices.forEach(function (index) {
    const card = document.createElement("div");
    card.classList.add("card", "m-3", "w-25");

    // Crée un élément image pour afficher le poster du film similaire
    const poster = document.createElement("img");
    poster.src = "https://image.tmdb.org/t/p/w200" + data.results[index].backdrop_path;
    poster.classList.add("card-img-top");
    card.appendChild(poster);

    // Crée un élément pour afficher le nom du film similaire
    const nameSimilar = data.results[index].title;
    const nameSimilarPath = document.createElement("p");
    nameSimilarPath.textContent = nameSimilar;
    nameSimilarPath.classList.add("text-center");
    card.appendChild(nameSimilarPath);

    // Ajoute la carte à la div "suggestions" dans le HTML
    suggestions.appendChild(card);
  });
}
fetchMovieSimilar();

async function fetchReview() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${keyAPI}`
  );
  const data = await response.json();
  console.log("les commentaires de " + id + " sont : ", data);

  const commit = [];
  data.results.forEach(function (authors) {
    commit.push(authors.author_details);
  });
  console.log(commit);

  commit.forEach(function (author, index) {
    const card = document.createElement("div");
    card.classList.add("card", "m-4");

    const userName = author.username;
    const userNameParagraph = document.createElement("p");
    userNameParagraph.textContent = userName;
    userNameParagraph.classList.add("text-center", "p-3", "bg-warning-subtle", "rounded","fs-4");

    const commentParagraph = document.createElement("p");
    commentParagraph.textContent = data.results[index].content;
    commentParagraph.classList.add("mx-3");

    const dateOfCreation = document.createElement("p");
    dateOfCreation.textContent = data.results[index].created_at;
    dateOfCreation.classList.add("text-center");

    card.appendChild(userNameParagraph);
    card.appendChild(commentParagraph);
    card.appendChild(dateOfCreation);
    rate.appendChild(card);
  });
}
fetchReview();

const letCommitGet = document.getElementById("letCommitGet");
const boutonPost = document.getElementById("btnPost");
const textGet = document.getElementById("commentary");
const nameUserGet = document.getElementById("user");

boutonPost.addEventListener("click", function () {
  const text = textGet.value;
  const pseudo = user.value;
  console.log(pseudo);

  const card = document.createElement("div");
  card.classList.add("card", "m-4");

  const nameUser = document.createElement("p");
  nameUser.innerHTML = pseudo;
  nameUser.classList.add("text-center","mb-3","p-3","bg-warning-subtle", "rounded");
  card.appendChild(nameUser);

  const postCommit = document.createElement("div");
  postCommit.innerHTML = text;
  postCommit.classList.add("text-center", "mb-3", "m-auto");
  card.appendChild(postCommit);

  const btnDelCommit = document.createElement("button");
  btnDelCommit.innerHTML = "supprimer commentaire";
  btnDelCommit.classList.add("btn", "btn-primary", "w-25", "mb-3", "m-auto");
  card.appendChild(btnDelCommit);

  letCommitGet.appendChild(card);

  btnDelCommit.addEventListener("click", function () {
    card.remove();
  });
});