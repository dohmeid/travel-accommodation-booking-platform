import React, { FC } from 'react';
import { useHotelContext } from '../../../context/hotelProvider';
import StarRating from '../../shared/StarRating/StarRating';
import Map from './Map/Map';
import classes from './Information.module.css';

const Information: FC = () => {
  const { info } = useHotelContext();

  if (!info) {
    return <p>no data found</p>;
  }

  const {
    hotelName,
    location,
    starRating,
    description,
    availableRooms,
    amenities,
    latitude,
    longitude,
  } = info;

  return (
    <div className={classes.infoContainer}>
      <div className={classes.mainContainer}>
        <div className={`${classes.flexContainer} ${classes.headerContainer}`}>
          <div>
            <h2>{hotelName}</h2>
            <p>
              <i className="bi bi-geo-alt-fill" />
              {location}
            </p>
          </div>
          <StarRating stars={starRating} />
        </div>

        <div
          className={`${classes.flexContainer} ${classes.overviewContainer}`}
        >
          <p>{description}</p>
          <div className={classes.roomsNumber}>
            <i className="bi bi-plus-circle-fill"></i>
            {availableRooms} available rooms.
          </div>
          <ul className={classes.amenitiesContainer}>
            {amenities.map((a, index) => (
              <li key={index} className={classes.amenity}>
                <i className="bi bi-plus-circle-fill" />
                <div>
                  <h4>{a.name}</h4>
                  <p>{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Map hotel={hotelName} latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default Information;
