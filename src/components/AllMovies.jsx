import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/film");
        setMovies(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchMovies();
  }, []);
  if (error) return <div>{error}</div>;
  return (
    <div className="pt-24">
      <Title text="All Movies" />
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie._id}`}>
            <div className="movie-card">
              <img
                src={`http://localhost:3001${movie.poster}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOiZRsIjanQl7ypLmJRaxHnoJ5S6XVzlNT9Q&s";
                }}
                className="movie-poster"
                alt={`${movie.title} poster`}
              />
              <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
