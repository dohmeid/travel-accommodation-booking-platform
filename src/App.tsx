import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import CursorFollower from "./components/common/CursorFollower/CursorFollower";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Grid from "./components/admin/Grid/Grid";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HotelPage from "./pages/HotelPage/HotelPage";

const App: FC = () => {
  return (
    <>
      <CursorFollower />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route
          path="main"
          element={
            <ProtectedRoute requiredRole="User">
              <UserPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="hotel" element={<HotelPage />} />
        </Route>

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
          <Route path="room" element={<Grid gridType="city" />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
