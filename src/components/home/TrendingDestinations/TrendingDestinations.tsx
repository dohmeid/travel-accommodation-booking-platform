import React, { FC } from "react";
import classes from "./TrendingDestinations.module.css";
import { useHomeProvider } from "../../../context/homeProvider";

const TrendingDestinations: FC = () => {
  const { destinations } = useHomeProvider();

  return (
    <div className={classes.trendingDestinationsSection}>
      <h2>Trending Destinations</h2>
      <p>
        Planning you next adventure? Here are the most popular choices for
        travellers.
      </p>

      <div className={classes.list}>
        {destinations.length === 0 ? (
          <p>Loading...</p>
        ) : (
          destinations.map((city) => (
            <div className={classes.item} key={city.cityId}>
              <img src={city.thumbnailUrl} alt={`${city.cityName} thumbnail`} />
              <p className={classes.name}>
                {city.cityName}, <span>{city.countryName}</span>
              </p>
              <div className={classes.description}>{city.description}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingDestinations;
