import React, { FC } from 'react';
import useCurrentPage from '../../../hooks/useCurrentPage';
import { useAuthContext } from '../../../context/authProvider';
import NavLink from '../NavLink/NavLink';
import classes from './MainHeader.module.css';

const MainHeader: FC = () => {
  const { handleLogout } = useAuthContext();
  const { isInHomePage, isInSearchPage, isInCheckoutPage } = useCurrentPage();

  return (
    <header
      className={`${classes.header} ${
        isInHomePage ? classes.transparentHeader : ''
      }`}
      role="banner"
    >
      <p className={classes.logo}>
        <span>
          <i className="bi bi-airplane-fill"></i>
        </span>
        Travel<span>Hub</span>
      </p>

      <nav className={classes.navbar}>
        <ul className={classes.list}>
          <NavLink to="/main/home" isActive={isInHomePage} label="Home" />
          <NavLink to="/main/search" isActive={isInSearchPage} label="Search" />
          <NavLink
            to="/main/checkout"
            isActive={isInCheckoutPage}
            label="Checkout"
          />
        </ul>
      </nav>

      <button
        type="button"
        className={classes.logoutButton}
        onClick={handleLogout}
      >
        Logout
        <i className="bi bi-box-arrow-right"></i>
      </button>
    </header>
  );
};

export default MainHeader;
