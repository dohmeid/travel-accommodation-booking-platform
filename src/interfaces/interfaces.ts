export interface City {
  id: number;
  name: string;
  description: string;
}

export interface AdminContextType {
  cities: City[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  createCity: (cityData: City) => Promise<void>;
  updateCity: (cityData: City) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
  getFilteredCities: () => City[];
}
