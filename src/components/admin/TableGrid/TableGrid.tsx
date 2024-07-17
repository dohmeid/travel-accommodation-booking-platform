import React, { FC, useContext, useState, MouseEvent } from "react";
import Items from "./Items/Items";
import classes from "./TableGrid.module.css";
import AddUpdateDialog from "../AddUpdateDialog/AddUpdateDialog";
import useDialog from "../../../hooks/useDialog";

const TableGrid: FC = () => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  const handleCreateButtonClick = () => {
    openDialog("Add",{id:-1,name:"",description:""});
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

      <AddUpdateDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  );
};

export default TableGrid;
