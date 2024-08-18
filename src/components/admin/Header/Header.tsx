import React, { FC } from 'react';
import { useAuthContext } from '../../../context/authProvider';
import adminImage from '../../../assets/images/adminProfiePicture.png';
import classes from './Header.module.css';

const Header: FC = () => {
  const { handleLogout } = useAuthContext();

  return (
    <header className={classes.header}>
      {/* Logo section */}
      <div className={classes.logo}>
        <i className="bi bi-airplane-fill"></i>
        <div className={classes.logoDetails}>
          <h1>TravelHub</h1>
          <h2>Admin Portal</h2>
        </div>
      </div>

      {/* Profile section */}
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

        {/* Logout button */}
        <button
          type="button"
          className={classes.logoutBtn}
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;
