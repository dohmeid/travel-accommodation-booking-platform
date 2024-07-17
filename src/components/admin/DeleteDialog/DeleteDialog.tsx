import React, { FC, MouseEvent, useContext } from "react";
import classes from "./DeleteDialog.module.css";
import { UseDialog, DialogState } from "../../../hooks/useDialog";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/interfaces";

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog["closeDialog"];
}

const DeleteDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { deleteCity } = useContext(AdminContext) as AdminContextType;

  //this function activates when the user clicks on the delete button
  const handleDeleteButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteCity(dialogState.data?.id);
    closeDialog();
  };

  if (!dialogState.isOpen || dialogState.type !== "Delete") return null;

  return (
    <div className={classes.deleteDialog}>
      <h2>City Deletion</h2>
      <h3>Are you certain you wish to delete this City?</h3>

      <div className={classes.buttons}>
        <button
          className={classes.cancelBtn}
          type="button"
          onClick={closeDialog}
        >
          Cancel
        </button>
        <button
          className={classes.deleteBtn}
          type="button"
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
