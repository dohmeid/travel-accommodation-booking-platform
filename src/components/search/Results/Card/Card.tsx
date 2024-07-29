import React, { useState, FC } from "react";
import classes from "./Card.module.css";
import { SearchResult } from "../../../../interfaces/interfaces";

interface Props {
  hotel: SearchResult;
}

const Card: FC<Props> = ({ hotel }) => {
  return (
    <div className={classes.card}>
      <img src={hotel.roomPhotoUrl}></img>

      <div className={classes.dataContainer}>
        <div className={`${classes.titleContainer} ${classes.flexContainer}`}>
          <p className={classes.title}>{hotel.hotelName}</p>
          <p className={classes.starRating}>
            <i className="bi bi-star-fill"></i>
            {hotel.starRating}
          </p>
        </div>

        <div className={classes.locationContainer}>
          <p className={classes.type}>
            <i className="bi bi-geo-alt"></i>Location
          </p>
          <p className={classes.location}>{hotel.cityName}</p>
        </div>

        <div className={classes.roomContainer}>
          <p className={classes.type}>Room type </p>
          <p className={classes.room}>1x {hotel.roomType} room</p>
        </div>

        <div className={classes.priceContainer}>
          <p className={classes.price}>${hotel.roomPrice}</p>
          <p className={classes.discount}>{hotel.discount * 100}% OFF</p>
        </div>

        <div
          className={`${classes.amenitiesButtonContainer} ${classes.flexContainer}`}
        >
          <div className={`${classes.amenities} ${classes.flexContainer}`}>
            {hotel.amenities.length === 0 ? (
              <></>
            ) : (
              hotel.amenities.map((amenity, index) => (
                <div key={index} className={classes.amenity}>
                  #{amenity.name}
                </div>
              ))
            )}
          </div>

          <button type="button" className={classes.seeMoreButton}>
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
