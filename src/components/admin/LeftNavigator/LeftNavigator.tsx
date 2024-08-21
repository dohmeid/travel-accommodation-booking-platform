import React, { useState, FC } from 'react';
import useCurrentPage from '../../../hooks/useCurrentPage';
import NavLink from '../../shared/NavLink/NavLink';
import classes from './LeftNavigator.module.css';

const LeftNavigator: FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const {
    isInCityManagementPage,
    isInHotelManagementPage,
    isInRoomManagementPage,
  } = useCurrentPage();

  const toggleNavigation = () => {
    setIsNavCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={`${classes.nav} ${isNavCollapsed ? '' : classes.navClosed}`}
      aria-label="Primary Navigation"
    >
      <button
        type="button"
        className={classes.navBtn}
        aria-label={isNavCollapsed ? 'Close Navigation' : 'Open Navigation'}
        onClick={toggleNavigation}
      >
        <i
          className={`${isNavCollapsed ? 'bi bi-x' : 'bi bi-list'} ${
            isNavCollapsed ? classes.xIcon : classes.listIcon
          }`}
          aria-hidden="true"
        />
      </button>

      <ul className={classes.navList}>
        <NavLink
          to="city"
          isActive={isInCityManagementPage}
          label="Manage Cities"
          iconClass="fa-solid fa-city"
          isLeftNav
        />
        <NavLink
          to="hotel"
          isActive={isInHotelManagementPage}
          label="Manage Hotels"
          iconClass="fas fa-hotel"
          isLeftNav
        />
        <NavLink
          to="room"
          isActive={isInRoomManagementPage}
          label="Manage Rooms"
          iconClass="fa fa-bed"
          isLeftNav
        />
      </ul>
    </nav>
  );
};

export default LeftNavigator;
