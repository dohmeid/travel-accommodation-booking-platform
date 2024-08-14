export interface UserInfo {
  authentication: string;
  userType: "Admin" | "User";
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
  userInfo: UserInfo | null;
  getUserId: () => number;
  handleLoginSuccess: (userInfo: UserInfo) => void;
  handleLogout: () => void;
}
