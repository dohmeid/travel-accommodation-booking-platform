import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "./ErrorProvider";
import { useCartContext } from "./cartProvider";
import { addBooking } from "../services/bookingApi";
import { Booking, BookingConfirmation } from "../types/bookingTypes";

interface BookingContextProps {
  bookingConfirm: BookingConfirmation | null;
  checkoutBooking: (bookingDetails: Booking) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useError();
  const { clearCart } = useCartContext();
  const navigate = useNavigate();

  const [bookingConfirm, setBookingConfirm] = useState<BookingConfirmation | null>(null);

  const checkoutBooking = async (bookingDetails: Booking) => {
    try {
      const responseData = await addBooking(bookingDetails);
      setBookingConfirm(responseData);
      console.log(bookingConfirm);
      clearCart();
      navigate("/main/confirmation");
    } catch (error: any) {
      setError(error);
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
    throw new Error("useBookingContext must be used within BookingProvider");
  }
  return context;
};
