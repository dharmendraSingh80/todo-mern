import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/partials/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
