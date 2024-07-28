import React, { FC, useContext } from "react";
import classes from "./Header.module.css";
import { AuthenticationContext } from "../../../context/authentication";
import { AuthenticationContextType } from "../../../interfaces/auth";
import { Link, useLocation } from "react-router-dom";

const Header: FC = () => {
  const { handleLogout } = useContext(
    AuthenticationContext
  ) as AuthenticationContextType;

  const currentPage = useLocation().pathname;

  return (
    <div
      className={`${classes.header} ${
        currentPage === "/main" || currentPage === "/main/home"
          ? classes.transparentHeader
          : ""
      }`}
    >
      <p className={classes.logo}>
        <span>
          <i className="bi bi-airplane-fill"></i>
        </span>
        Travel<span>Hub</span>
      </p>

      <nav className={classes.navbar}>
        <ul className={classes.list}>
          <li>
            <Link
              to="/main/home"
              className={
                currentPage === "/main" || currentPage === "/main/home"
                  ? classes.active
                  : ""
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/main/search"
              className={currentPage === "/main/search" ? classes.active : ""}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/main/checkout"
              className={currentPage === "/main/checkout" ? classes.active : ""}
            >
              Checkout
            </Link>
          </li>
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
    </div>
  );
};

export default Header;
