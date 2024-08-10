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

export interface Amenity {
  id: number;
  name: string;
  description: string;
}
