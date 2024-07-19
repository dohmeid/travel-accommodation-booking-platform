import React, { useState, FC } from "react";
import { NavLink } from "react-router-dom";
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
        <li className={classes.navItem}>
          <NavLink
            to="city"
            style={({ isActive }) => ({
              color: isActive ? "var(--orange1)" : "var(--white)",
              fontWeight: isActive ? "700" : "300",
            })}
          >
            <i className="fa-solid fa-city"></i>
            Manage Cities
          </NavLink>
        </li>

        <li className={classes.navItem}>
          <NavLink
            to="hotel"
            style={({ isActive }) => ({
              color: isActive ? "var(--orange1)" : "var(--white)",
              fontWeight: isActive ? "700" : "300",
            })}
          >
            <i className="fas fa-hotel"></i>
            Manage Hotels
          </NavLink>
        </li>

        <li className={classes.navItem}>
          <NavLink
            to="room"
            style={({ isActive }) => ({
              color: isActive ? "var(--orange1)" : "var(--white)",
              fontWeight: isActive ? "700" : "300",
            })}
          >
            <i className="fa fa-bed" aria-hidden="true"></i>
            Manage Rooms
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavigator;
