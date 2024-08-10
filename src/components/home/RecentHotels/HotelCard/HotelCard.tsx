import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RecentHotel } from "../../../../interfaces/homePageTypes";
import StarRating from "../../../common/StarRating/StarRating";
import classes from "./HotelCard.module.css";

interface Props {
  hotel: RecentHotel;
}

const HotelCard: FC<Props> = ({ hotel }) => {
  const navigate = useNavigate();
  const handleNavigateButtonClick = () => {
    navigate(`/main/hotel/${hotel.hotelId}`);
  };

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
        <StarRating stars={hotel.starRating} />
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
        <button
          type="button"
          className={classes.hotelButton}
          onClick={handleNavigateButtonClick}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
