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
const suggestions = document.getElementById("suggestions");

// --------------------------------------
// --------------------------------------
const details = document.getElementById("details");
// --------------------------------------
// --------------------------------------

// cette fonction permet de récupérer toutes les informations du films et des les imprimer dans la console
async function fetchPicture() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${keyAPI}`);
  const data = await response.json();
  console.log("les images du film sont :", data);

  const hero = document.createElement("img");
  hero.src = "https://image.tmdb.org/t/p/w500" + data.backdrops[0].file_path;
  hero.classList.add("fullscreen-img");
  hero.style.opacity = "0.50";
  bandeau.appendChild(hero);
}
fetchPicture();

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
  poster.src = "https://image.tmdb.org/t/p/w400" + data.poster_path; //pour récupérer l'image correspondant au film
  poster.classList.add("bandeau", "rounded", "shadow-lg", "border", "border-light");
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
  original_language.innerText = "Langue originla : " + data.original_language;
  original_language.classList.add("me-5");
  language.appendChild(original_language);

  const origin_country = document.createElement("p");
  origin_country.innerText = "Pays d'origine : " + data.origin_country;
  origin_country.classList.add("me-5");
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
  stats.innerText = `Popularité : ${data.popularity} Nombre de votes : ${data.vote_average} Moyenne des votes : ${data.vote_count} `;
  statistic.appendChild(stats);

  const budget = document.createElement('p');
  budget.innerText = "Budget du film : " + data.budget;
  companies.appendChild(budget)
}
fetchData();

async function fetchCast() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${keyAPI}`
  ); //il manquait le s a credit pour que le lien marche
  const data = await response.json();
  console.log("le cast du film " + id + " est : ", data); // --> permet de farie apparaitre les infos dans la même ligne comme A. m'a montré
}
fetchCast();

async function fetchReview() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${keyAPI}`
  );
  const data = await response.json();
  console.log("les commentaires de " + id + " sont : ", data);
}
fetchReview();

async function fecthMovieSimilar() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${keyAPI}`
  );
  const data = await response.json();
  console.log("les films similaire de " + id + " sont : ", data);
}
fecthMovieSimilar();

// ----------------------------------
// ----- FONCTION PROPOSEE PAR JEREMY
async function getMovie(id) {
  let url = `https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${keyAPI}`;

  try {
    const response = await fetch(url);

    if (!response.ok || response.status !== 200) {
      console.error("Impossible de récupérer les informations du film !");
      return;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
