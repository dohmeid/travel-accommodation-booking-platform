export interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
  api?: string;
}

export interface JwtPayload {
  userId: string; // Adjust according to your token structure
  // Add other fields if necessary
}

export interface AuthenticationContextType {
  userId: number;
  authToken: string | null;
  userType: string | null;
  rememberUser: (
    authenticationToken: string,
    userType: string,
    rememberMe: boolean
  ) => void;
  handleLoginSuccess: (
    authenticationToken: string,
    userType: string,
    rememberMe: boolean
  ) => void;
  handleLogout: () => void;
}
