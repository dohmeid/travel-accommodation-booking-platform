import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

import {
  getHotelGallery,
  getHotelInfo,
  getHotelReviews,
  getHotelAvailableRooms,
} from "../services/Api/hotelApi";
import { useError } from "./ErrorProvider";
import {
  GalleryImage,
  HotelInformation,
  Review,
  Room,
} from "../interfaces/hotel";

interface HotelContextProps {
  //amenitiesList: Amenity[];
  //setSortBy: React.Dispatch<React.SetStateAction<string>>;
  //fetchSearchResults: (searchQuery: SearchQuery) => Promise<void>;
  fetchGallery: (id: number) => Promise<GalleryImage[]>;
  fetchInformation: (id: number) => Promise<HotelInformation>;
  fetchReviews: (id: number) => Promise<Review[]>;
  fetchAvailableRooms: (
    id: number,
    checkInDate: string,
    checkOutDate: string
  ) => Promise<Room[]>;
}

const HotelContext = createContext<HotelContextProps | undefined>(undefined);
export const HotelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useError();

  const fetchGallery = async (hotelId: number) => {
    try {
      const responseData = await getHotelGallery(hotelId);
      return responseData;
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchInformation = async (hotelId: number) => {
    try {
      const responseData = await getHotelInfo(hotelId);
      return responseData;
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchReviews = async (hotelId: number) => {
    try {
      const responseData = await getHotelReviews(hotelId);
      return responseData;
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
      return responseData;
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HotelContext.Provider
      value={{
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

//custom hook for the context
export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};
