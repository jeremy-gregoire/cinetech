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
    element.innerHTML = `Titre du film : ${movie.title} <br/> Id du film : ${movie.id}`; //c'est ici pour faire en sorte que les titres de films soient des liens
    container.appendChild(element);
  });
}
fetchData();

// pour concaténer des élements lors de l'impression console / dans le web
const firstName = "John";
const lastName = "Doe";
const fullName = firstName.concat(" ", lastName);
console.log(fullName); // "John Doe"
//la concaténation ne marche qu'entre :
// chaine de caractère et nombre
// string et string
// nbr et nbr
