import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Style.css";

function TV_show() {
  const [tvShows, setTvShows] = useState([]);

  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myMovieList");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/tv/on_the_air", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTvShows(res.results));
  }, []);

  const handleAddToList = (movie) => {
    const isAlreadyAdded = myList.some((item) => item.title === movie.title);
    let updatedList;

    if (isAlreadyAdded) {
      updatedList = myList.filter((item) => item.title !== movie.title);
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
      <h2 className="section-title">All TV Shows</h2>

      <div className="movie-grid-page">
        {tvShows.map((show) => {
          const isAdded = myList.some((savedItem) => savedItem.id === show.id);
          const posterUrl = show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : show.img;

          return (
            <div className="movie-card" key={show.id}>
              <img src={posterUrl} alt={show.name || show.title} />
              <div className="movie-hover-overlay">
                <div className="movie-overlay-title">
                  {show.name || show.title}
                </div>
                <div className="movie-metadata">
                  {show.vote_average ? (
                    <div className="movie-rating">
                      <i className="fas fa-star"></i>{" "}
                      {show.vote_average.toFixed(1)}
                    </div>
                  ) : null}
                  <span>{show.genre_ids ? "TV Series" : show.genre}</span>
                </div>
                <div className="overlay-buttons">
                  <Link
                    to={`/tv/${show.id}`}
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
                    onClick={() => handleAddToList(show)}
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

export default TV_show;