import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { getAmenities, getSearchResults } from "../services/Api/searchApi";
import {
  filterResults,
  sortResults,
} from "../services/Utils/filterAndSortUtils";
import { useError } from "./ErrorProvider";
import { Amenity } from "../interfaces/interfaces";
import {
  SearchResult,
  SearchFilters,
  SearchQuery,
  SearchContextProps,
  SortCriteria,
} from "../interfaces/searchTypes";

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //constants
  const priceRange = { min: 0, max: 500 };
  const initialFilters = {
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    rating: 0,
    amenitiesNames: [],
    room: "",
  };

  //states
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortCriteria>("MinPriceFirst");
  const { setError } = useError();

  //fetch amenities on initial render
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const responseData = await getAmenities();
        setAmenitiesList(responseData);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchAmenities();
  }, []);

  //apply filters and sort results whenever dependencies change
  useEffect(() => {
    const applyFiltersAndSorting = () => {
      const filtered = filterResults(searchResults, filters);
      const sorted = sortResults(filtered, sortBy);
      setFilteredResults(sorted);
    };

    applyFiltersAndSorting();
  }, [filters, sortBy, searchResults]);

  //fetch search results on demand
  const fetchSearchResults = async (searchQuery: SearchQuery) => {
    try {
      const responseData = await getSearchResults(searchQuery);
      setSearchResults(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        initialFilters,
        priceRange,
        filteredResults,
        amenitiesList,
        sortBy,
        fetchSearchResults,
        setFilters,
        setSortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
