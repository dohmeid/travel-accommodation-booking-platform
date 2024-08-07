import React, { FC } from "react";
import { useHomeContext } from "../../../context/homeProvider";
import DestinationCard from "./DestinationCard/DestinationCard";
import classes from "./TrendingDestinations.module.css";

const TrendingDestinations: FC = () => {
  const { destinations } = useHomeContext();

  //rendering the destinations list
  const DESTINATIONS = destinations.map((item) => (
    <DestinationCard key={item.cityId} city={item} />
  ));

  return (
    <div className={classes.trendingDestinationsSection}>
      <h2>Trending Destinations</h2>
      <h3>
        Planning you next adventure? Here are the most popular choices for
        travellers.
      </h3>

      <div className={classes.list}>
        {destinations.length === 0 ? <p>Loading...</p> : DESTINATIONS}
      </div>
    </div>
  );
};

export default TrendingDestinations;
