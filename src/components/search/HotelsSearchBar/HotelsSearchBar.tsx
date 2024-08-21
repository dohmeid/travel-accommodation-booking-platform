import React, { useState, FC, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../../context/searchProvider';
import { SearchQuery } from '../../../types/searchTypes';
import useCurrentPage from '../../../hooks/useCurrentPage';
import DatePicker from './DatePicker/DatePicker';
import GuestDropdown from './GuestDropdown/GuestDropdown';
import classes from './HotelsSearchBar.module.css';

const HotelsSearchBar: FC = () => {
  const { isInSearchPage } = useCurrentPage();
  const { fetchSearchResults, searchQuery } = useSearchContext();
  const navigate = useNavigate();
  const [currentSearchQuery, setCurrentSearchQuery] =
    useState<SearchQuery>(searchQuery);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchQuery({ ...currentSearchQuery, city: e.target.value });
  };

  const handleSearchButtonClick = () => {
    fetchSearchResults(currentSearchQuery);
    if (!isInSearchPage) {
      navigate('/main/search');
    }
  };

  return (
    <div
      className={`${classes.searchContainer} ${
        isInSearchPage ? classes.horizontalSearchContainer : ''
      }`}
    >
      <div className={classes.searchInput}>
        <i className={`${classes.searchIcon} bi bi-search`}></i>
        <input
          type="search"
          name="search"
          aria-label="search for a string"
          placeholder="Search for hotels..."
          value={currentSearchQuery.city}
          onChange={handleCityChange}
        />
      </div>

      <div className={classes.controlsContainer}>
        <DatePicker
          currentSearchQuery={currentSearchQuery}
          setCurrentSearchQuery={setCurrentSearchQuery}
        />
        <GuestDropdown
          currentSearchQuery={currentSearchQuery}
          setCurrentSearchQuery={setCurrentSearchQuery}
        />
      </div>

      <button
        type="button"
        className={classes.searchButton}
        onClick={handleSearchButtonClick}
      >
        Search
      </button>
    </div>
  );
};

export default HotelsSearchBar;
