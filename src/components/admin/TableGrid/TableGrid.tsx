import React, { FC, useContext } from "react";
import Items from "./Items/Items";
import classes from "./TableGrid.module.css";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/interfaces";


const TableGrid: FC = () => {
  const { addNewCity } = useContext(AdminContext) as AdminContextType;
  
  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>Cities List</h2>
        <button type="button" className={classes.createBtn} onClick={addNewCity}>
          Create
          <i className="bi bi-plus"></i>
        </button>
      </div>

      <Items />
    </div>
  );
};

export default TableGrid;
