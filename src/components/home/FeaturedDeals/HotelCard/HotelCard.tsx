import React, { useState, FC } from "react";
import classes from "./HotelCard.module.css";

const HotelCard: FC = () => {
  return (
    <div className={classes.card}>
      <img></img>

      <div className={classes.flexContainer}>
        <p className={classes.name}>Hotel Name</p>
        <p className={classes.starRating}>
          <i className="bi bi-star-fill"></i>4.5
        </p>
      </div>

      <p className={classes.location}>
        <i className="bi bi-geo-alt"></i>Ramallah, Palestine
      </p>

      <div className={classes.flexContainer}>
        <p className={classes.price}>
          $59.99 <span>was $99.99</span>
        </p>

        <button type="button" className={classes.hotelButton}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
