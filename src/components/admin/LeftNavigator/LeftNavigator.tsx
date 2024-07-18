import React, { useState, FC } from "react";
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import classes from "./LeftNavigator.module.css";

const LeftNavigator: FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleOpen = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav
      className={
        isNavCollapsed ? classes.nav : `${classes.nav} ${classes.navClosed}`
      }
    >
      <button type="button" className={classes.navBtn} onClick={toggleOpen}>
        <i
          className={`${isNavCollapsed ? classes.xIcon : classes.listIcon} ${
            isNavCollapsed ? "bi bi-x" : "bi bi-list"
          }`}
        ></i>
      </button>

      <ul className={classes.navList}>
        <li className={`${classes.navItem} ${classes.activeNavItem}`}>
          <Link to="city">
            <i className="fa-solid fa-city"></i>
            Manage Cities
          </Link>
        </li>
        <li className={classes.navItem}>
          <Link to="hotel">
            <i className="fas fa-hotel"></i>
            Manage Hotels
          </Link>
        </li>
        <li className={classes.navItem}>
          <a href="#">
            <i className="fa fa-bed" aria-hidden="true"></i>
            Manage Rooms
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavigator;
