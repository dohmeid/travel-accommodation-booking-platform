import React, {
  FC,
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from 'react';
import { Room } from '../types/hotelTypes';

interface CartContextType {
  cartItems: Room[];
  addRoomToCart: (room: Room) => void;
  deleteRoomFromCart: (id: number) => void;
  getTotalPrice: () => number;
  isItemInCart: (id: number) => boolean;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Room[]>(
    JSON.parse(localStorage.getItem('cartItems') || '[]') as Room[],
  );

  //update the local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addRoomToCart = useCallback((room: Room) => {
    setCartItems((prevItems) => [...prevItems, { ...room }]);
  }, []);

  const deleteRoomFromCart = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.roomId !== id),
    );
  };

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }, [cartItems]);

  const isItemInCart = useCallback(
    (id: number) => cartItems.some((cartItem) => cartItem.roomId === id),
    [cartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addRoomToCart,
        deleteRoomFromCart,
        getTotalPrice,
        isItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
