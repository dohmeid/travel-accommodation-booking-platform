import { apiRequest, HttpMethod } from "./apiClient";
import { Hotel } from "../types/adminTypes";

export const getHotels = async () => {
  return apiRequest<Hotel[]>(HttpMethod.GET, "/api/hotels", undefined, {
    name: "",
    searchQuery: "",
    pageSize: 10,
    pageNumber: 1,
  });
};

//create a new hotel in a specified city
export const addHotel = async (cityId: number, newHotel: Hotel) => {
  return apiRequest<Hotel>(
    HttpMethod.POST,
    `/api/cities/${cityId}/hotels`,
    newHotel
  );
};

export const editHotel = async (updatedHotel: Hotel) => {
  return apiRequest<string>(
    HttpMethod.PUT,
    `/api/hotels/${updatedHotel.id}`,
    updatedHotel
  );
};

//delete a hotel within a specified city
export const removeHotel = async (cityId: number, hotelId: number) => {
  return apiRequest<string>(
    HttpMethod.DELETE,
    `/api/cities/${cityId}/hotels/${hotelId}`
  );
};
