import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Deal } from "../../../../types/homeTypes";
import StarRating from "../../../shared/StarRating/StarRating";
import classes from "./HotelCard.module.css";

interface Props {
  dealData: Deal;
}

const HotelCard: FC<Props> = ({ dealData }) => {
  const navigate = useNavigate();
  const handleNavigateButtonClick = () => {
    navigate(`/main/hotel/${dealData.hotelId}`);
  };

  return (
    <div className={classes.card}>
      <img src={dealData.roomPhotoUrl}></img>

      <div className={classes.dataContainer}>
        <div className={classes.flexContainer}>
          <p className={classes.title}>{dealData.title}</p>
          <StarRating stars={dealData.hotelStarRating} />
        </div>

        <p className={classes.location}>
          <i className="bi bi-geo-alt"></i>
          {dealData.hotelName}, {dealData.cityName}
        </p>

        <p className={classes.description}>{dealData.description}</p>

        <div className={`${classes.flexContainer} ${classes.priceContainer}`}>
          <p className={classes.price}>
            ${dealData.finalPrice}
            <span>was ${dealData.originalRoomPrice}</span>
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
    </div>
  );
};

export default HotelCard;
