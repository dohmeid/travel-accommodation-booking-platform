import React, { FC, useEffect, useState } from "react";
import classes from "./RecentHotels.module.css";
import HotelCard from "./HotelCard/HotelCard";
import { useHomeProvider } from "../../../context/homeProvider";

const RecentHotels: FC = () => {
  const { recentHotels } = useHomeProvider();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 24; //in rem unit

  const HOTELS = recentHotels.map((hotel, index) => (
    <HotelCard key={index} hotel={hotel} />
  ));

  useEffect(() => {
    if (recentHotels.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recentHotels.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [recentHotels]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={classes.recentHotelsSection}>
      <h2 className={classes.title1}>Recently Visited Hotels</h2>
      <p className={classes.title2}>
        Ready for a Repeat? Check Out Your Recent Hotels!
      </p>

      <div className={classes.slideshow}>
        <div className={classes.carousel}>
          <div
            className={classes.cards}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}rem)`,
              width: `${recentHotels.length * cardWidth}rem`,
            }}
          >
            {recentHotels.length > 0 ? HOTELS : <p>Loading...</p>}
          </div>
        </div>

        <div className={classes.dots}>
          {recentHotels.map((_, index) => (
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

export default RecentHotels;
