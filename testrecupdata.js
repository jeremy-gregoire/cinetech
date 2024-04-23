const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";
const options = { 
  method: "GET", // méthode GET --> envoyer au serveur 
  headers: { 
    accept: "application/json", // dire que je prend du JSON
    Authorization :"",
  } }; 
// le authorized --> dire que j'ai cette clé et qu'on est dans les clous -->

async function fetchData() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${keyAPI}`);
  const data = await response.json();
  console.log(data);
  const movies = data.results;
  movies.forEach((movie) => {
    console.log(movie.title);
    console.log(movie.overview);
    console.log(movie.id);

    const container = document.getElementById("dataAPI");
    const element = document.createElement("div");
    const pageDetails = "./details.html";
    //element.innerHTML = `<a href="${movie.url} ?id" target="_blank">${movie.title} ${movie.id}</a>`;
    element.innerHTML = `<a href="${pageDetails}?id=${movie.id}" target="_blank">${movie.title} : ${movie.id}</a>`;

    container.appendChild(element);

    localStorage.setItem("movieData", JSON.stringify(data)); //permet de mettre les données dans le locol storage
  });
}
fetchData();