import React, { FC } from 'react';
import { useHotelContext } from '../../../context/hotelProvider';
import RoomCard from './RoomCard/RoomCard';
import classes from './Rooms.module.css';

const Rooms: FC = () => {
  const { rooms } = useHotelContext();
  const ROOMS = rooms.map((room) => (
    <RoomCard key={room.roomId} roomData={room} />
  ));

  return (
    <div className={classes.roomsContainer}>
      <h2>Available Rooms</h2>

      <div className={classes.cardsContainer}>
        {ROOMS.length === 0 ? <p>No rooms to display</p> : ROOMS}
      </div>
    </div>
  );
};

export default Rooms;
