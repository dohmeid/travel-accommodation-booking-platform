import React, { useState, FC, useEffect } from "react";
import classes from "./Gallery.module.css";
import { useHotelContext } from "../../../context/hotelProvider";
import { GalleryImage } from "../../../interfaces/hotel";
import FullscreenImage from "./FullscreenImage/FullscreenImage";

interface Props {
  hotelId: number;
}

const Gallery: FC<Props> = ({ hotelId }) => {
  const { fetchGallery } = useHotelContext();
  const [gallery, setGallery] = useState<GalleryImage[]>();

  useEffect(() => {
    const fetchGalleryData = async () => {
      const data = await fetchGallery(hotelId);
      console.log(data);
      setGallery(data);
    };

    fetchGalleryData();
  }, []);

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className={classes.gallery}>
      {!gallery || gallery.length === 0 ? (
        <p>No items to display</p>
      ) : (
        gallery.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Gallery Image ${index}`}
            onClick={() => handleImageClick(image.url)}
          />
        ))
      )}

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
