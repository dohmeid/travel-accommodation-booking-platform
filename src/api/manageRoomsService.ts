import { apiRequest, HttpMethod } from './apiClient';
import { Hotel } from '../types/adminTypes';

export const getHotels = async () => {
  return apiRequest<Hotel[]>(HttpMethod.GET, '/api/hotels', undefined, {
    name: '',
    searchQuery: '',
    pageSize: 10,
    pageNumber: 1,
  });
};
