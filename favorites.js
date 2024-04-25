const TOKEN = '';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

const FAVORITES = [
  { title: 'Test 1' },
  { title: 'Test 2' },
  { title: 'Test 3' },
  { title: 'Test 4' },
  { title: 'Test 5' },
  { title: 'Test 6' },
];

await Promise.all([
  fetch('https://api.themoviedb.org/3/account//favorite/movies', options),
  fetch('https://api.themoviedb.org/3/account//favorite/tv', options),
]);
