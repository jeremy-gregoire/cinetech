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
const type = params.get("type");

// ----------------------------------------------------------
// ce sont les éléments récupérer dans le HTML
const container = document.getElementById("container");
const bandeau = document.getElementById("bandeau");
const affiche = document.getElementById("poster");
const info = document.getElementById("small_info");
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
// LES DIFFERENTES FONCTIONS QUI PERMETTENT DE FETCH ET RECUPERER LES ELEMENTS : PAR CATEGORIES
// --- fonction qui permet de récupérer une image de fond
async function fetchPicture() {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${keyAPI}`
  );
  const serieResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${keyAPI}`
  );
  const dataMovie = await movieResponse.json();
  const dataSerie = await serieResponse.json();

  let responseData = {
    1: dataMovie,
    2: dataSerie,
  };

  // on demande à vérifier plusieurs clés dans le switch
  let keyToCheck = ["1", "2"];

  // on itère dans les clés pour vérifier si on est dans l'un ou dans l'autre
  keyToCheck.forEach((key) => {
    switch (key) {
      case "1":
        // on enveloppe les actions à réaliser dans une condition if pour que seul un élément apparaissent
        // affiche du film
        if (responseData[1].backdrops) {
          bandeau.classList.add("fullscreen-img", "filter");
          bandeau.style.backgroundImage =
            "url(https://image.tmdb.org/t/p/w500" + dataMovie.backdrops[0].file_path + ")";
          bandeau.style.backgroundRepeat = "no-repeat";
          bandeau.style.backgroundSize = "cover";
        }
        break;

      case "2":
        // on enveloppe les actions à réaliser dans une condition if pour que seul un élément apparaissent
        if (responseData[2].backdrops) {
          bandeau.classList.add("fullscreen-img", "filter");
          bandeau.style.backgroundImage =
            "url(https://image.tmdb.org/t/p/w500" + dataSerie.backdrops[0].file_path + ")";
          bandeau.style.backgroundRepeat = "no-repeat";
          bandeau.style.backgroundSize = "cover";
        }
        break;
    }
  });
}
fetchPicture();

