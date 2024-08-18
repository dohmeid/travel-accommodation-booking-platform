import React, { FC, MouseEvent } from 'react';
import { UseDialog, DialogState } from '../../../hooks/useDialog';
import { useAdminContext } from '../../../context/AdminProvider';
import classes from './DeleteDialog.module.css';

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog['closeDialog'];
}

const DeleteDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { deleteCity, deleteHotel } = useAdminContext();
  const { management, type, isOpen, cityData, hotelData } = dialogState;

  const handleDeleteButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (management === 'City' && cityData) {
      await deleteCity(cityData.id);
    } else if (management === 'Hotel' && hotelData) {
      await deleteHotel(hotelData.id);
    }
    closeDialog();
  };

  if (!isOpen || type !== 'Delete') return null;

  return (
    <div className={classes.deleteDialog}>
      <h2>{`${management} Deletion`}</h2>
      <h3>{`Are you certain you wish to delete this ${management}?`}</h3>

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
  );
};

export default DeleteDialog;
