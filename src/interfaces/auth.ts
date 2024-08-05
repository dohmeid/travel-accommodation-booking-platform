export interface LoginFormValues {
  username: string;
  password: string;
  api?: string;
}

export interface JwtPayload {
  userId: string;
  exp: number;
}

export interface AuthContextType {
  userId: number;
  authToken: string | null;
  userType: string | null;
  handleLoginSuccess: (token: string, userType: string) => void;
  handleLogout: () => void;
}
