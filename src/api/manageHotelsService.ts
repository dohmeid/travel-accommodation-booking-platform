import { apiClient, apiRequest, HttpMethod } from './apiClient';
import { Hotel } from '../types/adminTypes';
import { HotelInformation } from '../types/hotelTypes';

export const getHotels = async (
  pageNumber: number,
  nameQuery: string,
  descriptionQuery: string,
) => {
  try {
    const response = await apiClient.get('/api/hotels', {
      params: {
        name: nameQuery,
        searchQuery: descriptionQuery,
        pageSize: 10,
        pageNumber: pageNumber,
      },
    });
    return response;
  } catch (error) {
    throw new Error('Error fetching hotels:' + error);
  }
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
