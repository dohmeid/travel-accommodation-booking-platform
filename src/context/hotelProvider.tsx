import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

import { getHotelGallery } from "../services/Api/hotelApi";
import { useError } from "./ErrorProvider";
import {GalleryImage} from "../interfaces/hotel";

interface HotelContextProps {
  //amenitiesList: Amenity[];
  //setSortBy: React.Dispatch<React.SetStateAction<string>>;
  //fetchSearchResults: (searchQuery: SearchQuery) => Promise<void>;
  fetchGallery: (id: number) => Promise<GalleryImage[]>;
}

const HotelContext = createContext<HotelContextProps | undefined>(undefined);

export const HotelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useError();

  //this function fetches search results from the api
  const fetchGallery = async (hotelId: number) => {
    try {
      const responseData = await getHotelGallery(hotelId);
      return responseData;
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        fetchGallery,
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
