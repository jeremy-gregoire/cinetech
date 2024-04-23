const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";

const options = {
  method: "GET", // méthode GET --> recupérer sur le serveur
  headers: {
    accept: "application/json", // dire que je prend du JSON
    Authorization: "", // permet de d'authentifier notre demande
  },
};

// ici je récupère l'id dans l'URL
const params = new URLSearchParams(window.location.search); // on localise le paramètre id dans l'url
const id = params.get("id"); // on définit id --> on le récupère tel quel dans l'URL
console.log(`L'ID dans l'URL est :`, id); // cet id permet de mettre à jour en fonction de l'ID présent dans l'URL

// ----------------------------------------------------------

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
  const title = document.createElement("h1");
  title.innerText = data.title;
  document.body.appendChild(title);

  const original_language = document.createElement("p");
  original_language.innerText = data.original_language;
  document.body.appendChild(original_language);

  const origin_country = document.createElement("p");
  origin_country.innerText = data.origin_country;
  document.body.appendChild(origin_country);

  const release_date = document.createElement("p");
  release_date.innerText = data.release_date;
  document.body.appendChild(release_date);

  const overview = document.createElement("p");
  overview.innerText = data.overview;
  document.body.appendChild(overview);

  const poster = document.createElement("img");
  poster.src = "https://image.tmdb.org/t/p/w500" + data.poster_path; //pour récupérer l'image correspondant au film
  document.body.appendChild(poster);
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
