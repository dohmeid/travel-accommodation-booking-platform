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
import { SearchResult, Amenity } from "../interfaces/interfaces";

interface SearchContextProps {
  //searchResults: SearchResult[];
  //setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  //filters: Filters;
  //setFilters: React.Dispatch<React.SetStateAction<Filters>>;

  filteredResults: SearchResult[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;

  // applyFiltersAndSort: () => void;
}

interface Filters {
  minPrice: number;
  maxPrice: number;
  rating: number;
  amenities: Amenity[];
  roomType: string;
}

const initialFilters = {
  minPrice: 0,
  maxPrice: 100,
  rating: 0,
  amenities: [],
  roomType: "",
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string>("Price");

  const { setError } = useError();

  //initially fetch the search results
  useEffect(() => {
    fetchSearchResults();
  }, []);

  //re-sort the search results when results or selected sort method changes
  useEffect(() => {
    sortResults();
  }, [sortBy, searchResults]);

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

  const fetchAmenities = async () => {};

  //this function sorts the search results
  const sortResults = () => {
    let sortedArray = [...searchResults];

    if (sortBy === "Price") {
      sortedArray.sort((a, b) => b.roomPrice - a.roomPrice);
    } else if (sortBy === "Stars") {
      sortedArray.sort((a, b) => b.starRating - a.starRating);
    }

    setFilteredResults(sortedArray);
  };

  //this function sorts the search results
  const applyFiltersAndSort = () => {
    let filtered = [...searchResults];
    const { minPrice, maxPrice, rating, amenities, roomType } = filters;

    filtered = filtered.filter(
      (hotel) =>
        hotel.roomPrice >= minPrice &&
        hotel.roomPrice <= maxPrice &&
        hotel.starRating >= rating &&
        (!amenities.length ||
          amenities.every((am) => hotel.amenities.includes(am))) &&
        (!roomType || hotel.roomType === roomType)
    );

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
        sortBy,
        setSortBy,
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
