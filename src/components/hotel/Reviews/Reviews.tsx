import React, { useState, FC, useEffect } from "react";
import classes from "./Reviews.module.css";
import { useHotelContext } from "../../../context/hotelProvider";
import { Review } from "../../../interfaces/hotel";
import ReviewCard from "./ReviewCard/ReviewCard";

interface Props {
  hotelId: number;
}

const Reviews: FC<Props> = ({ hotelId }) => {
  const { fetchReviews } = useHotelContext();
  const [reviews, setReviews] = useState<Review[]>();

  const [visibleCount, setVisibleCount] = useState(6);
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => {
    if (reviews) {
      if (showAll) {
        setVisibleCount(6); // Show only 6 cards
      } else {
        setVisibleCount(reviews.length); // Show all cards
      }
      setShowAll(!showAll);
    }
  };

  useEffect(() => {
    const fetchHotelReviews = async () => {
      const data = await fetchReviews(hotelId);
      console.log(data);
      setReviews(data);
    };

    fetchHotelReviews();
  }, []);

  return (
    <div className={classes.reviewsContainer}>
      <h2>Guests Rating & Reviews</h2>

      <div className={classes.cardsContainer}>
        {!reviews || reviews.length === 0 ? (
          <p>No reviews to display</p>
        ) : (
          reviews
            .slice(0, visibleCount)
            .map((review) => (
              <ReviewCard key={review.reviewId} ReviewData={review} />
            ))
        )}
      </div>

      <button className={classes.showMoreButton} onClick={toggleShow}>
        {showAll ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default Reviews;
