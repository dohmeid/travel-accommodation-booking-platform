import React, { FC, MouseEvent } from "react";
import { City } from "../../../../../interfaces/adminTypes";
import { UseDialog } from "../../../../../hooks/useDialog";
import classes from "./CityRow.module.css";

interface Props {
  cityData: City;
  openDialog: UseDialog["openDialog"];
}

const CityRow: FC<Props> = ({ cityData, openDialog }) => {
  //this function opens the update city dialog
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("City", "Update", cityData);
  };

  //this function opens the delete city dialog
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openDialog("City", "Delete", cityData);
  };

  return (
    <tr className={classes.row}>
      <td>{cityData.id}</td>
      <td>{cityData.name}</td>
      <td className={classes.descriptionRow}>{cityData.description}</td>
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

export default CityRow;
