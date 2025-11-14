import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Student Dashboard!</h1>
        <p>You have successfully logged in.</p>
        <div className="home-features">
          <div className="feature-card">
            <h3>Student Name</h3>
            <p>Honeypot Hotpot</p>
          </div>
          <div className="feature-card">
            <h3>Year of College</h3>
            <p>Junior</p>
          </div>
          <div className="feature-card">
            <h3>Major</h3>
            <p>Bachelor of Cybersecurity</p>
          </div>
          <div className="feature-card">
            <h3>GPA</h3>
            <p>3.92</p>
          </div>
        </div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}