import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/auth";

//check if token is still valid (not expired)
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; //get expiration time in ms
    return Date.now() < exp; //check if the current time is less than the expiration time
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
};

//extracts user id from auth token
export const getUserIdFromToken = (token: string): number => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = Number(decodedToken.userId);
    return !isNaN(userId) ? userId : -1;
    // return Number(decodedToken.userId) || -1;
  } catch (error) {
    console.error("Invalid token", error);
    return -1;
  }
};
