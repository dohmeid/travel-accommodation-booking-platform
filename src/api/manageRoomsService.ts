import { apiRequest, HttpMethod } from './apiClient';
import { HotelRooms, NewRoom, Room } from '../types/adminTypes';

//note: this endpoint doesn't support pagination
export const getRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string,
) => {
  return apiRequest<Room[]>(
    HttpMethod.GET,
    `/api/hotels/${hotelId}/rooms`,
    undefined,
    {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    },
  );
};

export const addRoom = async (hotelId: number, roomData: NewRoom) => {
  return apiRequest<HotelRooms>(
    HttpMethod.POST,
    `/api/hotels/${hotelId}/rooms`,
    roomData,
  );
};

export const editRoom = async (roomData: NewRoom) => {
  return apiRequest<string>(
    HttpMethod.PUT,
    `/api/rooms/${roomData.id}`,
    roomData,
  );
};

export const removeRoom = async (hotelId: number, roomId: number) => {
  return apiRequest<string>(
    HttpMethod.DELETE,
    `/api/hotels/${hotelId}/rooms/${roomId}`,
  );
};
