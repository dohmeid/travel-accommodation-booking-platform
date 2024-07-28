import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  getAmenities,
  getSearchResults,
  getFeaturedDeals,
  getTrendingDestinations,
  getRecentHotels,
} from "../services/Api/homeApi";

import { HomeContextType, Destination } from "../interfaces/interfaces";

import { AuthenticationContext } from "./authentication";
import { AuthenticationContextType } from "../interfaces/auth";

import { useError } from "./ErrorProvider";

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export const HomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useContext(
    AuthenticationContext
  ) as AuthenticationContextType;

  const { setError } = useError();
  const [deals, setDeals] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [recentHotels, setRecentHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchTrendingDestinations();
    fetchFeaturedDeals();
    //fetchRecentHotels();
    fetchSearchResults();
  }, []);

  //do the search
  const fetchSearchResults = async () => {
    try {
      const query = {
        checkInDate: "",
        checkOutDate: "",
        city: "Ramallah",
        starRate: 0,
        sort: "",
        numberOfRooms: 1, //default: 1
        adults: 2, //default: 2
        children: 0, //default: 0
      };

      const responseData = await getSearchResults(query);
      console.log(responseData);
      setSearchResults(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchAmenities = async () => {};

  //get featured deals
  const fetchFeaturedDeals = async () => {
    try {
      const responseData = await getFeaturedDeals();
      setDeals(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  //get trending destinations
  const fetchTrendingDestinations = async () => {
    try {
      const responseData = await getTrendingDestinations();
      setDestinations(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  //get featured deals
  const fetchRecentHotels = async () => {
    try {
      const responseData = await getRecentHotels(userId);
      setRecentHotels(responseData);
      console.log(recentHotels);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        searchResults,
        deals,
        destinations,
        recentHotels,
        fetchFeaturedDeals,
        fetchTrendingDestinations,
        fetchRecentHotels,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

// Custom hook to use the context
export const useHomeProvider = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeProvider must be used within a HomeProvider");
  }
  return context;
};
