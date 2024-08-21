import React, { FC } from 'react';
import { Destination } from '../../../../types/homeTypes';
import classes from './DestinationCard.module.css';

interface Props {
  city: Destination;
}

const DestinationCard: FC<Props> = ({ city }) => {
  const { cityId, cityName, countryName, description, thumbnailUrl } = city;
  return (
    <div className={classes.card} key={cityId}>
      <img
        src={thumbnailUrl}
        alt={`${cityName} thumbnail`}
        aria-label={`Thumbnail image of ${cityName}`}
      />
      <p className={classes.name}>
        {cityName}, <span>{countryName}</span>
      </p>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default DestinationCard;
