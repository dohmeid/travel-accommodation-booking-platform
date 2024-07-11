//authentication Auth Authentication
import React, { FC, ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContextType } from "../interfaces/auth";

export const AuthenticationContext = createContext<
  AuthenticationContextType | any
>(null);
export const AuthenticationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const rememberUser = () => {
    // Save token and userType in localStorage
    //localStorage.setItem("authToken", token);
    //localStorage.setItem("userType", userType);
  };

  //this function is used to refer the authenticated user to the website
  const handleLoginSuccess = (authenticationToken: string, userType: string) => {
    if (userType === "User") {
      console.log("This is a user");
      navigate("/home");
    } else if (userType === "Admin") {
      console.log("This is an Admin");
      navigate("/adminPortal");
    } else {
      console.log("Unknown user type");
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        handleLoginSuccess
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
