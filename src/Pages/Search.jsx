import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import "../css/Style.css";

function Search() {
  const { myList, handleAddToList } = useOutletContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") return;

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const validMovies = data.results.filter((movie) => movie.poster_path);
        setSearchResults(validMovies);
      })
      .catch((err) => console.error("Error searching movies:", err));
  }, [query]);

  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "50px",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        backgroundColor: "#000000",
        minHeight: "100vh",
      }}
    >
      <h2 className="section-title">
        Search Results for: <span style={{ color: "#e50914" }}>"{query}"</span>
      </h2>

      {searchResults.length === 0 ? (
        <p style={{ color: "#737373", fontSize: "1.2rem", textAlign: "left" }}>
          No movies found matching your search.
        </p>
      ) : (
        <div className="movie-grid-page">
          {searchResults.map((movie) => {
            const isAdded = myList.some(
              (savedItem) => savedItem.title === movie.title,
            );

            return (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-hover-overlay">
                  <div className="movie-overlay-title">{movie.title}</div>
                  <div className="movie-metadata">
                    {movie.vote_average > 0 && (
                      <div className="movie-rating">
                        <i className="fas fa-star"></i>{" "}
                        {movie.vote_average.toFixed(1)}/10
                      </div>
                    )}
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
                          rating: `${movie.vote_average.toFixed(1)}/10`,
                          genre: "Search Result",
                          link: `/movie/${movie.id}`,
                        })
                      }
                      style={{
                        backgroundColor: isAdded ? "#333" : "transparent",
                        color: isAdded ? "white" : "#ccc",
                      }}
                    >
                      {isAdded ? "Remove" : "+ Add List"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;