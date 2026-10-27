import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const [myList, setMyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleAddToList = (movie) => {
    const isAlreadyAdded = myList.some((item) => item.title === movie.title);
    if (isAlreadyAdded) {
      setMyList(myList.filter((item) => item.title !== movie.title));
    } else {
      setMyList([...myList, movie]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/Search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">MovieFlix</div>

          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/TV_show">TV Shows</Link>
            </li>
            <li>
              <Link to="/Movie_List">Movies</Link>
            </li>
            <li>
              <Link
                to="/My_List"
                style={{
                  fontWeight: myList.length > 0 ? "bold" : "normal",
                  color: myList.length > 0 ? "#e50914" : "#e5e5e5",
                }}
              >
                My List {myList.length > 0 && `(${myList.length})`}
              </Link>
            </li>
          </ul>

          <div className="search-profile">
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>

            <div className="auth-buttons">
              <Link to="/Login" className="login-btn">
                Login
              </Link>
              <Link to="/Signup" className="signup-btn">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet context={{ myList, handleAddToList }} />
      </main>

      <footer>
        <p>&copy; 2026 MovieFlix. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>
            <Link to="#">About Us</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Layout;
