import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  getFeaturedDeals,
  getTrendingDestinations,
  getRecentHotels,
} from '../api/homeService';
import {
  Deal,
  Destination,
  RecentHotel,
  HomeContextType,
} from '../types/homeTypes';
import { useAuthContext } from './authProvider';
import { NotificationType, useNotification } from './notificationProvider';

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined,
);
export const HomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [recentHotels, setRecentHotels] = useState<RecentHotel[]>([]);
  const { notify } = useNotification();
  const { getUserId } = useAuthContext();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const userId = getUserId();
      const [featuredDeals, trendingDestinations, recentHotels] =
        await Promise.all([
          getFeaturedDeals(),
          getTrendingDestinations(),
          getRecentHotels(userId),
        ]);
      setDeals(featuredDeals);
      setDestinations(trendingDestinations);
      setRecentHotels(recentHotels);
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

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
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return context;
};
