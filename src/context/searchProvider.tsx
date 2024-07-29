import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

import { getAmenities, getSearchResults } from "../services/Api/homeApi";
import { useError } from "./ErrorProvider";
import { SearchResult, Amenity, SearchFilters } from "../interfaces/interfaces";

interface SearchContextProps {
  amenitiesList: Amenity[];
  filteredResults: SearchResult[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  initialFilters: SearchFilters;
  priceRange: { min: number; max: number };
}

export const priceRange = { min: 0, max: 500 };

export const initialFilters = {
  minPrice: priceRange.min,
  maxPrice: priceRange.max,
  rating: 0,
  amenitiesNames: [],
  room: "",
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);

  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>("Price");
  const { setError } = useError();

  //initially fetch the search results
  useEffect(() => {
    fetchSearchResults();
    fetchAmenities();
  }, []);

  //apply filters and then sort the results whenever filters or sortBy changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, searchResults]);

  //this function fetches search results from the api
  const fetchSearchResults = async () => {
    try {
      const query = {
        checkInDate: "",
        checkOutDate: "",
        city: "Ramallah",
        starRate: 0,
        sort: "",
        numberOfRooms: 1, //default: 1
        adults: 2, //default: 2
        children: 0, //default: 0
      };

      const responseData = await getSearchResults(query);
      console.log(responseData);
      setSearchResults(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  const fetchAmenities = async () => {
    try {
      const responseData = await getAmenities();
      console.log(responseData);
      setAmenitiesList(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  //this function sorts the search results
  const applyFiltersAndSort = () => {
    let filtered = [...searchResults];

    if (filters != initialFilters) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.roomPrice >= filters.minPrice &&
          hotel.roomPrice <= filters.maxPrice &&
          filters.amenitiesNames.every((selectedAmenity) =>
            hotel.amenities.some((amenity) =>
              amenity.name.toLowerCase().includes(selectedAmenity.toLowerCase())
            )
          ) &&
          (!filters.rating || hotel.starRating == filters.rating) &&
          (!filters.room || hotel.roomType === filters.room)
      );
    }

    if (sortBy === "Price") {
      filtered.sort((a, b) => b.roomPrice - a.roomPrice);
    } else if (sortBy === "Stars") {
      filtered.sort((a, b) => b.starRating - a.starRating);
    }

    setFilteredResults(filtered);
  };

  return (
    <SearchContext.Provider
      value={{
        filteredResults,
        amenitiesList,
        sortBy,
        setSortBy,
        setFilters,
        initialFilters,
        priceRange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

//custom hook for the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
