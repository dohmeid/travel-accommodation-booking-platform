import apiService from "./apiService";
import { SearchQuery } from "../../interfaces/interfaces";


//this function is used to get search results
export const getSearchResults = async (query: SearchQuery) => {
  try {
    const response = await apiService.get("/api/home/search", {
      params: { query },
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


//this function is used to get recent hotels
export const getRecentHotels = async (userId: number) => {
  try {
    const response = await apiService.get(
      `/api/home/users/${userId}/recent-hotels`
    );
    if (response.status === 200) {
      console.log("Retrieved recent hotels successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving recent hotels" + error.message
    );
  }
};

//this function is used to get featured deals
export const getFeaturedDeals = async () => {
  try {
    const response = await apiService.get("/api/home/featured-deals");
    if (response.status === 200) {
      console.log("Retrieved featured deals successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving featured deals" + error.message
    );
  }
};

//this function is used to get trending destinations
export const getTrendingDestinations = async () => {
  try {
    const response = await apiService.get("/api/home/destinations/trending");
    if (response.status === 200) {
      console.log(
        "Retrieved trending destinations successfully",
        response.data
      );
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving trending destinations" + error.message
    );
  }
};
