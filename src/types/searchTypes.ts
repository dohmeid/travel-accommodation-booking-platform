import { Amenity } from "./adminTypes";

export interface SearchQuery {
  checkInDate: string; //default today
  checkOutDate: string; //defualt tommorow
  city: string;
  starRate: number;
  sort: string;
  numberOfRooms: number; //default: 1
  adults: number; //default: 2
  children: number; //default: 0
}

export interface SearchResult {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: Amenity[];
}

export interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  rating: number;
  amenitiesNames: string[];
  room: string;
}

export interface SearchContextProps {
  priceRange: { min: number; max: number };
  initialFilters: SearchFilters;
  initialSearchQuery: SearchQuery;
  filteredResults: SearchResult[];
  amenitiesList: Amenity[];
  sortBy: SortCriteria;
  searchQuery: SearchQuery;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  setSortBy: React.Dispatch<React.SetStateAction<SortCriteria>>;
  fetchSearchResults: (searchQuery: SearchQuery) => Promise<void>;
}

export type SortCriteria =
  | "MinPriceFirst"
  | "MaxPriceFirst"
  | "MinStarsFirst"
  | "MaxStarsFirst";