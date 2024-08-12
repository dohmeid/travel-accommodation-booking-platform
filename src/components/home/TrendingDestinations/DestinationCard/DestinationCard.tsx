import React, { FC } from "react";
import { Destination } from "../../../../types/homeTypes";
import classes from "./DestinationCard.module.css";

interface Props {
  city: Destination;
}

const DestinationCard: FC<Props> = ({ city }) => {
  return (
    <div className={classes.card} key={city.cityId}>
      <img src={city.thumbnailUrl} alt={`${city.cityName} thumbnail`} />
      <p className={classes.name}>
        {city.cityName}, <span>{city.countryName}</span>
      </p>
      <div className={classes.description}>{city.description}</div>
    </div>
  );
};

export default DestinationCard;
