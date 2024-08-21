import React, { FC, useMemo } from 'react';
import { useHomeContext } from '../../../context/homeProvider';
import DestinationCard from './DestinationCard/DestinationCard';
import classes from './TrendingDestinations.module.css';

const TrendingDestinations: FC = () => {
  const { destinations } = useHomeContext();

  const DESTINATIONS = useMemo(
    () =>
      destinations.length > 0 ? (
        destinations.map((item) => (
          <DestinationCard key={item.cityId} city={item} />
        ))
      ) : (
        <p>No destinations to display...</p>
      ),
    [destinations],
  );

  return (
    <div className={classes.trendingDestinationsSection}>
      <h2>Trending Destinations</h2>
      <h3>
        Planning you next adventure? Here are the most popular choices for
        travellers.
      </h3>
      <div className={classes.list}>{DESTINATIONS}</div>
    </div>
  );
};

export default TrendingDestinations;
