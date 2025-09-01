import React from "react";
import { useNavigate } from "react-router-dom";
import '/src/index.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      alert("You must log in first!");
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Landing screen</h1>
      <p> something about</p>
      <p>login or register to start</p>
      <button onClick={() => navigate("/login")}>Login</button>
      <p>or</p>
      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={handleHomeClick}>Home</button>
    </div>
  );
};

export default Landing;
