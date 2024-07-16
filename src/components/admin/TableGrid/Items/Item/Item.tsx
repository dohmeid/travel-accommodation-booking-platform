import React, { FC, useContext, MouseEvent, useEffect, useState } from "react";
import classes from "./Item.module.css";
import { AdminContext } from "../../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../../interfaces/interfaces";

interface Props {
  cityData: City;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCityToDelete: React.Dispatch<React.SetStateAction<number>>;
}

const Item: FC<Props> = ({
  cityData,
  setCityToDelete,
  setShowDeleteDialog
}) => {
  const { updateCity } = useContext(AdminContext) as AdminContextType;

  //this function updates the city
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedCity = {
      id: cityData.id,
      name: "new name",
      description: "new description",
    };
    updateCity(updatedCity);
  };

  //this function deletes the city
  const handleTrashButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
    setCityToDelete(cityData.id);
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
