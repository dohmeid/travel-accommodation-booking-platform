import React, { FC, useState } from "react";
import { useHotelContext } from "../../../context/hotelProvider";
import ReviewCard from "./ReviewCard/ReviewCard";
import classes from "./Reviews.module.css";

const Reviews: FC = () => {
  const { reviews } = useHotelContext();
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleShowMoreButtonClick = () => {
    setVisibleCount(showAllReviews ? 6 : reviews.length); //show only 6 cards or all cards
    setShowAllReviews(!showAllReviews);
  };

  if (!reviews || reviews.length === 0) {
    return <p>No reviews to display</p>;
  }

  return (
    <div className={classes.reviewsContainer}>
      <h2>Guests Rating & Reviews</h2>

      <div className={classes.cardsContainer}>
        {reviews.slice(0, visibleCount).map((review) => (
          <ReviewCard key={review.reviewId} reviewData={review} />
        ))}
      </div>

      {reviews.length > 6 && (
        <button
          className={classes.showMoreButton}
          onClick={handleShowMoreButtonClick}
        >
          {showAllReviews ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Reviews;
