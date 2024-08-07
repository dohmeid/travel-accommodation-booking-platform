import React, { FC } from "react";
import { useHomeContext } from "../../../context/homeProvider";
import HotelCard from "./HotelCard/HotelCard";
import Slideshow from "../Slideshow/Slideshow";
import classes from "./FeaturedDeals.module.css";

const FeaturedDeals: FC = () => {
  const { deals } = useHomeContext();
  const CARD_WIDTH_REM = 38; // Card width in rem

  //generate carousel items
  const DEALS = deals.map((deal, index) => (
    <HotelCard key={index} dealData={deal} />
  ));

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
