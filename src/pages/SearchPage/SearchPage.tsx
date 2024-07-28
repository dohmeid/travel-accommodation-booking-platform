import React, { useState, FC } from "react";
import classes from "./SearchPage.module.css";
import SearchBar from "../../components/home/SearchBar/SearchBar";
import Filters from "../../components/search/Filters/Filters";
import Results from "../../components/search/Results/Results";

const SearchPage: FC = () => {
  return (
    <div className={classes.searchPage}>
    
      <div className={classes.flexContainer}>
        <Filters />
        <Results />
      </div>
    </div>
  );
};

export default SearchPage;
