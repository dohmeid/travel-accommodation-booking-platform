import React, { FC } from "react";
import { useCartContext } from "../../../../context/cartProvider";
import { Room } from "../../../../interfaces/hotelTypes";
import classes from "./CartItem.module.css";

interface Props {
  room: Room;
}

const CartItem: FC<Props> = ({ room }) => {
  const { deleteRoomFromCart } = useCartContext();

  const handleDeleteButtonClick = () => {
    console.log("dwel");
    deleteRoomFromCart(room.roomId);
  }

  return (
    <div className={classes.item}>
      <img src={room.roomPhotoUrl} alt="room image" />
      <h4 className={classes.title}>{room.roomType} Room</h4>
      <p className={classes.price}>${room.price}/night</p>
      <button type="button" onClick={handleDeleteButtonClick}>
        Delete<i className="bi bi-trash3"></i>
      </button>
    </div>
  );
};

export default CartItem;
