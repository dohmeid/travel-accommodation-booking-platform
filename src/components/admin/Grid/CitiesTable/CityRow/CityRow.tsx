import React, { FC, MouseEvent } from "react";
import { City } from "../../../../../types/adminTypes";
import useDialog from "../../../../../hooks/useDialog";
import DeleteDialog from "../../../DeleteDialog/DeleteDialog";
import CityDialog from "../../../CityDialog/CityDialog";
import classes from "./CityRow.module.css";

interface Props {
  cityData: City;
}

const CityRow: FC<Props> = ({ cityData }) => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  //this function opens the update city dialog
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("City", "Update", cityData);
  };

  //this function opens the delete city dialog
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("City", "Delete", cityData);
  };

  return (
    <>
      <tr className={classes.row}>
        <td>{cityData.id}</td>
        <td>{cityData.name}</td>
        <td className={classes.descriptionRow}>{cityData.description}</td>
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
      <CityDialog dialogState={dialogState} closeDialog={closeDialog} />
    </>
  );
};

export default CityRow;
