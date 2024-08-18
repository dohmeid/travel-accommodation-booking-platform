import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/authTypes';

//check if token is still valid (not expired)
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; //get expiration time in ms
    return Date.now() < exp; //check if the current time is less than the expiration time
  } catch (error) {
    console.error('Error parsing token:', error);
    return false;
  }
};

//extracts user id from auth token
export const getUserIdFromToken = (token: string): number => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return Number(decodedToken.userId) || -1;
  } catch (error) {
    console.error('Error parsing token:', error);
    return -1;
  }
};
