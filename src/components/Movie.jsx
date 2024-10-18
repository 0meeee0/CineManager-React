import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Btnn from "./Btnn";
import axios from "axios";
import "../Movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/film/searchFilm/${id}`
        );
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie data.");
      }
    };
    fetchMovie();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="bg">
      <div className="top">
        <div className="m-info">
          <div className="mhinfo">
            <h1 className="text-6xl">{movie.title}</h1>
            <span className="sp">Genre: {movie.genre}</span>
            <div className="flex ">
              <Btnn text="Get Tickets Now" />
              <Btnn text="Watch Online Now" />
            </div>
          </div>
        </div>
        <div className="img-corne">
          <img
            className="img-corner"
            src={`http://localhost:3001${movie.poster}`}
            alt={movie.title}
          />
        </div>
      </div>
      <div className="comment-section">
        <form className="comment-form">
          <h2>Leave a Comment</h2>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating">
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" rows="4" required></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Submit Comment
          </button>
        </form>

        <h2>Comments</h2>
        <ul className="comments-list">
          <li className="comment">
            <div className="comment-header">
              <span className="comment-author">Moi</span>
              <span className="comment-rating">★★★★★</span>
            </div>
            <p className="comment-body">jamil</p>
            <span className="comment-date">Posted on date</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
