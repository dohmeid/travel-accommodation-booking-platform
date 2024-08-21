import { apiRequest, HttpMethod } from './apiClient';
import {
  GalleryImage,
  HotelInformation,
  Review,
  Room,
} from '../types/hotelTypes';

export const getHotelGallery = async (hotelId: number) => {
  return apiRequest<GalleryImage[]>(
    HttpMethod.GET,
    `/api/hotels/${hotelId}/gallery`,
  );
};

export const getHotelInfo = async (hotelId: number) => {
  return apiRequest<HotelInformation>(HttpMethod.GET, `/api/hotels/${hotelId}`);
};

export const getHotelReviews = async (hotelId: number) => {
  return apiRequest<Review[]>(HttpMethod.GET, `/api/hotels/${hotelId}/reviews`);
};

export const getHotelAvailableRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string,
) => {
  return apiRequest<Room[]>(
    HttpMethod.GET,
    `/api/hotels/${hotelId}/available-rooms`,
    undefined,
    {
      checkInDate,
      checkOutDate,
    },
  );
};
