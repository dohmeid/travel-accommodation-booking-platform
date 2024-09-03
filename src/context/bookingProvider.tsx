import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification, NotificationType } from './notificationProvider';
import { useCartContext } from './cartProvider';
import { addBooking } from '../api/bookingService';
import { Booking, BookingConfirmation } from '../types/bookingTypes';

interface BookingContextProps {
  bookingConfirm: BookingConfirmation | null;
  checkoutBooking: (bookingDetails: Booking) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined,
);
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingConfirm, setBookingConfirm] =
    useState<BookingConfirmation | null>(null);
  const { clearCart } = useCartContext();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const checkoutBooking = async (bookingDetails: Booking) => {
    try {
      const responseData = await addBooking(bookingDetails);
      setBookingConfirm(responseData);
      clearCart();
      navigate('/main/confirmation');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookingConfirm,
        checkoutBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return context;
};
