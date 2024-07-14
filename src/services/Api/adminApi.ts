import axios from "axios";
const API_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";
const BEARER_TOKEN = localStorage.getItem("authToken");

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
    //this is the admin token
    Authorization: `Bearer ${BEARER_TOKEN}`,
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
    if (response.status === 200) {
      console.log("Cities retrieved successfully", response.data);
      console.log("BEARER_TOKEN", BEARER_TOKEN);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "An error occurred while retrieving cities" + error.message
      );
    } else {
      throw new Error("An unexpected error occurred" + error.message);
    }
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
    console.log("BEARER_TOKEN", BEARER_TOKEN);
    throw new Error("Error creating new city todos: " + error.message);
  }
};

//this function is used to update a city
export const updateCityy = async (
  cityId: number,
  newName: string,
  newDescription: string
) => {
  try {
    const response = await apiService.put(`/api/cities/${cityId}`, {
      name: newName,
      description: newDescription,
    });
    if (response.status === 204) {
      console.log("City updated successfully");
      console.log("BEARER_TOKEN", BEARER_TOKEN);
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error("City not found");
      } else {
        throw new Error(
          "An error occurred while updating the city" + error.message
        );
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
  }
};

//this function is used to delete a city
export const deleteCityy = async (cityId: number) => {
  try {
    const response = await apiService.delete(`/api/cities/${cityId}`);
    if (response.status === 204) {
      console.log("City deleted successfully");
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error("City not found");
      } else {
        throw new Error(
          "An error occurred while deleting the city" + error.message
        );
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
  }
};