// --- fonction qui permet de récupérer les informations
async function fetchInfo() {
  // on récupère les éléments selon l'ID dans l'API
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${keyAPI}&language=fr-FR`
  );
  const serieResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${keyAPI}`);
  const dataMovie = await movieResponse.json();
  const dataSerie = await serieResponse.json();

  // on définit une variable pour faire une vérification des données (films ou séries)
  let responseData = {
    1: dataMovie,
    2: dataSerie,
  };

  switch (type) {
    case "movie":
      // on enveloppe les actions à réaliser dans une condition if pour que seul un élément apparaissent
      // affiche du film
      if (responseData[1].poster_path) {
        const poster = document.createElement("img");
        poster.src = "https://image.tmdb.org/t/p/w300" + dataMovie.poster_path; //pour récupérer l'image correspondant au film
        poster.classList.add("rounded", "shadow-lg", "border", "border-light");
        affiche.appendChild(poster);
      }
      // titre du film
      if (responseData[1].title) {
        const title = document.createElement("h1");
        title.innerText = dataMovie.title;
        info.appendChild(title);
      }
      // data de réalisation du film
      if (responseData[1].release_date) {
        const release_date = document.createElement("p");
        release_date.innerText = dataMovie.release_date;
        info.appendChild(release_date);
      }
      // durée du film
      if (responseData[1].runtime) {
        const runtime = document.createElement("p");
        runtime.innerText = dataMovie.runtime;
        info.appendChild(runtime);
      }
      // les genres du films
      if (responseData[1].genres) {
        // Créer un tableau pour stocker les noms des genres
        const genreNames = [];
        // Boucle à travers chaque élément du tableau genres
        dataMovie.genres.forEach(function (genreItem) {
          // Ajouter le nom du genre actuel au tableau
          genreNames.push(genreItem.name);
        });
        // Créer un paragraphe pour afficher les noms des genres
        const genreParagraph = document.createElement("p");
        // Définir le texte du paragraphe en joignant les noms des genres avec des virgules
        genreParagraph.innerText = "Genre: " + genreNames.join(", ");
        // Ajouter le paragraphe à l'élément parent (info dans votre cas)
        info.appendChild(genreParagraph);
      }
      // Langue original du film
      if (responseData[1].original_language) {
        const original_language = document.createElement("p");
        original_language.innerText = "Langue original : " + dataMovie.original_language;
        original_language.classList.add("pe-2");
        language.appendChild(original_language);
      }
      // pays original du film
      if (responseData[1].origin_country) {
        const origin_country = document.createElement("p");
        origin_country.innerText = "Pays d'origine : " + dataMovie.origin_country;
        origin_country.classList.add("px-2");
        language.appendChild(origin_country);
      }
      // résumé du film
      if (responseData[1].overview) {
        const overview = document.createElement("p");
        overview.innerText = dataMovie.overview;
        pitch.appendChild(overview);
      }
      // stats du film
      if (responseData[1].popularity) {
        const stats = document.createElement("p");
        stats.innerHTML = `
            <div class="d-flex justify-content-center">
              <p class="px-4">Popularité : ${dataMovie.popularity}</p> 
              <p class="px-4">Nombre de votes : ${dataMovie.vote_average}</p>
              <p class="px-4">Moyenne des votes : ${dataMovie.vote_count}</p>
            </div>
            `;
        stats.classList.add("text-center", "px-3");
        statistic.appendChild(stats);
      }
      // budget du film
      if (responseData[1].budget) {
        const budget = document.createElement("p");
        budget.innerHTML = `
          <div class="d-flex justify-content-center">
            <p class="px-4">Budget du film : ${+dataMovie.budget}</p>
            <p class="px-4">Revenue du film : ${+dataMovie.budget}</p>
          </div>
          `;
        statistic.appendChild(budget);
      }
      // maison de production du film
      if (responseData[1].budget) {
        const product_companies = [];
        dataMovie.production_companies.forEach(function (producompaniesItem) {
          product_companies.push(producompaniesItem.name);
        });
        const production_companies = document.createElement("p");
        production_companies.innerText = "Producteur : " + product_companies.join(", ");
        production_companies.classList.add("px-2");
        language.appendChild(production_companies);
      }
      break;

    case "tv":
      // on enveloppe les actions à réaliser dans une condition if pour que seul un élément apparaissent
      // affiche de la série
      if (responseData[2].poster_path) {
        const poster_path = document.createElement("img");
        poster_path.src = "https://image.tmdb.org/t/p/w300" + dataSerie.poster_path;
        poster.classList.add("rounded", "shadow-lg", "border", "border-light");
        affiche.appendChild(poster_path);
      }
      // titre de la série
      if (responseData[2].name) {
        const name = document.createElement("h1");
        name.innerText = dataSerie.name;
        info.appendChild(name);
      }
      // première diffusion
      if (responseData[2].first_air_date) {
        const first_air_date = document.createElement("p");
        first_air_date.innerText = dataSerie.first_air_date;
        info.appendChild(first_air_date);
      }
      // durée d'un épisode
      if (responseData[2].runtime) {
        const runtime = document.createElement("p");
        runtime.innerText = dataSerie.runtime;
        info.appendChild(runtime);
      }
      // les genres du films
      if (responseData[2].genres) {
        // Créer un tableau pour stocker les noms des genres
        const genreNames = [];
        // Boucle à travers chaque élément du tableau genres
        dataSerie.genres.forEach(function (genreItem) {
          // Ajouter le nom du genre actuel au tableau
          genreNames.push(genreItem.name);
        });
        // Créer un paragraphe pour afficher les noms des genres
        const genreParagraph = document.createElement("p");
        // Définir le texte du paragraphe en joignant les noms des genres avec des virgules
        genreParagraph.innerText = "Genre: " + genreNames.join(", ");
        // Ajouter le paragraphe à l'élément parent (info dans votre cas)
        info.appendChild(genreParagraph);
      }
      // Langue original du film
      if (responseData[2].original_language) {
        const original_language = document.createElement("p");
        original_language.innerText = "Langue original : " + dataSerie.original_language;
        original_language.classList.add("pe-2");
        language.appendChild(original_language);
      }
      // pays original du film
      if (responseData[2].origin_country) {
        const origin_country = document.createElement("p");
        origin_country.innerText = "Pays d'origine : " + dataSerie.origin_country;
        origin_country.classList.add("px-2");
        language.appendChild(origin_country);
      }
      // résumé du film
      if (responseData[2].overview) {
        const overview = document.createElement("p");
        overview.innerText = dataSerie.overview;
        pitch.appendChild(overview);
      }
      // stats du film
      if (responseData[2].popularity) {
        const stats = document.createElement("p");
        stats.innerHTML = `
            <div class="d-flex justify-content-center">
              <p class="px-4">Popularité : ${dataSerie.popularity}</p> 
              <p class="px-4">Nombre de votes : ${dataSerie.vote_average}</p>
              <p class="px-4">Moyenne des votes : ${dataSerie.vote_count}</p>
            </div>
            `;
        stats.classList.add("text-center", "px-3");
        statistic.appendChild(stats);
      }
      // noombre de saison et de d'épisode
      if (responseData[2].number_of_episodes) {
        const episode = document.createElement("p");
        episode.innerHTML = `
          <div class="d-flex justify-content-center">
            <p class="px-4">Nb d'épisodes : ${+dataSerie.number_of_episodes}</p>
            <p class="px-4">Nb de saisons : ${+dataSerie.number_of_seasons}</p>
          </div>
          `;
        statistic.appendChild(episode);
      }
      // maison de production du film
      if (responseData[2].budget) {
        const product_companies = [];
        dataSerie.production_companies.forEach(function (producompaniesItem) {
          product_companies.push(producompaniesItem.name);
        });
        const production_companies = document.createElement("p");
        production_companies.innerText = "Producteur : " + product_companies.join(", ");
        production_companies.classList.add("px-2");
        language.appendChild(production_companies);
      }
      break;
  }
}
fetchInfo();

