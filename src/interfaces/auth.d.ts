export interface LoginFormValues {
  username: string;
  password: string;
  api?: string;
}

export interface AuthenticationContextType {
  handleLoginSuccess: (authenticationToken: string, userType: string) => void;
}