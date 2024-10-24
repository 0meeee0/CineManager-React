import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Title from "./components/Title";
import MovieCard from "./components/MovieCards";
import NowShowing from "./components/NowShowing";
import Footer from "./components/Footer";
import Sessions from "./components/Sessions";
import Protected from "./components/Protected";
import Movie from "./components/Movie";
import Res from "./components/Res";
import Logout from "./components/Logout";
import AllMovies from "./components/AllMovies";
import AdminDashboard from "./components/AdminDashboard";
import UsersM from "./components/UserM";
import MoviesM from "./components/MoviesM";
import SeancesM from "./components/SeancesM";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Title text="Trending" />
              <MovieCard />
              <NowShowing />
              <Sessions />
            </>
          }
        />
        <Route path="/reservations" element={<Res />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/all-movies" element={<AllMovies />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<UsersM />} />
          <Route path="movies" element={<MoviesM />} />
          <Route path="seances" element={<SeancesM />} />
        </Route>
        <Route
          path="/login"
          element={
            <Protected>
              <LoginForm />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={
            <Protected>
              <RegisterForm />
            </Protected>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
