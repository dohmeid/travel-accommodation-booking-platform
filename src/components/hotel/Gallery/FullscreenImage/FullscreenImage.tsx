import React, { FC } from "react";
import classes from "./FullscreenImage.module.css";

interface Props {
  image: string;
  onClose: () => void;
}

const FullscreenImage: FC<Props> = ({ image, onClose }) => {
  return (
    <div className={classes.fullscreen} onClick={onClose}>
      <img src={image} alt="Fullscreen" />
    </div>
  );
};

export default FullscreenImage;