// --- fonction qui permet de récupérer le cast
async function fetchCast() {
  switch (type) {
    case "movie":
      await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${keyAPI}`)
        .then((response) => response.json())
        .then((data) => {
          const list = data.cast;

          list.forEach((actor) => {
            const card = document.createElement("div");
            card.classList.add("card", "m-3", "w-25");

            const actorPicture = document.createElement("img");
            actorPicture.src =
              actor.profile_path !== null
                ? "https://image.tmdb.org/t/p/w200" + actor.profile_path
                : "../assets/img/user-astronaut-solid.svg";
            actorPicture.classList.add("card-img-top");

            const actorName = document.createElement("p");
            actorName.innerText = actor.name;
            actorName.classList.add("text-center");

            card.appendChild(actorPicture);
            card.appendChild(actorName);

            cast.appendChild(card);
          });
        })
        .catch((error) => console.error(error));
      break;

    case "tv":
      await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${keyAPI}`)
        .then((response) => response.json())
        .then((data) => {
          const list = data.cast;

          list.forEach((actor) => {
            const card = document.createElement("div");
            card.classList.add("card", "m-3", "w-25");

            const actorPicture = document.createElement("img");
            actorPicture.src =
              actor.profile_path !== null
                ? "https://image.tmdb.org/t/p/w200" + actor.profile_path
                : "../assets/img/user-astronaut-solid.svg";
            actorPicture.classList.add("card-img-top");

            const actorName = document.createElement("p");
            actorName.innerText = actor.name;
            actorName.classList.add("text-center");

            card.appendChild(actorPicture);
            card.appendChild(actorName);

            cast.appendChild(card);
          });
        })
        .catch((error) => console.error(error));
      break;
  }
}
fetchCast();

// --- fonction qui permet de récupérer de manière random les films similaires
function getRandomElements(arr, n) {
  // Vérifier si n est valide
  if (n > arr.length) {
    throw new Error("n doit être inférieur ou égal à la longueur du tableau");
  }

  // Créer une copie du tableau d'origine
  const shuffledArr = [...arr];

  // Mélanger le tableau en utilisant l'algorithme de Fisher-Yates
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  // Renvoie les n premiers éléments du tableau mélangé
  return shuffledArr.slice(0, n);
}

// --- fonciton qui permet de récupérer les titres similaires
async function fetchMovieSimilar() {
  // on itère dans les clés pour vérifier si on est dans l'un ou dans l'autre
  switch (type) {
    case "movie":
      await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${keyAPI}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const list = data.results;

          //Crée un tableau d'indices aléatoires pour sélectionner 10 éléments max
          const randomIndices = getRandomElements(list, 9);
          console.log(randomIndices);

          //crée les cards dans lesquelles les films vont apparaitre
          randomIndices.forEach((random) => {
            const card = document.createElement("div");
            card.classList.add("card", "m-3", "w-25");

            // Crée un élément image pour afficher le poster du film similaire
            const poster = document.createElement("img");
            poster.src =
              random.backdrop_path !== null
                ? "https://image.tmdb.org/t/p/w200" + random.backdrop_path
                : "../assets/img/user-astronaut-solid.svg";
            poster.classList.add("card-img-top");
            card.appendChild(poster);

            // Crée un élément pour afficher le nom du film similaire
            const nameSimilar = random.title;
            const nameSimilarPath = document.createElement("p");
            nameSimilarPath.textContent = nameSimilar;
            nameSimilarPath.classList.add("text-center");
            card.appendChild(nameSimilarPath);

            // Ajoute la carte à la div "suggestions" dans le HTML
            suggestions.appendChild(card);
          });
        })
        .catch((error) => console.error(error));
      break;

    case "tv":
      await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${keyAPI}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const list = data.results;

          //Crée un tableau d'indices aléatoires pour sélectionner 10 éléments max
          const randomIndices = getRandomElements(list, 9);
          console.log(randomIndices);

          //crée les cards dans lesquelles les films vont apparaitre
          randomIndices.forEach((random) => {
            const card = document.createElement("div");
            card.classList.add("card", "m-3", "w-25");

            // Crée un élément image pour afficher le poster du film similaire
            const poster = document.createElement("img");
            poster.src =
              random.backdrop_path !== null
                ? "https://image.tmdb.org/t/p/w200" + random.backdrop_path
                : "../assets/img/user-astronaut-solid.svg";
            poster.classList.add("card-img-top");
            card.appendChild(poster);

            // Crée un élément pour afficher le nom du film similaire
            const nameSimilar = random.title;
            const nameSimilarPath = document.createElement("p");
            nameSimilarPath.textContent = nameSimilar;
            nameSimilarPath.classList.add("text-center");
            card.appendChild(nameSimilarPath);

            // Ajoute la carte à la div "suggestions" dans le HTML
            suggestions.appendChild(card);
          });
        })
        .catch((error) => console.error(error));
      break;
  }
}
fetchMovieSimilar();

