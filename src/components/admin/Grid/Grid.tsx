import React, { FC } from "react";
import CitiesTable from "./CitiesTable/CitiesTable";
import HotelsTable from "./HotelsTable/HotelsTable";
import AddUpdateDialog from "../AddUpdateDialog/AddUpdateDialog";
import useDialog from "../../../hooks/useDialog";
import classes from "./Grid.module.css";

interface GridProps {
  gridType: "city" | "hotel";
}

const Grid: FC<GridProps> = ({gridType}) => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  const handleCreateButtonClick = () => {
    openDialog("Add", { id: -1, name: "", description: "" });
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

      {gridType === "city" ? <CitiesTable /> : <HotelsTable />}


      <AddUpdateDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  );
};

export default Grid;
