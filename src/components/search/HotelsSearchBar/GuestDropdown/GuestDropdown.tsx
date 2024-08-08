import React, { FC, useState } from "react";
import useCurrentPage from "../../../../hooks/useCurrentPage";
import { Guests } from "../../../../interfaces/searchTypes";
import classes from "./GuestDropdown.module.css";

interface Props {
  guestsData: Guests;
  setGuestsData: React.Dispatch<React.SetStateAction<Guests>>;
}

const GuestDropdown: FC<Props> = ({ guestsData, setGuestsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInSearchPage } = useCurrentPage();

  const items = [
    {
      id: 1,
      key: "adults" as keyof Guests,
      label: "Adults",
      description: "ages 18 and above",
    },
    {
      id: 2,
      key: "children" as keyof Guests,
      label: "Children",
      description: "ages 0-17",
    },
    {
      id: 3,
      key: "numberOfRooms" as keyof Guests,
      label: "Rooms",
      description: "",
    },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const updateGuestData = (key: keyof Guests, increment: boolean) => {
    setGuestsData((prevData) => ({
      ...prevData,
      [key]: increment ? prevData[key] + 1 : Math.max(0, prevData[key] - 1),
    }));
  };

  return (
    <div
      className={`${classes.quantityController} ${
        isInSearchPage ? classes.minQuantityController : ""
      }`}
    >
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
            {guestsData.adults} adults, {guestsData.children} children
          </p>
          <p className={classes.room}>{guestsData.numberOfRooms} room</p>
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
                <p>{item.label}</p>
                <p className={classes.description}>{item.description}</p>
              </div>

              <div className={classes.buttonsContainer}>
                <button onClick={() => updateGuestData(item.key, false)}>
                  -
                </button>
                <p>{guestsData[item.key]}</p>
                <button onClick={() => updateGuestData(item.key, true)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestDropdown;
