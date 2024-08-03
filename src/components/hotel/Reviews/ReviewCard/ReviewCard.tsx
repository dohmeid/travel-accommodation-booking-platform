import React, { FC } from "react";
import { Review } from "../../../../interfaces/hotel";
import classes from "./ReviewCard.module.css";

interface Props {
  ReviewData: Review;
}

const ReviewCard: FC<Props> = ({ ReviewData }) => {
  return (
    <div className={classes.card}>
      <div className={classes.flexContainer}>
        <p className={classes.title}>{ReviewData.customerName}</p>
        <div className={classes.stars}>
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className="bi bi-star-fill"
              style={{
                color: index < ReviewData.rating ? "#fad043" : "",
              }}
            ></i>
          ))}
        </div>
      </div>
      <p className={classes.description}>{ReviewData.description}</p>
    </div>
  );
};

export default ReviewCard;
