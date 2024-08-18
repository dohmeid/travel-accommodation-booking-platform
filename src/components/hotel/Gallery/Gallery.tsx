import React, { FC, useState } from 'react';
import { useHotelContext } from '../../../context/hotelProvider';
import FullscreenImage from './FullscreenImage/FullscreenImage';
import classes from './Gallery.module.css';

const Gallery: FC = () => {
  const { gallery } = useHotelContext();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  if (!gallery || gallery.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <div className={classes.gallery}>
      {gallery.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          alt={`Gallery ${index + 1}`}
          className={classes.hotelImage}
          onClick={() => handleImageClick(image.url)}
        />
      ))}

      {fullscreenImage && (
        <FullscreenImage
          image={fullscreenImage}
          onClose={handleCloseFullscreen}
        />
      )}
    </div>
  );
};

export default Gallery;
