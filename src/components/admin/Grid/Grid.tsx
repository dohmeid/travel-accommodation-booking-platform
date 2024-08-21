import React, { FC } from 'react';
import useDialog from '../../../hooks/useDialog';
import { GridType } from '../../../types/adminTypes';
import CitiesTable from './CitiesTable/CitiesTable';
import HotelsTable from './HotelsTable/HotelsTable';
import CityDialog from '../Dialogs/CityDialog/CityDialog';
import HotelDialog from '../Dialogs/HotelDialog/HotelDialog';
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

  const renderTable = () => {
    switch (gridType) {
      case GridType.CITY:
        return <CitiesTable />;
      case GridType.HOTEL:
        return <HotelsTable />;
      case GridType.ROOM:
        return <CitiesTable />;
      default:
        return null;
    }
  };

  const renderDialog = () => {
    switch (gridType) {
      case GridType.CITY:
        return (
          <CityDialog dialogState={dialogState} closeDialog={closeDialog} />
        );
      case GridType.HOTEL:
        return (
          <HotelDialog dialogState={dialogState} closeDialog={closeDialog} />
        );
      case GridType.ROOM:
        return (
          <CityDialog dialogState={dialogState} closeDialog={closeDialog} />
        );
      default:
        return null;
    }
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

      {renderTable()}
      {renderDialog()}
    </div>
  );
};

export default Grid;
