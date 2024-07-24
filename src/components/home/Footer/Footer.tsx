import React, { useState, FC } from "react";
import classes from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyrightContainer}>
        <p>Copyright @ 2024 TravelHub.</p>
        <p>
          Designed and Developed by
          <a
            href="https://dohmeid.netlify.app/"
            target="_blank"
            aria-label="Go to Doha Hmeid Portfolio"
          >
            Doha Hmeid
          </a>
          . All Rights Reserved.
        </p>
      </div>

      <ul className={classes.socialLinks}>
        <li>
          <a
            href="https://www.linkedin.com/in/dohmeid/"
            target="_blank"
            aria-label="Go to LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/dohmeid"
            target="_blank"
            aria-label="Go to GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://m.facebook.com/doha.hmeid?mibextid=LQQJ4d"
            target="_blank"
            aria-label="Go to Facebook"
          >
            <i className="bi bi-facebook"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
