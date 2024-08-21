import { SearchFilters, SearchQuery, SortCriteria } from '../types/searchTypes';
import { getToday, getTomorrow } from '../utils/dates';

export const PRICE_RANGE = { MIN: 0, MAX: 500 };

export const INITIAL_FILTERS: SearchFilters = {
  minPrice: PRICE_RANGE.MIN,
  maxPrice: PRICE_RANGE.MAX,
  rating: 0,
  amenitiesNames: [],
  room: '',
};

export const INITIAL_SEARCH_QUERY: SearchQuery = {
  checkInDate: getToday(),
  checkOutDate: getTomorrow(),
  city: '',
  starRate: 0,
  sort: SortCriteria.MinPriceFirst,
  numberOfRooms: 1,
  adults: 2,
  children: 0,
};

export const GUEST_DROPDOWN_ITEMS = [
  {
    id: 1,
    key: 'adults' as keyof SearchQuery,
    label: 'Adults',
    description: 'ages 18 and above',
  },
  {
    id: 2,
    key: 'children' as keyof SearchQuery,
    label: 'Children',
    description: 'ages 0-17',
  },
  {
    id: 3,
    key: 'numberOfRooms' as keyof SearchQuery,
    label: 'Rooms',
    description: '',
  },
];
