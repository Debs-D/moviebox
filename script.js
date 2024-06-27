"use strict";

// declaring all the variables i will be using
//I Select the form element with the class 'search-btn' and store it in the 'form' variable
const form = document.querySelector(".search-btn");
// Selected the element with the class 'movieContainer' and store it in the 'movie' variable
const movie = document.querySelector(".movieContainer");
// Select the input element within the 'form' and store it in the 'input' variable
const input = form.querySelector("input");
// Select the element with the class 'search-result' and store it in the 'searchResults' variable
const searchResults = document.querySelector(".search-result");
// Select the element with the class 'searchResultContainer' and store it in the 'ResultContainer' variable
const ResultContainer = document.querySelector(".ResultContainer");

// Add event listener for searching the movies
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value;
  fetchImage("search/movie", query);
});

const fetchImage = (url = "movie/popular", query) => {
  //
  const apiKey = "053d4f0cd76274aec5e9d4e1b3d83c37";
  const movieContainer = document.querySelector(".movieContainer");
  movieContainer.innerHTML = ''

  // https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}
  fetch(`https://api.themoviedb.org/3/${url}?api_key=${apiKey}&query=${query}`)
  .then((response) => response.json())
  .then((data) => {

    
    // Log the data to the console for debugging
    const movies = data.results;

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");

      const moviePoster = document.createElement("img");
      moviePoster.classList.add("moviePoster");
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      moviePoster.alt = movie.title;

      const movieTitle = document.createElement("div");
      movieTitle.classList.add("movieTitle");
      movieTitle.innerText = movie.title;

      const rating = document.createElement("div");
      rating.classList.add("rating");

      const rate = document.createElement("span");
      rate.classList.add("rate");
      rate.innerText = `${movie.vote_average}/10`;

      const year = document.createElement("span");
      year.classList.add("year");
      year.innerText = movie.release_date.split("-")[0];

      rating.appendChild(rate);
      rating.appendChild(year);

      movieCard.appendChild(moviePoster);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(rating);

      movieContainer.appendChild(movieCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
};
