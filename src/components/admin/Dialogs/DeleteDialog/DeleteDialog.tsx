import React, { FC, MouseEvent } from 'react';
import { UseDialog, DialogState } from '../../../../hooks/useDialog';
import { City, GridType, Hotel, Room } from '../../../../types/adminTypes';
import useCitiesManagement from '../../../../hooks/useCitiesManagement';
import useHotelsManagement from '../../../../hooks/useHotelsManagement';
import useRooms from '../../../../hooks/useRoomsManagement';
import classes from './DeleteDialog.module.css';

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog['closeDialog'];
}

const DeleteDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { deleteCity } = useCitiesManagement();
  const { deleteHotel } = useHotelsManagement();
  const { deleteRoom } = useRooms();

  const { type, mode, isOpen, data } = dialogState;

  const handleDeleteButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (data) {
      const itemId = (data as City | Hotel).id; //type assertion
      if (type === GridType.CITY) {
        await deleteCity(itemId);
      } else if (type === GridType.HOTEL) {
        await deleteHotel(itemId);
      } else {
        await deleteRoom((data as Room).roomId);
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
