import React, { FC, useContext, MouseEvent } from "react";
import classes from "./Item.module.css";
import { AdminContext } from "../../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../../interfaces/interfaces";

interface Props {
  cityData: City;
}

const Item: FC<Props> = ({ cityData }) => {
  const { updateCity, deleteCity } = useContext(
    AdminContext
  ) as AdminContextType;

  //this function updates the city
  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCity(cityData.id);
  };

  //this function deletes the city
  const handleDeleteButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteCity(cityData.id);
  };

  return (
    <tr className={classes.row}>
      <td>{cityData.id}</td>
      <td>{cityData.name}</td>
      <td>{cityData.description}</td>
      <td>10</td>
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
          onClick={handleDeleteButtonClick}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default Item;
