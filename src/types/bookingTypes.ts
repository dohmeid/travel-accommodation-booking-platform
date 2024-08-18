export interface Booking {
  customerName: string;
  hotelName: string;
  roomNumber: number;
  roomType: string;
  bookingDateTime: string; //"2024-08-03T20:01:47.334Z";
  totalCost: number;
  paymentMethod: string;
}

export interface BookingConfirmation extends Booking {
  bookingStatus: string;
  confirmationNumber: string;
}
