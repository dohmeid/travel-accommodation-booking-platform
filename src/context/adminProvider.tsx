import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  getCities,
  addCity,
  editCity,
  removeCity,
} from '../api/manageCitiesService';
import {
  getHotels,
  addHotel,
  editHotel,
  removeHotel,
} from '../api/manageHotelsService';
import { Hotel, City, AdminContextType } from '../types/adminTypes';
import { useAdminCrud } from '../hooks/useAdminCrud';

export const AdminContext = createContext<AdminContextType | null>(null);
export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('name');

  const { fetchData, createData, updateData, deleteData, isLoading } =
    useAdminCrud();

  useEffect(() => {
    fetchData(getCities, setCities);
    fetchData(getHotels, setHotels);
  }, []);

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
        isLoading,
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
