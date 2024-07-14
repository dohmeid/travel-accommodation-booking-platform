import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import {
  getCities,
  addCity,
  editCity,
  removeCity,
} from "../services/Api/adminApi";
import { City, AdminContextType } from "../interfaces/interfaces";

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //const [searchQuery, setSearchQuery] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCities();
  }, []);

  //get all cities
  const fetchCities = async () => {
    try {
      const responseData = await getCities();
      setCities(responseData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //add new city
  const createCity = async (cityData: City) => {
    try {
      const responseData = await addCity(cityData);
      //fetchCities();
      //add the new city to the cities list
      setCities([...cities, { ...responseData }]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //update a city
  const updateCity = async (cityData: City) => {
    try {
      const responseData = await editCity(cityData);
      //update the city in the original cities list
      setCities(
        cities.map((city) =>
          city.id === cityData.id
            ? {
                ...city,
                name: cityData.name,
                description: cityData.description,
              }
            : city
        )
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  //delete a city
  const deleteCity = async (id: number) => {
    try {
      const responseData = await removeCity(id);
      //fetchCities();
      //delete the city from the cities list
      setCities(cities.filter((city) => city.id !== id));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        cities,
        createCity,
        updateCity,
        deleteCity,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
