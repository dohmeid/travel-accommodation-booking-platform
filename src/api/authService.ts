import { apiRequest, HttpMethod } from './apiClient';
import { UserInfo } from '../types/authTypes';

//this function is used to check if the user is authorized or not
export const authenticateUser = async (username: string, password: string) => {
  return apiRequest<UserInfo>(HttpMethod.POST, '/api/auth/authenticate', {
    userName: username,
    password: password,
  });
};
