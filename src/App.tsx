import React, { FC, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Grid from "./components/admin/Grid/Grid";

const App: FC = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="home"
        element={
          <ProtectedRoute requiredRole="User">
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="adminPortal"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Grid gridType="city" />} />
        <Route path="city" element={<Grid gridType="city" />} />
        <Route path="hotel" element={<Grid gridType="hotel" />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
