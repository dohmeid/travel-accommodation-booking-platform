import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { getCities, createCity, updateCityy, deleteCityy } from "../services/Api/adminApi";
import { City, AdminContextType } from "../interfaces/interfaces";

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //const [todosList, setTodosList] = useState<Todo[]>([]);
  //const [searchQuery, setSearchQuery] = useState<string>("");
  const [citiesList, setCitiesList] = useState<City[]>([]);



  //get all cities
  const fetchCities = async () => {
    try {
      const responseData = await getCities();
      console.log("got all the cities successfully");
      console.log(responseData);
      setCitiesList(responseData);
    } catch (error: any) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  //add new city
  const addNewCity = async () => {
    let newName = "Pariss";
    let newDescription =
      " Fall in love with the romantic charm of Paris, the 'City of Lights.' Admire the Eiffel Tower, stroll along the Seine River, and savor delicious pastries in charming cafes.";
    try {
      const responseData = await createCity(newName, newDescription);
      console.log("created new city successfully");
      console.log(responseData);
      fetchCities();
    } catch (error: any) {
      console.log(error.message);
    } finally {
    }
  };

  //delete a city
  const deleteCity = async (cityID: number) => {
    try {
      const responseData = await deleteCityy(cityID);
      console.log("deleted the city successfully");
      console.log(responseData);
      fetchCities();
    } catch (error: any) {
      console.error("Error deleting city:", error);
    }
  };

  //update ac city
  const updateCity = async (cityID: number) => {
    try {
      const responseData = await updateCityy(cityID, "lool", "lloll");
      console.log("updating the city successfully");
      console.log(responseData);
      await fetchCities();
    } catch (error: any) {
      console.error("Error updating the city:", error);
    }
  };


  return (
    <AdminContext.Provider
      value={{
        citiesList,
        addNewCity,
        updateCity,
        deleteCity,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
