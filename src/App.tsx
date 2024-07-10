import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "./App.css";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/adminPortal" element={<AdminPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
