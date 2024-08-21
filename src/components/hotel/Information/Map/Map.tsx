import React, { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import classes from './Map.module.css';

interface Props {
  hotel: string;
  latitude: number;
  longitude: number;
}

const Map: FC<Props> = ({ hotel, latitude, longitude }) => {
  return (
    <div className={classes.mapContainer}>
      <MapContainer
        className={classes.map}
        center={[latitude, longitude]}
        zoom={16}
        key={`${latitude}-${longitude}`}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{hotel}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
