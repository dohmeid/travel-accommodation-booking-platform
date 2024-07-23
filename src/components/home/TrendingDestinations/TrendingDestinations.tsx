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
        <div className={classes.item}>Jordan</div>
        <div className={classes.item}>Dubai</div>
        <div className={classes.item}>City3</div>
        <div className={classes.item}>City4</div>
        <div className={classes.item}>City5</div>
      </div>
    </div>
  );
};

export default TrendingDestinations;
