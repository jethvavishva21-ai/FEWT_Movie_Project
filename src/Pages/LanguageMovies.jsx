import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import "../css/Style.css";

function LanguageMovies() {
  const { langCode } = useParams(); 
  const { myList, handleAddToList } = useOutletContext();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_original_language=${langCode}&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching language movies:", err));
  }, [langCode]); 

  const isMovieAdded = (title) => {
    return myList.some((item) => item.title === title);
  };

  return (
    <div style={{ padding: "100px 5vw 50px 5vw" }}>
      <h2 className="section-title" style={{ textTransform: "uppercase" }}>
        {langCode} Movies
      </h2>

      <div className="movie-grid-page">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-hover-overlay">
              <div className="movie-overlay-title">{movie.title}</div>
              <div className="movie-metadata">
                <div className="movie-rating">
                  <i className="fas fa-star"></i>{" "}
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  /10
                </div>
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
                  onClick={() =>
                    handleAddToList({
                      title: movie.title,
                      img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      rating: `${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10`,
                      genre: "Language Movie",
                      link: `/movie/${movie.id}`,
                    })
                  }
                  style={{
                    backgroundColor: isMovieAdded(movie.title)
                      ? "#555"
                      : "transparent",
                    color: isMovieAdded(movie.title) ? "white" : "#ccc",
                  }}
                >
                  {isMovieAdded(movie.title) ? "✓ Added" : "+ Add List"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageMovies;