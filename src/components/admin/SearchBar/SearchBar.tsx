import React, { FC, ChangeEvent } from 'react';
import classes from './SearchBar.module.css';
import { useAdminContext } from '../../../context/adminProvider';

const SearchBar: FC = () => {
  const { setSearchQuery, setSearchOption } = useAdminContext();

  const handleSearchOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(e.target.value);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchQuery(searchInput);
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

      <select
        className={classes.optionsDropdown}
        onChange={handleSearchOptionChange}
      >
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
    </div>
  );
};

export default SearchBar;
