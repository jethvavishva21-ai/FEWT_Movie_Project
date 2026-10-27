import { useState } from 'react'
import "./css/Style.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './Pages/Index'
import Movie_List from "./Pages/Movie_List";
import TV_show from "./Pages/TV_show";
import My_List from './Pages/My_List';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Layout from './Pages/Layout'
import MovieDetail from './Pages/MovieDetail';
import LanguageMovies from './Pages/LanguageMovies';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="Movie_List" element={<Movie_List />} />
            <Route path="TV_show" element={<TV_show />} />
            <Route path="My_List" element={<My_List />} />
            <Route path="Search" element={ <Search/>} />
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="language/:langCode" element={<LanguageMovies/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App