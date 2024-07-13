import axios from "axios";


const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";

const BEARER_TOKEN = localStorage.getItem('authToken');
const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
    //this is the admin token
    Authorization: `Bearer ${BEARER_TOKEN}`, // Add the Bearer token here
  },
});

//this function is used to get all cities
export const getCities = async () => {
  try {
    const response = await apiService.get("/api/cities", {
      params: {
        name: "",
        searchQuery: "",
        pageSize: 10,
        pageNumber: 1,
      },
    });
    //response status = 200 'OK'
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching todos: " + error.message);
  }
};

//this function is used to create a new city
export const createCity = async (newName: string, newDescription: string) => {
  try {
    const response = await apiService.post("/api/cities", {
      name: newName,
      description: newDescription,
    });
    //response status = 201 'OK'
    return response.data;
  } catch (error: any) {
    console.log(error);
    console.log("Error Details:", error.response?.data || error.message);

    throw new Error("Error creating new city todos: " + error.message);
  }
};
