import axios from "axios";

const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";

//const BEARER_TOKEN = localStorage.getItem("authToken");

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
    // Authorization: `Bearer ${BEARER_TOKEN}`, //this is the admin token
  },
});

//Axios request interceptor -> used to authenticate API requests with the token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;