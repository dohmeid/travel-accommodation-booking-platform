import axios from "axios";
import apiService from "./apiService";

//this function is used to check if the user is authorized or not
export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await apiService.post("/api/auth/authenticate", {
      userName: username,
      password: password,
    });
    if (response.status === 200) {
      console.log("Logged in successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized: Incorrect username or password.");
      }
    }
    throw new Error("An error occurred while logging in" + error.message);
  }
};
