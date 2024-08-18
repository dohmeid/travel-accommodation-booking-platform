import React, { FC } from 'react';
import classes from './Spinner.module.css';

const Spinner: FC = () => {
  return (
    <div className={classes.SpinnerContainer}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Spinner;
