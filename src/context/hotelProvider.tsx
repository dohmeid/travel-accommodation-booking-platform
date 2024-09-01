import React, {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
} from 'react';
import {
  getHotelGallery,
  getHotelInfo,
  getHotelReviews,
  getHotelAvailableRooms,
} from '../api/hotelService';
import {
  GalleryImage,
  HotelInformation,
  Review,
  Room,
  HotelContextProps,
} from '../types/hotelTypes';
import { NotificationType, useNotification } from './notificationProvider';

const HotelContext = createContext<HotelContextProps | undefined>(undefined);

export const HotelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [info, setInfo] = useState<HotelInformation | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notify } = useNotification();

  const fetchHotelData = async (
    hotelId: number,
    checkInDate: string,
    checkOutDate: string,
  ) => {
    try {
      const [hotelGallery, hotelInfo, hotelReviews, hotelRooms] =
        await Promise.all([
          getHotelGallery(hotelId),
          getHotelInfo(hotelId),
          getHotelReviews(hotelId),
          getHotelAvailableRooms(hotelId, checkInDate, checkOutDate),
        ]);
      setGallery(hotelGallery);
      setInfo(hotelInfo);
      setReviews(hotelReviews);
      setRooms(hotelRooms);
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        gallery,
        info,
        reviews,
        rooms,
        isLoading,
        fetchHotelData,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotelContext must be used within a HotelProvider');
  }
  return context;
};
