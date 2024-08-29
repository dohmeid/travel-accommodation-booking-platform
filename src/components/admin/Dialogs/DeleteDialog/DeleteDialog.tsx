import React, { FC, MouseEvent } from 'react';
import { UseDialog, DialogState } from '../../../../hooks/useDialog';
import { useAdminContext } from '../../../../context/AdminProvider';
import { City, GridType, Hotel } from '../../../../types/adminTypes';
import classes from './DeleteDialog.module.css';

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog['closeDialog'];
}

const DeleteDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { deleteCity, deleteHotel } = useAdminContext();
  const { type, mode, isOpen, data } = dialogState;

  const handleDeleteButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (data) {
      const itemId = (data as City | Hotel).id; //type assertion
      if (type === GridType.CITY) {
        await deleteCity(itemId);
      } else if (type === GridType.HOTEL) {
        await deleteHotel(itemId);
      }
      closeDialog();
    }
  };

  if (!isOpen || mode !== 'Delete') return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.deleteDialog}>
        <h2>{`${type} Deletion`}</h2>
        <h3>{`Are you certain you wish to delete this ${type}?`}</h3>

        <div className={classes.buttons}>
          <button
            type="button"
            className={classes.cancelBtn}
            onClick={closeDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className={classes.deleteBtn}
            onClick={handleDeleteButtonClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
