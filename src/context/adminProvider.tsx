import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
} from 'react';
import {
  City,
  Room,
  AdminContextType,
  Hotel,
  SearchOptions,
  Pagination,
} from '../types/adminTypes';

export const AdminContext = createContext<AdminContextType | null>(null);
export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState(SearchOptions.NAME);

  const [hotelsResponse, setHotelsResponse] = useState<{
    data: Hotel[];
    pagination: Pagination;
  }>({
    data: [],
    pagination: {
      CurrentPage: 1,
      TotalPageCount: 0,
      TotalItemCount: 0,
      PageSize: 0,
    },
  });

  return (
    <AdminContext.Provider
      value={{
        cities,
        setCities,
        hotelsResponse,
        setHotelsResponse,
        rooms,
        setRooms,
        searchQuery,
        setSearchQuery,
        searchOption,
        setSearchOption,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within AdminProvider');
  }
  return context;
};
