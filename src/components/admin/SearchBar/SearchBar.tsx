import React, { FC, useState, useContext, ChangeEvent } from "react";
import classes from "./SearchBar.module.css";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/adminPageTypes";

const SearchBar: FC = () => {
  const { setSearchQuery, setSearchFilter } = useContext(
    AdminContext
  ) as AdminContextType;

  const handleSelectOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(e.target.value);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchInput = e.target.value;
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
        onChange={handleSelectOptionChange}
      >
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
    </div>
  );
};

export default SearchBar;
