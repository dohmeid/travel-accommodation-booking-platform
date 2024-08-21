import { useState, useEffect, useCallback } from 'react';

export const useSlideshow = (items: unknown[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalTime = 3000;

  //update carousel index periodically
  useEffect(() => {
    if (items.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [items, intervalTime, isPaused]);

  //handle carousel indicator (dot) click
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const pauseSlideshow = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSlideshow = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    currentIndex,
    handleIndicatorClick,
    pauseSlideshow,
    resumeSlideshow,
  };
};
