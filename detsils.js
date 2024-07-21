const apiKey = "053d4f0cd76274aec5e9d4e1b3d83c37";
const url = new URLSearchParams(window.location.search);
const id = url.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
  );
  const movie = await response.json();

  const newMovie = document.querySelector(".movieDetails");
  newMovie.innerHTML = ` 
        <div class="img"
        style="background-image:url(https://image.tmdb.org/t/p/original${
          movie.poster_path
        })"
        >
        
    <div class="play-button"> <img src='./images/Play.svg'></div>
    </div class ='page-wrapper'>
        <div>   <div class="page">
                <div class="para">
                    <div class="movie-details">
                        <h2>${movie.title} • ${new Date(
    movie.release_date
  ).getFullYear()} • PG-13 • 2h 10m</h2>
                        ${movie.genres
                          .map((genre) => `<button>${genre.name}</button>`)
                          .join("")}
                    </div>
                    <h3>${movie.overview}</h3>
                <div class = 'class-para'>
                    <p>Director: <span>Joseph Kosinski</span></p>
                    <p>Writers: <span> Jim Cash, Jack Epps Jr, Peter Craig</span> </p>
                    <p> Stars: <span> Tom Cruise, Jennifer Connelly, Miles Teller</span></p></div>
                </div>
                <div class="top-rated">
                    <button>Top rated movie #${movie.popularity}</button>
                    <span>Awards 9 nominations</span>
                    <img src="./images/Expand Arrow.svg" alt="img">
                </div>
            </div></div>

        <div class="page-img">
            <div class="page-two">
                <div class="pager ">
                    <img src="./images/Star.svg" alt="images">
                    <p><span>${movie.vote_average}</span>| ${
    movie.vote_count
  }</p>
                </div>

            <div class = 'button-container'>
                <button class="showtimes-button">
                    <div class="icon-container">
                        <img src="./images/Two Tickets.svg" alt="images">
                    </div>
                    See Showtimes
                </button>
                <button class="watch-button">
                    <img src="./images/List.svg" alt="images">
                    <p>More watch options</p>
                </button>
                    
                <img class="best-image" src="https://image.tmdb.org/t/p/original${
                  movie.backdrop_path
                }" alt="Backdrop Image">
</div>
            </div></div>
        </div>`;

  const playButton = document.querySelector(".play-button");
  const trailerKey = movie?.videos?.results?.[0]?.key;
  playButton.addEventListener("click", () => {
    window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
  });
});

const goBack = () => {
  window.history.back();
};
