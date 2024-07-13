import React, { FC, useContext } from "react";
import classes from "./Header.module.css";
import adminImage from "../../../assets/images/adminProfiePicture.png";
import { AuthenticationContext } from "../../../context/authentication";
import { AuthenticationContextType } from "../../../interfaces/auth";


const Header: FC = () => {
  const { handleLogout } = useContext(
    AuthenticationContext
  ) as AuthenticationContextType;

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

        <button type="button" className={classes.logoutBtn} onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
