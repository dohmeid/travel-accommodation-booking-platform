import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { getTrendingDestinations } from "../services/Api/homeApi";
import { HomeContextType, Destination } from "../interfaces/interfaces";
import { useError } from "./ErrorProvider";

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export const HomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setError } = useError();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchTrendingDestinations();
  }, []);

  //get trending destinations
  const fetchTrendingDestinations = async () => {
    try {
      const responseData = await getTrendingDestinations();
      setDestinations(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        destinations,
        fetchTrendingDestinations,
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
