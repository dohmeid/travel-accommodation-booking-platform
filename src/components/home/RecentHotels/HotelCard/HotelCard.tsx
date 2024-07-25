import React, { FC } from "react";
import classes from "./HotelCard.module.css";
import { RecentHotel } from "../../../../interfaces/interfaces";

interface Props {
  hotel: RecentHotel;
}

const HotelCard: FC<Props> = ({ hotel }) => {
  // Convert the ISO 8601 date string to a Date object
  const date = new Date(hotel.visitDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={classes.card}>
      <img src={hotel.thumbnailUrl}></img>

      <div className={classes.flexContainer}>
        <p className={classes.title}>
          {hotel.hotelName}, <span>{hotel.cityName}</span>
        </p>
        <p className={classes.starRating}>
          <i className="bi bi-star-fill"></i>
          {hotel.starRating}
        </p>
      </div>

      <p className={classes.date}>
        <i className="bi bi-calendar-check"></i>
        {formattedDate}
      </p>

      <div className={classes.flexContainer}>
        <p className={classes.price}>
          ${hotel.priceLowerBound} - ${hotel.priceUpperBound}
          <span>/ night</span>
        </p>
        <button type="button" className={classes.hotelButton}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
