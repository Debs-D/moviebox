"use strict";

// Initialize variables
const initializeVariables = () => {
  const form = document.querySelector(".search-btn");
  const movie = document.querySelector(".movieContainer");
  const input = form.querySelector("input");
  const searchResults = document.querySelector(".search-result");
  const ResultContainer = document.querySelector(".ResultContainer");

  return { form, movie, input, searchResults, ResultContainer };
};

// Fetch image function
const fetchImage = async (url = "movie/popular", query) => {
  const apiKey = "053d4f0cd76274aec5e9d4e1b3d83c37";

  const { movie, searchResults, ResultContainer } = initializeVariables();
  movie.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${url}?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    const movies = data.results;

    const movieCards = movies.map((movie) => {
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+poster";

      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");

      movieCard.innerHTML = `
      
        <img class="moviePoster" src="${posterUrl}" alt="${movie.title}">
           <span class="year">
          ${movie.release_date.split("-")[0]}</span>
         <div class="movieTitle">${movie.title}</div>
           <div>
          <div class="rate">
          <img class="movie-rate"src="./images/IMDB.svg"  alt="Rating"> ${
            movie.vote_average
          }/10
          <img class="movie-rate"src="./images/Rotten Tomatoes.svg"  alt="Rating">
          </div>
       
           
        </div>
       
      `;

      movieCard.addEventListener("click", () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      });

      return movieCard;
    });

    movie.innerHTML = "";
    movieCards.forEach((card) => movie.appendChild(card));

    const header = ResultContainer.querySelector("header");
    if (header) {
      header.innerHTML = `<h1>Search Results: ${query}</h1>`;
    }
  } catch (error) {
    console.error(error);
  }
};

// Initialize variables and add event listener for the form
const { form, input } = initializeVariables();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value;
  fetchImage("search/movie", query);
});
