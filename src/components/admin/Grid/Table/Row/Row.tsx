import React, { FC, MouseEvent } from 'react';
import { UseDialog } from '../../../../../hooks/useDialog';
import { City, GridType, Hotel } from '../../../../../types/adminTypes';
import classes from './Row.module.css';

interface Props {
  data: City | Hotel;
  type: GridType;
  openDialog: UseDialog['openDialog'];
}

const Row: FC<Props> = ({ data, type, openDialog }) => {
  const handleButtonClick =
    (actionType: 'Update' | 'Delete') => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openDialog(type, actionType, data);
    };

  return (
    <tr className={classes.row}>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td className={type === GridType.CITY ? classes.descriptionRow : ''}>
        {data.description}
      </td>
      {type === GridType.HOTEL && (
        <>
          <td>{(data as Hotel).hotelType}</td>
          <td>{(data as Hotel).starRating}</td>
          <td>{(data as Hotel).latitude}</td>
          <td>{(data as Hotel).longitude}</td>
        </>
      )}

      <td className={classes.buttons}>
        <button
          type="button"
          className={classes.editBtn}
          aria-label="Update city information"
          onClick={handleButtonClick('Update')}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          type="button"
          className={classes.deleteBtn}
          aria-label="Delete city"
          onClick={handleButtonClick('Delete')}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default Row;
