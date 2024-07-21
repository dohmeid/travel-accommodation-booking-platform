import React, { useState, FC } from "react";
import classes from "./Header.module.css";

const Header: FC = () => {
  return (
    <div className={classes.header}>
      <p className={classes.logo}>
        <span>
          <i className="bi bi-airplane-fill"></i>
        </span>
        Travel<span>Hub</span>
      </p>

      <nav className={classes.navbar}>
        <ul className={classes.list}>
          <li><a>Home</a></li>
          <li><a>Search</a></li>
          <li><a>Checkout</a></li>
        </ul>
      </nav>

      <button type="button" className={classes.logoutButton}>
        Logout
        <i className="bi bi-box-arrow-right"></i>
      </button>
    </div>
  );
};

export default Header;
