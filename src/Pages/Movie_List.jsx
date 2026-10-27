import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Style.css";

function Movie_List() {
  const [movies, setMovies] = useState([]);

  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myMovieList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.results));
  }, []);

  const handleAddToList = (movie) => {
    const isAlreadyAdded = myList.some((item) => item.id === movie.id);
    let updatedList;

    if (isAlreadyAdded) {
      updatedList = myList.filter((item) => item.id !== movie.id);
    } else {
      updatedList = [...myList, movie];
    }

    setMyList(updatedList);
    localStorage.setItem("myMovieList", JSON.stringify(updatedList));
  };

  return (
    <div
      style={{
        paddingTop: "100px",
        paddingBottom: "50px",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        backgroundColor: "#000000",
        minHeight: "100vh",
      }}
    >
      <h2 className="section-title">All Movies</h2>

      <div className="movie-grid-page">
        {movies.map((movie) => {
          const isAdded = myList.some((savedItem) => savedItem.id === movie.id);
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "";

          return (
            <div className="movie-card" key={movie.id}>
              <img src={posterUrl} alt={movie.title} />
              <div className="movie-hover-overlay">
                <div className="movie-overlay-title">{movie.title}</div>
                <div className="movie-metadata">
                  {movie.vote_average ? (
                    <div className="movie-rating">
                      <i className="fas fa-star"></i>{" "}
                      {movie.vote_average.toFixed(1)}
                    </div>
                  ) : null}
                  <span>Movie</span>
                </div>
                <div className="overlay-buttons">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="overlay-watch-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ▶ Watch Now
                  </Link>
                  <button
                    className="overlay-add-btn"
                    onClick={() => handleAddToList(movie)}
                    style={{
                      backgroundColor: isAdded ? "#555" : "transparent",
                      color: isAdded ? "white" : "#ccc",
                    }}
                  >
                    {isAdded ? "✓ Added" : "+ Add List"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movie_List;