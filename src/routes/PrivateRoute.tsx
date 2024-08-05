import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authProvider";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ allowedRoles, children }) => {
  const { authToken, userType } = useAuthContext();
  const isAuthenticated = !!authToken;
  const isAuthorized = userType && allowedRoles.includes(userType);

  //if not authenticated or not authorized -> redirect to the unauthorized error page
  if (!isAuthenticated || !isAuthorized) {
    return <Navigate to="/unauthorizedUser" />;
  }

  //if authenticated and authorized -> render the child components
  return <>{children}</>;
};

export default PrivateRoute;
