import React, { useState, useEffect } from "react";

export function useSnackbar() {
  const [isSnackbarActive, setIsSnackbarActive] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (isSnackbarActive) {
      setTimeout(() => {
        setIsSnackbarActive(false);
      }, 3000);
    }
  }, [isSnackbarActive]);

  const openSnackBar = (msg = "Something went wrong...") => {
    setMessage(msg);
    setIsSnackbarActive(true);
  };

  return { isSnackbarActive, message, openSnackBar };
}
