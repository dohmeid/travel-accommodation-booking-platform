import React, { useState, FC, useEffect } from "react";
import classes from "./Gallery.module.css";
import { useHotelContext } from "../../context/hotelProvider";
import { GalleryImage } from "../../interfaces/hotel";

interface Props {
    hotelId: number;
}

const Gallery: FC<Props> = ({hotelId}) => {
  
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

  return (
    <div className={classes.gallery}>
      {!gallery || gallery.length === 0 ? (
        <p>No items to display</p>
      ) : (
        gallery.map((image) => (
          <div className={classes.imageContainer}>
            <img key={image.id} src={image.url} />
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
