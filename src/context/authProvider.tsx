import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo, AuthContextType } from "../types/authTypes";
import { isTokenValid, getUserIdFromToken } from "../utils/authUtils";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  //logout if token is expired (notValid)
  useEffect(() => {
    if (userInfo?.authentication && !isTokenValid(userInfo.authentication)) {
      handleLogout();
    }
  }, [userInfo]);

  const getUserId = useCallback((): number => {
    if (userInfo?.authentication) {
      return getUserIdFromToken(userInfo.authentication);
    }
    return -1;
  }, [userInfo]);

  const handleLoginSuccess = (user: UserInfo) => {
    setUserInfo(user);
    localStorage.setItem("authToken", user.authentication);
    const route = user.userType === "Admin" ? "/adminPortal" : "/main";
    navigate(route);
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        getUserId,
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
