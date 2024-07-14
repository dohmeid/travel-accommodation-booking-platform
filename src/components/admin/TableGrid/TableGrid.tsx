import React, { FC, useContext } from "react";
import Items from "./Items/Items";
import classes from "./TableGrid.module.css";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/interfaces";

const TableGrid: FC = () => {
  const { createCity } = useContext(AdminContext) as AdminContextType;

  const handleCreateButtonClick = () => {
    const newCity = { id: 0, name: "doha", description: "doha city" };
    createCity(newCity);
  };

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>Cities List</h2>
        <button
          type="button"
          className={classes.createBtn}
          onClick={handleCreateButtonClick}
        >
          Create
          <i className="bi bi-plus"></i>
        </button>
      </div>

      <Items />
    </div>
  );
};

export default TableGrid;
