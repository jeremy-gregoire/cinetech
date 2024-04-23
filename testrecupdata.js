const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";
const options = { method: "GET", headers: { accept: "application/json" } };

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
    element.innerHTML = `Titre du film : <a href="${movie.url}">${movie.title}</a> <br /> Id du film : ${movie.id}`;
    container.appendChild(element);
  });

  const parseData = JSON.stringify(data);
  localStorage.setItem("movieData", parseData);
  console.log("donnée sotcké dans le local storage");
}
fetchData();
