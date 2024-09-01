import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  addCity,
  editCity,
  getCities,
  removeCity,
} from '../api/manageCitiesService';
import {
  addHotel,
  editHotel,
  getHotels,
  removeHotel,
} from '../api/manageHotelsService';
import { Hotel, City, AdminContextType, Pagination } from '../types/adminTypes';
import { useAdminCrud } from '../hooks/useAdminCrud';
import { NotificationType, useNotification } from './notificationProvider';

export const AdminContext = createContext<AdminContextType | null>(null);
export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('name');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationData, setPaginationData] = useState<Pagination>({
    CurrentPage: 0,
    TotalPageCount: 0,
    TotalItemCount: 0,
    PageSize: 0,
  });

  const { notify } = useNotification();
  const { createData, updateData, deleteData } = useAdminCrud();

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await getCities(page);
      setCities(response.data);
    } catch (error: unknown) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const response = await getHotels(page);
      const pagination = JSON.parse(response.headers['x-pagination']);
      setHotels(response.data);
      setPaginationData(pagination);
    } catch (error: unknown) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchHotels();
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [page]);

  //--------------------managing cities functions
  const createCity = (cityData: City) =>
    createData(addCity, cityData, setCities);
  const updateCity = (cityData: City) =>
    updateData(editCity, cityData, setCities);
  const deleteCity = (id: number) => deleteData(removeCity, id, setCities);

  const getFilteredCities = (): City[] => {
    const query = searchQuery.toLowerCase();
    return cities.filter((city) =>
      searchOption === 'name'
        ? city.name.toLowerCase().includes(query)
        : city.description.toLowerCase().includes(query),
    );
  };

  //--------------------managing hotels functions
  const createHotel = (cityID: number, hotelData: Hotel) =>
    createData((data) => addHotel(cityID, data), hotelData, setHotels);
  const updateHotel = (hotelData: Hotel) =>
    updateData(editHotel, hotelData, setHotels);
  const deleteHotel = (hotelId: number) =>
    deleteData((id) => removeHotel(id), hotelId, setHotels);

  const getFilteredHotels = (): Hotel[] => {
    const query = searchQuery.toLowerCase();
    return hotels.filter((hotel) =>
      searchOption === 'name'
        ? hotel.name.toLowerCase().includes(query)
        : hotel.description.toLowerCase().includes(query),
    );
  };

  return (
    <AdminContext.Provider
      value={{
        page,
        isLoading,
        paginationData,
        setIsLoading,
        setPage,

        cities,
        setSearchQuery,
        setSearchOption,
        createCity,
        updateCity,
        deleteCity,
        getFilteredCities,

        hotels,
        createHotel,
        updateHotel,
        deleteHotel,
        getFilteredHotels,
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
