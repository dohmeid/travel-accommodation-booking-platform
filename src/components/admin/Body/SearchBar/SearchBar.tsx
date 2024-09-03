import React, { FC, ChangeEvent, useCallback } from 'react';
import { GridType, SearchOptions } from '../../../../types/adminTypes';
import { useAdminContext } from '../../../../context/adminProvider';
import useHotelsManagement from '../../../../hooks/useHotelsManagement';
import classes from './SearchBar.module.css';

interface Props {
  gridType: GridType;
}

const SearchBar: FC<Props> = ({ gridType }) => {
  const { setSearchOption, setSearchQuery } = useAdminContext();
  const { fetchHotels } = useHotelsManagement();

  const handleSearchOptionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSearchOption(e.target.value as SearchOptions);
    },
    [setSearchOption],
  );

  const handleSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  const handleSearchClick = () => {
    if (gridType === GridType.HOTEL) {
      fetchHotels(1);
    }
  };

  return (
    <div className={classes.searchContainer}>
      <input
        type="search"
        name="search"
        className={classes.search}
        aria-label="search for a string"
        placeholder="Search for..."
        onChange={handleSearchInputChange}
      />
      <i className={`${classes.searchIcon} bi bi-search`}></i>

      {gridType === GridType.HOTEL && (
        <button
          type="submit"
          className={classes.searchButton}
          onClick={handleSearchClick}
        >
          Search
        </button>
      )}

      <select
        name="search-options"
        className={classes.optionsDropdown}
        onChange={handleSearchOptionChange}
      >
        {gridType === GridType.CITY || gridType === GridType.HOTEL ? (
          <>
            <option value={SearchOptions.NAME}>{SearchOptions.NAME}</option>
            <option value={SearchOptions.DESCRIPTION}>
              {SearchOptions.DESCRIPTION}
            </option>
          </>
        ) : (
          <>
            <option value={SearchOptions.ROOM_TYPE}>
              {SearchOptions.ROOM_TYPE}
            </option>
            <option value={SearchOptions.ROOM_NUMBER}>
              {SearchOptions.ROOM_NUMBER}
            </option>
          </>
        )}
      </select>
    </div>
  );
};

export default SearchBar;
