// création de la barre de navigation
const nav = document.createElement("nav");
nav.innerHTML = `
    <div class="d-flex">
        <a class="nav-item m-2 ms-5 hover-style" href="../testrecupdata.html">HOME</a>
        <a class="nav-item m-2 hover-style" href="../pages/films.html">FILMS</a>
        <a class="nav-item m-2 hover-style" href="../pages/series.html">SERIES</a> 
        <a class="nav-item m-2 hover-style" href="../pages/favoris.html">FAVORIS</a>
    </div>
    <div class="m-2 me-5">
        <div class="input-group">
            <input type="search" class="form-control" placeholder="Rechercher" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
    </div>
`;
//stylisation rapide
nav.classList.add("navbar", "bg-color", "sticky-top", "justify-content-between", "align-item-center");
document.body.appendChild(nav);

// Insérer la barre de navigation juste avant le premier élément du corps de la page
const firstElement = document.body.firstChild;
document.body.insertBefore(nav, firstElement);
