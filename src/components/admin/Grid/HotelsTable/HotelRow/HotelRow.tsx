import React, { FC, MouseEvent } from "react";
import { Hotel } from "../../../../../types/adminTypes";
import useDialog from "../../../../../hooks/useDialog";
import DeleteDialog from "../../../DeleteDialog/DeleteDialog";
import HotelDialog from "../../../HotelDialog/HotelDialog";
import classes from "./HotelRow.module.css";

interface Props {
  hotelData: Hotel;
}

const HotelRow: FC<Props> = ({ hotelData }) => {
  const { dialogState, openDialog, closeDialog } = useDialog();
  const { id, name, description, hotelType, starRating, latitude, longitude } =
    hotelData;

  //this function opens the update city dialog
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("Hotel", "Update", hotelData);
  };

  //this function opens the delete city dialog
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("Hotel", "Delete", hotelData);
  };

  return (
    <>
      <tr className={classes.row}>
        <td>{id}</td>
        <td>{name}</td>
        <td className={classes.descriptionRow}>{description}</td>
        <td>{hotelType}</td>
        <td>{starRating}</td>
        <td>{latitude}</td>
        <td>{longitude}</td>
        <td className={classes.buttons}>
          <button
            type="button"
            className={classes.editBtn}
            aria-label="Update city information"
            onClick={handleEditButtonClick}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>

          <button
            type="button"
            className={classes.deleteBtn}
            aria-label="Delete city"
            onClick={handleTrashButtonClick}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>

      <DeleteDialog dialogState={dialogState} closeDialog={closeDialog} />
      <HotelDialog dialogState={dialogState} closeDialog={closeDialog} />
    </>
  );
};

export default HotelRow;
