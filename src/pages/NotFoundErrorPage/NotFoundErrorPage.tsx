import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NotFoundErrorPage.module.css';

const NotFoundErrorPage: FC = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className={classes.container}>
      <div className={classes.overlay}>
        <h1>404</h1>
        <h2>UH OH! You are lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the previous
          page.
        </p>
        <button type="button" onClick={handleBackButtonClick}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundErrorPage;
