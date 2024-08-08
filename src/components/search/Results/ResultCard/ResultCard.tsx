import React, { FC } from "react";
import { SearchResult } from "../../../../interfaces/searchTypes";
import StarRating from "../../../common/StarRating/StarRating";
import classes from "./ResultCard.module.css";

interface Props {
  hotel: SearchResult;
}

const ResultCard: FC<Props> = ({ hotel }) => {
  const {
    roomPhotoUrl,
    hotelName,
    starRating,
    cityName,
    roomType,
    roomPrice,
    discount,
    amenities,
  } = hotel;

  return (
    <div className={classes.card}>
      <img src={roomPhotoUrl} alt={`Photo of a room at ${hotelName}`} />

      <div className={classes.dataContainer}>
        <div className={`${classes.titleContainer} ${classes.flexContainer}`}>
          <p className={classes.title}>{hotelName}</p>
          <StarRating stars={starRating} />
        </div>

        <div className={classes.locationContainer}>
          <p className={classes.type}>
            <i className="bi bi-geo-alt" aria-hidden="true"></i>Location
          </p>
          <p className={classes.location}>{cityName}</p>
        </div>

        <div className={classes.roomContainer}>
          <p className={classes.type}>Room type </p>
          <p className={classes.room}>1x {roomType} room</p>
        </div>

        <div className={classes.priceContainer}>
          <p className={classes.price}>${roomPrice}</p>
          {discount > 0 && (
            <p className={classes.discount}>{discount * 100}% OFF</p>
          )}
        </div>

        <div
          className={`${classes.amenitiesButtonContainer} ${classes.flexContainer}`}
        >
          <div className={`${classes.amenities} ${classes.flexContainer}`}>
            {amenities.length > 0 &&
              amenities.map((amenity, index) => (
                <div key={index} className={classes.amenity}>
                  #{amenity.name}
                </div>
              ))}
          </div>

          <button type="button" className={classes.seeMoreButton}>
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
