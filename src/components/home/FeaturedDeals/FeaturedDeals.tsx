import React, { useRef, useEffect, useState, FC } from "react";
import classes from "./FeaturedDeals.module.css";
import HotelCard from "./HotelCard/HotelCard";

const FeaturedDeals: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 6; //change this - dynamic number 
  const slidesPerView = 3;
  const totalViews = totalSlides - slidesPerView;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalViews);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalViews]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={classes.dealsSection}>
      <h2 className={classes.title1}>Featured Deals</h2>

      <p className={classes.title2}>
        Spontaneous savings. Available nowhere else. Bookmark now and never miss
        out!
      </p>

      <div className={classes.slideshow}>
        <div
          className={classes.cards}
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <HotelCard key={idx} />
          ))}
        </div>

        <div className={classes.slideshowDots}>
          {Array.from({ length: totalViews }).map((_, index) => (
            <div
              key={index}
              className={`${classes.indicator} ${
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
