import { useState } from 'react';
import {
  addHotel,
  editHotel,
  getHotels,
  removeHotel,
} from '../api/manageHotelsService';
import {
  NotificationType,
  useNotification,
} from '../context/notificationProvider';
import { useAdminContext } from '../context/adminProvider';
import { Hotel, SearchOptions } from '../types/adminTypes';

const useHotelsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { hotelsResponse, setHotelsResponse, searchOption, searchQuery } =
    useAdminContext();
  const { notify } = useNotification();
  const currPage = hotelsResponse.pagination.CurrentPage;

  const fetchHotels = async (page: number) => {
    setIsLoading(true);
    try {
      const queryParams =
        searchOption === SearchOptions.NAME ? searchQuery : '';
      const descriptionParams =
        searchOption === SearchOptions.DESCRIPTION ? searchQuery : '';
      const response = await getHotels(page, queryParams, descriptionParams);
      const pagination = JSON.parse(response.headers['x-pagination']);
      setHotelsResponse({ data: response.data, pagination: pagination });
    } catch (error: unknown) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const createHotel = async (cityID: number, hotelData: Hotel) => {
    setIsLoading(true);
    try {
      await addHotel(cityID, hotelData);
      await fetchHotels(currPage); //re-fetch new data to display
      notify(NotificationType.SUCCESS, 'created new hotel successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHotel = async (hotelData: Hotel) => {
    setIsLoading(true);
    try {
      await editHotel(hotelData);
      fetchHotels(1); //re-fetch new data to display
      notify(NotificationType.SUCCESS, 'updated successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHotel = async (hotelId: number) => {
    setIsLoading(true);
    try {
      await removeHotel(hotelId);
      await fetchHotels(1); //re-fetch new data to display
      notify(NotificationType.SUCCESS, 'deleted successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    hotelsResponse,
    fetchHotels,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};

export default useHotelsManagement;
