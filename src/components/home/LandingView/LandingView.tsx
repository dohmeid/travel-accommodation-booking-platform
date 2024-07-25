import React, { useState, FC } from "react";
import classes from "./LandingView.module.css";
import SearchBar from "../SearchBar/SearchBar";

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
      <SearchBar />
    </div>
  );
};

export default LandingView;
