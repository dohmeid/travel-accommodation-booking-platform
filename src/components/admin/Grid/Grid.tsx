import React, { FC } from 'react';
import { City, GridType, Hotel } from '../../../types/adminTypes';
import useDialog, { DialogState } from '../../../hooks/useDialog';
import CityDialog from '../Dialogs/CityDialog/CityDialog';
import HotelDialog from '../Dialogs/HotelDialog/HotelDialog';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog';
import Table from './Table/Table';
import classes from './Grid.module.css';

interface GridProps {
  gridType: GridType;
}

const Grid: FC<GridProps> = ({ gridType }) => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  const titles: Record<string, string> = {
    [GridType.CITY]: 'Cities List',
    [GridType.HOTEL]: 'Hotels List',
    [GridType.ROOM]: 'Rooms List',
  };

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
        <CityDialog
          dialogState={dialogState as DialogState<City>}
          closeDialog={closeDialog}
        />
      ),
    };
    return dialogMap[gridType] || null;
  };

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>{titles[gridType]}</h2>
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

      <Table type={gridType} openDialog={openDialog} />
      {renderDialog()}
      <DeleteDialog dialogState={dialogState} closeDialog={closeDialog} />
    </div>
  );
};

export default Grid;
