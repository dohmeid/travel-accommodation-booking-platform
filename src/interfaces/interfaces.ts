export interface City {
  id: number;
  name: string;
  description: string;
}

export interface AdminContextType {
  citiesList: City[];
  addNewCity: () => Promise<void>;
  updateCity: (id:number) => Promise<void>;
  deleteCity: (id:number) => Promise<void>;
}
