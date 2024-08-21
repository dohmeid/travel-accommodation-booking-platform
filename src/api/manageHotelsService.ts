import { apiRequest, HttpMethod } from './apiClient';
import { Hotel } from '../types/adminTypes';
import { HotelInformation } from '../types/hotelTypes';

export const getHotels = async () => {
  return apiRequest<Hotel[]>(HttpMethod.GET, '/api/hotels', undefined, {
    name: '',
    searchQuery: '',
    pageSize: 15,
    pageNumber: 1,
  });
};

//create a new hotel in a specified city
export const addHotel = async (cityId: number, newHotel: Hotel) => {
  return apiRequest<Hotel>(
    HttpMethod.POST,
    `/api/cities/${cityId}/hotels`,
    newHotel,
  );
};

export const editHotel = async (updatedHotel: Hotel) => {
  return apiRequest<string>(
    HttpMethod.PUT,
    `/api/hotels/${updatedHotel.id}`,
    updatedHotel,
  );
};

export const getHotelInfo = async (hotelId: number) => {
  return apiRequest<HotelInformation>(HttpMethod.GET, `/api/hotels/${hotelId}`);
};

//delete a hotel within a specified city
export const removeHotel = async (hotelId: number) => {
  const hotelInfo = await getHotelInfo(hotelId);
  return apiRequest<string>(
    HttpMethod.DELETE,
    `/api/cities/${hotelInfo.cityId}/hotels/${hotelId}`,
  );
};
