import React, { FC, useContext, ChangeEvent } from 'react';
import './SearchBar.module.css';

const SearchBar: FC = () => {
 // const { setSearchQuery } = useContext(TodosContext) as TodosContextType;

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
   // let searchInput = e.target.value;
   // setSearchQuery(searchInput);
  }

  return (
    <>
      <input
        type="search" placeholder="Search tasks..."
        id="search" name="search"
        aria-label="search for a task" tabIndex={3}
        onChange={handleSearchInputChange} />
    </>
  );
};

export default SearchBar;