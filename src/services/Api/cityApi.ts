import axios from "axios";
import apiService from "./apiService";
import { City } from "../../interfaces/interfaces";

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
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving cities" + error.message
    );
  }
};

//this function is used to create a new city
export const addCity = async (newCity: City) => {
  try {
    const response = await apiService.post("/api/cities", newCity);
    if (response.status === 201) {
      console.log("The City is added successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while adding the new city" + error.message
    );
  }
};

//this function is used to update a city
export const editCity = async (updatedCity: City) => {
  try {
    const response = await apiService.put(
      `/api/cities/${updatedCity.id}`,
      updatedCity
    );
    if (response.status === 204) {
      console.log("City updated successfully");
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("City not found");
      }
    }
    throw new Error(
      "An error occurred while updating the city" + error.message
    );
  }
};

//this function is used to delete a city
export const removeCity = async (cityId: number) => {
  try {
    const response = await apiService.delete(`/api/cities/${cityId}`);
    if (response.status === 204) {
      console.log("City deleted successfully");
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("City not found");
      }
    }
    throw new Error(
      "An error occurred while deleting the city" + error.message
    );
  }
};
