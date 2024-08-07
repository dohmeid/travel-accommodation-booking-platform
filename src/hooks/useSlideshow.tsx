import { useState, useEffect } from "react";

export const useSlideshow = (items: any[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3000;

  //update carousel index periodically
  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [items, intervalTime]);

  //handle carousel indicator (dot) click
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return { currentIndex, handleIndicatorClick };
};
