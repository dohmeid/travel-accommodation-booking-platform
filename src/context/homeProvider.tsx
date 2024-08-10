import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  getFeaturedDeals,
  getTrendingDestinations,
  getRecentHotels,
} from "../services/Api/homeApi";
import { HomeContextType } from "../interfaces/homePageTypes";
import { useAuthContext } from "./authProvider";
import { useError } from "./ErrorProvider";

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);
export const HomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useAuthContext();
  const { setError } = useError();

  const [deals, setDeals] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [recentHotels, setRecentHotels] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featuredDeals, trendingDestinations, recentHotels] =
          await Promise.all([
            getFeaturedDeals(),
            getTrendingDestinations(),
            getRecentHotels(userId),
          ]);
        setDeals(featuredDeals);
        setDestinations(trendingDestinations);
        setRecentHotels(recentHotels);
        console.log("Home Data fetched successfully");
      } catch (error: any) {
        setError(error);
      }
    };

    fetchHomeData();
  }, [userId]);

  return (
    <HomeContext.Provider
      value={{
        deals,
        destinations,
        recentHotels,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
