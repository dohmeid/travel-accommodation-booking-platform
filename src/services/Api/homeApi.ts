import apiService from "./apiService";

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
