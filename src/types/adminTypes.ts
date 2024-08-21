export enum GridType {
  CITY = 'city',
  HOTEL = 'hotel',
  ROOM = 'room',
}

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
  isLoading: boolean;
  cities: City[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;

  createCity: (cityData: City) => Promise<void>;
  updateCity: (cityData: City) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
  getFilteredCities: () => City[];

  hotels: Hotel[];
  getFilteredHotels: () => Hotel[];
  createHotel: (cityId: number, hotelData: Hotel) => Promise<void>;
  updateHotel: (hotelData: Hotel) => Promise<void>;
  deleteHotel: (hotelId: number) => Promise<void>;
}
