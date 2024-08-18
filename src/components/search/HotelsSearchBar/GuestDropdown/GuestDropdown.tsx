import React, { FC, useState } from 'react';
import useCurrentPage from '../../../../hooks/useCurrentPage';
import { SearchQuery } from '../../../../types/searchTypes';
import { GUEST_DROPDOWN_ITEMS } from '../../../../constants/searchDefaults';
import classes from './GuestDropdown.module.css';

interface Props {
  currentSearchQuery: SearchQuery;
  setCurrentSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

const GuestDropdown: FC<Props> = ({
  currentSearchQuery,
  setCurrentSearchQuery,
}) => {
  const { isInSearchPage } = useCurrentPage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const updateGuestData = (key: keyof SearchQuery, increment: boolean) => {
    setCurrentSearchQuery((prevData) => ({
      ...prevData,
      [key]: increment
        ? (prevData[key] as number) + 1
        : Math.max(0, (prevData[key] as number) - 1),
    }));
  };

  return (
    <div
      className={`${classes.quantityController} ${
        isInSearchPage ? classes.minQuantityController : ''
      }`}
    >
      <div
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={classes.dropdownToggle}
      >
        <i className="bi bi-people-fill" />
        <div className={classes.details}>
          <p>
            {currentSearchQuery.adults} adults, {currentSearchQuery.children}{' '}
            children
          </p>
          <p className={classes.room}>
            {currentSearchQuery.numberOfRooms} rooms
          </p>
        </div>

        <i
          className={`${classes.arrowDown} bi bi-caret-${
            isOpen ? 'up' : 'down'
          }-fill`}
        ></i>
      </div>

      {isOpen && (
        <ul
          role="menu"
          aria-orientation="vertical"
          className={classes.dropdownMenu}
        >
          {GUEST_DROPDOWN_ITEMS.map((item) => (
            <li key={item.id} className={classes.dropdownItem}>
              <div className={classes.itemDetails}>
                <p>{item.label}</p>
                <p className={classes.description}>{item.description}</p>
              </div>

              <div className={classes.buttonsContainer}>
                <button
                  onClick={() => updateGuestData(item.key, false)}
                  aria-label={`Decrease ${item.label}`}
                >
                  -
                </button>
                <p>{currentSearchQuery[item.key]}</p>
                <button
                  onClick={() => updateGuestData(item.key, true)}
                  aria-label={`Increase ${item.label}`}
                >
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
