import React, { FC, useMemo } from 'react';
import { useHomeContext } from '../../../context/homeProvider';
import HotelCard from './HotelCard/HotelCard';
import Slideshow from '../Slideshow/Slideshow';
import classes from './RecentHotels.module.css';

const RecentHotels: FC = () => {
  const { recentHotels } = useHomeContext();
  const CARD_WIDTH_REM = 24; // Card width in rem

  const HOTELS = useMemo(
    () =>
      recentHotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      )),
    [recentHotels],
  );

  return (
    <div className={classes.recentHotelsSection}>
      <h2>Recently Visited Hotels</h2>
      <h3>Ready for a Repeat? Check Out Your Recent Hotels!</h3>
      <Slideshow
        items={recentHotels}
        renderItems={HOTELS}
        cardWidth={CARD_WIDTH_REM}
      />
    </div>
  );
};

export default RecentHotels;
