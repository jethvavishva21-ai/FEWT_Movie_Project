import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../css/Style.css";

function My_List() {
  const { myList, handleAddToList } = useOutletContext();

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
      <h2 className="section-title">My List</h2>

      {myList.length === 0 ? (
        <p style={{ color: "#737373", fontSize: "1.2rem", textAlign: "left" }}>
          Your list is empty. Go to the Movies page and click on "+ Add List" to
          add movies here.
        </p>
      ) : (
        <div className="movie-grid-page">
          {myList.map((movie, index) => (
            <div className="movie-card" key={index}>
              <img src={movie.img} alt={movie.title} />
              <div className="movie-hover-overlay">
                <div className="movie-overlay-title">{movie.title}</div>
                <div className="movie-metadata">
                  {movie.rating && movie.rating !== "TBA" && (
                    <div className="movie-rating">
                      <i className="fas fa-star"></i> {movie.rating}
                    </div>
                  )}
                  <span>{movie.genre}</span>
                </div>
                <div className="overlay-buttons">
                  <Link
                    to={movie.link}
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
                      backgroundColor: "#333",
                      color: "white",
                      borderColor: "#555",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default My_List;