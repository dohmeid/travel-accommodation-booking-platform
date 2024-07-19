import React, { FC, MouseEvent } from "react";
import { Hotel } from "../../../../../interfaces/interfaces";
import { UseDialog } from "../../../../../hooks/useDialog";
import classes from "./HotelRow.module.css";

interface Props {
  hotelData: Hotel;
  openDialog: UseDialog["openDialog"];
}

const HotelRow: FC<Props> = ({ hotelData, openDialog }) => {
  //this function opens the update city dialog
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("Hotel", "Update", null, hotelData);
  };

  //this function opens the delete city dialog
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openDialog("Hotel", "Delete", null, hotelData);
  };

  //Hotel: id, name, description, hotelType, starRating, latitude, longitude, actions(delete,update)

  return (
    <tr className={classes.row}>
      <td>{hotelData.id}</td>
      <td>{hotelData.name}</td>
      <td className={classes.descriptionRow}>{hotelData.description}</td>
      <td>{hotelData.hotelType}</td>
      <td>{hotelData.starRating}</td>
      <td>{hotelData.latitude}</td>
      <td>{hotelData.longitude}</td>
      <td className={classes.buttons}>
        <button
          type="submit"
          className={classes.editBtn}
          aria-label="Update city information"
          onClick={handleEditButtonClick}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          type="submit"
          className={classes.deleteBtn}
          aria-label="Delete city"
          onClick={handleTrashButtonClick}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default HotelRow;
