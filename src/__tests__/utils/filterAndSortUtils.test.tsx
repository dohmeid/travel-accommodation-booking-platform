import { filterResults, sortResults } from '../../utils/filterAndSortUtils';
import {
  SearchResult,
  SearchFilters,
  SortCriteria,
  RoomTypes,
} from '../../types/searchTypes';
import { PRICE_RANGE } from '../../constants/searchDefaults';

const searchResults: SearchResult[] = [
  {
    hotelId: 0,
    hotelName: 'Hotel A',
    starRating: 4,
    latitude: 0,
    longitude: 0,
    roomPrice: 100,
    roomType: RoomTypes.Cabin,
    cityName: '',
    roomPhotoUrl: '',
    discount: 12,
    amenities: [],
  },
  {
    hotelId: 1,
    hotelName: 'Hotel B',
    starRating: 5,
    latitude: 0,
    longitude: 0,
    roomPrice: 200,
    roomType: RoomTypes.Standard,
    cityName: '',
    roomPhotoUrl: '',
    discount: 12,
    amenities: [],
  },
  {
    hotelId: 2,
    hotelName: 'Hotel C',
    starRating: 3,
    latitude: 0,
    longitude: 0,
    roomPrice: 150,
    roomType: RoomTypes.Double,
    cityName: '',
    roomPhotoUrl: '',
    discount: 12,
    amenities: [],
  },
];

describe('filterResults', () => {
  it('should filter results by price range', () => {
    const filters: SearchFilters = {
      minPrice: 100,
      maxPrice: 150,
      rating: 0,
      room: '',
      amenitiesNames: [],
    };
    const result = filterResults(searchResults, filters);
    expect(result).toEqual([searchResults[0], searchResults[2]]);
  });

  it('should filter results by star rating', () => {
    const filters: SearchFilters = {
      minPrice: PRICE_RANGE.MIN,
      maxPrice: PRICE_RANGE.MAX,
      rating: 5,
      room: '',
      amenitiesNames: [],
    };
    const result = filterResults(searchResults, filters);
    expect(result).toEqual([searchResults[1]]);
  });

  it('should filter results by room type', () => {
    const filters: SearchFilters = {
      minPrice: PRICE_RANGE.MIN,
      maxPrice: PRICE_RANGE.MAX,
      rating: 0,
      room: RoomTypes.Double,
      amenitiesNames: [],
    };
    const result = filterResults(searchResults, filters);
    expect(result).toEqual([searchResults[2]]);
  });

  it('should return results that match all filter criteria', () => {
    const filters: SearchFilters = {
      minPrice: 100,
      maxPrice: 200,
      rating: 3,
      room: RoomTypes.Double,
      amenitiesNames: [],
    };
    const result = filterResults(searchResults, filters);
    expect(result).toEqual([searchResults[2]]);
  });
});

describe('sortResults', () => {
  it('should sort results by minimum price first', () => {
    const sorted = sortResults(searchResults, SortCriteria.MinPriceFirst);
    expect(sorted).toEqual([
      searchResults[0],
      searchResults[2],
      searchResults[1],
    ]);
  });

  it('should sort results by maximum price first', () => {
    const sorted = sortResults(searchResults, SortCriteria.MaxPriceFirst);
    expect(sorted).toEqual([
      searchResults[1],
      searchResults[2],
      searchResults[0],
    ]);
  });

  it('should sort results by minimum stars first', () => {
    const sorted = sortResults(searchResults, SortCriteria.MinStarsFirst);
    expect(sorted).toEqual([
      searchResults[2],
      searchResults[0],
      searchResults[1],
    ]);
  });

  it('should sort results by maximum stars first', () => {
    const sorted = sortResults(searchResults, SortCriteria.MaxStarsFirst);
    expect(sorted).toEqual([
      searchResults[1],
      searchResults[0],
      searchResults[2],
    ]);
  });
});
