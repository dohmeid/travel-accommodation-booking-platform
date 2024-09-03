import React, { useState, FC, useEffect } from 'react';
import { NotificationType } from '../../../context/notificationProvider';
import classes from './Snackbar.module.css';

interface SnackbarProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
}

const Snackbar: FC<SnackbarProps> = ({ type, message, onClose }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [progress, setProgress] = useState(100);
  const duration = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 100));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsSnackbarOpen(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  const snackbarClass = `${classes.snackBar} ${classes[type]}`;

  const getIcon = () => {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'bi bi-check-circle-fill'; // Success icon
      case NotificationType.WARNING:
        return 'bi bi-exclamation-triangle-fill'; // Warning icon
      case NotificationType.ERROR:
        return 'bi bi-x-circle-fill'; // Error icon
    }
  };

  const handleClosingSnackbar = () => {
    setIsSnackbarOpen(false);
    if (onClose) onClose();
  };

  if (!isSnackbarOpen) return null;

  return (
    <div
      className={snackbarClass}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <i className={getIcon()} />
      <p className={classes.message}>{message}</p>
      <button
        className={classes.closeButton}
        onClick={handleClosingSnackbar}
        aria-label="Close notification"
      >
        <i className="bi bi-x"></i>
      </button>
      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBar}
          role="progressbar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Snackbar;
