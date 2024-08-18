import { apiRequest, HttpMethod } from './apiClient';
import { Booking, BookingConfirmation } from '../types/bookingTypes';

export const getBooking = async (bookingId: number) => {
  return apiRequest<BookingConfirmation>(
    HttpMethod.GET,
    `/api/bookings/${bookingId}`,
  );
};

export const addBooking = async (newBooking: Booking) => {
  return apiRequest<BookingConfirmation>(
    HttpMethod.POST,
    `/api/bookings`,
    newBooking,
  );
};
