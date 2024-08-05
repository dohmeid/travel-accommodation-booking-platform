import axios from "axios";
import apiService from "./apiService";
import { Booking, BookingConfirmation } from "../../interfaces/booking";

export const getBooking = async (bookingId: number) => {
  try {
    const response = await apiService.get(`/api/bookings/${bookingId}`);
    if (response.status === 201) {
      console.log("Your booking is confirmed successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized User");
      }
    }
    throw new Error(
      "An error occurred while confirming the booking" + error.message
    );
  }
};

export const addBooking = async (newBooking: Booking) => {
  try {
    const response = await apiService.post(`/api/bookings`, {newBooking});
    if (response.status === 201) {
      console.log("Your booking is added successfully", response.data);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      "An error occurred while adding the new booking" + error.message
    );
  }
};
