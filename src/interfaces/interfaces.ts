import RecentHotels from "../components/home/RecentHotels/RecentHotels";

export interface City {
  id: number;
  name: string;
  description: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export interface AdminContextType {
  cities: City[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  createCity: (cityData: City) => Promise<void>;
  updateCity: (cityData: City) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
  getFilteredCities: () => City[];

  hotels: Hotel[];
  getFilteredHotels: () => Hotel[];
  createHotel: (cityId: number, hotelData: Hotel) => Promise<void>;
  updateHotel: (hotelData: Hotel) => Promise<void>;
  deleteHotel: (cityId: number, hotelId: number) => Promise<void>;
}

export interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export interface Deal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface RecentHotel {
  hotelId: number;
  thumbnailUrl: string;
  hotelName: string;
  starRating: number;
  cityName: string;
  visitDate: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface HomeContextType {
  deals: Deal[];
  destinations: Destination[];
  recentHotels: RecentHotel[];
  fetchFeaturedDeals: () => Promise<void>;
  fetchTrendingDestinations: () => Promise<void>;
  fetchRecentHotels: () => Promise<void>;
}

//search page
export interface SearchQuery {
  checkInDate: string;
  checkOutDate: string;
  city: string;
  starRate: number;
  sort: string;
  numberOfRooms: number; //default: 1
  adults: number; //default: 2
  children: number; //default: 0
}

export interface Amenity {
  id: number;
  name: string;
  description: string;
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
