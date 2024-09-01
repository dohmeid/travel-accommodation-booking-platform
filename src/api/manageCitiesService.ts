import { apiClient, apiRequest, HttpMethod } from './apiClient';
import { City } from '../types/adminTypes';

export const getCities = async (pageNumber: number) => {
  try {
    const response = await apiClient.get('/api/cities', {
      params: {
        name: '',
        searchQuery: '',
        pageSize: 15,
        pageNumber: pageNumber,
      },
    });
    return response;
  } catch (error) {
    throw new Error('Error fetching cities:' + error);
  }
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
