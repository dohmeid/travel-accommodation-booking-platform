import React, { FC, MouseEvent } from "react";
import classes from "./UpdateDialog.module.css";


const UpdateDialog: FC = () => {
  return (
    <div className={classes.deleteDialog}>
      <h2>City Deletion</h2>
      <h3>Are you certain you wish to delete this City?</h3>

      <div className={classes.buttons}>
        <button className={classes.closeBtn} type="button">
          Close
        </button>
        <button
          className={classes.deleteBtn}
          type="button"
          
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UpdateDialog;
