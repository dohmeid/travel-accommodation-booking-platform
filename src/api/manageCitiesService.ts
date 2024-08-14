import { apiRequest, HttpMethod } from "./apiClient";
import { City } from "../types/adminTypes";

export const getCities = async () => {
  return apiRequest<City[]>(HttpMethod.GET, "/api/cities", undefined, {
    name: "",
    searchQuery: "",
    pageSize: 10,
    pageNumber: 1,
  });
};

export const addCity = async (newCity: City) => {
  return apiRequest<City>(HttpMethod.POST, "/api/cities", newCity);
};

export const editCity = async (updatedCity: City) => {
  return apiRequest<string>(
    HttpMethod.PUT,
    `/api/cities/${updatedCity.id}`,
    updatedCity
  );
};

export const removeCity = async (cityId: number) => {
  return apiRequest<string>(HttpMethod.DELETE, `/api/cities/${cityId}`);
};
