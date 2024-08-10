import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotelContext } from "../../context/hotelProvider";
import { useSearchContext } from "../../context/searchProvider";
import Gallery from "../../components/hotel/Gallery/Gallery";
import Information from "../../components/hotel/Information/Information";
import Reviews from "../../components/hotel/Reviews/Reviews";
import Rooms from "../../components/hotel/Rooms/Rooms";
import classes from "./HotelPage.module.css";

const HotelPage: FC = () => {
  const { fetchGallery, fetchInformation, fetchReviews, fetchAvailableRooms } =
    useHotelContext();
  const { searchQuery } = useSearchContext();

  const { hotelId } = useParams<{ hotelId: string }>();
  const id = parseInt(hotelId!);

  useEffect(() => {
    fetchGallery(id);
    fetchInformation(id);
    fetchReviews(id);
    fetchAvailableRooms(id, searchQuery.checkInDate, searchQuery.checkOutDate);
  }, [id]);

  return (
    <div className={classes.hotelPage}>
      <Gallery />
      <Information />
      <Rooms />
      <Reviews />
    </div>
  );
};

export default HotelPage;
