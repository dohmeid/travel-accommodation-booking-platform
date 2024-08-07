import React, { FC } from "react";
import { useSlideshow } from "../../../hooks/useSlideshow";
import classes from "./Slideshow.module.css";

interface Props {
  items: any[];
  renderItems: JSX.Element[];
  cardWidth: number;
}

const Slideshow: FC<Props> = ({ items, renderItems, cardWidth }) => {
  const { currentIndex, handleIndicatorClick } = useSlideshow(items);
  const itemsLength = renderItems.length;

  return (
    <div className={classes.slideshow}>
      <div className={classes.carousel}>
        <div
          className={classes.cards}
          style={{
            transform: `translateX(-${currentIndex * cardWidth}rem)`,
            width: `${itemsLength * cardWidth}rem`,
          }}
        >
          {itemsLength > 0 ? renderItems : <p>Loading...</p>}
        </div>
      </div>

      <div className={classes.dots}>
        {Array.from({ length: itemsLength }).map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              index === currentIndex ? classes.active : ""
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
