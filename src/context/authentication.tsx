import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContextType, JwtPayload } from "../interfaces/auth";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export const AuthenticationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
  const [userType, setUserType] = useState<string | null>(
    localStorage.getItem("userType") || sessionStorage.getItem("userType")
  );

  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    if (authToken) getUserIdFromToken(authToken);
    console.log(userId);
  }, [authToken]);

  //this function is used to refer the authenticated user to the website
  const handleLoginSuccess = (
    authenticationToken: string,
    userType: string,
    rememberMe: boolean
  ) => {
    //save the token
    rememberUser(authenticationToken, userType, rememberMe);

    //check the user type
    if (userType === "User") {
      console.log("This is a user");
      navigate("/main");
    } else if (userType === "Admin") {
      console.log("This is an Admin");
      navigate("/adminPortal");
    } else {
      console.log("Unknown user type");
    }
  };

  //this function is used to remember the user and save token and userType in localStorage
  const rememberUser = (
    authenticationToken: string,
    userType: string,
    rememberMe: boolean
  ) => {
    setAuthToken(authenticationToken);
    setUserType(userType);

    if (rememberMe) {
      localStorage.setItem("authToken", authenticationToken);
      localStorage.setItem("userType", userType);
      console.log(
        "localStorage.getItem('authToken')",
        localStorage.getItem("authToken")
      );
    } else {
      sessionStorage.setItem("authToken", authenticationToken);
      sessionStorage.setItem("userType", userType);
      console.log(
        "sessionStorage.getItem('authToken')",
        sessionStorage.getItem("authToken")
      );
    }
  };

  //this function is used to logout the user
  const handleLogout = () => {
    setAuthToken(null);
    setUserType(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userType");
  };

  //this function is used to get the user id from the jwt token
  const getUserIdFromToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const userId = Number(decodedToken.userId);
      if (!isNaN(userId)) setUserId(userId);
      else setUserId(-1);
    } catch (error) {
      console.error("Invalid token", error);
      setUserId(-1);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        authToken,
        userType,
        userId,
        rememberUser,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
