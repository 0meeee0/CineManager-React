import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Btnn from "./Btnn";
import axios from "axios";
import "../Movie.css";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [cmnt, setCmnt] = useState([]);
  const [avRating, setAvRating] = useState(0)
  const [userRating, setUserRating] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/comments/${id}`);
        setCmnt(res.data || []);
      } catch (err) {
        setError("Failed to fetch comments.");
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await axios.get(`http://localhost:3001/api/rating/${id}`);
      setAvRating(res.data.averageRating);
    };
    fetchRatings();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg) return;

    try {
      await axios.post(
        "http://localhost:3001/api/comments/addComment",
        {
          user_id: userId,
          film_id: id,
          comment: msg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("");
      const res = await axios.get(`http://localhost:3001/api/comments/${id}`);
      setCmnt(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to submit comment.");
    }
  };

  const handleRating = async (rating) => {
    try {
      await axios.post(
        "http://localhost:3001/api/rating/add",
        {
          user_id: userId,
          film_id: id,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRating(rating);
      setAvRating(((avRating + rating) / 2).toFixed(1))
    } catch (err) {
      setError("Failed to submit rating.");
    }
  };

  return (
    <div className="bg">
      <div className="top">
        <div className="m-info pb-10">
          <div className="mhinfo">
            <h1 className="text-6xl">{movie?.title}</h1>
            <span className="sp">Genre: {movie?.genre}</span>
            <p>Rating: {avRating}</p>
            <div className="flex">
              <Btnn text="Get Tickets Now" />
              <Btnn text="Watch Online Now" />
            </div>
            <div className="pt-10">
              <span>Rate this movie: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: userRating >= star ? "gold" : "gray",
                  }}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="img-corne">
          <img
            className="img-corner"
            src={`http://localhost:3001${movie?.poster}`}
            alt={movie?.title}
          />
        </div>
      </div>
      {error && <div>{error}</div>}
      <div className="comment-section">
        <form onSubmit={handleSubmit} className="comment-form">
          <h2>Leave a Comment</h2>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              onChange={handleChange}
              id="comment"
              name="comment"
              rows="4"
              required
              value={msg}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Submit Comment
          </button>
        </form>

        <h2>Comments</h2>
        {cmnt.length > 0 ? (
          <ul className="comments-list">
            {cmnt.map((comment) => (
              <li className="comment" key={comment._id}>
                <div className="comment-header">
                  <span className="comment-author">{comment.user_id.name}</span>
                  <span className="bg-gray-200 text-sm p-1 rounded-md text-gray-500">
                    {comment.user_id.role}
                  </span>
                </div>
                <p className="comment-body">{comment.comment}</p>
                <span className="comment-date">
                  Posted on {new Date(comment.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
}
