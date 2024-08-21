import React, { useState, useEffect } from 'react';
import classes from './CursorFollower.module.css';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={classes.circle}
      style={{
        left: position.x,
        top: position.y,
      }}
    ></div>
  );
};

export default CursorFollower;
