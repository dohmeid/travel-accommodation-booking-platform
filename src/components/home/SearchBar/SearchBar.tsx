import React, { useRef, useState, FC, ChangeEvent } from "react";
import classes from "./SearchBar.module.css";
import DatePicker from "react-date-picker";
import { format, addDays, parseISO } from "date-fns";
import { ref } from "yup";

const SearchBar: FC = () => {
  const dateIn = useRef<HTMLInputElement>(null);
  const dateOut = useRef<HTMLInputElement>(null);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [checkInDate, setCheckInDate] = useState(format(today, "yyyy-MM-dd"));
  const [checkOutDate, setCheckOutDate] = useState(
    format(tomorrow, "yyyy-MM-dd")
  );

  const handleCheckInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(e.target.value);
  };

  const getDayName = (date: string): string => {
    return format(parseISO(date), "EEEE");
  };

  const openCalendar = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const [items, setItems] = useState([
    { id: 1, name: "Adults", description: "ages 18 and above", quantity: 2 },
    { id: 2, name: "Children", description: "ages 0-17", quantity: 0 },
    { id: 3, name: "Rooms", description: "", quantity: 1 },
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const incrementQuantity = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      )
    );
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchInput}>
        <i className={`${classes.searchIcon} bi bi-search`}></i>
        <input
          type="search"
          name="search"
          aria-label="search for a string"
          placeholder="Search for hotels, cities..."
        />
      </div>

      <div className={classes.controlsContainer}>
        <div className={classes.datesContainer}>
          <div className={classes.checkin}>
            <label htmlFor="checkinDate">
              Checkin <i className="bi bi-calendar-check"></i>
            </label>
            <div>
              <input
                type="date"
                id="checkinDate"
                name="checkinDate"
                ref={dateIn}
                value={checkInDate}
                onChange={handleCheckInChange}
                onClick={() => openCalendar(dateIn)}
              />
              <p className={classes.day}>{getDayName(checkInDate)}</p>
            </div>
          </div>

          <div className={classes.checkout}>
            <label htmlFor="checkoutDate">
              Checkout <i className="bi bi-calendar-x"></i>
            </label>
            <div>
              <input
                type="date"
                id="checkoutDate"
                name="checkoutDate"
                ref={dateOut}
                value={checkOutDate}
                onChange={handleCheckOutChange}
                onClick={() => openCalendar(dateOut)}
              />
              <p className={classes.day}>{getDayName(checkOutDate)}</p>
            </div>
          </div>
        </div>

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
            <i className={`${classes.arrowDown} bi bi-caret-down-fill`}></i>
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
                    <button onClick={() => decrementQuantity(item.id)}>
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => incrementQuantity(item.id)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button type="button" className={classes.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
