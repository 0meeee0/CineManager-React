import React, { useEffect, useState } from "react";
import Title from "./Title";
import axios from "axios";

export default function NowShowing() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const latest = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/film/latest"
        );
        setMovies(response.data);
      } catch (err) {
        setError(err);
      }
    };
    latest();
  }, []);
  if (error) return <div>{error}</div>;

  return (
    <div className="showing">
      <Title text="Latest Addition" />
      {movies.map((movie) => (
        <div>
          <div className="showing-div">
            <img
              className="showing-img"
              src={`http://localhost:3001${movie.poster}`}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOiZRsIjanQl7ypLmJRaxHnoJ5S6XVzlNT9Q&s";
              }}
            />
          </div>
          <h2 className="showing-title">{movie.title}</h2>
        </div>
      ))}
      <div className="cnn">
        <button className="butn">Book Now</button>
      </div>
    </div>
  );
}
