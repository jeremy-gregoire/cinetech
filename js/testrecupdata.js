const keyAPI = "8c4b867188ee47a1d4e40854b27391ec";
const options = {
  method: "GET", // méthode GET --> envoyer au serveur
  headers: {
    accept: "application/json", // dire que je prend du JSON
    Authorization: "",
  },
};
// le authorized --> dire que j'ai cette clé et qu'on est dans les clous -->

async function fetchData() {
  await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}`)
      .then((response) => response.json())
      .then((data) => data.results),
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${keyAPI}`)
      .then((response) => response.json())
      .then((data) => data.results),
  ])
    .then(([movies, series]) => {
      const contents = [...movies, ...series];
      const linkContainer = document.querySelector("#linkContainer");
      const ul = document.createElement("ul");
      linkContainer.appendChild(ul);

      contents.forEach((content) => {
        const li = document.createElement("li");
        ul.appendChild(li);

        const a = document.createElement("a");
        a.href = `pages/details.html?id=${content.id}&type=${content.title ? "movie" : "tv"}`;
        a.innerText = content.title || content.name;
        li.appendChild(a);
      });
    })
    .catch((error) => console.error(error));
}
fetchData();
