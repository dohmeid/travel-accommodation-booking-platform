import React, { FC } from "react";
import { Room } from "../../../../interfaces/hotel";
import { useCartContext } from "../../../../context/cartProvider";
import classes from "./RoomCard.module.css";

interface Props {
  data: Room;
}

const RoomCard: FC<Props> = ({ data }) => {
  const { addRoomToCart, isItemInCart } = useCartContext();

  const handleAddToCartButtonClick = () => {
    addRoomToCart(data);
  };

  return (
    <div className={classes.card}>
      <img src={data.roomPhotoUrl}></img>
      <h3>{data.roomType} Room</h3>

      <div className={classes.capacity}>
        <p>
          <i className="bi bi-people-fill"></i> {data.capacityOfAdults} adults
        </p>
        <p>
          <i className="bi bi-person-arms-up"></i> {data.capacityOfChildren}{" "}
          children
        </p>

        {data.availability ? (
          <p>
            <i className="bi bi-check-circle-fill"></i> available
          </p>
        ) : (
          <p>
            <i className="bi bi-x-circle-fill"></i> not available
          </p>
        )}
      </div>

      <div className={`${classes.amenities} ${classes.flexContainer}`}>
        {data.roomAmenities.length === 0 ? (
          <p>no room amenities</p>
        ) : (
          data.roomAmenities.map((amenity, index) => (
            <p key={index} className={classes.amenity}>
              {amenity.name} - {amenity.description}
            </p>
          ))
        )}
      </div>

      <p className={classes.price}>
        $<span>{data.price}</span>/night
      </p>

      <button
        type="button"
        className={classes.addButton}
        disabled={isItemInCart(data.roomId)}
        onClick={handleAddToCartButtonClick}
      >
        {isItemInCart(data.roomId) ? "Added" : "Add to cart"}
      </button>
    </div>
  );
};

export default RoomCard;
