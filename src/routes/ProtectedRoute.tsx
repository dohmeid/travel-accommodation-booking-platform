import React, { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../context/authentication";
import { AuthenticationContextType } from "../interfaces/auth";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { authToken } = useContext(
    AuthenticationContext
  ) as AuthenticationContextType;

  console.log(
    "localStorage.getItem('authToken')",
    localStorage.getItem("authToken")
  );

  console.log(
    "sessionStorage.getItem('authToken')",
    sessionStorage.getItem("authToken")
  );

  // Check if the user is authenticated
  if (!authToken) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <>{children}</>;
};
export default ProtectedRoute;
