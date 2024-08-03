import React, { useState, FC, useEffect } from "react";
import classes from "./Rooms.module.css";
import { useHotelContext } from "../../../context/hotelProvider";
import { Room } from "../../../interfaces/hotel";
import RoomCard from "./RoomCard/RoomCard";

interface Props {
  hotelId: number;
}

const Rooms: FC<Props> = ({ hotelId }) => {
  const { fetchAvailableRooms } = useHotelContext();
  const [rooms, setRooms] = useState<Room[]>();

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetchAvailableRooms(hotelId, "2/2/2022", "2/2/2022");
      console.log(data);
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div className={classes.roomsContainer}>
      <h2>Available Rooms</h2>

      <div className={classes.cardsContainer}>
        {!rooms || rooms.length === 0 ? (
          <p>No rooms to display</p>
        ) : (
          rooms.map((room) => <RoomCard key={room.roomId} data={room} />)
        )}
      </div>
    </div>
  );
};

export default Rooms;
