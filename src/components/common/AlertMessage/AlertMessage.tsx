import React, { useState, FC } from "react";
import classes from "./AlertMessage.module.css";

const AlertMessage: FC = () => {
  //"this.parentElement.style.display='none';"
  return (
    <div className={classes.alertMessage}>
      <i className="bi bi-exclamation-circle-fill"></i>
      <p>Login failed. Please check your credentials and try again.</p>
    </div>
  );
};

export default AlertMessage;
