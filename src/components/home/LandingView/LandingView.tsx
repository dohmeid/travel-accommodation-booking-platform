import React, { FC } from 'react';
import HotelsSearchBar from '../../search/HotelsSearchBar/HotelsSearchBar';
import classes from './LandingView.module.css';

const LandingView: FC = () => {
  return (
    <div className={classes.landingSection}>
      <div className={classes.textContainer}>
        <h1>
          Escape the Ordinary, Book the <br /> Extraordinary
        </h1>
        <p>
          Welcome to our platform, where travel planning is effortless. Find the
          perfect stay worldwide in just a few clicks.
        </p>
      </div>
      <HotelsSearchBar />
    </div>
  );
};

export default LandingView;
