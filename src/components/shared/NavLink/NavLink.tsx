import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavLink.module.css';

interface Props {
  to: string;
  isActive: boolean;
  label: string;
  iconClass?: string;
  isLeftNav?: boolean;
}

const NavLink: FC<Props> = ({ to, isActive, label, iconClass, isLeftNav }) => {
  const linkClassName = (() => {
    if (isActive && isLeftNav) {
      return classes.leftNavActive;
    } else if (isActive && !isLeftNav) {
      return classes.active;
    }
    return '';
  })();

  return (
    <li className={classes.link}>
      <Link to={to} className={linkClassName}>
        {iconClass && <i className={iconClass} />} {label}
      </Link>
    </li>
  );
};

export default NavLink;
