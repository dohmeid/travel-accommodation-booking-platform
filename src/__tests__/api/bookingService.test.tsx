import { apiRequest, HttpMethod } from '../../api/apiClient';
import { getBooking, addBooking } from '../../api/bookingService';
import { Booking, BookingConfirmation } from '../../types/bookingTypes';

jest.mock('../../api/apiClient', () => {
  return {
    apiRequest: jest.fn(),
    HttpMethod: {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
    },
  };
});

describe('Booking API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Api success tests', () => {
    it('should make a GET request to fetch booking confirmation', async () => {
      const bookingId = 123;
      const mockConfirmation: BookingConfirmation = {
        customerName: 'John Doe',
        hotelName: 'Grand Hotel',
        roomNumber: 101,
        roomType: 'Deluxe',
        bookingDateTime: '2024-08-03T20:01:47.334Z',
        totalCost: 250.0,
        paymentMethod: 'Credit Card',
        bookingStatus: 'Confirmed',
        confirmationNumber: 'CONF123456',
      };

      (apiRequest as jest.Mock).mockResolvedValueOnce(mockConfirmation);
      const result = await getBooking(bookingId);

      expect(apiRequest).toHaveBeenCalledWith(
        HttpMethod.GET,
        `/api/bookings/${bookingId}`,
      );
      expect(result).toEqual(mockConfirmation);
    });

    it('should make a Post request to add new booking', async () => {
      const newBooking: Booking = {
        customerName: 'John Doe',
        hotelName: 'Grand Hotel',
        roomNumber: 101,
        roomType: 'Deluxe',
        bookingDateTime: '2024-08-03T20:01:47.334Z',
        totalCost: 250.0,
        paymentMethod: 'Credit Card',
      };
      const mockConfirmation: BookingConfirmation = {
        ...newBooking,
        bookingStatus: 'Confirmed',
        confirmationNumber: 'CONF654321',
      };
      (apiRequest as jest.Mock).mockResolvedValueOnce(mockConfirmation);

      const result = await addBooking(newBooking);

      expect(apiRequest).toHaveBeenCalledWith(
        HttpMethod.POST,
        '/api/bookings',
        newBooking,
      );
      expect(result).toEqual(mockConfirmation);
    });
  });

  describe('Api failure tests', () => {
    it('should handle errors on getBooking call', async () => {
      const bookingId = 1;
      (apiRequest as jest.Mock).mockRejectedValueOnce(
        new Error('API call failed'),
      );
      await expect(getBooking(bookingId)).rejects.toThrow('API call failed');
    });

    it('should handle errors on addBooking call', async () => {
      const newBooking: Booking = {
        customerName: 'John Doe',
        hotelName: 'Grand Hotel',
        roomNumber: 101,
        roomType: 'Deluxe',
        bookingDateTime: '2024-08-03T20:01:47.334Z',
        totalCost: 250.0,
        paymentMethod: 'Credit Card',
      };
      (apiRequest as jest.Mock).mockRejectedValueOnce(
        new Error('API call failed'),
      );
      await expect(addBooking(newBooking)).rejects.toThrow('API call failed');
    });
  });
});
