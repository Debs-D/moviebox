"use strict";

// Initialize variables
const initializeVariables = () => {
  const form = document.querySelector(".search-btn");
  const movieContainer = document.querySelector(".movieContainer");
  const input = form.querySelector("input");
  const resultContainer = document.querySelector(".ResultContainer");
  return { form, movieContainer, input, resultContainer };
};

// Fetch image function
const fetchImage = async (url = "movie/popular", query, startPage = 4) => {
  const apiKey = "053d4f0cd76274aec5e9d4e1b3d83c37";
  const { movieContainer, resultContainer } = initializeVariables();
  movieContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${url}?api_key=${apiKey}&query=${query}&page=${startPage}`
    );
    const data = await response.json();
    const movies = data.results;

    movies.forEach((movie) => {
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+poster";

      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");
      movieCard.innerHTML = `
        <img class="moviePoster" src="${posterUrl}" alt="${movie.title}">
        <span class="year">${movie.release_date.split("-")[0]}</span>
        <div class="movieTitle">${movie.title}</div>
        <div class="rate">
          <img class="movie-rate" src="./images/IMDB.svg" alt="Rating"> ${
            movie.vote_average
          }/10
          <img class="movie-rate" src="./images/Rotten Tomatoes.svg" alt="Rating">
        </div>
      `;
      movieCard.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };

      movieContainer.appendChild(movieCard);
    });

    const header = resultContainer.querySelector("header");
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

// Initial call to fetch popular movies from page 4
fetchImage();

document.getElementById("menu-icon").addEventListener("click", function () {
  var menuList = document.getElementById("menu-list");
  menuList.classList.toggle("hidden");
});
