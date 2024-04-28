import { getMoviesAndSeriesAutocompletion } from "../../assets/scripts/main.js";

// Creates the navbar
const nav = document.createElement("nav");
nav.innerHTML = `
<nav class="container-fluid navbar navbar-expand-lg">

  <div class="container-fluid d-flex flex-row-reverse">

    <div class="ms-3 d-flex justify-content-center">
      
      <div class="me-2">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      </div>
        

      <form class="input-group">
        <div class="input-group">
          <input type="text" id="searchBar" list="autoCompletionList" placeholder="Rechercher" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
          <button class="btn btn-outline-secondary border-0 me-3" type="button" id="btnSearch"><img src="../../assets/img/search.svg"></span></button>
          <datalist id="autoCompletionList"></datalist>
        </div>
      </form>

  </div>

      <div class="collapse navbar-collapse ms-2" id="navbarToggler">
        <ul class="navbar-nav me-auto text-center mb-lg-0">
          <li class="nav-item">
            <a class="nav-item m-2 hover-style" href="${window.location.origin}/index.html">ACCUEIL</a>
          </li>
          <li class="nav-item">
            <a class="nav-item m-2 hover-style" href="${window.location.origin}/src/pages/movies.html">FILMS</a>
          </li>
          <li class="nav-item">
            <a class="nav-item m-2 hover-style" href="${window.location.origin}/src/pages/series.html">SÉRIES</a>
          </li>
        </ul>
      </div>

  </div>
</nav>
`;

nav.classList.add(
  "navbar",
  "bg-color",
  "sticky-top",
  "justify-content-between",
  "align-item-center"
);
document.body.appendChild(nav);

// Inserts the navbar before the first element of the body page
const firstElement = document.body.firstChild;
document.body.insertBefore(nav, firstElement);

const searchBar = document.querySelector("#searchBar");
const btnSearch = document.querySelector("#btnSearch");
const autoCompletionList = document.querySelector("#autoCompletionList");

// Redirect to the details page with two parameters: id and type
const goToDetails = () => {
  let options = document.querySelectorAll("option[request-info]");
  let selected = null;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (searchBar.value === option.value) {
      selected = option;
      break;
    }
  }

  if (selected) {
    let valueParams = selected.getAttribute("request-info").split(":");
    window.location.href = `${window.location.origin}/src/pages/details.html?id=${valueParams[1]}&type=${valueParams[0]}`;
  } else {
    console.error("Your search is empty or not found!");
    return;
  }
};

// By default the search is empty
searchBar.value = "";

// Go to the details, when the enter key is pressed
searchBar.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") {
    return;
  }

  goToDetails();
});

// Go to the details, when the button is pressed
btnSearch.addEventListener("click", () => {
  goToDetails();
});

// Generates auto complition items
getMoviesAndSeriesAutocompletion().then((data) => {
  data.forEach((content) => {
    let type = content.release_date ? "movie" : "tv";

    const option = document.createElement("option");
    option.setAttribute("request-info", `${type}:${content.id}`);
    option.value = content.title || content.name;
    autoCompletionList.appendChild(option);
  });
});
