import axios from "axios";

const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//this function is used to check if the user is authorized
export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await apiService.post("/api/auth/authenticate", {
      userName: username,
      password: password,
    });
    console.log(response.data);
    return response.data; //response status = 200 'OK'
  } catch (error) {
    //response status = 401 'Unauthorized'
    throw new Error("Unauthorized: Incorrect username or password.");
  }
};
