import React, { useState, FC, useEffect } from "react";
import classes from "./CartItem.module.css";
import { Room } from "../../../../interfaces/hotel";
import { useCartContext } from "../../../../context/cartProvider";

interface Props {
  room: Room;
}

const CartItem: FC<Props> = ({ room }) => {
  const { cartItems, deleteRoomFromCart } = useCartContext();

  /*
export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
}

  */

  return (
    <div className={classes.item}>
      <img src={room.roomPhotoUrl} alt="room image" />
      <h4 className={classes.title}>{room.roomType} Room</h4>
      <p className={classes.price}>${room.price}/night</p>
      <button type="button" onClick={() => deleteRoomFromCart(room.roomId)}>
        Delete<i className="bi bi-trash3"></i>
      </button>
    </div>
  );
};

export default CartItem;
