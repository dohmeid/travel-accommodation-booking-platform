import React, { useState, FC } from "react";
import classes from "./TrendingDestinations.module.css";

const TrendingDestinations: FC = () => {
  return (
    <div className={classes.section}>
      <h2>Trending Destinations</h2>
      <p>
        Planning you next adventure? Here are the most popular choices for
        travellers.
      </p>

      <div className={classes.list}>
        <div className={classes.item}><span>Jordan</span></div>
        <div className={classes.item}><span>City2</span></div>
        <div className={classes.item}><span>City3</span></div>
        <div className={classes.item}><span>City4</span></div>
        <div className={classes.item}><span>City5</span></div>
      </div>
    </div>
  );
};

export default TrendingDestinations;
