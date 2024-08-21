export interface UserInfo {
  authentication: string | null;
  userType: string | null;
}

export interface JwtPayload {
  userId: string;
  exp: number;
}

export interface LoginFormValues {
  username: string;
  password: string;
  api?: string;
}

export interface AuthContextType {
  userInfo: UserInfo;
  getUserId: () => number;
  handleLoginSuccess: (userInfo: UserInfo) => void;
  handleLogout: () => void;
}
