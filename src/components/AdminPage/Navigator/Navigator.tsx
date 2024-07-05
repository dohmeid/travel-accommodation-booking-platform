import React, { useState, FC } from "react";
import classes from "./Navigator.module.css";

const Navigator: FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleOpen = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className={classes.navigator}>
      <div className={classes.navTrigger}>
        <button type="button" onClick={toggleOpen}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      <nav className={isNavCollapsed ? classes.nav :`${classes.nav} ${classes.navClosed}` }>
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <a href="#">Cities</a>
          </li>
          <li className={classes.navItem}>
            <a href="#">Hotels </a>
          </li>
          <li className={classes.navItem}>
            <a href="#">Rooms</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigator;
