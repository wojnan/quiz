import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Landing, Register } from "./pages";
import PrivateRoutes from "./api/privateRoutes";

const App: React.FC = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
