const footer = document.createElement('footer');
footer.classList.add('bg-footer', 'p-5');

footer.innerHTML = `
  <div class='container d-flex flex-column gap-2'>
    <ul class='d-flex flex-sm-row flex-column align-items-center justify-content-sm-center py-4 list-unstyled gap-5 border-bottom border-dark'>
      <li>Accueil</li>
      <li>Films</li>
      <li>Séries</li>
      <li>Favoris</li>
    </ul>
    <p class='text-center'>&copy; 2024 Cinetech</p>
  </div>
`;

document.body.appendChild(footer);
