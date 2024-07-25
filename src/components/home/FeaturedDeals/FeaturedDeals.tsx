import React, { useEffect, useState, FC } from "react";
import classes from "./FeaturedDeals.module.css";
import HotelCard from "./HotelCard/HotelCard";
import { useHomeProvider } from "../../../context/homeProvider";

const FeaturedDeals: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deals } = useHomeProvider();
  const cardWidth = 38; //in rem unit

  const DEALS = deals.map((deal, index) => (
    <HotelCard key={index} dealData={deal} />
  ));

  useEffect(() => {
    if (deals.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % deals.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [deals]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={classes.featuredDealsSection}>
      <h2 className={classes.title1}>Featured Deals</h2>
      <p className={classes.title2}>
        Spontaneous savings. Available nowhere else. Bookmark now and never miss
        out!
      </p>

      <div className={classes.slideshow}>
        <div className={classes.carousel}>
          <div
            className={classes.cards}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}rem)`,
              width: `${deals.length * cardWidth}rem`,
            }}
          >
            {deals.length > 0 ? DEALS : <p>Loading...</p>}
          </div>
        </div>

        <div className={classes.dots}>
          {deals.map((_, index) => (
            <div
              key={index}
              className={`${classes.dot} ${
                index === currentIndex ? classes.active : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDeals;
