import React, { FC, useMemo } from 'react';
import { useHomeContext } from '../../../context/homeProvider';
import DealCard from './DealCard/DealCard';
import Slideshow from '../Slideshow/Slideshow';
import classes from './FeaturedDeals.module.css';

const FeaturedDeals: FC = () => {
  const { deals } = useHomeContext();
  const CARD_WIDTH_REM = 38; // Card width in rem

  //generate carousel items
  const DEALS = useMemo(
    () => deals.map((deal) => <DealCard key={deal.hotelId} dealData={deal} />),
    [deals],
  );

  return (
    <div className={classes.featuredDealsSection}>
      <h2>Featured Deals</h2>
      <h3>
        Spontaneous savings. Available nowhere else. Bookmark now and never miss
        out!
      </h3>
      <Slideshow items={deals} renderItems={DEALS} cardWidth={CARD_WIDTH_REM} />
    </div>
  );
};

export default FeaturedDeals;
