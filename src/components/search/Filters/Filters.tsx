import React, { useState, FC, ChangeEvent, useEffect } from "react";
import classes from "./Filters.module.css";

const MAX = 500;

const Filters: FC = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  //to set the color
  useEffect(() => {
    const minRange = document.getElementById("min-price") as HTMLInputElement;
    const maxRange = document.getElementById("max-price") as HTMLInputElement;

    if (minRange && maxRange) {
      const minPercent = (minPrice / 100) * 100;
      const maxPercent = (maxPrice / 100) * 100;

      const background = `linear-gradient(to right, 
                            #d3d3d3 ${minPercent}%, 
                            #AA6548 ${minPercent}%, 
                            #AA6548 ${maxPercent}%, 
                            #d3d3d3 ${maxPercent}%)`;

      minRange.style.background = background;
      maxRange.style.background = background;
    }
  }, [minPrice, maxPrice]);

  //for amenities
  const [selectedIds, setSelectedIds] = useState([]);

  const clearAllButtonClickHandler = () => {};

  const minPriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };
  const maxPriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  //checked list items
  // State with list of all checked item
  const [checked, setChecked] = useState<string[]>([]);
  const checkList = ["Apple", "Banana", "Tea", "Coffee"];

  // Add/Remove checked item from list
  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  //rooms
  const [room, setRoom] = useState("Medium");
  const rooms = ["single", "double", "standard"];

  const roomChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  const applyButtonClickHandler = () =>{

  }

  return (
    <div className={classes.filters}>
      <div className={`${classes.titleContainer} ${classes.flexContainer}`}>
        <h2>Filter By:</h2>
        <button
          type="reset"
          className={classes.clearButton}
          onClick={clearAllButtonClickHandler}
        >
          Clear all
        </button>
      </div>

      <div className={`${classes.priceContainer} ${classes.flexContainer}`}>
        <label htmlFor="min-price">Price</label>
        <div className={classes.rangeContainer}>
          <input
            type="range"
            id="min-price"
            name="min-price"
            min="0"
            max="100"
            value={minPrice}
            onChange={minPriceChangeHandler}
          />
          <input
            type="range"
            id="max-price"
            name="max-price"
            min="0"
            max="100"
            value={maxPrice}
            onChange={maxPriceChangeHandler}
          />
        </div>
        <p>
          ${minPrice} - ${maxPrice}
        </p>
      </div>

      <div className={`${classes.starsContainer} ${classes.flexContainer}`}>
        <h3>Stars</h3>
        <div>
          {[1, 2, 3, 4, 5].map((star, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setRating(currentRating)}
                />
                <span
                  className={classes.star}
                  style={{
                    color:
                      currentRating <= (hover || rating)
                        ? "#ffc107"
                        : "#e4e5e9",
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  <i className="bi bi-star-fill"></i>
                </span>
              </label>
            );
          })}
        </div>
        <p>Selected rating is: {rating}</p>
      </div>

      <div className={`${classes.amenitiesContainer} ${classes.flexContainer}`}>
        <h3>Amenities</h3>
        <div className={classes.list}>
          {checkList.map((item, index) => (
            <label key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <p>{`Items checked are: ${checkedItems}`}</p>
      </div>

      <div className={`${classes.roomContainer} ${classes.flexContainer}`}>
        <h3>Room Type</h3>

        <div className={classes.list}>
          {rooms.map((item, index) => (
            <label key={index}>
              <input
                type="radio"
                value={item}
                checked={item === room}
                onChange={roomChangeHandler}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="button" className={classes.applyButton}
      onClick={applyButtonClickHandler}>Apply</button>
    </div>
  );
};

export default Filters;
