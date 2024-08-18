import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deal } from '../../../../types/homeTypes';
import StarRating from '../../../shared/StarRating/StarRating';
import classes from './DealCard.module.css';

interface Props {
  dealData: Deal;
}

const DealCard: FC<Props> = ({ dealData }) => {
  const navigate = useNavigate();
  const {
    title,
    description,
    roomPhotoUrl,
    hotelId,
    hotelName,
    hotelStarRating,
    cityName,
    originalRoomPrice,
    finalPrice,
  } = dealData;

  const handleNavigateButtonClick = useCallback(() => {
    navigate(`/main/hotel/${hotelId}`);
  }, [navigate, hotelId]);

  return (
    <div className={classes.card}>
      <img src={roomPhotoUrl} alt={`${hotelName} room`} />

      <div className={classes.dataContainer}>
        <div className={classes.flexContainer}>
          <p className={classes.title}>{title}</p>
          <StarRating stars={hotelStarRating} />
        </div>

        <p className={classes.location}>
          <i className="bi bi-geo-alt"></i>
          {hotelName}, {cityName}
        </p>

        <p className={classes.description}>{description}</p>

        <div className={`${classes.flexContainer} ${classes.priceContainer}`}>
          <p className={classes.price}>
            ${finalPrice}
            <span>was ${originalRoomPrice}</span>
          </p>

          <button
            type="button"
            className={classes.hotelButton}
            onClick={handleNavigateButtonClick}
            aria-label={`Navigate to details of ${hotelName}`}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
