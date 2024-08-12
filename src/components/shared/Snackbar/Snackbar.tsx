import React, { useState, FC } from "react";
import classes from "./Snackbar.module.css";
import {useError} from "../../../context/ErrorProvider";


// Define the props type
interface SnackbarProps {
  message: string;
}

const Snackbar: FC<SnackbarProps> = ({ message }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const { clearError } = useError();

  const handleClosingSnackbar = (e: any) => {
    setIsSnackbarOpen(false);
    clearError(); //to reset the error to null
  };

  return isSnackbarOpen ? (
    <div className={classes.snackBar}>
      <i className="bi bi-exclamation-circle-fill"></i>
      <p className={classes.message}>{message}</p>
      <button className={classes.closeButton} onClick={handleClosingSnackbar}>
        <i className="bi bi-x"></i>
      </button>
    </div>
  ) : null;
};

export default Snackbar;
