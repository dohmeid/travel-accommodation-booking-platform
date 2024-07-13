import React, { FC, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute requiredRole="User">
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminPortal"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
