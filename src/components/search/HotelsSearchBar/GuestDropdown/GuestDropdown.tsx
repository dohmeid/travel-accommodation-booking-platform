import React, { useRef, useState, FC, ChangeEvent } from "react";
import classes from "./GuestDropdown.module.css";

interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

interface Props {
  guestsData: Guests;
  setGuestsData: React.Dispatch<React.SetStateAction<Guests>>;
}

const GuestDropdown: FC<Props> = ({ guestsData, setGuestsData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      id: 1,
      name: "Adults",
      description: "ages 18 and above",
      quantity: guestsData.adults,
    },
    {
      id: 2,
      name: "Children",
      description: "ages 0-17",
      quantity: guestsData.children,
    },
    { id: 3, name: "Rooms", description: "", quantity: guestsData.rooms },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const incrementQuantity = (id: number) => {
    if (id === 1) {
      setGuestsData((prevDate) => ({
        ...prevDate,
        adults: guestsData.adults + 1,
      }));
    } else if (id === 2) {
      setGuestsData((prevDate) => ({
        ...prevDate,
        children: guestsData.children + 1,
      }));
    } else {
      setGuestsData((prevDate) => ({
        ...prevDate,
        rooms: guestsData.rooms + 1,
      }));
    }
  };

  const decrementQuantity = (id: number) => {
    if (id === 1) {
      setGuestsData((prevDate) => ({
        ...prevDate,
        adults: guestsData.adults - 1,
      }));
    } else if (id === 2) {
      setGuestsData((prevDate) => ({
        ...prevDate,
        children: guestsData.children - 1,
      }));
    } else {
      setGuestsData((prevDate) => ({
        ...prevDate,
        rooms: guestsData.rooms - 1,
      }));
    }
  };

  return (
    <div className={classes.quantityController}>
      <div
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={classes.dropdownToggle}
      >
        <i className="bi bi-people-fill"></i>
        <div className={classes.details}>
          <p>
            {items[0].quantity} adults, {items[1].quantity} children
          </p>
          <p className={classes.room}>{items[2].quantity} room</p>
        </div>

        {isOpen ? (
          <i className={`${classes.arrowDown} bi bi-caret-up-fill`}></i>
        ) : (
          <i className={`${classes.arrowDown} bi bi-caret-down-fill`}></i>
        )}
      </div>

      {isOpen && (
        <ul
          role="menu"
          aria-orientation="vertical"
          className={classes.dropdownMenu}
        >
          {items.map((item) => (
            <li key={item.id} className={classes.dropdownItem}>
              <div className={classes.itemDetails}>
                <p>{item.name}</p>
                <p className={classes.description}>{item.description}</p>
              </div>

              <div className={classes.buttonsContainer}>
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestDropdown;
