import React, { useState, FC } from "react";
import classes from "./Results.module.css";
import { useHomeProvider } from "../../../context/homeProvider";
import Card from "./Card/Card";

const Results: FC = () => {
  const { searchResults } = useHomeProvider();

  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { value: "Price", label: "Price" },
    { value: "Stars", label: "Stars" },
    { value: "Option 3", label: "Option 3" },
  ];

  console.log("here is search results : ");
  console.log(searchResults);

  return (
    <div className={classes.results}>
      <div className={` ${classes.flexContainer} ${classes.header}`}>
        <h2>Search results 3</h2>

        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={classes.cards}>
        {searchResults.length === 0 ? (
          <p>No items to display</p>
        ) : (
          searchResults.map((hotel) => (
            <Card key={hotel.hotelId} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
