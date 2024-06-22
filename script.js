'use strict'

'use strict';

// declaring all the variables i will be using
//I Select the form element with the class 'search-btn' and store it in the 'form' variable
const form = document.querySelector('.search-btn');
// Selected the element with the class 'movieContainer' and store it in the 'movie' variable
const movie = document.querySelector('.movieContainer');
// Select the input element within the 'form' and store it in the 'input' variable
const input = form.querySelector('input');
// Select the element with the class 'search-result' and store it in the 'searchResults' variable
const searchResults = document.querySelector('.search-result');
// Select the element with the class 'searchResultContainer' and store it in the 'ResultContainer' variable
const ResultContainer = document.querySelector('.ResultContainer');


// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value;
  const apiKey = '053d4f0cd76274aec5e9d4e1b3d83c37'; 
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  // Fetch data using Promises
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;

      // Clear previous results
      searchResults.innerHTML = '';
      movie.innerHTML = '';https://meet.google.com/bhp-kgmt-pbf

      // Iterate over the movies and create movie cards
      movies.forEach((movie) => {
        const { poster_path, title, release_date, vote_average } = movie;

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movieCard');

        const posterUrl = poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+poster';

        movieContainer.innerHTML = `
          <img src="${posterUrl}" alt="${title}" class="moviePoster">
          <div class="movieTitle">${title}</div>
          <div class="rating">
            <span class="rate">${vote_average}</span>
            <span class="year">${release_date ? release_date.slice(0, 4) : ''}</span>
          </div>
        `;

        searchResults.appendChild(movieContainer);
      });

      // Update header with search query
      let header = ResultContainer.querySelector('header');
      if (!header) {
        header = document.createElement('header');
        header.innerHTML = `<h1>Search Results: ${query}</h1>`;
        ResultContainer.insertBefore(header, searchResults);
      } else {
        header.innerHTML = `<h1>Search Results: ${query}</h1>`;
      }
    })
    .catch(error => {
      console.error(error);
    });
});


/*
// declaring all the variables i will be using
//I Select the form element with the class 'search-btn' and store it in the 'form' variable
const form = document.querySelector('.search-btn');
// Selected the element with the class 'movieContainer' and store it in the 'movie' variable
const movie = document.querySelector('.movieContainer');
// Select the input element within the 'form' and store it in the 'input' variable
const input = form.querySelector('input');
// Select the element with the class 'search-result' and store it in the 'searchResults' variable
const searchResults = document.querySelector('.search-result');
// Select the element with the class 'searchResultContainer' and store it in the 'ResultContainer' variable
const ResultContainer = document.querySelector('.ResultContainer');


/*
// Add event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value;
  const apiKey = '053d4f0cd76274aec5e9d4e1b3d83c37'; 
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${'053d4f0cd76274aec5e9d4e1b3d83c37'}&query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const movies = data.results;

    searchResults.innerHTML = '';
    movie.innerHTML = '';


    movies.forEach((movie) => {
      const { poster_path, title, release_date, vote_average } = movie;

      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movieCard');

      const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+poster';

      movieContainer.innerHTML = `
        <img src="${posterUrl}" alt="${title}" class="moviePoster">
        <div class="movieTitle">${title}</div>
        <div class="rating">
          <span class="rate">${vote_average}</span>
          <span class="year">${release_date ? release_date.slice(0, 4) : ''}</span>
        </div>
      `;

      searchResults.appendChild(movieContainer);
    });

    const header = ResultContainer.querySelector('header');
    if (!header) {
      const header = document.createElement('header');
      header.innerHTML = `<h1>Search Results: ${query}</h1>`;
      searchResultContainer.insertBefore(header, searchResults);
    } else {
      header.innerHTML = `<h1>Search Results: ${query}</h1>`;
    }
  } catch (error) {
    console.error(error);
  }

});
*/