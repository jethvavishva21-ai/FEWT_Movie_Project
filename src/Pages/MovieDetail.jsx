import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Style.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // LocalStorage 
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myMovieList");
    return savedList ? JSON.parse(savedList) : [];
  });

  // 1. API 
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie:", err));
  }, [id]);

  // 2. Add & Remove
  const toggleMyList = () => {
    const isAlreadyAdded = myList.some((item) => item.title === movie.title);
    let updatedList;

    if (isAlreadyAdded) {
      // Remove 
      updatedList = myList.filter((item) => item.title !== movie.title);
    } else {
      // Add
      const newMovie = {
        title: movie.title,
        img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average
          ? `${movie.vote_average.toFixed(1)}/10`
          : "N/A",
        genre: movie.genres?.[0]?.name,
        link: `/movie/${movie.id}`,
      };
      updatedList = [...myList, newMovie];
    }

    setMyList(updatedList);
    localStorage.setItem("myMovieList", JSON.stringify(updatedList));
  };

  // LOded List
  if (!movie) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        Loading Movie Details...
      </div>
    );
  }

  const trailerKey = movie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  )?.key;
  const trailerUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=0&controls=1`
    : "";

  const directorName =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
    "Not Available";
  const castNames =
    movie.credits?.cast
      ?.slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") || "Not Available";
  const releaseYear = movie.release_date?.split("-")[0];
  const genresList = movie.genres?.map((g) => g.name).join(" • ");
  const languagesList = movie.spoken_languages
    ?.map((lang) => lang.english_name)
    .join(", ");
  const isAdded = myList.some((item) => item.title === movie.title);

  return (
    <div>
      <main className="movie-detail-container">
        {/* ================= VIDEO PLAYER ================= */}
        <div className="video-container">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </div>

        {/* ================= MOVIE INFO ================= */}
        <div className="movie-info-section">
          <h1 className="movie-title">
            {movie.title} <span className="movie-year">({releaseYear})</span>
          </h1>

          <div className="movie-meta-tags">
            <span className="rating-badge">
              <i className="fas fa-star"></i>{" "}
              {movie.vote_average?.toFixed(1) || "N/A"}/10
            </span>
            <span className={movie.adult ? "tag red-tag" : "tag"}>
              {movie.adult ? "A" : "U/A"}
            </span>
            <span className="tag">{movie.runtime} min</span>
            <span className="tag">{genresList}</span>
          </div>

          <div
            className="movie-languages"
            style={{ marginBottom: "20px", color: "#ccc" }}
          >
            <strong>Available In : </strong> {languagesList}
          </div>

          <p className="movie-description">{movie.overview}</p>

          <div className="movie-actions">
            <button className="btn-play">
              <i className="fas fa-play"></i> Watch Movie
            </button>

            {/* Add To List button */}
            <button
              className="btn-add"
              onClick={toggleMyList}
              style={{
                backgroundColor: isAdded ? "#555" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <i className={isAdded ? "fas fa-check" : "fas fa-plus"}></i>{" "}
              {isAdded ? "Added to List" : "Add to List"}
            </button>

            <button className="btn-share">
              <i className="fas fa-share-alt"></i> Share
            </button>
          </div>

          {/* ================= CAST & CREW ================= */}
          <div className="movie-cast">
            <h3>Cast & Crew</h3>
            <p>
              <strong>Release Date : </strong> {movie.release_date}
            </p>
            <p>
              <strong>Director : </strong> {directorName}
            </p>
            <p>
              <strong>Star-cast : </strong> {castNames}
            </p>
            <p>
              <strong>Produced By: </strong>
              {movie.production_companies?.map((c) => c.name).join(" & ")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieDetail;