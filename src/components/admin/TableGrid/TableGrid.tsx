import React, { FC, useContext, useState, MouseEvent } from "react";
import Items from "./Items/Items";
import classes from "./TableGrid.module.css";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/interfaces";
import AddDialog from "../AddDialog/AddDialog";

const TableGrid: FC = () => {
  const { createCity } = useContext(AdminContext) as AdminContextType;

  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleCreateButtonClick = () => {
    setShowAddDialog(true);
  };

  //this function activates when the user clicks on Close button -> closes delete/edit dialog
  const handleCancelButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowAddDialog(false);
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

      {showAddDialog && <AddDialog setShowAddDialog={setShowAddDialog} />}
    </div>
  );
};

export default TableGrid;
