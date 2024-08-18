import React, { FC, ChangeEvent, useCallback, useMemo } from 'react';
import { SortCriteria } from '../../../types/searchTypes';
import { useSearchContext } from '../../../context/searchProvider';
import { SORT_OPTIONS } from '../../../constants/sortOptions';
import ResultCard from './ResultCard/ResultCard';
import classes from './Results.module.css';

const Results: FC = () => {
  const { filteredResults, sortBy, setSortBy } = useSearchContext();

  const handleSortByChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as SortCriteria;
      if (sortBy !== selectedValue) {
        setSortBy(selectedValue);
      }
    },
    [sortBy, setSortBy],
  );

  const SEARCH_RESULTS = useMemo(
    () =>
      filteredResults.map((hotel) => (
        <ResultCard key={hotel.hotelId} hotel={hotel} />
      )),
    [filteredResults],
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
          SEARCH_RESULTS
        )}
      </div>
    </div>
  );
};

export default Results;
