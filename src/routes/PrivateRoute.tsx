import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authProvider';

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ allowedRoles, children }) => {
  const { userInfo } = useAuthContext();

  const isAuthenticated = !!userInfo?.authentication;
  const isAuthorized =
    userInfo?.userType && allowedRoles.includes(userInfo.userType);

  //if not authenticated or not authorized -> redirect to the unauthorized error page
  if (!isAuthenticated || !isAuthorized) {
    return <Navigate to="/unauthorizedUser" />;
  }

  //if authenticated and authorized -> render the child components
  return <>{children}</>;
};

export default PrivateRoute;
