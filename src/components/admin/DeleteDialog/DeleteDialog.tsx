import React, { FC, MouseEvent } from "react";
import classes from "./DeleteDialog.module.css";

interface Props {
  handleCloseButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleDeleteButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteDialog: FC<Props> = ({
  handleCloseButtonClick,
  handleDeleteButtonClick,
}) => {
  return (
    <div className={classes.deleteDialog}>
      <h2>City Deletion</h2>
      <h3>Are you certain you wish to delete this City?</h3>

      <div className={classes.buttons}>
        <button className={classes.closeBtn} type="button" onClick={handleCloseButtonClick}>
          Close
        </button>
        <button
          className={classes.deleteBtn}
          type="button"
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
