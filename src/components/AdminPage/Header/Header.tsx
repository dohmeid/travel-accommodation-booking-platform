import React, { useState, FC } from "react";
import classes from "./Header.module.css";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>TravelHub</h1>
        <h2>Admin Portal</h2>
      </div>

      <div className={classes.profileHeader}>
        <img
          className={classes.image}
          src="https://i.imgur.com/x3omKbe.png"
          alt="Admin profile picture"
        />
        <div className={classes.details}>
          <p className={classes.name}>Doha Hmeid</p>
          <p className={classes.role}>Administrator</p>
        </div>

        <button>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
