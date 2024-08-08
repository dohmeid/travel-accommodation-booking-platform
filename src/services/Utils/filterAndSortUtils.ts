import {
  SearchResult,
  SearchFilters,
  SortCriteria,
} from "../../interfaces/searchTypes";

export const filterResults = (
  searchResults: SearchResult[],
  filters: SearchFilters
): SearchResult[] => {
  return searchResults.filter((hotel) => {
    const matchesPrice =
      hotel.roomPrice >= filters.minPrice &&
      hotel.roomPrice <= filters.maxPrice;
    const matchesRating =
      !filters.rating || hotel.starRating == filters.rating;
    const matchesRoomType = !filters.room || hotel.roomType === filters.room;
    const matchesAmenities =
      filters.amenitiesNames.length === 0 ||
      filters.amenitiesNames.every((selectedAmenity) =>
        hotel.amenities.some((amenity) =>
          amenity.name.toLowerCase().includes(selectedAmenity.toLowerCase())
        )
      );

    return matchesPrice && matchesRating && matchesRoomType && matchesAmenities;
  });
};

export const sortResults = (
  filteredResults: SearchResult[],
  sortBy: SortCriteria
): SearchResult[] => {
  const sortedResults = [...filteredResults];

  switch (sortBy) {
    case "MinPriceFirst":
      return sortedResults.sort((a, b) => a.roomPrice - b.roomPrice);
    case "MaxPriceFirst":
      return sortedResults.sort((a, b) => b.roomPrice - a.roomPrice);
    case "MinStarsFirst":
      return sortedResults.sort((a, b) => a.starRating - b.starRating);
    case "MaxStarsFirst":
      return sortedResults.sort((a, b) => b.starRating - a.starRating);
    default:
      return sortedResults;
  }
};
