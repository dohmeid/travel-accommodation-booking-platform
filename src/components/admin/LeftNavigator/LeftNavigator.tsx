import React, { useState, FC } from "react";
import classes from "./LeftNavigator.module.css";

const LeftNavigator: FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleOpen = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className={classes.navigator}>
      <div className={classes.navTrigger}>
        <button type="button" className={classes.navBtn} onClick={toggleOpen}>
          <i
            className={`${isNavCollapsed ? classes.xIcon : classes.listIcon} ${
              isNavCollapsed ? "bi bi-x" : "bi bi-list"
            }`}
          ></i>
        </button>
      </div>

      <nav
        className={
          isNavCollapsed ? classes.nav : `${classes.nav} ${classes.navClosed}`
        }
      >
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <a href="#">Manage Cities</a>
          </li>
          <li className={classes.navItem}>
            <a href="#">Manage Hotels </a>
          </li>
          <li className={classes.navItem}>
            <a href="#">Manage Rooms</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftNavigator;