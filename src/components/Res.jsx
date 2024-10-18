import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Res() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/reservation"
        );
        console.log(response.data);
        setRes(response.data);
        console.log("alo");
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchRes();
  }, []);

  return (
    <div className="reservation-page">
      {/* <h1 className="reservation-title">Reservation Page</h1> */}
      <h2 className="reservation-subtitle">Reservations</h2>
      {res.length === 0 ? (
        <p className="reservation-empty">No reservations found.</p>
      ) : (
        <ul className="reservation-list">
          {res.map((reservation) => (
            <li key={reservation._id} className="reservation-item">
              <p className="reservation-info">
                <strong>Reservation ID:</strong> {reservation._id}
              </p>
              <p className="reservation-info">
                <strong>Client Name:</strong> {reservation.user.name}
              </p>
              <p className="reservation-info">
                <strong>Seance Time:</strong>
                {new Date(reservation.seance.horaire).toLocaleString()}
              </p>
              <p className="reservation-info">
                <strong>Seat ID:</strong> {reservation.seats._id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
