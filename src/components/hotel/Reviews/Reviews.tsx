import React, { FC, useCallback, useState } from 'react';
import { useHotelContext } from '../../../context/hotelProvider';
import ReviewCard from './ReviewCard/ReviewCard';
import classes from './Reviews.module.css';

const Reviews: FC = () => {
  const { reviews } = useHotelContext();
  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleToggleReviews = useCallback(() => {
    setIsShowingAll((prevState) => !prevState);
  }, []);

  if (!reviews || reviews.length === 0) {
    return <p>No reviews to display</p>;
  }

  const displayedReviews = isShowingAll ? reviews : reviews.slice(0, 6);

  return (
    <div className={classes.reviewsContainer}>
      <h2>Guests Rating & Reviews</h2>

      <div className={classes.cardsContainer}>
        {displayedReviews.map((review) => (
          <ReviewCard key={review.reviewId} reviewData={review} />
        ))}
      </div>

      {reviews.length > 6 && (
        <button
          className={classes.showMoreButton}
          onClick={handleToggleReviews}
          aria-expanded={isShowingAll}
        >
          {isShowingAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default Reviews;
