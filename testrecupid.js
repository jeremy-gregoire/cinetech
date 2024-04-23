const parseData = localStorage.getItem("movieData");

const données = JSON.parse(parseData);
const dataID = données;

const presentation = document.getElementById("recupid");
const affiche = document.createElement("div");
affiche.innerHTML = JSON.stringify.dataID;
presentation.appendChild(affiche);