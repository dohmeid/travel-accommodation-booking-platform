import React, { FC, MouseEvent } from 'react';
import { UseDialog } from '../../../../../hooks/useDialog';
import { City, GridType, Hotel, Room } from '../../../../../types/adminTypes';
import classes from './Row.module.css';

interface Props {
  data: City | Hotel | Room;
  type: GridType;
  openDialog: UseDialog['openDialog'];
}

const Row: FC<Props> = ({ data, type, openDialog }) => {
  const handleButtonClick =
    (actionType: 'Update' | 'Delete') => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openDialog(type, actionType, data);
    };

  const renderCommonFields = () => {
    if (type === GridType.CITY || type === GridType.HOTEL) {
      const { id, name, description } = data as City | Hotel;
      return (
        <>
          <td>{id}</td>
          <td>{name}</td>
          <td className={type === GridType.CITY ? classes.descriptionRow : ''}>
            {description}
          </td>
        </>
      );
    }
    return null;
  };

  const renderHotelFields = () => {
    if (type === GridType.HOTEL) {
      const { hotelType, starRating, latitude, longitude } = data as Hotel;
      return (
        <>
          <td>{hotelType}</td>
          <td>{starRating}</td>
          <td>{latitude}</td>
          <td>{longitude}</td>
        </>
      );
    }
    return null;
  };

  const renderRoomFields = () => {
    if (type === GridType.ROOM) {
      const {
        roomId,
        roomNumber,
        roomType,
        capacityOfAdults,
        capacityOfChildren,
        roomAmenities,
        price,
        availability,
      } = data as Room;
      return (
        <>
          <td>{roomId}</td>
          <td>{roomNumber}</td>
          <td>{roomType}</td>
          <td>{capacityOfAdults}</td>
          <td>{capacityOfChildren}</td>
          <td className={classes.roomAmenities}>
            {roomAmenities.length > 0 && (
              <ul>
                {roomAmenities.map((am, index) => (
                  <li key={index}>
                    <i className="bi bi-plus"></i>
                    {am.name}
                  </li>
                ))}
              </ul>
            )}
          </td>
          <td>${price}</td>
          <td className={classes.availability}>
            <i
              className={availability ? 'bi bi-check-lg' : 'bi bi-x'}
              aria-label={availability ? 'Available' : 'Unavailable'}
            ></i>
          </td>
        </>
      );
    }
    return null;
  };

  return (
    <tr className={classes.row}>
      {renderCommonFields()}
      {renderHotelFields()}
      {renderRoomFields()}

      <td className={classes.buttons}>
        <button
          type="button"
          className={classes.editBtn}
          aria-label={`Update ${type.toLowerCase()} information`}
          onClick={handleButtonClick('Update')}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          type="button"
          className={classes.deleteBtn}
          aria-label={`Delete ${type.toLowerCase()}`}
          onClick={handleButtonClick('Delete')}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default Row;
