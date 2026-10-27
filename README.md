# MovieFlix FEWT Project

A clean, modern, and responsive web application built with React and Vite.

---

## 1. About the Project

**MovieFlix FEWT Project** is a modern movie exploration website that allows users to discover movies and view movie information through a responsive user interface.

The application uses React components and client-side routing to provide smooth navigation without reloading the entire page.

## 2. Features

- 🎥 Discover trending movies
- 🔥 Browse popular movies
- 🗓️ Explore upcoming movies
- 🎬 View movie posters and backdrops
- ⭐ Display movie ratings
- 📅 Show movie release years
- 🔍 Search for movies
- 📖 View movie details
- 📱 Responsive user interface
- ⏳ Loading indicators and error handling
- 📋 Watchlist and profile interface

---

## 3. Technologies Used

- **React** – Building reusable UI components
- **Vite** – Development server and build tool
- **JavaScript** – Application logic
- **React Router** – Client-side navigation
- **TailwindCSS** – Styling and responsive design
- **Font Awesome** – Icons
- **TMDB API** – Movie information
- **Fetch API** – HTTP requests

---

## 4. React Concepts Demonstrated

1. **Components:** Creating reusable components such as `MovieCard`, `MovieRow`, and `Navbar`.
2. **Props:** Passing movie information between components.
3. **useState:** Managing movies, loading states, and errors.
4. **useEffect:** Fetching data when components load.
5. **React Router:** Navigating between pages.
6. **Dynamic Routing:** Using routes such as `/movie/:movieId`.
7. **Fetch API:** Retrieving data from TMDB.
8. **Promises:** Handling asynchronous requests with `.then()` and `.catch()`.
9. **Conditional Rendering:** Displaying loading, error, and movie content.
10. **Reusable Components:** Keeping the application organized and maintainable.

---

## 5. Project Structure

```text
project1/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── css/
│   │
│   ├── Pages/
│   │   ├── Index.jsx
│   │   ├── LanguageMovies.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Movie_List.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── My_List.jsx
│   │   ├── Search.jsx
│   │   ├── Signup.jsx
│   │   └── TV_show.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```
---

## 6. TMDB API Integration

The project uses The Movie Database (TMDB) API to retrieve movie information.

### API Service Functions

The `src/services/tmdbApi.js` file includes:

- `getTrendingMovies()` – Retrieves trending movies.
- `getPopularMovies()` – Retrieves popular movies.
- `getUpcomingMovies()` – Retrieves upcoming movies.

### API Endpoints

**Trending Movies**
```text
https://api.themoviedb.org/3/trending/movie/day
```

**Popular Movies**
```text
https://api.themoviedb.org/3/movie/popular
```

**Upcoming Movies**
```text
https://api.themoviedb.org/3/movie/upcoming
```

### Movie Information

Movie cards can display:

- Movie poster
- Movie title
- Rating out of 10
- Release year
- Movie ID for navigation to the details page

The home page can use `useEffect()` and `Promise.all()` to fetch movie lists and manage loading and error states.

---

## 7. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### Step 2: Open the Project Folder

```bash
cd "Movie Explorer-React"
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure the TMDB API Key

Create a `.env` file in the project root and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Replace `your_tmdb_api_key_here` with your own TMDB API key.

### Step 5: Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

### Step 6: Build for Production

```bash
npm run build
```

---

## 8. Environment Variables and Security

- Keep your local `.env` file out of Git.
- Include `.env.example` as a template without real credentials.
- Never commit actual API credentials or private tokens.
- Variables beginning with `VITE_` are exposed to client-side code and are not secret.

### Example `.env.example`

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

---

## 9. Project Objectives

- Understand React-based Single Page Applications.
- Practice component-based development.
- Learn React Hooks.
- Integrate a third-party REST API.
- Implement client-side routing.
- Build a responsive movie browsing interface.
- Practice error handling and asynchronous JavaScript.

---

## 10. Academic Information

- **Project Name:**MovieFlix FEWT Project
- **Subject:** Frontend Web Technology (FWT)
- **Project Type:** College Frontend Development Project
- **Frontend Framework:** React
- **Build Tool:** Vite
- **Movie Data Source:** TMDB API

---

## 11. Conclusion

MovieFlix FEWT Project demonstrates how React, modern frontend tools, and a movie database API can be combined to build a Single Page Application.

This project provides practical experience with reusable components, React Hooks, routing, API integration, asynchronous JavaScript, and responsive user interfaces.

---
