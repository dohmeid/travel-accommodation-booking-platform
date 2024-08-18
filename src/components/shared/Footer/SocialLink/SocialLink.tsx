import React, { FC } from 'react';
import classes from './SocialLink.module.css';

interface Props {
  linkData: {
    id: number;
    link: string;
    iconClass: string;
    label: string;
  };
  text: string;
}

const SocialLink: FC<Props> = ({ linkData, text }) => {
  const { link, iconClass, label } = linkData;
  return (
    <a
      className={classes.link}
      href={link}
      target="_blank"
      aria-label={label}
      rel="noopener noreferrer"
    >
      <i className={iconClass}></i>
      {text}
    </a>
  );
};

export default SocialLink;
