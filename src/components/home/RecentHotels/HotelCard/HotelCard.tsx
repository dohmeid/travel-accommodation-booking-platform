import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecentHotel } from '../../../../types/homeTypes';
import { formatISODate } from '../../../../utils/dates';
import StarRating from '../../../shared/StarRating/StarRating';
import classes from './HotelCard.module.css';

interface Props {
  hotel: RecentHotel;
}

const HotelCard: FC<Props> = ({ hotel }) => {
  const navigate = useNavigate();
  const {
    hotelName,
    cityName,
    thumbnailUrl,
    starRating,
    visitDate,
    priceLowerBound,
    priceUpperBound,
  } = hotel;

  const handleNavigateButtonClick = () => {
    navigate(`/main/hotel/${hotel.hotelId}`);
  };

  return (
    <div className={classes.card}>
      <img src={thumbnailUrl} alt={`${hotel.hotelName} Thumbnail`} />

      <div className={classes.flexContainer}>
        <p className={classes.title}>
          {hotelName}, <span>{cityName}</span>
        </p>
        <StarRating stars={starRating} />
      </div>

      <p className={classes.date}>
        <i className="bi bi-calendar-check" />
        {formatISODate(visitDate)}
      </p>

      <div className={classes.flexContainer}>
        <p className={classes.price}>
          ${priceLowerBound} - ${priceUpperBound}
          <span>/ night</span>
        </p>
        <button
          type="button"
          className={classes.hotelButton}
          aria-label={`View details of ${hotel.hotelName}`}
          onClick={handleNavigateButtonClick}
        >
          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
