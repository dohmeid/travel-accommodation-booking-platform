import React, { FC } from 'react';
import { Review } from '../../../../types/hotelTypes';
import classes from './ReviewCard.module.css';

interface Props {
  reviewData: Review;
}

const ReviewCard: FC<Props> = ({ reviewData }) => {
  const { customerName, rating, description } = reviewData;

  return (
    <div className={classes.card}>
      <div className={classes.flexContainer}>
        <p className={classes.title}>{customerName}</p>
        <div className={classes.stars}>
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              aria-label={`Star ${index + 1}`}
              className={`bi bi-star-fill ${
                index < rating ? classes.filledStar : ''
              }`}
            ></i>
          ))}
        </div>
      </div>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default ReviewCard;
