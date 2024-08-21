import React, { FC } from 'react';
import { useAuthContext } from '../../context/authProvider';
import classes from './UnauthorizedErrorPage.module.css';

const UnauthorizedErrorPage: FC = () => {
  const { handleLogout } = useAuthContext();

  return (
    <div className={classes.container}>
      <div className={classes.overlay}>
        <div className={classes.lock}></div>
        <h1>401</h1>
        <h2>Access to this page is restricted</h2>
        <p>
          You attempted to access a page for which you are not authorized.
          Access is allowed only for registered users.
        </p>
        <button type="button" onClick={handleLogout}>
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedErrorPage;
