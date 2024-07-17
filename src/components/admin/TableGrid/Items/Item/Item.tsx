import React, { FC, useContext, MouseEvent, useEffect, useState } from "react";
import classes from "./Item.module.css";
import { AdminContext } from "../../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../../interfaces/interfaces";
import { UseDialog, DialogState } from "../../../../../hooks/useDialog";

interface Props {
  cityData: City;
  openDialog: UseDialog["openDialog"];
}

const Item: FC<Props> = ({ cityData, openDialog }) => {
  const { updateCity } = useContext(AdminContext) as AdminContextType;

  //this function opens the update city dialog
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openDialog("Update", cityData);
  };

  //this function opens the delete city dialog
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openDialog("Delete", cityData);
  };

  return (
    <>
      <tr className={classes.row}>
        <td>{cityData.id}</td>
        <td>{cityData.name}</td>
        <td>{cityData.description}</td>
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
    </>
  );
};

export default Item;
