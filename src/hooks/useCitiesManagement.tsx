import { useState } from 'react';
import {
  addCity,
  editCity,
  getCities,
  removeCity,
} from '../api/manageCitiesService';
import {
  NotificationType,
  useNotification,
} from '../context/notificationProvider';
import { useAdminContext } from '../context/adminProvider';
import { City, SearchOptions } from '../types/adminTypes';

const useCitiesManagement = () => {
  const { cities, setCities, searchOption, searchQuery } = useAdminContext();
  const [isLoading, setIsLoading] = useState(true);
  const { notify } = useNotification();

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await getCities();
      setCities(response);
    } catch (error: unknown) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (cityData: City) => {
    try {
      const responseData = await addCity(cityData);
      setCities((prevData) => [...prevData, responseData]);
      notify(NotificationType.SUCCESS, 'created new item successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const updateCity = async (cityData: City) => {
    try {
      await editCity(cityData);
      setCities((prevData) =>
        prevData.map((item) =>
          item.id === cityData.id ? { ...item, ...cityData } : item,
        ),
      );
      notify(NotificationType.SUCCESS, 'updated successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const deleteCity = async (id: number) => {
    try {
      await removeCity(id);
      setCities((prevData) => prevData.filter((item) => item.id !== id));
      notify(NotificationType.SUCCESS, 'deleted successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const getFilteredCities = (): City[] => {
    const query = searchQuery;
    return cities.filter((city) =>
      searchOption === SearchOptions.NAME
        ? city.name.toLowerCase().includes(query.toLowerCase())
        : city.description.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return {
    cities,
    isLoading,
    fetchCities,
    getFilteredCities,
    createCity,
    updateCity,
    deleteCity,
  };
};

export default useCitiesManagement;
