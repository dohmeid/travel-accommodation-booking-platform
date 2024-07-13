import React, { FC, useContext, ChangeEvent } from "react";
import classes from "./SearchBar.module.css";

const SearchBar: FC = () => {
  return (
    <div className={classes.searchContainer}>
      <input
        type="search"
        name="search"
        className={classes.search}
        aria-label="search for a string"
        placeholder="Search for..."
      />
      <i className="bi bi-search"></i>
    </div>
  );
};

export default SearchBar;
