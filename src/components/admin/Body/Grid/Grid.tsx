import React, { FC } from 'react';
import { City, GridType, Hotel, Room } from '../../../../types/adminTypes';
import useDialog, { DialogState } from '../../../../hooks/useDialog';
import { GRID_TITLES } from '../../../../constants/gridConstants';
import CityDialog from '../../Dialogs/CityDialog/CityDialog';
import HotelDialog from '../../Dialogs/HotelDialog/HotelDialog';
import RoomDialog from '../../Dialogs/RoomDialog/RoomDialog';
import DeleteDialog from '../../Dialogs/DeleteDialog/DeleteDialog';
import CityTable from './Tables/CityTable';
import HotelTable from './Tables/HotelTable';
import RoomTable from './Tables/RoomTable';
import classes from './Grid.module.css';

interface GridProps {
  gridType: GridType;
}

const Grid: FC<GridProps> = ({ gridType }) => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  const handleCreateButtonClick = () => {
    openDialog(gridType, 'Add');
  };

  const renderDialog = () => {
    const dialogMap: Record<GridType, JSX.Element> = {
      [GridType.CITY]: (
        <CityDialog
          dialogState={dialogState as DialogState<City>}
          closeDialog={closeDialog}
        />
      ),
      [GridType.HOTEL]: (
        <HotelDialog
          dialogState={dialogState as DialogState<Hotel>}
          closeDialog={closeDialog}
        />
      ),
      [GridType.ROOM]: (
        <RoomDialog
          dialogState={dialogState as DialogState<Room>}
          closeDialog={closeDialog}
        />
      ),
    };
    return dialogMap[gridType] || null;
  };

  const renderTable = () => {
    switch (gridType) {
      case GridType.CITY:
        return <CityTable openDialog={openDialog} />;
      case GridType.HOTEL:
        return <HotelTable openDialog={openDialog} />;
      case GridType.ROOM:
        return <RoomTable openDialog={openDialog} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>{GRID_TITLES[gridType]}</h2>
        <button
          type="button"
          className={classes.createBtn}
          aria-label={`Create a new ${gridType}`}
          onClick={handleCreateButtonClick}
        >
          Create
          <i className="bi bi-plus"></i>
        </button>
      </div>

      {renderTable()}
      {renderDialog()}
      <DeleteDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  );
};

export default Grid;
