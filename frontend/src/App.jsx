import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

// /books/63c617f6ab86c9ce2a2c3f27/plain-text/page/0

export default App;
