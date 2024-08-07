import React, { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./NavLink.module.css";

interface Props {
  to: string;
  isActive: boolean;
  label: string;
}

const NavLink: FC<Props> = ({ to, isActive, label }) => {
  return (
    <li className={classes.link}>
      <Link to={to} className={isActive ? classes.active : ""}>
        {label}
      </Link>
    </li>
  );
};

export default NavLink;

/*
  <li className={isActive ? classes.active : ""}>
      <Link to={to}>{label}</Link>
    </li>
*/
