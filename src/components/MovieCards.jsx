import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/film");
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
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
      <div className="cnn">
        <button className="butn">All Movies →</button>
      </div>
    </>
  );
};

export default MovieCard;
