import React, { FC, ChangeEvent, useCallback } from "react";
import { SortCriteria } from "../../../interfaces/searchTypes";
import { useSearchContext } from "../../../context/searchProvider";
import { SORT_OPTIONS } from "../../../data/sortOptions";
import ResultCard from "./ResultCard/ResultCard";
import classes from "./Results.module.css";

const Results: FC = () => {
  const { filteredResults, sortBy, setSortBy } = useSearchContext();

  // Use useCallback to memoize the handler function
  const handleSortByChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as SortCriteria;
      if (sortBy !== selectedValue) {
        setSortBy(selectedValue);
      }
    },
    [sortBy, setSortBy]
  );

  return (
    <div className={classes.results}>
      <div className={` ${classes.flexContainer} ${classes.header}`}>
        <h2>Search results ({filteredResults.length})</h2>

        <select value={sortBy} onChange={handleSortByChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.cards}>
        {filteredResults.length === 0 ? (
          <p>No items to display</p>
        ) : (
          filteredResults.map((hotel) => (
            <ResultCard key={hotel.hotelId} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
