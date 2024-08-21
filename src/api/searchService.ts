import { apiRequest, HttpMethod } from './apiClient';
import { SearchQuery, SearchResult } from '../types/searchTypes';
import { Amenity } from '../types/hotelTypes';

export const getSearchResults = async (query: SearchQuery) => {
  return apiRequest<SearchResult[]>(
    HttpMethod.GET,
    '/api/home/search',
    undefined,
    query,
  );
};

//this function is used to get search results amenities - to filter based on amenities in search page
export const getAmenities = async () => {
  return apiRequest<Amenity[]>(HttpMethod.GET, '/api/search-results/amenities');
};
