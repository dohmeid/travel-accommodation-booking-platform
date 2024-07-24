import React, { FC } from "react";
import classes from "./HotelCard.module.css";
import { Deal } from "../../../../interfaces/interfaces";

interface Props {
  dealData: Deal;
}

const HotelCard: FC<Props> = ({ dealData }) => {
  return (
    <div className={classes.card}>
      <img src={dealData.roomPhotoUrl}></img>

      <div className={classes.flexContainer}>
        <p className={classes.title}>{dealData.title}</p>
        <p className={classes.starRating}>
          <i className="bi bi-star-fill"></i>
          {dealData.hotelStarRating}
        </p>
      </div>

      <p className={classes.location}>
        <i className="bi bi-geo-alt"></i>
        {dealData.hotelName}, {dealData.cityName}
      </p>

      <div className={classes.flexContainer}>
        <p className={classes.price}>
          ${dealData.finalPrice}
          <span>was ${dealData.originalRoomPrice}</span>
        </p>

        <button type="button" className={classes.hotelButton}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
