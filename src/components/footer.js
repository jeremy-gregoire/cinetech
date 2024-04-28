const footer = document.createElement('footer');
footer.classList.add('bg-footer', 'p-5');

footer.innerHTML = `
  <div class='container d-flex flex-column gap-2'>
    <ul class='d-flex flex-sm-row flex-column align-items-center justify-content-sm-center py-4 list-unstyled gap-5 border-bottom border-dark'>
      <li><a class="nav-item m-2 hover-style" href="${window.location.origin}/index.html">Accueil</a></li>
      <li><a class="nav-item m-2 hover-style" href="${window.location.origin}/src/pages/movies.html">Films</a></li>
      <li><a class="nav-item m-2 hover-style" href="${window.location.origin}/src/pages/series.html">Séries</a></li>
      <li class="nav-item m-2 hover-style">Favoris</li>
    </ul>
    <p class='text-center'>&copy; 2024 Cinetech</p>
  </div>
`;

document.body.appendChild(footer);
