import { apiRequest, HttpMethod } from './apiClient';
import { Deal, Destination, RecentHotel } from '../types/homeTypes';

export const getFeaturedDeals = async () => {
  return apiRequest<Deal[]>(HttpMethod.GET, '/api/home/featured-deals');
};

export const getTrendingDestinations = async () => {
  return apiRequest<Destination[]>(
    HttpMethod.GET,
    '/api/home/destinations/trending',
  );
};

export const getRecentHotels = async (userId: number) => {
  return apiRequest<RecentHotel[]>(
    HttpMethod.GET,
    `/api/home/users/${userId}/recent-hotels`,
  );
};
