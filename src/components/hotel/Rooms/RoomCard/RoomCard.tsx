import React, { FC } from 'react';
import { useCartContext } from '../../../../context/cartProvider';
import { Room } from '../../../../types/hotelTypes';
import classes from './RoomCard.module.css';

interface Props {
  roomData: Room;
}

const RoomCard: FC<Props> = ({ roomData }) => {
  const { addRoomToCart, isItemInCart } = useCartContext();
  const {
    roomId,
    roomPhotoUrl,
    roomType,
    capacityOfAdults,
    capacityOfChildren,
    availability,
    roomAmenities,
    price,
  } = roomData;

  const handleAddToCartButtonClick = () => {
    addRoomToCart(roomData);
  };

  return (
    <div className={classes.card}>
      <img src={roomPhotoUrl} alt={`${roomType} Room`}></img>
      <h3>{roomType} Room</h3>

      <div className={classes.capacity}>
        <p>
          <i className="bi bi-people-fill" />
          {capacityOfAdults} adults
        </p>
        <p>
          <i className="bi bi-person-arms-up" /> {capacityOfChildren} children
        </p>
        <p>
          <i
            className={`bi ${
              availability ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
            }`}
          />{' '}
          {availability ? 'Available' : 'Not available'}
        </p>
      </div>

      <div className={`${classes.amenities} ${classes.flexContainer}`}>
        {roomAmenities &&
          roomAmenities.map((amenity, index) => (
            <p key={index} className={classes.amenity}>
              {amenity.name} - {amenity.description}
            </p>
          ))}
      </div>

      <p className={classes.price}>
        $<span>{price}</span>/night
      </p>

      <button
        type="button"
        className={classes.addButton}
        disabled={isItemInCart(roomId)}
        onClick={handleAddToCartButtonClick}
        aria-label={isItemInCart(roomId) ? 'Remove from cart' : 'Add to cart'}
      >
        {isItemInCart(roomId) ? 'Added' : 'Add to cart'}
      </button>
    </div>
  );
};

export default RoomCard;
