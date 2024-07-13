import React, { FC } from "react";
import classes from "./Header.module.css";
import adminImage from "../../../assets/images/adminProfiePicture.png";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <i className="bi bi-airplane-fill"></i>
        <div className={classes.logoDetails}>
          <h1>TravelHub</h1>
          <h2>Admin Portal</h2>
        </div>
      </div>

      <div className={classes.profile}>
        <img
          className={classes.image}
          src={adminImage}
          alt="Admin profile picture"
        />
        <div className={classes.details}>
          <p className={classes.name}>Doha Hmeid</p>
          <p className={classes.role}>Administrator</p>
        </div>

        <button type="button" className={classes.logoutBtn}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
