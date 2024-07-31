import React, { useState, FC, useEffect } from "react";
import classes from "./HotelPage.module.css";
import { useHotelContext } from "../../context/hotelProvider";
import { GalleryImage } from "../../interfaces/hotel";
import Gallery from "../../components/hotel/Gallery/Gallery";
import Information from "../../components/hotel/Information/Information";

const HotelPage: FC = () => {
  const hotelId = 0;

  return (
    <div className={classes.hotelPage}>
      <Gallery hotelId={hotelId} />
      <Information hotelId={hotelId} />
    </div>
  );
};

export default HotelPage;
