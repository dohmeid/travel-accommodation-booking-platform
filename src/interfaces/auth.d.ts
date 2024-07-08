export interface LoginFormValues {
  username: string;
  password: string;
  api?: string;
}

export interface Props {
  onSubmitSuccess: (userType: string) => void;
}
