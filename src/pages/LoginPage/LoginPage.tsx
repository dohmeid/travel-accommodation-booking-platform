import React, { FC } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import classes from './LoginPage.module.css';

const LoginPage: FC = () => {
  return (
    <div className={classes.loginPage}>
      <div className={classes.container}>
        <div className={classes.headlineContainer}>
          <h1>
            Travel<span>Hub</span>
          </h1>
          <p>
            Welcome to Travel Hub: Your Ultimate Gateway to Unforgettable
            Adventures!
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
