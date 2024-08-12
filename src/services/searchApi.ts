import apiService from "./apiService";
import { SearchQuery } from "../types/searchTypes";

//this function is used to get search results
export const getSearchResults = async (query: SearchQuery) => {
  try {
    const response = await apiService.get("/api/home/search", {
      params: query,
    });
    if (response.status === 200) {
      console.log("Retrieved search results successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving search results" + error.message
    );
  }
};

//this function is used to get search results amenities
export const getAmenities = async () => {
  try {
    const response = await apiService.get("/api/search-results/amenities");
    if (response.status === 200) {
      console.log("Retrieved amenities successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving search amenities" + error.message
    );
  }
};
