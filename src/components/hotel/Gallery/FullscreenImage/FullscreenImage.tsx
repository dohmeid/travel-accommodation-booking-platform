import React, { FC } from "react";
import classes from "./FullscreenImage.module.css";

interface Props {
  image: string;
  onClose: () => void;
}

const FullscreenImage: FC<Props> = ({ image, onClose }) => {
  return (
    <div className={classes.fullscreen}>
      <img src={image} alt="Fullscreen hotel image" />
      <button
        className={classes.closeButton}
        aria-label="Close Fullscreen Image"
        onClick={onClose}
      >
        <i className="bi bi-x"></i>
      </button>
    </div>
  );
};

export default FullscreenImage;
