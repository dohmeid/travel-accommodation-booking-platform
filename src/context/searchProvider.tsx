import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import { getAmenities, getSearchResults } from '../api/searchService';
import { filterResults, sortResults } from '../utils/filterAndSortUtils';
import { useNotification, NotificationType } from './notificationProvider';
import { Amenity } from '../types/hotelTypes';
import {
  SearchResult,
  SearchFilters,
  SearchQuery,
  SearchContextProps,
  SortCriteria,
} from '../types/searchTypes';
import {
  INITIAL_FILTERS,
  INITIAL_SEARCH_QUERY,
} from '../constants/searchDefaults';

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortCriteria>(
    SortCriteria.MinPriceFirst,
  );
  const [searchQuery, setSearchQuery] =
    useState<SearchQuery>(INITIAL_SEARCH_QUERY);
  const { notify } = useNotification();

  //fetch amenities on initial render
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const responseData = await getAmenities();
        setAmenitiesList(responseData);
      } catch (error) {
        notify(NotificationType.ERROR, (error as Error).message);
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
    setSearchQuery(searchQuery); //save the latest search query
    try {
      const responseData = await getSearchResults(searchQuery);
      setSearchResults(responseData);
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        filteredResults,
        amenitiesList,
        sortBy,
        searchQuery,
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
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
