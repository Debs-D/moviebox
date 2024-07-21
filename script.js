"use strict";

// Initialize variables
const initializeVariables = () => {
  const form = document.querySelector(".search-btn");
  const movie = document.querySelector(".movieContainer");
  const input = form.querySelector("input");
  const searchResults = document.querySelector(".search-result");
  const ResultContainer = document.querySelector(".ResultContainer");
  const pagination = document.querySelector(".pagination_section");

  return { form, movie, input, searchResults, ResultContainer, pagination };
};

// Fetch image function
const fetchImage = async (url = "movie/popular", query) => {
  const apiKey = "053d4f0cd76274aec5e9d4e1b3d83c37";

  const { movie, ResultContainer, pagination } = initializeVariables();
  movie.innerHTML = "";
  pagination.innerHTML = ""; // Clear previous pagination

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${url}?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    const movies = data.results;

    // Ensure we only work with 36 movies
    const limitedMovies = movies.slice(0, 36);

    const movieCards = limitedMovies.map((movie) => {
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
      movieCard.onclick = function () {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };

      return movieCard;
    });

    // Pagination logic
    const pageSize = 12; // Set the number of cards per page
    const totalPages = Math.ceil(movieCards.length / pageSize);

    const displayCards = (cards) => {
      movie.innerHTML = "";
      cards.forEach((card) => movie.appendChild(card));
    };

    const showPage = (pageIndex) => {
      if (pageIndex < 0 || pageIndex >= totalPages) return;
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex + pageSize;
      const currentCards = movieCards.slice(startIndex, endIndex);
      displayCards(currentCards);

      // Highlight the current page number
      const paginationLinks = pagination.querySelectorAll(".pagination-link");
      paginationLinks.forEach((link) => link.classList.remove("active"));
      if (pageIndex >= 0 && pageIndex < totalPages) {
        paginationLinks[pageIndex + 1].classList.add("active"); // pageIndex + 1 because first link is "prev"
      }
    };

    // Create pagination links
    const createPaginationLinks = () => {
      const prevLink = document.createElement("a");
      prevLink.href = "#";
      prevLink.classList.add("pagination-link");
      prevLink.setAttribute("data-page", "prev");
      prevLink.innerHTML = "<< Previous";
      pagination.appendChild(prevLink);

      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.classList.add("pagination-link");
        pageLink.setAttribute("data-page", i.toString());
        pageLink.innerHTML = i;
        pagination.appendChild(pageLink);
      }

      const nextLink = document.createElement("a");
      nextLink.href = "#";
      nextLink.classList.add("pagination-link");
      nextLink.setAttribute("data-page", "next");
      nextLink.innerHTML = "Next >>";
      pagination.appendChild(nextLink);
    };

    createPaginationLinks();

    // Display the first page initially
    let currentPage = 0;
    showPage(currentPage);

    // Pagination event listeners
    const paginationLinks = pagination.querySelectorAll(".pagination-link");
    paginationLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = link.getAttribute("data-page");
        if (page === "prev") {
          if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
          }
        } else if (page === "next") {
          if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
          }
        } else {
          const pageIndex = parseInt(page) - 1;
          currentPage = pageIndex;
          showPage(currentPage);
        }
      });
    });

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

// Initial call to fetch popular movies
fetchImage();

document.getElementById("menu-icon").addEventListener("click", function () {
  var menuList = document.getElementById("menu-list");
  if (menuList.classList.contains("hidden")) {
    menuList.classList.remove("hidden");
  } else {
    menuList.classList.add("hidden");
  }
});
