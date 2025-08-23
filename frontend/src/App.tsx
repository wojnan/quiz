import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Landing, Register } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
