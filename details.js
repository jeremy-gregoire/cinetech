const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";
const options = {
  method: "GET", // méthode GET --> envoyer au serveur
  headers: {
    accept: "application/json", // dire que je prend du JSON
    Authorization: "",
  },
};

async function fetchData(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${keyAPI}` //je sais pas trop ce qu'est le .toString()
  );
  const data = await response.json();
  console.log(data);
  // console.log("les infos du films id :" + id + " sont : " + JSON.stringify(data));
  console.log("les infos du films id :" + id + " sont : ", data); // --> permet de farie apparaitre les infos dans la même ligne comme A. m'a montré

  //crée les éléments dans la page web
  const p = document.createElement("p");
  p.innerText = data.title;
  document.body.appendChild(p);
}

const params = new URLSearchParams(window.location.search);
console.log(params.keys());
const id = params.get("id");
console.log(`L'ID dans l'URL est:`, id);
fetchData(id);
//const infos = await fetchData(param1);
console.log("Les infos du films :" + id + " sont : ");

//const iddufilm = document.getElementById("recupid");
//const test = document.createElement("div");
//test.innerHTML = JSON.stringify(movieData);
//iddufilm.appendChild(test);

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

//getMovie(id).then((movie) => {
//const p = document.createElement("p");
//p.innerText = movie.title;
//document.body.appendChild(p);
//});
