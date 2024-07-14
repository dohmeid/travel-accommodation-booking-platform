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
  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");

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

  //this function returns the cities list to display on the screen - either original list or filtered based on search filters
  const getFilteredCities = (): City[] => {
    if (searchQuery !== "" && searchFilter === "name") {
      return cities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (searchQuery !== "" && searchFilter === "description") {
      return cities.filter((city) =>
        city.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return cities;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        cities,
        setSearchQuery,
        setSearchFilter,
        createCity,
        updateCity,
        deleteCity,
        getFilteredCities,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
