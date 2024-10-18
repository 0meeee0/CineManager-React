import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navb">
      <h1 className="hdr">CineMan</h1>
      <input className="searchBox cntr" type="text" placeholder="Search" />
      <div className="btn-group cntr">
        {localStorage.token ? (
          `Hello, ${localStorage.username}`
        ) : (
          <Link to="/login" className="btn">
            🪪
          </Link>
        )}
        {/* <Link to="/register" className="btn">
          Register
        </Link> */}

      </div>
    </div>
  );
}
