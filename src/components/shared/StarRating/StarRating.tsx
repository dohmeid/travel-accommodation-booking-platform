import React, { FC } from 'react';
import classes from './StarRating.module.css';

interface Props {
  stars: number;
}

const StarRating: FC<Props> = ({ stars }) => {
  return (
    <div className={classes.starRating}>
      <i className="bi bi-star-fill"></i>
      {stars}
    </div>
  );
};

export default StarRating;
