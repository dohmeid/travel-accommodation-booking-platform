import React, {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
} from "react";
import {
  getHotelGallery,
  getHotelInfo,
  getHotelReviews,
  getHotelAvailableRooms,
} from "../services/hotelApi";
import { useError } from "./ErrorProvider";
import {
  GalleryImage,
  HotelInformation,
  Review,
  Room,
} from "../types/hotelTypes";

interface HotelContextProps {
  gallery: GalleryImage[];
  info: HotelInformation | undefined;
  reviews: Review[];
  rooms: Room[];
  fetchGallery: (id: number) => Promise<void>;
  fetchInformation: (id: number) => Promise<void>;
  fetchReviews: (id: number) => Promise<void>;
  fetchAvailableRooms: (
    id: number,
    checkInDate: string,
    checkOutDate: string
  ) => Promise<void>;
}

const HotelContext = createContext<HotelContextProps | undefined>(undefined);

export const HotelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [info, setInfo] = useState<HotelInformation | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { setError } = useError();

  const fetchGallery = async (hotelId: number) => {
    try {
      const responseData = await getHotelGallery(hotelId);
      setGallery(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchInformation = async (hotelId: number) => {
    try {
      const responseData = await getHotelInfo(hotelId);
      setInfo(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchReviews = async (hotelId: number) => {
    try {
      const responseData = await getHotelReviews(hotelId);
      setReviews(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchAvailableRooms = async (
    hotelId: number,
    checkInDate: string,
    checkOutDate: string
  ) => {
    try {
      const responseData = await getHotelAvailableRooms(
        hotelId,
        checkInDate,
        checkOutDate
      );
      setRooms(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        gallery,
        info,
        reviews,
        rooms,
        fetchGallery,
        fetchInformation,
        fetchReviews,
        fetchAvailableRooms,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
