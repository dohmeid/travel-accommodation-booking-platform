import React, { ChangeEvent, FC, useEffect } from "react";
import classes from "./Results.module.css";
import { useSearchContext } from "../../../context/searchProvider";
import Card from "./Card/Card";

const Results: FC = () => {
  const { filteredResults, sortBy, setSortBy } = useSearchContext();

  const sortOptions = [
    { id: 0, value: "Price", label: "Price" },
    { id: 1, value: "Stars", label: "Stars" },
  ];

  const selectSortByChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={classes.results}>
      <div className={` ${classes.flexContainer} ${classes.header}`}>
        <h2>Search results ({filteredResults.length})</h2>

        <select value={sortBy} onChange={selectSortByChangeHandler}>
          {sortOptions.map((option) => (
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
            <Card key={hotel.hotelId} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
