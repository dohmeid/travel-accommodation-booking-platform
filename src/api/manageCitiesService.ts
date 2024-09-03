import { apiRequest, HttpMethod } from './apiClient';
import { City } from '../types/adminTypes';

export const getCities = async () => {
  return apiRequest<City[]>(HttpMethod.GET, `/api/cities`, undefined, {
    name: '', //search in cities is handles in client-side for better user experience
    searchQuery: '',
    pageSize: 15,
    pageNumber: 1, //note: this endpoint doesn't support pagination (only 8 results back)
  });
};

export const addCity = async (newCity: City) => {
  return apiRequest<City>(HttpMethod.POST, '/api/cities', newCity);
};

export const editCity = async (updatedCity: City) => {
  return apiRequest<string>(
    HttpMethod.PUT,
    `/api/cities/${updatedCity.id}`,
    updatedCity,
  );
};

export const removeCity = async (cityId: number) => {
  return apiRequest<string>(HttpMethod.DELETE, `/api/cities/${cityId}`);
};
