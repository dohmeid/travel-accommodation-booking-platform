import React, { useState, FC, useEffect } from "react";
import classes from "./Information.module.css";
import { useHotelContext } from "../../../context/hotelProvider";
import { HotelInformation } from "../../../interfaces/hotel";
import StarRating from "../../common/StarRating/StarRating";
import GoogleMapReact from "google-map-react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Map from "./Map/Map";

interface Props {
  hotelId: number;
}

const Information: FC<Props> = ({ hotelId }) => {
  const { fetchInformation } = useHotelContext();
  const [info, setInfo] = useState<HotelInformation>();

  useEffect(() => {
    const fetchHotelData = async () => {
      const data = await fetchInformation(hotelId);
      console.log(data);
      setInfo(data);
    };

    fetchHotelData();
  }, []);

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const defaultProps = {
    center: {
      lat: info?.latitude,
      lng: info?.longitude,
    },
    zoom: 50,
  };

  if (!info) {
    return <p>no data found</p>;
  }
  return (
    <div className={classes.infoContainer}>
      <div className={`${classes.flexContainer} ${classes.headerContainer}`}>
        <div>
          <h2>{info.hotelName}</h2>
          <p>
            <i className="bi bi-geo-alt-fill"></i>
            {info.location}
          </p>
        </div>
        <StarRating stars={info.starRating} />
      </div>

      <div className={`${classes.flexContainer} ${classes.mainContainer}`}>
        <div className={classes.sideContainer}>
          <div className={classes.overviewContainer}>
            <h3>Overview</h3>
            <p>{info.description}</p>
            <p>
              <i className="bi bi-check-circle-fill"></i>
              {info.availableRooms} available rooms.
            </p>
          </div>
          <ul className={classes.amenitiesContainer}>
            {info.amenities.map((a) => (
              <li className={classes.amenity}>
                <i className="bi bi-plus-circle-fill"></i>
                <div>
                  <h4>{a.name}</h4>
                  <p>{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Map
          hotel={info.hotelName}
          latitude={info.latitude}
          longitude={info.longitude}
        />
      </div>
    </div>
  );
};

export default Information;
