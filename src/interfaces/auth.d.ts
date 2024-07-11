export interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
  api?: string;
}

export interface AuthenticationContextType {
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
