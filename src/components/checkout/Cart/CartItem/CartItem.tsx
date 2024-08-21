import React, { FC } from 'react';
import { useCartContext } from '../../../../context/cartProvider';
import { Room } from '../../../../types/hotelTypes';
import classes from './CartItem.module.css';

interface Props {
  room: Room;
}

const CartItem: FC<Props> = ({ room }) => {
  const { deleteRoomFromCart } = useCartContext();
  const { roomId, roomPhotoUrl, roomType, price } = room;

  const handleDeleteButtonClick = () => {
    deleteRoomFromCart(roomId);
  };

  return (
    <div className={classes.item}>
      <img src={roomPhotoUrl} alt="the room" />
      <h4 className={classes.title}>{roomType} Room</h4>
      <p className={classes.price}>${price}/night</p>
      <button type="button" onClick={handleDeleteButtonClick}>
        Delete
        <i className="bi bi-trash3" />
      </button>
    </div>
  );
};

export default CartItem;
