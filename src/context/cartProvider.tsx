import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { addBooking } from "../services/Api/bookingApi";
import { Booking, BookingConfirmation } from "../interfaces/booking";

import { useError } from "./ErrorProvider";
import { Room } from "../interfaces/hotelPageTypes";
import { useNavigate } from "react-router-dom";

interface CartContextProps {
  cartItems: Room[];
  bookingConfirm: BookingConfirmation;
  addRoomToCart: (room: Room) => void;
  deleteRoomFromCart: (id: number) => void;
  getTotalPrice: () => number;
  isItemInCart: (id: number) => boolean;
  checkoutBooking: (bookingDetails: Booking) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useError();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<Room[]>(
    JSON.parse(localStorage.getItem("cartItems") || "[]") as Room[]
  );

  const [bookingConfirm, setBookingConfirm] = useState<BookingConfirmation>({
    customerName: "string",
    hotelName: "string",
    roomNumber: 0,
    roomType: "string",
    bookingDateTime: "2024-08-04T20:07:44.527Z",
    totalCost: 0,
    paymentMethod: "string",
    bookingStatus: "string",
    confirmationNumber: "string",
  });

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  //update the local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //****************************FUNCTIONS****************************
  //add a product to the cast
  const addRoomToCart = (room: Room) => {
    setCartItems([...cartItems, { ...room }]);
  };

  //delete an item from the cart
  const deleteRoomFromCart = (id: number) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.roomId !== id));
  };

  //compute the total price of cart items whenever cartItems change
  const getTotalPrice = () => {
    let price = cartItems.reduce((sum, item) => sum + item.price, 0);
    return price;
  };

  //check if room is already in the cart -> disable add to cart button
  const isItemInCart = (id: number) => {
    return cartItems.some((cartItem) => cartItem.roomId === id);
  };

  //clear all items in cart
  const clearCart = () => {
    // Set cartItems to an empty array
    setCartItems([]);
    // Remove cart items from localStorage
    localStorage.removeItem("cartItems");
  };

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
    <CartContext.Provider
      value={{
        cartItems,
        bookingConfirm,
        addRoomToCart,
        getTotalPrice,
        deleteRoomFromCart,
        isItemInCart,
        checkoutBooking,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//custom hook for the context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a HotelProvider");
  }
  return context;
};
