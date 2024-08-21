import React, { FC } from 'react';
import SearchBar from '../../components/search/HotelsSearchBar/HotelsSearchBar';
import Filters from '../../components/search/Filters/Filters';
import Results from '../../components/search/Results/Results';
import classes from './SearchPage.module.css';

const SearchPage: FC = () => {
  return (
    <div className={classes.searchPage}>
      <Filters />
      <div className={classes.flex}>
        <SearchBar />
        <Results />
      </div>
    </div>
  );
};

export default SearchPage;
