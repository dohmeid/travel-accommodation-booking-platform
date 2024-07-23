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
  } from "../services/Api/cityApi";
  import { getHotels,addHotel, editHotel ,removeHotel} from "../services/Api/hotelApi";
  import { Hotel, City, AdminContextType } from "../interfaces/interfaces";
  import { useError } from "./ErrorProvider";
  
  export const AdminContext = createContext<AdminContextType | null>(null);
  
  export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("name");
  
    const [hotels, setHotels] = useState<Hotel[]>([]);
  
    const { setError } = useError();
  
    useEffect(() => {
      fetchCities();
      fetchHotels();
    }, []);
  
    //--------------------managing cities functions
    //get all cities
    const fetchCities = async () => {
      try {
        const responseData = await getCities();
        setCities(responseData);
      } catch (error: any) {
        setError(error);
      }
    };
  
    //add new city
    const createCity = async (cityData: City) => {
      try {
        const responseData = await addCity(cityData);
        //fetchCities();
        setCities([...cities, { ...responseData }]); //add the new city to the cities list
      } catch (error: any) {
        setError(error);
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
        setError(error);
      }
    };
  
    //delete a city
    const deleteCity = async (id: number) => {
      try {
        const responseData = await removeCity(id);
        setCities(cities.filter((city) => city.id !== id)); //delete the city from the cities list
      } catch (error: any) {
        setError(error);
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
  
    //--------------------managing hotels functions
    //get all hotels
    const fetchHotels = async () => {
      try {
        const responseData = await getHotels();
        setHotels(responseData);
      } catch (error: any) {
        setError(error);
      }
    };
  
    //add new city
    const createHotel= async (cityID: number, hotelData: Hotel) => {
      try {
        const responseData = await addHotel(cityID,hotelData);
        //hotelData
        setHotels([...hotels, { ...responseData }]); //add the new hotel to the hotels list
      } catch (error: any) {
        setError(error);
      }
    };
  
    //update a hotel
    const updateHotel = async (hotelData: Hotel) => {
      try {
        const responseData = await editHotel(hotelData);
        //update the city in the original cities list
        setHotels(
          hotels.map((hotel) =>
            hotel.id === hotelData.id
              ? {
                  ...hotel,
                  ...hotelData,
                }
              : hotel
          )
        );
      } catch (error: any) {
        setError(error);
      }
    };
  
    //delete a hotel
    const deleteHotel = async (cityId: number,hotelId: number) => {
      try {
        const responseData = await removeHotel(cityId, hotelId);
        setHotels(hotels.filter((hotel) => hotel.id !== hotelId)); //delete the hotel from the hotels list
      } catch (error: any) {
        setError(error);
      }
    };
  
    //this function returns the cities list to display on the screen - either original list or filtered based on search filters
    const getFilteredHotels = (): Hotel[] => {
      if (searchQuery !== "" && searchFilter === "name") {
        return hotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchQuery !== "" && searchFilter === "description") {
        return hotels.filter((hotel) =>
          hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return hotels;
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
  
          hotels,
          createHotel,
          updateHotel,
          deleteHotel,
          getFilteredHotels,
        }}
      >
        {children}
      </AdminContext.Provider>
    );
  };
  