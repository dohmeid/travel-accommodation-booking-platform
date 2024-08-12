import axios from "axios";
import apiService from "./apiService";
import { Hotel } from "../../interfaces/adminTypes";

//this function is used to get all hotels
export const getHotels = async () => {
  try {
    const response = await apiService.get("/api/hotels", {
      params: {
        name: "",
        searchQuery: "",
        pageSize: 10,
        pageNumber: 1,
      },
    });
    if (response.status === 200) {
      console.log("Hotels retrieved successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while retrieving hotels" + error.message
    );
  }
};

//this function is used to create a new hotel in a specified city
export const addHotel = async (cityId: number, newHotel: Hotel) => {
  try {
    const response = await apiService.post(
      `/api/cities/${cityId}/hotels`,
      newHotel
    );
    if (response.status === 201) {
      console.log("The Hotel is added successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("City is not found");
      }
    }
    throw new Error(
      "An error occurred while adding the new hotel" + error.message
    );
  }
};

//this function is used to update a hotel
export const editHotel = async (updatedHotel: Hotel) => {
  try {
    const response = await apiService.put(
      `/api/hotels/${updatedHotel.id}`,
      updatedHotel
    );
    if (response.status === 204) {
      console.log("Hotel updated successfully");
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found");
      }
    }
    throw new Error(
      "An error occurred while updating the hotel" + error.message
    );
  }
};

//this function is used to delete a hotel within a specified city
export const removeHotel = async (cityId: number, hotelId: number) => {
  try {
    const response = await apiService.delete(
      `/api/cities/${cityId}/hotels/${hotelId}`
    );
    if (response.status === 204) {
      console.log("Hotel deleted successfully");
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("City or Hotel are not found");
      }
    }
    throw new Error(
      "An error occurred while deleting the hotel" + error.message
    );
  }
};

/********************************************************************** */
//these functions are used in the hotel page
//this function is used to get specific hotel gallery
export const getHotelGallery = async (hotelId: number) => {
  try {
    const response = await apiService.get(`/api/hotels/${hotelId}/gallery`);
    if (response.status === 200) {
      console.log("Hotel gallery retrieved successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found - wrong hotel id");
      }
    }
    throw new Error(
      "An error occurred while retrieving hotel gallery" + error.message
    );
  }
};

//this function is used to get specific hotel information
export const getHotelInfo = async (hotelId: number) => {
  try {
    const response = await apiService.get(`/api/hotels/${hotelId}`);
    if (response.status === 200) {
      console.log("Hotel information retrieved successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found - wrong hotel id");
      }
    }
    throw new Error(
      "An error occurred while retrieving hotel information" + error.message
    );
  }
};

//this function is used to get specific hotel available reviews
export const getHotelReviews = async (hotelId: number) => {
  try {
    const response = await apiService.get(`/api/hotels/${hotelId}/reviews`);
    if (response.status === 200) {
      console.log("Hotel reviews retrieved successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found - wrong hotel id");
      }
    }
    throw new Error(
      "An error occurred while retrieving hotel reviews" + error.message
    );
  }
};

//note: this is still not used
//this function is used to get specific hotel rooms
export const getHotelRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) => {
  try {
    const response = await apiService.get(`/api/hotels/${hotelId}/rooms`, {
      params: {
        checkInDate: { checkInDate },
        checkOutDate: { checkOutDate },
      },
    });
    if (response.status === 200) {
      console.log("Hotel rooms retrieved successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found - wrong hotel id");
      }
    }
    throw new Error(
      "An error occurred while retrieving hotel rooms" + error.message
    );
  }
};

//this function is used to get specific hotel available rooms
export const getHotelAvailableRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) => {
  try {
    const response = await apiService.get(
      `/api/hotels/${hotelId}/available-rooms`,
      {
        params: {
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
      }
    );
    if (response.status === 200) {
      console.log(
        "Hotel available rooms retrieved successfully",
        response.data
      );
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Hotel not found - wrong hotel id");
      }
    }
    throw new Error(
      "An error occurred while retrieving hotel available rooms ." +
        error.message
    );
  }
};
