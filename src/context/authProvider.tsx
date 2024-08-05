import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../interfaces/auth";
import { isTokenValid, getUserIdFromToken } from "../services/Utils/authUtils";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [userId, setUserId] = useState(-1);
  const navigate = useNavigate();

  //Check token validity and extract user information
  useEffect(() => {
    if (authToken) {
      if (isTokenValid(authToken)) {
        setUserId(getUserIdFromToken(authToken));
      } else {
        handleLogout(); // Logout if token is expired
      }
    }
  }, [authToken]);

  const handleLoginSuccess = (token: string, userType: string) => {
    setAuthToken(token);
    setUserType(userType);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", userType);

    switch (userType) {
      case "User":
        navigate("/main");
        break;
      case "Admin":
        navigate("/adminPortal");
        break;
      default:
        navigate("/unauthorizedUser");
        break;
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUserType(null);
    setUserId(-1);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userType,
        userId,
        handleLoginSuccess,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
