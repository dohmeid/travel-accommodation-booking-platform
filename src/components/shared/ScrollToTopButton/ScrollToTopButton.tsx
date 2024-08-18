import React, { FC } from 'react';
import classes from './ScrollToTopButton.module.css';

const ScrollToTopButton: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={classes.scrollButton} onClick={scrollToTop}>
      <i className="bi bi-arrow-up-short"></i>
    </button>
  );
};

export default ScrollToTopButton;