// --- fonction qui permet de récupérer les commentaires
async function fetchReview() {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${keyAPI}`
  );
  const serieResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${keyAPI}`
  );
  const dataMovie = await movieResponse.json();
  const dataSerie = await serieResponse.json();

  let responseData = {
    1: dataMovie,
    2: dataSerie,
  };

  // on demande à vérifier plusieurs clés dans le switch
  let keyToCheck = ["1", "2"];

  // on itère dans les clés pour vérifier si on est dans l'un ou dans l'autre
  keyToCheck.forEach((key) => {
    switch (key) {
      case "1":
        // on enveloppe les actions à réaliser dans une condition if pour que seul un élément apparaissent
        // affiche du film
        if (responseData[1].results) {
          const commit = [];
          dataMovie.results.forEach(function (authors) {
            commit.push(authors.author_details);
          });
          commit.forEach(function (author, index) {
            const card = document.createElement("div");
            card.classList.add("card", "m-4");

            const userName = author.username;
            const userNameParagraph = document.createElement("p");
            userNameParagraph.textContent = userName;
            userNameParagraph.classList.add(
              "text-center",
              "p-3",
              "bg-warning-subtle",
              "rounded",
              "fs-4"
            );

            const commentParagraph = document.createElement("p");
            commentParagraph.textContent = dataMovie.results[index].content;
            commentParagraph.classList.add("mx-3");

            const dateOfCreation = document.createElement("p");
            dateOfCreation.textContent = dataMovie.results[index].created_at;
            dateOfCreation.classList.add("text-center");

            card.appendChild(userNameParagraph);
            card.appendChild(commentParagraph);
            card.appendChild(dateOfCreation);
            rate.appendChild(card);
          });
        }
        break;

      case "2":
        if (responseData[2].results) {
          const commit = [];
          dataSerie.results.forEach(function (authors) {
            commit.push(authors.author_details);
          });
          commit.forEach(function (author, index) {
            const card = document.createElement("div");
            card.classList.add("card", "m-4");

            const userName = author.username;
            const userNameParagraph = document.createElement("p");
            userNameParagraph.textContent = userName;
            userNameParagraph.classList.add(
              "text-center",
              "p-3",
              "bg-warning-subtle",
              "rounded",
              "fs-4"
            );

            const commentParagraph = document.createElement("p");
            commentParagraph.textContent = dataSerie.results[index].content;
            commentParagraph.classList.add("mx-3");

            const dateOfCreation = document.createElement("p");
            dateOfCreation.textContent = dataSerie.results[index].created_at;
            dateOfCreation.classList.add("text-center");

            card.appendChild(userNameParagraph);
            card.appendChild(commentParagraph);
            card.appendChild(dateOfCreation);
            rate.appendChild(card);
          });
        }
        break;
    }
  });
}
fetchReview();

//----- AJOUT ET SUPPRESION DE COMMENTAIRES POUR L'UITLISATEUR
const letCommitGet = document.getElementById("letCommitGet");
const boutonPost = document.getElementById("btnPost");
const textGet = document.getElementById("commentary");
const nameUserGet = document.getElementById("user");

// Vérifie s'il existe déjà des commentaires dans le localStorage
let commentaires = JSON.parse(localStorage.getItem("commentaires")) || [];

boutonPost.addEventListener("click", function () {
  const text = textGet.value;
  commentaires.push(text); // Ajoute le nouveau commentaire au tableau
  localStorage.setItem("commentaires", JSON.stringify(commentaires)); // Stocke le tableau de commentaires dans le localStorage

  const pseudo = user.value;

  const card = document.createElement("div");
  card.classList.add("card", "m-4");

  const nameUser = document.createElement("p");
  nameUser.innerHTML = pseudo;
  nameUser.classList.add("text-center", "mb-3", "p-3", "bg-warning-subtle", "rounded");
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
    localStorage.removeItem("commentaires"); // pour remove il faut mettre uniquement la clé, pas la valeur
    card.remove();
  });
});