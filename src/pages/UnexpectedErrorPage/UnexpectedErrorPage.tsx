import React, { FC } from 'react';
import classes from './UnexpectedErrorPage.module.css';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}
const UnexpectedErrorPage: FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={classes.container} role="alert">
      <div className={classes.overlay}>
        <h1>
          500 <i className="bi bi-bug-fill" />
        </h1>
        <h2>Oops! Something went wrong.</h2>
        <p>
          An unexpected error occurred. We are sorry for the inconvenience.
          Please try again later.
        </p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <button type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default UnexpectedErrorPage;
