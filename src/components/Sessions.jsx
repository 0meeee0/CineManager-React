import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, CalendarDays } from "lucide-react";
import Title from "./Title";

export default function CinemaSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/seance");
        console.log(response.data);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <>
      <Title text="Available Sessions" />
      <section className="cinema-sessions">
        <div className="cinema-sessions__container">
          {sessions.map((session) => (
            <div key={session._id} className="cinema-sessions__card">
              <div className="cinema-sessions__poster">
                <img
                  src={
                    "https://static.medias24.com/content/uploads/2022/10/17/sallecinema.jpg?x73057"
                  }
                  alt="seance"
                  className="cinema-sessions__poster-image"
                />
              </div>
              <div className="cinema-sessions__content">
                <h3 className="cinema-sessions__movie-title">
                  {session.film && session.film.title}
                </h3>
                <p className="cinema-sessions__salle">
                  Room: {session.salle && session.salle.name}
                </p>
                <div className="cinema-sessions__buttons">
                  <div className="cinema-sessions__button">
                    <Clock className="cinema-sessions__clock-icon" />
                    {new Date(session.horaire).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="cinema-sessions__footer">
                <div className="cinema-sessions__date">
                  <CalendarDays className="cinema-sessions__calendar-icon" />
                  {new Date(session.horaire).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
