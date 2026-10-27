import React, { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../css/Style.css";

// ----------------------------------------------------
// 1. DRAGGABLE LIST COMPONENT 
// ----------------------------------------------------
const DraggableList = ({ children, className }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [numIndicators, setNumIndicators] = useState(5); 
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const updateIndicators = () => {
      if (sliderRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth; 
        const clientWidth = sliderRef.current.clientWidth; 
        if (clientWidth > 0) {
          const pages = Math.ceil(scrollWidth / clientWidth);
          setNumIndicators(pages > 1 ? pages : 1);
        }
      }
    };

    const timeout = setTimeout(updateIndicators, 500);
    window.addEventListener("resize", updateIndicators);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateIndicators);
    };
  }, [children]); 

  const handleScroll = () => {
    if (!sliderRef.current || numIndicators <= 1) return;
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (maxScroll <= 0) return;
    const currentScrollPercentage = sliderRef.current.scrollLeft / maxScroll;
    setActiveIndex(Math.round(currentScrollPercentage * (numIndicators - 1)));
  };

  const handleIndicatorClick = (index) => {
    if (!sliderRef.current || numIndicators <= 1) return;
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    const targetScroll = (index / (numIndicators - 1)) * maxScroll;
    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e) => {
    setIsDown(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <div
        className={`${className} ${isDown ? "active-drag" : ""}`}
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{ cursor: isDown ? "grabbing" : "grab", overflowX: "auto" }}
      >
        {children}
      </div>

      {numIndicators > 1 && (
        <div className="slider-indicators">
          {Array.from({ length: numIndicators }).map((_, i) => (
            <div
              key={i}
              className={`indicator ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleIndicatorClick(i)}
            />
          ))}
        </div>
      )}
    </>
  );
};

// ----------------------------------------------------
// 2. MAIN INDEX COMPONENT
// ----------------------------------------------------
function Index() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const totalHeroSlides = 4;

  const { myList, handleAddToList } = useOutletContext();

  const isMovieAdded = (title) => {
    return myList.some((item) => item.title === title);
  };

  // TMDB API

  // HERO SECTION
  const [herosection, setHeroSection] = useState([]);

  useEffect(() => {
    if (herosection.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % herosection.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [herosection]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setHeroSection(res.results));
  }, []);

  // POPULAR MOVIES
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setPopularMovies(res.results));
  }, []);

  // UPCOMING MOVIES
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setUpcomingMovies(res.results));
  }, []);

  return (
    <div>
      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="hero-slider">
          {herosection.map(
            (
              movie,
              index,
            ) => (
              <div
                key={movie.id}
                className={`hero-slide ${currentHeroSlide === index ? "active" : ""}`}
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                }}
              >
                <div className="slide-info">
                  <h1>{movie.title}</h1>
                  <p>
                    {movie.overview.length > 100
                      ? movie.overview.substring(0, 100) + "..."
                      : movie.overview}
                  </p>
                  <div className="buttons">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="watch-btn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ▶ Watch Now
                    </Link>
                    <button
                      className="add-list-btn"
                      onClick={() =>
                        handleAddToList({
                          title: movie.title,
                          img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                          rating: movie.vote_average
                            ? `${movie.vote_average.toFixed(1)}/10`
                            : "N/A",
                          genre: "Action • Drama",
                          link: `/movie/${movie.id}`,
                        })
                      }
                      style={{
                        backgroundColor: isMovieAdded(movie.title)
                          ? "#555"
                          : "rgba(109, 109, 110, 0.5)",
                      }}
                    >
                      {isMovieAdded(movie.title) ? "✓ Added" : "+ Add to List"}
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}
        </section>
        {/* ================= LANGUAGE SECTION ================= */}
        <section className="language-section">
          <h2 className="section-title">Explore In Your Language</h2>
          <DraggableList className="language-list">
            <Link to="/language/hi" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiRye91fC3ZpatvdjGknVk1lwtlPgx5pC-DF2IfypNVg&s=10"
                alt="Hindi"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">Hindi</div>
              </div>
            </Link>

            <Link to="/language/gu" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk93rpL1bgwfrB1qosTnIPXIyAQBsh9cS7xaTRSW0XA&s=10"
                alt="Gujarati"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">Gujarati</div>
              </div>
            </Link>

            <Link to="/language/te" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlQXIe4EXYSjWIXih5jnzmld4dDnlx-we-FHjrv-yXPg&s=10"
                alt="Telugu"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">Telugu</div>
              </div>
            </Link>

            <Link to="/language/ta" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVfeM-JC14Jv90ywWwXNtlPhXHaFWEInGsLwtRT49GdVd8hfiM4Evxwk&s=10"
                alt="Tamil"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">Tamil</div>
              </div>
            </Link>

            <Link to="/language/fr" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7zfjDxIdyiOmeMbXlDuv2yNHTLK0D2ThEL_vWfonCQ&s=10"
                alt="French"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">French</div>
              </div>
            </Link>

            <Link to="/language/ko" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs-_ySC9FOrsKn8FzER_fHst1x7obqiMz4gqEWqoTuyA&s=10"
                alt="Korean"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">Korean</div>
              </div>
            </Link>

            <Link to="/language/en" className="lang-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXGkn5K0LI61F2X4ryN21kQMxNdvNCey5DLohGKRPxg&s=10"
                alt="English"
                className="lang-bg-img"
              />
              <div className="lang-overlay">
                <div className="lang-name">English</div>
              </div>
            </Link>
          </DraggableList>
        </section>

        {/* ================= POPULAR MOVIES ================= */}
        <section className="movie-section">
          <h2 className="section-title">Popular Movies</h2>
          <div className="movie-carousel-container">
            <DraggableList className="movie-list">
              {popularMovies.map((movie) => (
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
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                        /10
                      </div>
                      <span>Popular • Movie</span>
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
                            genre: "Popular • Movie",
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
            </DraggableList>
          </div>
        </section>

        {/* ================= UPCOMING MOVIES ================= */}
        <section className="movie-section">
          <h2 className="section-title">Upcoming Movies</h2>
          <div className="movie-carousel-container">
            <DraggableList className="movie-list">
              {upcomingMovies.map((movie) => (
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
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                        /10
                      </div>
                      <span>Upcoming • Movie</span>
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
                            rating: movie.vote_average
                              ? `${movie.vote_average.toFixed(1)}/10`
                              : "N/A",
                            genre: "Upcoming • Movie",
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
            </DraggableList>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Index;