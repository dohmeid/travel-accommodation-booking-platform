import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfo, AuthContextType } from '../types/authTypes';
import { isTokenValid, getUserIdFromToken } from '../utils/authUtils';
import {
  useNotification,
  NotificationType,
} from './notificationProvider';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    authentication: localStorage.getItem('authToken'),
    userType: localStorage.getItem('userType'),
  });
  const { notify } = useNotification();
  const navigate = useNavigate();

  //logout if token is expired (notValid)
  useEffect(() => {
    const token = userInfo.authentication;
    if (token && !isTokenValid(token)) {
      handleLogout();
    }
  }, [userInfo?.authentication]);

  const getUserId = useCallback(() => {
    return userInfo.authentication
      ? getUserIdFromToken(userInfo.authentication)
      : -1;
  }, [userInfo.authentication]);

  const handleLoginSuccess = (user: UserInfo) => {
    if (user.authentication && user.userType) {
      setUserInfo(user);
      localStorage.setItem('authToken', user.authentication);
      localStorage.setItem('userType', user.userType);
      navigate(user.userType === 'Admin' ? '/adminPortal' : '/main');
      notify(NotificationType.SUCCESS, 'Welcome Back!');
    }
  };

  const handleLogout = () => {
    setUserInfo({ authentication: null, userType: null });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
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
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
