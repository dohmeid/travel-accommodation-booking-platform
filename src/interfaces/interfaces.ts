export interface City {
  id: number;
  name: string;
  description: string;
}

export interface AdminContextType {
  cities: City[];
  createCity: (cityData: City) => Promise<void>;
  updateCity: (cityData: City) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}
